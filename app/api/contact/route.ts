import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, message, recaptchaToken } = body || {};

    if (!name || !email || !message || !recaptchaToken) {
      console.error("❌ Missing fields in request body", body);
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    // --- 1) Verify reCAPTCHA ---
    const secret = process.env.RECAPTCHA_SECRET_KEY;
    if (!secret) {
      console.error("❌ RECAPTCHA_SECRET_KEY not set");
      return NextResponse.json(
        { error: "Server misconfiguration (captcha)." },
        { status: 500 }
      );
    }

    const params = new URLSearchParams();
    params.append("secret", secret);
    params.append("response", recaptchaToken);

    const verifyRes = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params,
      }
    );

    const verifyJson = await verifyRes.json();
    console.log("🛡 reCAPTCHA verify result:", verifyJson);

    if (!verifyJson.success) {
      return NextResponse.json(
        { error: "Failed reCAPTCHA validation." },
        { status: 400 }
      );
    }

    // --- 2) Send email via SMTP2GO + nodemailer ---
    const host = process.env.EMAIL_HOST;
    const port = Number(process.env.EMAIL_PORT || "587");
    const user = process.env.EMAIL_HOST_USER;
    const pass = process.env.EMAIL_HOST_PASSWORD;
    const from = process.env.DEFAULT_FROM_EMAIL || "hello@gumboot.app";

    if (!host || !user || !pass) {
      console.error("❌ Email env missing:", {
        host,
        user,
        hasPass: !!pass,
      });
      return NextResponse.json(
        { error: "Server email configuration error." },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: false, // TLS via port 587
      auth: {
        user,
        pass,
      },
    });

    // Optional but handy for debugging
    try {
      await transporter.verify();
      console.log("✅ SMTP connection OK");
    } catch (smtpErr) {
      console.error("❌ SMTP verify failed:", smtpErr);
      return NextResponse.json(
        { error: "Could not connect to mail server." },
        { status: 500 }
      );
    }

    const info = await transporter.sendMail({
      from: `"Gumboot Website" <${from}>`,
      to: from, // send to your hello@gumboot.app
      replyTo: email,
      subject: `Gumboot contact from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
      html: `
        <p><strong>From:</strong> ${name} (${email})</p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    });

    console.log("📨 Email sent via SMTP2GO:", info);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("🔥 /api/contact unexpected error:", err);
    return NextResponse.json(
      { error: "Server error sending message." },
      { status: 500 }
    );
  }
}
