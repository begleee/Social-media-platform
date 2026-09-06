import "dotenv/config";
import express from "express";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import likeRoutes from "./routes/likeRoutes.js";
import commentRoutes from "./routes/commentRoutes.js"

const app = express();
app.use(express.json());

app.use("/", userRoutes);
app.use("/", postRoutes);
app.use("/", authRoutes);
app.use("/", likeRoutes);
app.use("/", commentRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
});
