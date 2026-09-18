import { Router } from "express";
import { getFeed } from "../controllers/feedController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/feed", authMiddleware, getFeed);

export default router;
