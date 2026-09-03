import { prisma } from "../../generated/lib/prisma.js";

const createPost = async (req, res) => {
    try {
        const { userId, title, details } = req.body;

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
    }
};

const getUserPosts = async (req, res) => {
    try {
        const { userId } = req.params.id;

        const posts = await prisma.post.findMany({
            where: { userId }
        })

        res.status(200).json({ posts });

    } catch (error) {
        res.status(400).json({ 
            message: "Couldnt get posts of user",
            error: error.message
        });
    }
};

export { createPost, getUserPosts };
