import { Router } from "express";
import { prisma } from "../../generated/lib/prisma.js";

const createPost = Router().post("/create-post", async (req, res) => {
    try {
        const { userId, title, details } = req.body;

        console.log(userId, title, details);

        const newPost = await prisma.post.create({
            data: {
                title,
                details,
                userId
            }
        });

        res.status(201).json({
            message: "Post created successfully",
            newPost
        });

    } catch (error) {
        res.status(400).json({
            message: "Something went wrong, post not created",
            error: error.message
        });
    };
});

export { createPost };
