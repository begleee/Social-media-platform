import { Router } from "express";
import { prisma } from "../../generated/lib/prisma.js";
import { createPost, deletePost, getMyPosts, getPost, getUserPosts, updatePost } from "../controllers/postControllers.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { uploadImages } from "../middlewares/uploadMiddleware.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { createPostSchema, updatePostSchema } from "../schema/postSchema.js";

const router = Router();

router.post("/create-post", authMiddleware, validateSchema(createPostSchema), uploadImages, createPost);
router.patch("/update-post/:id", authMiddleware, validateSchema(updatePostSchema), updatePost);
router.get("/get-post/:id", authMiddleware, getPost);
router.get("/get-my-posts", authMiddleware, getMyPosts);
router.delete("/delete-post/:id", authMiddleware, deletePost);
router.get("/get-user-posts/:id", getUserPosts);

export default router;
