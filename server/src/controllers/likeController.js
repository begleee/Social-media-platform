import { prisma } from "../../generated/lib/prisma.js"

const togglePostLike = async (req, res) => {
    const userId = req.user.id;
    const postId = req.params.id;
    try {
        const post = await prisma.post.findUnique({
            where: { id: postId }
        });

        if(!post) {
            res.status(404).json({ messsage: "No post found" });
        }

        const like = await prisma.like.findUnique({
            where: {
                userId_postId: {
                    userId,
                    postId
                }
            }
        });

        if(like) {
            await prisma.like.delete({
                where: {
                    userId_postId: {
                        userId,
                        postId
                    }
                }
            });

            return res.status(200).json({ like: false, message: "Post unliked successfully" });
        } else {
            await prisma.like.create({
                data: {
                    userId,
                    postId
                }
            });

            return res.status(201).json({ like: true, message: "Post liked successfully" });
        }
    } catch (error) {
        res.status(500).json({ 
            message: "Someting went wrong",
            error: error.message
        });
    }
};

export { togglePostLike };
