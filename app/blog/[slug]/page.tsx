// app/blog/[slug]/page.tsx
import { notFound } from "next/navigation";
import { getBlogPostBySlug } from "@/lib/blog";

type BlogPostPageProps = {
  params: { slug: string };
};

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  let post;

  try {
    post = await getBlogPostBySlug(params.slug);
  } catch (error) {
    // If DRF returns 404 or anything blows up, show Next's 404 page
    return notFound();
  }

  if (!post) return notFound();

  const formatted = post.published_at
    ? new Date(post.published_at).toLocaleDateString("en-NZ", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "Unpublished";

  // Assuming body is plain text with blank lines between paragraphs
  const paragraphs = post.body ? post.body.split(/\n\s*\n/) : [];

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-slate-50 text-slate-900">
      <article className="py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            {formatted}
          </p>

          <h1 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight">
            {post.title}
          </h1>

          <p className="mt-3 text-sm text-slate-600 max-w-xl">
            {post.excerpt}
          </p>

          {post.image && (
            <div className="mt-6">
              <img
                src={post.image}
                alt={post.title}
                className="w-full rounded-2xl border border-slate-200 object-cover"
              />
            </div>
          )}

          <div className="mt-8 space-y-4 text-slate-700 leading-relaxed text-[0.95rem]">
            {paragraphs.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>
      </article>
    </main>
  );
}
