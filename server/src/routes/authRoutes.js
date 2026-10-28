import { Router } from "express";
import { register, login, logout, forgotPassword, resetPassword } from "../controllers/authController.js";
import { deleteUser } from "../controllers/userControllers.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { loginSchema, registerSchema } from "../schema/authSchema.js";

const router = Router();

router.post("/register", validateSchema(registerSchema), register);
router.post("/login", validateSchema(loginSchema), login);
router.post("/logout", logout);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

export default router;
