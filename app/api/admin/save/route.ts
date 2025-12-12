// app/api/admin/save/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";


export async function POST(req: Request) {
  try {
    const body = await req.json();

    // (Optional) You can validate shape here if you like

    await prisma.siteConfig.upsert({
      where: { id: 1 },
      create: {
        id: 1,
        config: body,
      },
      update: {
        config: body,
      },
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("POST /api/admin/save error", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
