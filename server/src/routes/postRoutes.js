import { Router } from "express";
import { prisma } from "../../generated/lib/prisma.js";
import { createPost, getUserPosts } from "../controllers/postControllers.js";

const router = Router();

router.post("/create-post", createPost);
router.get("/get-user-posts/:id", getUserPosts);

export default router;
