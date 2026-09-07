import { v2 as cloudinary } from "cloudinary";
import { generateFileBase64Url } from "../utils/generateFileBase64Url.js";
import { prisma } from "../../generated/lib/prisma.js";

const uploadUserAvatar = async (req, res) => {
    const userId = req.user.id;
    try {
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

export { uploadUserAvatar };
