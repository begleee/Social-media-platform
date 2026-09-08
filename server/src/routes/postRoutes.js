import { Router } from "express";
import { prisma } from "../../generated/lib/prisma.js";
import { createPost, deletePost, getPost, getUserPosts, updatePost } from "../controllers/postControllers.js";
import { authMiddleware, checkRole } from "../middlewares/authMiddleware.js";
import { uploadImages } from "../middlewares/uploadMiddleware.js";

const router = Router();

router.post("/create-post", authMiddleware, uploadImages, createPost);
router.post("/update-post/:id", authMiddleware, uploadImages, updatePost);
router.get("/get-post/:id", getPost);
router.delete("/delete-post/:id", authMiddleware, deletePost);
router.get("/get-user-posts/:id", getUserPosts);

export default router;
