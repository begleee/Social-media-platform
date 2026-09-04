import { Router } from "express";
import { prisma } from "../../generated/lib/prisma.js";
import { createPost, deletePost, getPost, getUserPosts, updatePost } from "../controllers/postControllers.js";
import { authMiddleware, checkRole } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/create-post", authMiddleware, createPost);
router.get("/get-post/:id", getPost);
router.post("/update-post/:id", authMiddleware, updatePost);
router.get("/get-user-posts/:id", getUserPosts);
router.delete("/delete-post/:id", authMiddleware, deletePost);

export default router;
