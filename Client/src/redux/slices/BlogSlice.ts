// redux/slices/blogSlice.ts
/* eslint-disable @typescript-eslint/no-explicit-any */

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Blog, generateBlog, getBlogs, getBlogById, deleteBlog  } from "../Service/BlogService";

interface BlogState {
  blogs: Blog[];
  currentBlog: Blog | null;
  loading: boolean;
  error: string | null;
}

const initialState: BlogState = {
  blogs: [],
  currentBlog: null,
  loading: false,
  error: null,
};

// Fetch all blogs
export const fetchBlogs = createAsyncThunk("blogs/fetchAll", async (_, { rejectWithValue }) => {
  try {
    return await getBlogs();
  } catch (err: any) {
    return rejectWithValue(err.message || "Failed to fetch blogs");
  }
});

// Fetch single blog
export const fetchBlogById = createAsyncThunk("blogs/fetchById", async (id: number, { rejectWithValue }) => {
  try {
    const blog = await getBlogById(id);
    if (!blog) throw new Error("Blog not found");
    return blog;
  } catch (err: any) {
    return rejectWithValue(err.message || "Failed to fetch blog");
  }
});

// Create blog
export const createBlog = createAsyncThunk("blogs/create", async (tags: string[], { rejectWithValue }) => {
  try {
    return await generateBlog(tags);
  } catch (err: any) {
    return rejectWithValue(err.message || "Failed to generate blog");
  }
});

// Delete blog
export const removeBlog = createAsyncThunk("blogs/delete", async (id: number, { rejectWithValue }) => {
  try {
    return await deleteBlog(id);
  } catch (err: any) {
    return rejectWithValue(err.message || "Failed to delete blog");
  }
});

const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch all
    builder.addCase(fetchBlogs.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchBlogs.fulfilled, (state, action: PayloadAction<Blog[]>) => {
      state.loading = false;
      state.blogs = action.payload;
    });
    builder.addCase(fetchBlogs.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Fetch one
    builder.addCase(fetchBlogById.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchBlogById.fulfilled, (state, action: PayloadAction<Blog>) => {
      state.loading = false;
      state.currentBlog = action.payload;
    });
    builder.addCase(fetchBlogById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Create blog
    builder.addCase(createBlog.fulfilled, (state, action: PayloadAction<Blog>) => {
      state.blogs.unshift(action.payload); // add to beginning
    });

    // Delete blog
    builder.addCase(removeBlog.fulfilled, (state, action: PayloadAction<number>) => {
      state.blogs = state.blogs.filter((b) => b.id !== action.payload);
    });
  },
});

export default blogSlice.reducer;
