"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Services from "./components/Services";
import { siteConfig } from "./config/siteConfig";
import { apiFetch } from "@/lib/api";

type DeviceType = "android" | "ios" | "other";

type AppRelease = {
  id: number;
  name: string;
  version: string;
  android_build: string | null;
  ios_testflight_url: string | null;
  is_active: boolean;
  notes: string | null;
  created_at: string;
};

type BlogPost = {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  image: string | null;
  published_at: string;
};

const container = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut", staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 12, filter: "blur(3px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

function detectDeviceType(): DeviceType {
  if (typeof window === "undefined") return "other";

  const ua = window.navigator.userAgent || "";
  const platform = window.navigator.platform || "";

  if (/Android/i.test(ua)) return "android";
  if (
    /iPhone|iPad|iPod/i.test(ua) ||
    (/MacIntel/.test(platform) &&
      (window.navigator as any).maxTouchPoints > 1)
  ) {
    return "ios";
  }
  return "other";
}

function FeatureStrip() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* PHONE - Mobile centered, Desktop left */}
          <div className="order-2 lg:order-1 lg:justify-self-start">
            <div className="relative overflow-hidden max-w-[280px] sm:max-w-sm mx-auto lg:mx-0">
              <img
                src="/phone/phone.png"
                alt="Gumboot app preview"
                className="w-full h-auto object-contain"
                loading="lazy"
              />
              <div className="pointer-events-none absolute inset-x-6 bottom-2 h-3 rounded-full blur-md opacity-40 bg-slate-900/30" />
            </div>
          </div>

          {/* TEXT - Mobile first, Desktop right */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            variants={container}
            className="order-1 lg:order-2 space-y-5 sm:space-y-6 text-slate-700"
          >
            <motion.div variants={item}>
              <h2 className="text-2xl sm:text-3xl lg:text-3xl font-bold text-slate-900">
                Why Gumboot?
              </h2>
              <p className="mt-2 text-base sm:text-lg text-slate-600">
                A faster, simpler way to get jobs done locally.
              </p>
            </motion.div>

            <ul className="space-y-3 sm:space-y-4 text-sm sm:text-base leading-relaxed">
              <motion.li variants={item} className="flex items-start gap-3">
                <span className="flex-shrink-0 text-lg sm:text-xl">✅</span>
                <div>
                  <span className="block text-slate-900 font-semibold">
                    Stripe-secured payments
                  </span>
                  <p className="text-slate-600 mt-0.5">
                    Safe and instant transactions.
                  </p>
                </div>
              </motion.li>
              <motion.li variants={item} className="flex items-start gap-3">
                <span className="flex-shrink-0 text-lg sm:text-xl">✅</span>
                <div>
                  <span className="block text-slate-900 font-semibold">
                    Verified profiles
                  </span>
                  <p className="text-slate-600 mt-0.5">
                    Every user verified for trust and safety.
                  </p>
                </div>
              </motion.li>
              <motion.li variants={item} className="flex items-start gap-3">
                <span className="flex-shrink-0 text-lg sm:text-xl">✅</span>
                <div>
                  <span className="block text-slate-900 font-semibold">
                    Ratings & reviews
                  </span>
                  <p className="text-slate-600 mt-0.5">
                    Choose helpers with great feedback.
                  </p>
                </div>
              </motion.li>
              <motion.li variants={item} className="flex items-start gap-3">
                <span className="flex-shrink-0 text-lg sm:text-xl">✅</span>
                <div>
                  <span className="block text-slate-900 font-semibold">
                    NZ-based support
                  </span>
                  <p className="text-slate-600 mt-0.5">
                    Real people ready to help you locally.
                  </p>
                </div>
              </motion.li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default function Page() {
  const [deviceType, setDeviceType] = useState<DeviceType>("other");
  const [release, setRelease] = useState<AppRelease | null>(null);
  const [loadingRelease, setLoadingRelease] = useState(true);

  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(true);

  const [waitlistEmail, setWaitlistEmail] = useState("");
  const [waitlistLoading, setWaitlistLoading] = useState(false);
  const [waitlistMessage, setWaitlistMessage] = useState<string | null>(null);
  const [waitlistError, setWaitlistError] = useState<string | null>(null);

  useEffect(() => {
    setDeviceType(detectDeviceType());

    const fetchRelease = async () => {
      try {
        const data = await apiFetch<AppRelease>("/api/app/latest/");
        setRelease(data);
      } catch (err) {
        console.error("Failed to fetch latest app release", err);
      } finally {
        setLoadingRelease(false);
      }
    };

    const fetchPosts = async () => {
      try {
        const data = await apiFetch<BlogPost[]>("/api/blog/posts/");
        setBlogPosts(data);
      } catch (err) {
        console.error("Failed to fetch blog posts", err);
      } finally {
        setLoadingPosts(false);
      }
    };

    fetchRelease();
    fetchPosts();
  }, []);

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setWaitlistMessage(null);
    setWaitlistError(null);

    if (!waitlistEmail) return;

    try {
      setWaitlistLoading(true);
      await apiFetch("/api/waitlist/", {
        method: "POST",
        body: JSON.stringify({
          email: waitlistEmail,
          source: "home_waitlist",
        }),
      });
      setWaitlistMessage("You're on the list! 🎉");
      setWaitlistEmail("");
    } catch (err) {
      console.error("Waitlist signup failed", err);
      setWaitlistError("Something went wrong. Please try again.");
    } finally {
      setWaitlistLoading(false);
    }
  };

  const renderDownloadButtons = () => {
    // smaller buttons on mobile: smaller padding + text-xs base
    const baseBtnClasses =
      "rounded-xl px-4 py-2.5 sm:px-6 sm:py-3.5 text-xs sm:text-sm font-medium shadow-lg transition-all text-center";

    if (loadingRelease) {
      return (
        <button
          className={`${baseBtnClasses} bg-white/90 text-slate-900 ring-1 ring-slate-200`}
          type="button"
        >
          Checking latest version…
        </button>
      );
    }

    if (!release) {
      return (
        <Link
          href="/beta"
          className={`${baseBtnClasses} bg-white text-slate-900 ring-1 ring-slate-200 hover:bg-slate-50`}
        >
          Join the Gumboot beta
        </Link>
      );
    }

    const hasAndroid = !!release.android_build;
    const hasIos = !!release.ios_testflight_url;

    // Android device
    if (deviceType === "android" && hasAndroid) {
      return (
        <>
          <a
            className={`${baseBtnClasses} bg-white text-slate-900 ring-1 ring-slate-200 hover:bg-slate-50`}
            href={release.android_build!}
          >
            Download Android beta
          </a>
          {hasIos && (
            <Link
              href="/beta"
              className={`${baseBtnClasses} bg-slate-900/90 text-white hover:bg-slate-900`}
            >
              Learn about iOS TestFlight
            </Link>
          )}
        </>
      );
    }

    // iOS device
    if (deviceType === "ios" && hasIos) {
      return (
        <>
          <a
            className={`${baseBtnClasses} bg-white text-slate-900 ring-1 ring-slate-200 hover:bg-slate-50`}
            href={release.ios_testflight_url!}
          >
            Join iOS TestFlight
          </a>
          {hasAndroid && (
            <Link
              href="/beta"
              className={`${baseBtnClasses} bg-slate-900/90 text-white hover:bg-slate-900`}
            >
              Download Android from beta page
            </Link>
          )}
        </>
      );
    }

    // Other / desktop
    if (hasAndroid || hasIos) {
      return (
        <>
          {hasIos && (
            <a
              className={`${baseBtnClasses} bg-white text-slate-900 ring-1 ring-slate-200 hover:bg-slate-50`}
              href={release.ios_testflight_url!}
            >
              {siteConfig.hero.appStoreLabel || "iOS TestFlight"}
            </a>
          )}
          {hasAndroid && (
            <a
              className={`${baseBtnClasses} bg-slate-900/90 text-white hover:bg-slate-900`}
              href={release.android_build!}
            >
              {siteConfig.hero.playStoreLabel || "Android beta APK"}
            </a>
          )}
        </>
      );
    }

    // Fallback
    return (
      <Link
        href="/beta"
        className={`${baseBtnClasses} bg-white text-slate-900 ring-1 ring-slate-200 hover:bg-slate-50`}
      >
        Join the Gumboot beta
      </Link>
    );
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-slate-50 text-slate-900">
      {/* HERO */}
      <section
        className="
          relative overflow-hidden bg-no-repeat
          bg-contain sm:bg-cover
          bg-top sm:bg-center
          min-h-[480px] sm:min-h-[560px] lg:min-h-[640px]
        "
        style={{ backgroundImage: "url('/hero/hero.png')" }}
      >
        {/* darker gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/35 to-black/15" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32 grid lg:grid-cols-2 gap-8 lg:gap-10 items-center">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.35 }}
            variants={container}
            className="max-w-2xl mx-auto lg:mx-0 text-center lg:text-left"
          >
            <motion.h1
              variants={item}
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-white leading-tight"
            >
              {siteConfig.hero.title}{" "}
              <span className="text-gray-200">{siteConfig.hero.highlight}</span>
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-4 sm:mt-6 text-base sm:text-lg lg:text-xl text-gray-100 leading-relaxed"
            >
              {siteConfig.hero.subtitle}
            </motion.p>

            <motion.div
              variants={item}
              className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start"
              id="download"
            >
              {renderDownloadButtons()}
            </motion.div>

            <motion.p
              className="mt-3 sm:mt-4 text-xs sm:text-sm text-gray-200"
              variants={item}
            >
              {siteConfig.hero.tagline}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* FEATURE STRIP WITH IMAGE */}
      <FeatureStrip />

      {/* SERVICES */}
      <Services />

      {/* FEATURES GRID */}
      <section
        id="features"
        className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-white to-slate-50"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center lg:text-left max-w-3xl mx-auto lg:mx-0">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
              Everything you need to get it done
            </h2>
            <p className="mt-2 sm:mt-3 text-base sm:text-lg text-slate-600">
              Simple tools for posters and taskers.
            </p>
          </div>
          <div className="mt-8 sm:mt-12 grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {siteConfig.features.map((f, i) => (
              <div
                key={i}
                className="rounded-xl sm:rounded-2xl bg-white p-5 sm:p-6 shadow-sm ring-1 ring-slate-200 hover:shadow-md transition-shadow"
              >
                <h3 className="font-semibold text-base sm:text-lg text-slate-900">
                  {f.title}
                </h3>
                <p className="mt-2 text-slate-600 text-sm sm:text-base leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BLOG PREVIEW */}
      <section
        id="blog"
        className="py-12 sm:py-16 lg:py-20 bg-white border-y border-slate-200"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 sm:gap-6">
            <div className="text-center sm:text-left">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500 font-medium">
                From the blog
              </p>
              <h2 className="mt-1 sm:mt-2 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
                Learn more about Gumboot
              </h2>
              <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-xl mx-auto sm:mx-0">
                Tips, updates and behind-the-scenes on how we're building Gumboot
                for Kiwis.
              </p>
            </div>
            <div className="flex justify-center sm:justify-end">
              <Link
                href="/blog"
                className="inline-flex items-center text-sm sm:text-base font-medium text-slate-900 hover:underline transition-all"
              >
                View all posts →
              </Link>
            </div>
          </div>

          {/* Loading / empty states */}
          {loadingPosts ? (
            <div className="mt-8 sm:mt-10 grid gap-5 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-xl sm:rounded-2xl border border-slate-200 bg-slate-50/80 p-5 animate-pulse"
                >
                  <div className="h-32 w-full bg-slate-200 rounded mb-4" />
                  <div className="h-3 w-24 bg-slate-200 rounded mb-3" />
                  <div className="h-4 w-3/4 bg-slate-200 rounded mb-2" />
                  <div className="h-3 w-full bg-slate-200 rounded mb-1" />
                  <div className="h-3 w-5/6 bg-slate-200 rounded" />
                </div>
              ))}
            </div>
          ) : blogPosts.length === 0 ? (
            <p className="mt-8 text-sm text-slate-500 text-center">
              No blog posts yet. Check back soon.
            </p>
          ) : (
            <div className="mt-8 sm:mt-10 grid gap-5 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {blogPosts.slice(0, 3).map((post) => {
                const date = new Date(post.published_at);
                const formatted = date.toLocaleDateString("en-NZ", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                });

                return (
                  <article
                    key={post.slug}
                    className="group rounded-xl sm:rounded-2xl border border-slate-200 bg-slate-50/80 hover:bg-white shadow-sm hover:shadow-lg transition-all overflow-hidden flex flex-col"
                  >
                    {post.image && (
                      <div className="w-full bg-slate-100">
                        {/* fixed aspect ratio + object-contain so full image is visible */}
                        <div className="relative aspect-[16/9] w-full">
                          <img
                            src={post.image}
                            alt={post.title}
                            className="absolute inset-0 h-full w-full object-contain"
                            loading="lazy"
                          />
                        </div>
                      </div>
                    )}

                    <div className="flex-1 p-5">
                      <p className="text-[11px] font-medium uppercase tracking-wide text-slate-500">
                        {formatted}
                      </p>
                      <h3 className="mt-2 text-base sm:text-lg font-semibold text-slate-900 leading-snug">
                        <Link
                          href={`/blog/${post.slug}`}
                          className="hover:underline"
                        >
                          {post.title}
                        </Link>
                      </h3>
                      <p className="mt-2 text-sm text-slate-600 line-clamp-3 leading-relaxed">
                        {post.excerpt}
                      </p>
                    </div>

                    <div className="px-5 pb-5">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center text-xs sm:text-sm font-medium text-slate-900 hover:underline transition-all"
                      >
                        Read more →
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* WAITLIST */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
            Ready to get it done?
          </h2>
          <p className="mt-2 sm:mt-3 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
            Join the waitlist and we'll ping you when Gumboot launches in your
            area.
          </p>
          <form
            onSubmit={handleWaitlistSubmit}
            className="mt-6 sm:mt-8 mx-auto max-w-md grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-3"
          >
            <input
              type="email"
              required
              placeholder="you@example.com"
              value={waitlistEmail}
              onChange={(e) => setWaitlistEmail(e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm sm:text-base outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent transition-all"
            />
            <button
              type="submit"
              disabled={waitlistLoading}
              className="rounded-xl px-5 py-3 sm:px-6 bg-slate-900 text-white font-medium hover:bg-slate-800 disabled:opacity-60 disabled:cursor-not-allowed transition-all shadow-lg text-sm sm:text-base"
            >
              {waitlistLoading ? "Adding..." : "Notify me"}
            </button>
          </form>

          {waitlistMessage && (
            <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-emerald-600">
              {waitlistMessage}
            </p>
          )}

          {waitlistError && (
            <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-red-600">
              {waitlistError}
            </p>
          )}

          <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-slate-500">
            By subscribing, you agree to our{" "}
            <a
              className="underline hover:text-slate-700 transition-colors"
              href="/privacy"
            >
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </section>
    </main>
  );
}
