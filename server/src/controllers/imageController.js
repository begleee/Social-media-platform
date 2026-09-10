import { v2 as cloudinary } from "cloudinary";
import { generateFileBase64Url } from "../utils/generateFileBase64Url.js";
import { prisma } from "../../generated/lib/prisma.js";

const uploadUserAvatar = async (req, res) => {
    const userId = req.user.id;
    try {
        const user = await prisma.user.findUnique({
            where: { id: userId }
        });

        const fileUrl = generateFileBase64Url(req.file.buffer, req.file.mimetype);
    
        const result = await cloudinary.uploader.upload(fileUrl, {
            folder: "user_avatars",
            resource_type: "auto"
        });

        await prisma.user.update({
            where: { id: userId }, 
            data: { avatarUrl: result.secure_url }
        });
    
        return res.status(200).json({
            message: "Upload successfully"
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const deleteUserAvatar = async (req, res) => {
    const userId = req.user.id;
    try {
        const user = await prisma.user.findUnique({
            where: { id: userId }
        });

        const isAdmin = req.user.role === "ADMIN";
        const isAuthor = userId === user.id;

        if(!isAdmin && !isAuthor) return res.status(403).json({ message: "Acess denied" });

        await prisma.user.update({
            where: { id: userId },
            data: { avatarUrl: "" }
        });

        return res.status(200).json({ message: "Avatar delted successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const deleteImage = async (req, res) => {
    const imageId = req.params.imageId;
    try {
        const image = await prisma.imageUrl.findUnique({
            where: { id: imageId }
        });

        if(!image) return res.status(403).json({ message: "Image not found" });

        await prisma.imageUrl.delete({
            where: { id: imageId }
        });

        res.status(200).json({ message: "Image deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export { uploadUserAvatar, deleteUserAvatar, deleteImage };
