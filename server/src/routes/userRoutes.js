import { Router } from "express";
import { prisma } from "../../generated/lib/prisma.js";
import { getSpecifiedUser, getUsers } from "../controllers/userControllers.js";

const router = Router();

router.get("/getusers", getUsers);
router.get("/getspecified/:id", getSpecifiedUser);

export default router;
