import { v2 as cloudinary } from "cloudinary";
import { deleteFromCloud, generateFileBase64Url, streamUploadAvatar } from "../utils/filesUtils.js";
import { prisma } from "../../generated/lib/prisma.js";
import { extractPublicId } from "cloudinary-build-url";

const uploadUserAvatar = async (req, res) => {
    const userId = req.user.id;
    const file = req.file;
    try {
        const user = await prisma.user.findUnique({
            where: { id: userId }
        });

        const result = user.avatarUrl ? await deleteFromCloud(extractPublicId(user.avatarUrl)) : { result: "ok" };

        if(result.result === "ok") {
            const uploadResult = await streamUploadAvatar(file.buffer);
            const avatarUrl = uploadResult.secure_url;
    
            const user = await prisma.user.update({
                where: { id: userId },
                data: { avatarUrl }
            });

            return res.status(200).json({
                success: true,
                message: "Uploaded successfully.",
                newUrl: avatarUrl
            });
        } else {
            return res.status(400).json({
                success: false,
                message: 'Cloudinary could not find this asset. Check if it was already deleted.',
                cloudinary_response: result
            });
        };

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

        if(!user.avatarUrl) {
            return res.status(404).json({ message: "User doesn't have avatar" });
        };

        const result = await deleteFromCloud(extractPublicId(user.avatarUrl));

        if(result.result === "ok") {
            await prisma.user.update({
                where: { id: userId },
                data: { avatarUrl: null }
            });

            return res.status(200).json({
                success: true,
                message: "Avatar deleted successfully"
            });
        } else {
            return res.status(400).json({
                success: false,
                message: 'Cloudinary could not find this asset. Check if it was already deleted.',
                cloudinary_response: result
            });
        };

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
