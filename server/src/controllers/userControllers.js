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
    const userId = req.params.id;
    try {
        
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
};

const updateUser = async (req, res) => {
    const userId = req.params.id;
    const userRole = req.user.role;

    const { name } = req.body;
    try {
        const user = await prisma.user.findUnique({
            where: {id: userId }
        });

        if(!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isAdmin = userRole === "ADMIN";
        const isAuthor = req.user.id === userId;

        if(!isAdmin && !isAuthor) {
            return res.status(403).json({ message: "Access denied. You are not authorized to update profile." });
        }

        await prisma.user.update({
            where: { id: userId },
            data: {
                name
            }
        });

        return res.status(200).json({ 
            message: 'User successfully updated',
            changed: {
                name
            }
        });

    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const deleteUser = async (req, res) => {
    const userId = req.params.id;
    try {

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
};

export { getUsers, getSpecifiedUser, updateUser, deleteUser };
