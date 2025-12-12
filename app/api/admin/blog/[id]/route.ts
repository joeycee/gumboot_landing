// app/api/admin/blog/[id]/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Params = { params: { id: string } };

export async function PUT(req: Request, { params }: Params) {
  const id = Number(params.id);
  if (Number.isNaN(id)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  const data = await req.json();

  const post = await prisma.blogPost.update({
    where: { id },
    data: {
      slug: data.slug,
      title: data.title,
      excerpt: data.excerpt,
      body: data.body,
      image: data.image ?? null,
      publishedAt: data.publishedAt
        ? new Date(data.publishedAt)
        : new Date(),
    },
  });

  return NextResponse.json(post);
}

export async function DELETE(_req: Request, { params }: Params) {
  const id = Number(params.id);
  if (Number.isNaN(id)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  await prisma.blogPost.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
