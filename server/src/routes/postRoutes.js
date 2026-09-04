import { Router } from "express";
import { prisma } from "../../generated/lib/prisma.js";
import { createPost, getUserPosts } from "../controllers/postControllers.js";
import { authMiddleware, checkRole } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/create-post", authMiddleware, checkRole(["USER", "ADMIN"]), createPost);
router.get("/get-user-posts/:id", getUserPosts);

export default router;
