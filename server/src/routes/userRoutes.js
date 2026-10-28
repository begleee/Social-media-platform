import { Router } from "express";
import { prisma } from "../../generated/lib/prisma.js";
import { deleteUser, getMe, getUser, updateUser } from "../controllers/userControllers.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { updateUserSchema } from "../schema/userSchema.js";

const router = Router();

router.get("/get-user/:id", getUser);
router.get("/me", authMiddleware, getMe);
router.post("/update-user", authMiddleware, validateSchema(updateUserSchema), updateUser)
router.delete("/delete-user", authMiddleware, deleteUser);

export default router;
