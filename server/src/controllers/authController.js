import { prisma } from "../../generated/lib/prisma";
import { genereteToken } from "../utils/generateToken";
import bcrypt from "bcryptjs";

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

const login = async(req, res) => {
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

const logout = async(req, res) => {
    res.cookies("jwt", "", {
        httpOnly: true,
        expires: new Date(0)
    });

    res.status(200).json({
        status: "success",
        message: "Logout successfully"
    });
};

export { register, login, logout };
