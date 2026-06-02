import HomePageClient from "./components/HomePageClient";
import { getLatestAppRelease } from "@/lib/appRelease";
import { getBlogPosts } from "@/lib/blog";
import type { AppRelease, BlogPost } from "@/types/api";

async function getHomepageData(): Promise<{
  release: AppRelease | null;
  blogPosts: BlogPost[];
}> {
  const [releaseResult, postsResult] = await Promise.allSettled([
    getLatestAppRelease(),
    getBlogPosts(),
  ]);

  return {
    release: releaseResult.status === "fulfilled" ? releaseResult.value : null,
    blogPosts: postsResult.status === "fulfilled" ? postsResult.value : [],
  };
}

export default async function Page() {
  const { release, blogPosts } = await getHomepageData();

  return <HomePageClient release={release} blogPosts={blogPosts} />;
}
