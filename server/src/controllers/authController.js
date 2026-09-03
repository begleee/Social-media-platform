import { prisma } from "../../generated/lib/prisma.js";
import { genereteToken } from "../utils/generateToken.js";
import bcrypt from "bcryptjs";
import crypto from "crypto"
import { sendPasswordResetToken } from "../utils/sendPasswordResetToken.js";

const register = async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await prisma.user.findUnique({
        where: email
    });

    if(userExists) {
        res.status(400).json({ error: "User already exists with this email" });
    }

    const salt = await bcrypt.getSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
        data: {
            name,
            email,
            hashedPassword
        },
    });

    res.status(201).json({
        status: "success",
        data: {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        },
    });
};

const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
        where: { email },
    });

    if(!user) {
        res.status(401).json({ error: "Invalid email or password" });
    }

    if(!user.password) {
        return res.status(404).json({
            error: "Please use the 'Forgot password' link to set up your account password"
        });
    };

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid) {
        return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = genereteToken(user.id, res);

    res.status(201).json({
        status: "success",
        data: {
            user: {
                id: user.id,
                email: email
            },
        },
        token,
    });
};

const logout = async (req, res) => {
    res.cookies("jwt", "", {
        httpOnly: true,
        expires: new Date(0)
    });

    res.status(200).json({
        status: "success",
        message: "Logout successfully"
    });
};

const forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = prisma.user.findUnique({
            where: { email },
        });

        if(!user) {
            return res.json({ message: "A reset token has been sent" });
        }

        const resetToken = crypto.randomBytes(32).toString("hex");
        // 5 minutes exporation time
        const tokenExpiry = new Date(Date.now() + 1000 * 60 * 5);

        await prisma.user.update({
            where: { email },
            data: {
                resetPasswordToken: resetToken,
                resetPasswordExpires: tokenExpiry
            },
        });

        sendPasswordResetToken(email, resetToken, req);

        res.status(200).json({ 
            message: "A reset token has been sent",
            details: `Expires in ${tokenExpiry}`
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const resetPassword = async (req, res) => {
    const { token } = req.params.token;
    const { newPassword } = req.body;

    try {
        const user = await prisma.user.findFirst({
            where: {
                resetPasswordToken: token,
                resetPasswordExpires: {
                    gt: new Date()
                }
            }
        });

        if(!user) {
            return res.status(404).json({ message: "Invalid or expired password reset token" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        await prisma.user.update({
            where: { id: user.id },
            data: {
                password: hashedPassword,
                resetPasswordToken: null,
                resetPasswordExpires: null
            }
        });

        return res.json({ message: "Password updated successfully! You can now log in." });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export { register, login, logout, forgotPassword, resetPassword };
