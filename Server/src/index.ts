import express from "express";
import cors from "cors";
import helmet from "helmet";
import blogRoutes from "./routes/blogRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";


dotenv.config();

const app = express();
const prisma = new PrismaClient();

app.use(helmet());
app.use(cors());
app.use(express.json());


app.get("/", (_req, res) => res.send("Social Blog Backend is running"));






app.use("/api/blogs", blogRoutes);
app.use("/api/auth", userRoutes);

const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});

