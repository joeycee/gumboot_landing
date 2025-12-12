// lib/blog.ts
import { apiFetch } from "./api";
import type { BlogPost } from "@/types/api";

// GET /api/blog/posts/
export async function getBlogPosts(): Promise<BlogPost[]> {
  return apiFetch<BlogPost[]>("/api/blog/posts/");
}

// GET /api/blog/posts/<slug>/
export async function getBlogPostBySlug(slug: string): Promise<BlogPost> {
  return apiFetch<BlogPost>(`/api/blog/posts/${slug}/`);
}
