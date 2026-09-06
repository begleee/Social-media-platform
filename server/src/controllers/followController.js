import { prisma } from "../../generated/lib/prisma.js";

const toggleFollow = async (req, res) => {
    const followerId = req.user.id;
    const { followingId } = req.params;
    try {
        const follow = await prisma.follow.findUnique({
            where: {
                followerId_followingId: {
                    followerId,
                    followingId
                }
            }
        });

        if(follow) {
            await prisma.follow.delete({
                where: {
                    followerId_followingId: {
                        followerId,
                        followingId
                    }
                }
            });

            return res.status(200).json({ follow: false, message: "Unfollowed successfully" });
        } else {
            await prisma.follow.create({
                data: {
                    followerId,
                    followingId
                }
            });

            return res.status(201).json({ follow: true, message: "Followed successfully" });
        }

    } catch (error) {
        return res.status(500).json({ error: error.messagge });
    }
};

export { toggleFollow };