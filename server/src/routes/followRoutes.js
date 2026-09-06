import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { toggleFollow } from "../controllers/followController.js";

const router = Router();

router.post("/follow-user/:followingId", authMiddleware, toggleFollow);

export default router;
