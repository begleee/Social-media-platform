import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { commentPost, deleteComment, updateComment } from "../controllers/commentController.js";

const router = Router();

router.post("/comment-post/:postId", authMiddleware, commentPost);
router.post("/update-comment/:commentId", authMiddleware, updateComment);
router.delete("/delete-comment/:commentId", authMiddleware, deleteComment);

export default router;
