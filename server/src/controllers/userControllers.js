import { prisma } from "../../generated/lib/prisma.js";

const getUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany();

        res.status(200).json({ users });

    } catch (error) {
        res.status(500).json({
            message: "Couldnt get users",
            details: error.message
        });
    };
};

const getSpecifiedUser = async (req, res) => {
    try {
        const userId = req.params.id;
        
        const user = await prisma.user.findUnique({
            where: { id: userId }
        });

        res.status(200).json({
            name: user.name
        });

    } catch (error) {
        res.status(400).json({
            message: "Couldnt get the user by id",
            error: error?.message
        });
    };
}

const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;

        const user = await prisma.user.findUnique({
            where: { id: userId }
        });

        await prisma.user.delete({
            where: { id: userId }
        });

        res.status(200).json({
            message: `Successfully deleted user ${user.name}`
        });
    } catch (error) {
        res.json({
            message: "Something went wrong",
            error: error.message
        });
    }
}

export { getUsers, getSpecifiedUser, deleteUser };
