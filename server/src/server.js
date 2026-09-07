import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import { configCloudinary } from "./conifg/cloudinary.js";

import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import likeRoutes from "./routes/likeRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import followRoutes from "./routes/followRoutes.js";
import feedRoutes from "./routes/feedRoutes.js";
import uploadImageRoutes from "./routes/uploadImageRoutes.js";

const app = express();
app.use(express.json());
app.use(cookieParser());
configCloudinary();

app.use("/", userRoutes);
app.use("/", postRoutes);
app.use("/", authRoutes);
app.use("/", likeRoutes);
app.use("/", commentRoutes);
app.use("/", followRoutes);
app.use("/", feedRoutes);
app.use("/", uploadImageRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
});
