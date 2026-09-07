import { Router } from "express";
import { getFeed } from "../controllers/feedController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/feed", authMiddleware, getFeed);

export default router;
