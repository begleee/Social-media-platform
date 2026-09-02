import 'dotenv/config';
import express from "express";
import { createUserRoute, getSpecifiedUser, getUsers } from './routes/userRoutes.js';
import { createPost } from './routes/postRoutes.js';

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.use("/", await createUserRoute);
app.use("/", await getUsers);
app.use("/", await getSpecifiedUser);
app.use("/", await createPost);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
});
