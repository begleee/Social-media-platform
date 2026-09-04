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

const getPost = async (req, res) => {
    const postId = req.params.id;
    try {
        const post = await prisma.post.findUnique({
            where: {id: postId }
        });

        if(!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        res.status(200).json({ post });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const updatePost = async (req, res) => {
    const postId = req.params.id;
    const userId = req.user.id;
    const userRole = req.user.role;
    const { title, details } = req.body;
    try {
        const post = await prisma.post.findUnique({
            where: {id: postId }
        });

        if(!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        const isAdmin = userRole === "ADMIN";
        const isAuthor = post.authorId === userId;

        if(!isAdmin && !isAuthor) {
            return res.status(403).json({ message: "Access denied. You are not authorized to delete this post." });
        }

        await prisma.post.update({
            where: { id: postId },
            data: {
                title,
                details
            }
        });

        return res.status(200).json({ 
            message: 'Post successfully updated',
            data: post
        });

    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

const getUserPosts = async (req, res) => {
    const { userId } = req.params.id;
    try {
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

const deletePost = async (req, res) => {
    const postId = req.params.id;
    const userId = req.user.id;
    const userRole = req.user.role;

    try {
        const post = await prisma.post.findUnique({
            where: { id: postId }
        });

        if(!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        const isAdmin = userRole === "ADMIN";
        const isAuthor = post.authorId === userId;

        if(!isAdmin && !isAuthor) {
            return res.status(403).json({ message: "Access denied. You are not authorized to delete this post." });
        }

        await prisma.post.delete({
            where: { id: postId }
        });

        return res.status(200).json({ message: 'Post successfully deleted' });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

export { createPost, getPost, updatePost, getUserPosts, deletePost };
