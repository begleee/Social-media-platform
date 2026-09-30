import { prisma } from "../../generated/lib/prisma.js";

const getFeed = async (req, res) => {
    const userId = req.user.id;
    const { skip } = req.body;
    try {
        const follows = await prisma.follow.findMany({
            where: { followerId: userId }
        });

        const feedPromises = follows.map( async (follow) => {
            return await prisma.post.findMany({
                where: { userId: follow.followingId },
                include: {
                    authorId: {
                        select: { id: true, name: true, avatarUrl: true}
                    },
                    _count: {
                        select: { likes: true, comments: true }
                    },
                    imageUrls: true,
                    likes: {
                        where: {
                            userId
                        },
                        select: {
                            userId: true
                        }
                    }
                },
                skip,
                take: 2,
                orderBy: { createdAt: "asc" }
            });
        });

        const feed = await Promise.all(feedPromises);

        return res.status(200).json({ messaage: "Feed sent", feed: feed.flat() });
    } catch (error) {
        return res.status(500).json({ error: error.messaage });
    }
};

export { getFeed };
