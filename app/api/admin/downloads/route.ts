// app/api/admin/downloads/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/db";

export async function GET() {
  const downloads = await prisma.appDownload.findMany({
    orderBy: { platform: "asc" },
  });
  return NextResponse.json(downloads);
}

// Upsert all in one go – for simple admin UI
export async function PUT(req: Request) {
  const body = await req.json();
  const items = Array.isArray(body) ? body : [];

  // super basic validation
  const clean = items
    .filter((d) => d.platform && d.url)
    .map((d) => ({
      platform: String(d.platform),
      label: String(d.label || ""),
      url: String(d.url),
      version: d.version ? String(d.version) : null,
    }));

  // easiest: wipe & reinsert (OK for small list)
  await prisma.appDownload.deleteMany();
  await prisma.appDownload.createMany({ data: clean });

  const latest = await prisma.appDownload.findMany({
    orderBy: { platform: "asc" },
  });

  return NextResponse.json(latest);
}
