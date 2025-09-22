import { Router } from "express";
import { generateBlogs, getBlogs, getBlogById, deleteBlog } from "../controller/blogController.js";
const router = Router();
router.post("/generate", generateBlogs);
router.get("/", getBlogs);
router.get("/:id", getBlogById);
router.delete("/:id", deleteBlog);
export default router;
