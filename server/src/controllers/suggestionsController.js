import { prisma } from "../../generated/lib/prisma.js";

const getSuggestions = async (req, res) => {
    const userId = req.user.id;
    try {
        const followings = await prisma.user.findUnique({
            where: {
                id: userId
            },
            select: {
                followers: {
                    select: {
                        followingId: true
                    }
                }
            }
        });

        const followedIds = followings?.followers.map(f => f.followingId) || [];

        const suggestedUsers = await prisma.user.findMany({
            where: {
                NOT: [
                    { id: userId },
                    { id: { in: followedIds }}
                ]
            },
            select: {
                avatarUrl: true,
                id: true,
                name: true
            }
        });

        return res.status(200).json({
            suggestedUsers
        })
    } catch (error) {
        return res.status(500).json({ error: error?.message });
    }
};

export { getSuggestions };
