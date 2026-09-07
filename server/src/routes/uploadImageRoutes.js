import { Router } from "express";
import { uploadImage, validateFilePresence } from "../middlewares/uploadMiddleware.js";
import { uploadUserAvatar } from "../controllers/uploadImageController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/upload-avatar", authMiddleware, uploadImage, validateFilePresence, uploadUserAvatar);

export default router;
