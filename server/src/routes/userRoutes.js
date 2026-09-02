import { Router } from "express";
import { prisma } from "../../generated/lib/prisma.js";

const createUserRoute = Router().post("/createuser", async (req, res) => {
    try {
        const { name, email } = req.body;
        console.log(name, email)
        
        const user = await prisma.user.create({
            data: { name, email},
        });
        
        res.status(201).json({
            data: user
        })
    } catch (error) {
        res.status(500).json({ error: "Failed to create user", details: error.message })
    }
});

const getUsers = Router().get("/getusers", async (req, res) => {
    try {
        const users = await prisma.user.findMany();

        res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({
            message: "Couldnt get users",
            details: error.message
        });
    };
});

const getSpecifiedUser = Router().get("/getspecified/:id", async (req, res) => {
    try {
        const userId = req.params.id;
        
        const user = prisma.user.findUnique({
            where: { id: userId }
        });

        res.status(200).json({
            user,
        });

    } catch (error) {
        res.status(400).json({
            message: "Couldnt get the user by id",
            error: error?.message
        });
    };
});

export { createUserRoute, getUsers, getSpecifiedUser };
