// app/api/admin/config/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { siteConfig } from "../../../config/siteConfig";

export async function GET() {
  try {
    // Try to load existing config from DB
    const existing = await prisma.siteConfig.findUnique({
      where: { id: 1 },
    });

    if (!existing) {
      // If none exists, seed DB with the static default
      const created = await prisma.siteConfig.create({
        data: {
          id: 1,
          config: siteConfig,
        },
      });
      return NextResponse.json(created.config);
    }

    return NextResponse.json(existing.config);
  } catch (err) {
    console.error("GET /api/admin/config error", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
