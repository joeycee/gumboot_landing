// app/blog/page.tsx
import Link from "next/link";
import { getBlogPosts } from "@/lib/blog"; // <-- Django API fetcher

export default async function BlogIndexPage() {
  const posts = await getBlogPosts(); // Fetch from DRF backend

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-slate-50 text-slate-900">
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <header className="mb-8">
            <p className="text-xs uppercase tracking-widest text-slate-500">
              Blog
            </p>
            <h1 className="mt-1 text-3xl sm:text-4xl font-bold tracking-tight">
              Gumboot updates &amp; guides
            </h1>
            <p className="mt-3 text-slate-600 max-w-2xl">
              Learn how Gumboot works, why we built it for Kiwis, and how to
              get the most out of the app as a poster or tasker.
            </p>
          </header>

          {/* Blog List */}
          <div className="mt-8 space-y-6">
            {posts.map((post) => {
              const formatted = post.published_at
                ? new Date(post.published_at).toLocaleDateString("en-NZ", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })
                : "Unpublished";

              return (
                <article
                  key={post.id}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition"
                >
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                    {formatted}
                  </p>

                  <h2 className="mt-2 text-xl font-semibold">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="hover:text-slate-900 hover:underline"
                    >
                      {post.title}
                    </Link>
                  </h2>

                  <p className="mt-2 text-sm text-slate-600">{post.excerpt}</p>

                  <div className="mt-3">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-sm font-medium text-slate-900 hover:underline"
                    >
                      Read more →
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
