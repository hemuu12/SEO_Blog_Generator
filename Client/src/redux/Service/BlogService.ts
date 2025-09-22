import api from "../../utils/axios";

export interface Post {
  title: string;
  content: string;
}

export interface Blog {
  id: number;
  title: string;
  tags: string;
  createdAt: string;
  content: { title: string; content: string }[];
}

export async function generateBlog(tags: string[]): Promise<Blog> {
  try {
    const { data } = await api.post("/blogs/generate", { tags });
    return data;
  } catch (err) {
    throw new Error("Failed to generate blog");
  }
}

export async function getBlogs(): Promise<Blog[]> {
  try {
    const { data } = await api.get("/blogs", { headers: { "Cache-Control": "no-store" } });
    return data;
  } catch (err) {
    throw new Error("Failed to fetch blogs");
  }
}

export async function getBlogById(id: number): Promise<Blog | null> {
  try {
    const { data } = await api.get(`/blogs/${id}`, { headers: { "Cache-Control": "no-store" } });
    return data;
  } catch {
    return null;
  }
}

export async function deleteBlog(id: number): Promise<number> {
  try {
    await api.delete(`/blogs/${id}`);
    return id;
  } catch {
    throw new Error("Failed to delete blog");
  }
}
