import { NextResponse } from "next/server";
export async function POST(req: Request) {
  const { email } = await req.json();
  if (!email) return NextResponse.json({ ok: false }, { status: 400 });
  // TODO: Integrate with your email provider or database.
  return NextResponse.json({ ok: true });
}
