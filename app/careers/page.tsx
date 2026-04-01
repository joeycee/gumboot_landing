"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "";

declare global {
  interface Window {
    grecaptcha?: {
      ready: (cb: () => void) => void;
      render: (
        container: string | HTMLElement,
        params: {
          sitekey: string;
          callback: (token: string) => void;
          size: string;
        }
      ) => number;
      execute: (widgetId?: number) => void;
      reset: (widgetId?: number) => void;
    };
  }
}

export default function CareersPage() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [recaptchaReady, setRecaptchaReady] = useState(false);
  const recaptchaRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<number | null>(null);
  const formDataRef = useRef<{
    name: string;
    email: string;
    message: string;
  } | null>(null);

  useEffect(() => {
    return () => {
      if (widgetIdRef.current !== null && window.grecaptcha) {
        window.grecaptcha.reset(widgetIdRef.current);
      }
    };
  }, []);

  const onRecaptchaLoad = () => {
    if (!window.grecaptcha || !recaptchaRef.current || !RECAPTCHA_SITE_KEY) {
      return;
    }

    window.grecaptcha.ready(() => {
      if (!window.grecaptcha || !recaptchaRef.current) return;

      try {
        widgetIdRef.current = window.grecaptcha.render(recaptchaRef.current, {
          sitekey: RECAPTCHA_SITE_KEY,
          callback: handleRecaptchaCallback,
          size: "invisible",
        });
        setRecaptchaReady(true);
      } catch {
        setError("Failed to initialize reCAPTCHA.");
      }
    });
  };

  const handleRecaptchaCallback = async (token: string) => {
    if (!formDataRef.current) {
      setLoading(false);
      return;
    }

    const { name, email, message } = formDataRef.current;

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          message: `[Careers enquiry]\n\n${message}`,
          recaptchaToken: token,
        }),
      });

      let data;
      try {
        data = await res.json();
      } catch {
        data = {};
      }

      if (res.ok && data.success) {
        setSent(true);
        setError("");
        const form = document.querySelector("form") as HTMLFormElement | null;
        if (form) form.reset();
      } else {
        setError(data.error || data.message || "Something went wrong. Please try again.");
      }
    } catch {
      setError("Unexpected error. Please try again.");
    } finally {
      setLoading(false);
      formDataRef.current = null;
      if (widgetIdRef.current !== null && window.grecaptcha) {
        window.grecaptcha.reset(widgetIdRef.current);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSent(false);

    if (!RECAPTCHA_SITE_KEY) {
      setError("reCAPTCHA is not configured.");
      return;
    }

    if (!recaptchaReady) {
      setError("Please wait for reCAPTCHA to load.");
      return;
    }

    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const message = String(formData.get("message") || "").trim();

    if (!name || !email || !message) {
      setError("Please fill out all fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    formDataRef.current = { name, email, message };

    try {
      if (!window.grecaptcha || widgetIdRef.current === null) {
        setError("reCAPTCHA is not ready. Please try again.");
        setLoading(false);
        return;
      }

      window.grecaptcha.execute(widgetIdRef.current);
    } catch {
      setError("reCAPTCHA error. Please refresh and try again.");
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      {RECAPTCHA_SITE_KEY && (
        <Script
          src="https://www.google.com/recaptcha/api.js"
          strategy="afterInteractive"
          onLoad={onRecaptchaLoad}
        />
      )}

      <section className="border-b border-slate-200 bg-[radial-gradient(circle_at_top_left,_rgba(15,23,42,0.05),_transparent_35%),linear-gradient(to_bottom,_white,_rgb(248_250_252))]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Careers</p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              Want to help bring Gumboot to market?
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              Fill out the form below and tell us a bit about yourself, what you do, and how you
              think you could help us build Gumboot.
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          {sent && (
            <div
              className="mb-4 rounded-lg border border-emerald-200 bg-emerald-50 p-4"
              role="alert"
            >
              <p className="text-sm font-semibold text-emerald-700">
                ✓ Thanks for reaching out. We&apos;ll be in touch soon.
              </p>
            </div>
          )}

          {error && (
            <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-4" role="alert">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="sr-only">
                Your name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Your name"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-transparent focus:ring-2 focus:ring-slate-400"
              />
            </div>

            <div>
              <label htmlFor="email" className="sr-only">
                Your email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="Your email address"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-transparent focus:ring-2 focus:ring-slate-400"
              />
            </div>

            <div>
              <label htmlFor="message" className="sr-only">
                Your message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={6}
                placeholder="Tell us how you'd like to help bring Gumboot to market"
                className="w-full resize-y rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-transparent focus:ring-2 focus:ring-slate-400"
              />
            </div>

            <div ref={recaptchaRef} />

            <button
              type="submit"
              disabled={loading || !recaptchaReady}
              className="w-full rounded-xl bg-slate-900 py-3 font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Sending..." : "Send application"}
            </button>

            <p className="mt-2 text-center text-[11px] text-slate-400">
              Protected by reCAPTCHA. Google&apos;s{" "}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-slate-600"
              >
                Privacy Policy
              </a>{" "}
              and{" "}
              <a
                href="https://policies.google.com/terms"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-slate-600"
              >
                Terms of Service
              </a>{" "}
              apply.
            </p>
          </form>
        </div>
      </section>
    </main>
  );
}
