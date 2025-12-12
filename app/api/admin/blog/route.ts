// app/api/admin/blog/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const posts = await prisma.blogPost.findMany({
    orderBy: { publishedAt: "desc" },
  });
  return NextResponse.json(posts);
}

export async function POST(req: Request) {
  const data = await req.json();

  // basic validation
  if (!data.slug || !data.title) {
    return NextResponse.json(
      { error: "slug and title are required" },
      { status: 400 }
    );
  }

  const post = await prisma.blogPost.create({
    data: {
      slug: data.slug,
      title: data.title,
      excerpt: data.excerpt ?? "",
      body: data.body ?? "",
      image: data.image ?? null,
      publishedAt: data.publishedAt
        ? new Date(data.publishedAt)
        : new Date(),
    },
  });

  return NextResponse.json(post, { status: 201 });
}
