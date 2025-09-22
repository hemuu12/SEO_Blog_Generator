
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { fetchFromDev, fetchFromReddit, fetchFromTwitter, SocialPost } from "../services/socialFetchService.js";
import { makeTitleFromTags, summarizeText } from "../services/titleService.js";


const prisma = new PrismaClient();


export const generateBlogs = async (req: Request, res: Response) => {
  try {
    const { tags } = req.body;

    if (!tags || !Array.isArray(tags) || tags.length === 0) {
      return res.status(400).json({ message: "tags must be a non-empty array" });
    }

    // fetch from Twitter + Reddit + Dev.to
    // const twitterPosts = await fetchFromTwitter(tags, 2); 

    const redditPosts = await fetchFromReddit(tags, { maxPosts: 7 });
    const devPosts = await fetchFromDev(tags, { maxPosts: 7 });

    // console.log("Reddit :" , redditPosts ,"Post Fetched")
    // console.log("dev :" , devPosts ,"Post Fetched")
    

    const allPosts: SocialPost[] = [...redditPosts, ...devPosts];

    if (allPosts.length === 0) {
      return res.status(404).json({ message: "No posts found for given tags" });
    }

    // combine for summary
      const allTextCombined = allPosts.map(p => `${p.title} ${p.content}`).join("\n\n");
      const summary = summarizeText(allTextCombined, 50);

    // generate blog title
    const title = makeTitleFromTags(tags);

    // format content as array of posts
    const formattedContent = allPosts.map(p => ({
      title: p.title,
      content: p.content,
    }));

    // save in DB (content stored as JSON array)
    const saved = await prisma.blog.create({
      data: {
        title,
        content: formattedContent as any, // Prisma JSON field
        tags: tags.join(","),
      },
    });

    return res.status(201).json({
      id: saved.id,
      title: saved.title,
      summary,
      content: saved.content,
      tags: saved.tags,
      createdAt: saved.createdAt,
    });

  } catch (err) {
    console.error("Error generating blog:", err);
    return res.status(500).json({
      message: "Server error",
      error: (err as Error).message,
    });
  }
};

export const getBlogs = async (_req: Request, res: Response) => {
  try {
    const blogs = await prisma.blog.findMany({ orderBy: { createdAt: "desc" } });
    return res.json(blogs);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error", error: (err as Error).message });
  }
};

export const getBlogById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const blog = await prisma.blog.findUnique({ where: { id } });
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    return res.json(blog);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error", error: (err as Error).message });
  }
};

export const deleteBlog = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    await prisma.blog.delete({ where: { id } });
    return res.status(204).send(null);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error", error: (err as Error).message });
  }
};
