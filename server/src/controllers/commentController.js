import { prisma } from "../../generated/lib/prisma.js";

const commentPost = async (req, res) => {
    const userId = req.user.id;
    const { postId } = req.params;
    const { content } = req.body;
    try {
        const post = await prisma.post.findUnique({
            where: { id: postId }
        });

        if(!post) return res.status(404).json({ message: "Post not found" });

        const comment = await prisma.comment.create({
            data: {
                content,
                userId,
                postId
            }
        });

        return res.status(201).json({ 
            message: "Commented successfully",
            comment
        });
    } catch (error) {
        return res.status(500).json({ error: error.message});
    }
};

const updateComment = async (req, res) => {
    const userId = req.user.id;
    const userRole = req.user.role;
    const { commentId} = req.params;
    const { content } = req.body;
    try {
        const comment = await prisma.comment.findUnique({
            where: { id: commentId },
        });

        if(!comment) return res.status(404).json({ message: "Comment not found" });

        const isAdmin = userRole === "ADMIN";
        const isAuthor = userId === comment.userId;

        if(!isAdmin && !isAuthor) return res.status(403).json({ message: "Access denied. Not enough permissions" });

        await prisma.comment.update({
            where: { id: commentId },
            data: {
                content
            }
        });

        res.status(200).json({ 
            messaage: "Comment successfully updated",
            comment
        })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteComment = async(req, res) => {
    const userId = req.user.id;
    const userRole = req.user.role;
    const { commentId } = req.params;
    try {
        const comment = await prisma.comment.findUnique({
            where: { id: commentId }
        });

        if(!comment) return res.status(404).json({ message: "Comment not found" });

        const isAdmin = userRole === "ADMIN";
        const isAuthor = comment.userId === userId;

        if(!isAdmin && !isAuthor) {
            return res.status(403).json({ message: "Access denied. You are not authorized to delete this comment." });
        }

        await prisma.comment.delete({
            where: {id: commentId }
        });

        return res.status(200).json({ message: "Comment deleted successfully" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export { commentPost, updateComment,deleteComment };
