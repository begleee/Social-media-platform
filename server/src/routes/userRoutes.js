import { Router } from "express";
import { prisma } from "../../generated/lib/prisma.js";
import { deleteUser, getMe, getUser, updateUser } from "../controllers/userControllers.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/get-user/:id", getUser);
router.get("/me", authMiddleware, getMe);
router.post("/update-user", authMiddleware, updateUser)
router.delete("/delete-user", authMiddleware, deleteUser);

export default router;
