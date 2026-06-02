// app/blog/[slug]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBlogPostBySlug } from "@/lib/blog";

type BlogPostPageProps = {
  params: { slug: string };
};

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  try {
    const post = await getBlogPostBySlug(params.slug);
    const title = post.title;
    const description = post.excerpt || `Read ${post.title} on the Gumboot blog.`;
    const image = post.image || "/og.png";

    return {
      title,
      description,
      alternates: {
        canonical: `/blog/${post.slug}`,
      },
      openGraph: {
        title,
        description,
        url: `https://gumboot.app/blog/${post.slug}`,
        type: "article",
        publishedTime: post.published_at || post.created_at,
        images: [image],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [image],
      },
    };
  } catch {
    return {
      title: "Blog Post",
      robots: {
        index: false,
        follow: false,
      },
    };
  }
}

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
  const articleStructuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: post.image ? [post.image] : ["https://gumboot.app/og.png"],
    datePublished: post.published_at || post.created_at,
    dateModified: post.published_at || post.created_at,
    author: {
      "@type": "Organization",
      name: "Gumboot",
    },
    publisher: {
      "@type": "Organization",
      name: "Gumboot",
      logo: {
        "@type": "ImageObject",
        url: "https://gumboot.app/logo/logo.png",
      },
    },
    mainEntityOfPage: `https://gumboot.app/blog/${post.slug}`,
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-slate-50 text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleStructuredData) }}
      />
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
