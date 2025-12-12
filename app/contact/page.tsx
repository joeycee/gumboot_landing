// app/contact/page.tsx
"use client";

import { useState, useRef, useEffect } from "react";
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

export default function ContactPage() {
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
    // Cleanup on unmount
    return () => {
      if (widgetIdRef.current !== null && window.grecaptcha) {
        window.grecaptcha.reset(widgetIdRef.current);
      }
    };
  }, []);

  const onRecaptchaLoad = () => {
    console.log("📜 reCAPTCHA script loaded");
    console.log("🔑 Site key exists:", !!RECAPTCHA_SITE_KEY);
    console.log("🌐 grecaptcha available:", !!window.grecaptcha);
    console.log("📍 Ref exists:", !!recaptchaRef.current);
    
    if (!window.grecaptcha || !recaptchaRef.current || !RECAPTCHA_SITE_KEY) {
      console.error("❌ Missing reCAPTCHA requirements");
      return;
    }

    window.grecaptcha.ready(() => {
      console.log("✅ reCAPTCHA ready callback fired");
      if (!window.grecaptcha || !recaptchaRef.current) return;

      try {
        widgetIdRef.current = window.grecaptcha.render(recaptchaRef.current, {
          sitekey: RECAPTCHA_SITE_KEY,
          callback: handleRecaptchaCallback,
          size: "invisible",
        });
        console.log("✅ reCAPTCHA widget rendered, ID:", widgetIdRef.current);
        setRecaptchaReady(true);
      } catch (err) {
        console.error("❌ reCAPTCHA render error:", err);
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
      console.log("Submitting to API...");
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, recaptchaToken: token }),
      });

      console.log("Response status:", res.status);
      console.log("Response ok:", res.ok);

      let data;
      try {
        data = await res.json();
        console.log("Response data:", data);
      } catch (parseErr) {
        console.error("Failed to parse JSON:", parseErr);
        data = {};
      }

      // Check if response is successful
      if (res.ok && data.success) {
        console.log("Form submitted successfully!");
        setSent(true);
        setError("");
        // Reset form
        const form = document.querySelector("form") as HTMLFormElement;
        if (form) form.reset();
      } else {
        console.error("Contact API error:", data);
        setError(data.error || data.message || "Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Unexpected error. Please try again.");
    } finally {
      setLoading(false);
      formDataRef.current = null;
      // Reset reCAPTCHA for next submission
      if (widgetIdRef.current !== null && window.grecaptcha) {
        window.grecaptcha.reset(widgetIdRef.current);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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

    // Validation
    if (!name || !email || !message) {
      setError("Please fill out all fields.");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    // Store form data for callback
    formDataRef.current = { name, email, message };

    // Execute reCAPTCHA
    try {
      console.log("🎯 Attempting to execute reCAPTCHA...");
      console.log("Widget ID:", widgetIdRef.current);
      console.log("grecaptcha exists:", !!window.grecaptcha);
      
      if (!window.grecaptcha || widgetIdRef.current === null) {
        setError("reCAPTCHA is not ready. Please try again.");
        setLoading(false);
        return;
      }
      
      console.log("🚀 Executing reCAPTCHA widget...");
      window.grecaptcha.execute(widgetIdRef.current);
      console.log("✅ Execute called successfully");
    } catch (err) {
      console.error("❌ reCAPTCHA execution error:", err);
      setError("reCAPTCHA error. Please refresh and try again.");
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Load reCAPTCHA v2 script */}
      {RECAPTCHA_SITE_KEY && (
        <Script
          src="https://www.google.com/recaptcha/api.js"
          strategy="afterInteractive"
          onLoad={onRecaptchaLoad}
        />
      )}

      <div className="max-w-xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold mb-3">Contact us</h1>
        <p className="text-sm text-slate-600 mb-8">
          Questions, feedback or ideas? Flick us a message and we&apos;ll come
          back to you.
        </p>

        {sent && (
          <div
            className="mb-4 p-4 bg-emerald-50 border border-emerald-200 rounded-lg"
            role="alert"
          >
            <p className="text-sm font-semibold text-emerald-700">
              ✓ Message sent! We&apos;ll get back to you shortly.
            </p>
          </div>
        )}

        {error && (
          <div
            className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg"
            role="alert"
          >
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
              className="w-full border border-slate-300 rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent"
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
              className="w-full border border-slate-300 rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent"
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
              placeholder="Your message"
              rows={5}
              className="w-full border border-slate-300 rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent resize-y"
            />
          </div>

          {/* Invisible reCAPTCHA container */}
          <div ref={recaptchaRef}></div>

          <button
            type="submit"
            disabled={loading || !recaptchaReady}
            className="w-full bg-slate-900 text-white py-3 rounded-xl font-semibold hover:bg-slate-800 transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Sending..." : "Send message"}
          </button>

          <p className="mt-2 text-[11px] text-slate-400 text-center">
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
    </main>
  );
}