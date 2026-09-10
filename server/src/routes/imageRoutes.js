import { Router } from "express";
import { uploadImage, validateFilePresence } from "../middlewares/uploadMiddleware.js";
import { uploadUserAvatar, deleteUserAvatar, deleteImage } from "../controllers/imageController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/upload-avatar", authMiddleware, uploadImage, validateFilePresence, uploadUserAvatar);
router.post("/delete-avatar", authMiddleware, deleteImage);
router.delete("/delete-post-image/:imageId", authMiddleware, deleteImage);

export default router;
