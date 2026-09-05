import { Router } from "express";
import { togglePostLike } from "../controllers/likeController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/like-post/:id", authMiddleware, togglePostLike);

export default router;
