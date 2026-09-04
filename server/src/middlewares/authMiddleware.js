import jwt from "jsonwebtoken";
import { prisma } from "../../generated/lib/prisma.js";

const authMiddleware = async (req, res, next) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    } else if(req.cookies?.jwt) {
        token = req.cookies.jwt;
    }

    if(!token) {
        return res.status(401).json({ error: "Not authorized, no token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await prisma.user.findUnique({
            where: { id: decoded.id }
        });

        if(!user) {
            return res.status(401).status(401).json({ error: "User no longer exists" });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ error: "Not authorized, token failed" });
    }
}

const checkRole = (allowedRoles) => {
    return (req, res, next) => {
        if(!req.user || !allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ message: "Access denied" });
        }

        next();
    };
};

export { authMiddleware, checkRole };
