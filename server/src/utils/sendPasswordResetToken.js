import nodemailer from "nodemailer";

export const sendPasswordResetToken = (email, token, req) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_APP_PASSWORD
        }
    });

    const mailOptions = {
        from: process.env.EMAIL,
        to: req.body.email,
        subject: "Passowrd reset token",
        text: "Token",
        html: `<p>Use this token to reset your password and set new one ${token}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if(error) {
            return error;
        }
    });
};
