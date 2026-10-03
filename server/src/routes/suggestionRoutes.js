import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { getSuggestions } from "../controllers/suggestionsController.js";

const router = Router();

router.get("/suggestions", authMiddleware, getSuggestions);

export default router;
