import { prisma } from "../../generated/lib/prisma.js";
import { generateFileBase64Url } from "../utils/generateFileBase64Url.js";
import { v2 as cloudinary } from "cloudinary";

const createPost = async (req, res) => {
    const { title, details } = req.body;
    const userId = req.user.id;
    try {
        const newPost = await prisma.post.create({
            data: { title, details, userId }
        });

        const fileUrls = req.files && req.files.length > 0
            ? req.files.map(file => generateFileBase64Url(file.buffer, file.mimetype))
            : [];
        
        const resultPromises = fileUrls.map(async url => {
            return await cloudinary.uploader.upload(url, {
                folder: "post_photos",
                resource_type: "auto"
            });
        });

        const uploadResults = await Promise.all(resultPromises);

        const imagePromises = uploadResults.map(upload => 
            prisma.imageUrl.create({
                data: {
                    id: upload.public_id,
                    url: upload.secure_url,
                    postId: newPost.id
                }
            })
        );

        const savedImages = await Promise.all(imagePromises);

        res.status(201).json({
            message: "Post created successfully",
            newPost,
            images: savedImages
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
            where: { id: postId }
        });

        if(!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        const isAdmin = userRole === "ADMIN";
        const isAuthor = post.userId === userId;

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
            changed: {
                title,
                details
            }
        });

    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

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
        const isAuthor = post.userId === userId;

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
};

export { createPost, getPost, updatePost, getUserPosts, deletePost };
