import { Router } from "express";
import { prisma } from "../../generated/lib/prisma.js";
import { deleteUser, getSpecifiedUser, getUsers } from "../controllers/userControllers.js";
import { authMiddleware, checkRole } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/getusers", getUsers);
router.get("/getspecified/:id", getSpecifiedUser);
router.delete("/delete-user/:id", authMiddleware, checkRole(["ADMIN"]), deleteUser);

export default router;
