import type { MetadataRoute } from "next";
import { getBlogPosts } from "@/lib/blog";

const baseUrl = "https://gumboot.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = [
    "",
    "/about",
    "/onboarding",
    "/faq",
    "/blog",
    "/beta",
    "/contact",
    "/careers",
    "/privacy",
    "/terms",
    "/guide-lines",
  ];

  const now = new Date();
  let blogRoutes: MetadataRoute.Sitemap = [];

  try {
    const posts = await getBlogPosts();
    blogRoutes = posts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.published_at || post.created_at),
      changeFrequency: "monthly",
      priority: 0.8,
    }));
  } catch {
    blogRoutes = [];
  }

  return [
    ...routes.map((route) => {
      const changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] =
        route === "" || route === "/onboarding" ? "weekly" : "monthly";

      return {
        url: `${baseUrl}${route}`,
        lastModified: now,
        changeFrequency,
        priority: route === "" ? 1 : route === "/onboarding" ? 0.9 : 0.7,
      };
    }),
    ...blogRoutes,
  ];
}
