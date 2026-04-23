"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { motion, type Easing } from "framer-motion";
import { FaApple, FaAndroid } from "react-icons/fa";
import Services from "./components/Services";
import { siteConfig } from "./config/siteConfig";
import { apiFetch } from "@/lib/api";
import type { AppRelease } from "@/types/api";

type BlogPost = {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  image: string | null;
  published_at: string;
};

const heroStats = [
  { value: "2-sided", label: "For posters and taskers" },
  { value: "1 flow", label: "Post, chat, hire, pay" },
  { value: "NZ-first", label: "For local jobs" },
];

const trustPoints = [
  "Verified profiles and reviews help you choose with confidence.",
  "A valid card is required to post, with payments handled through Stripe.",
  "Messages, job details, and payments stay in one place.",
];

const howItWorks = [
  {
    step: "01",
    title: "Post",
    body: "Tell Gumboot what you need.",
  },
  {
    step: "02",
    title: "Choose",
    body: "Pick the best local offer.",
  },
  {
    step: "03",
    title: "Chat",
    body: "Confirm the details.",
  },
  {
    step: "04",
    title: "Done",
    body: "Pay securely after the work.",
  },
];

const gumbooters = [
  {
    name: "Jason R.",
    role: "Cleaner",
    image: "/people/jason.png",
    review: "Jason left the place absolutely spotless and went above and beyond expectations.",
  },
  {
    name: "Chloe S.",
    role: "Gardener",
    image: "/people/chloe.png",
    review: "Chloe is reliable, detail-focused, and always leaves the Garden looking amazing.",
  },
  {
    name: "Sarah T.",
    role: "Dog Walker",
    image: "/people/sarah.png",
    review: "Sarah is fantastic with dogs—friendly, punctual, and always ensures a safe, happy walk.",
  },
];

const MOBILE_POPUP_STORAGE_KEY = "gumboot-mobile-popup-dismissed";

const customEase: Easing = [0.16, 1, 0.3, 1];
const standardEaseOut: Easing = [0, 0, 0.2, 1];

const container = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: customEase,
      staggerChildren: 0.12,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 12, filter: "blur(3px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.45, ease: standardEaseOut },
  },
};

function CtaButton({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
}) {
  const className =
    variant === "primary"
      ? "inline-flex items-center justify-center rounded-2xl bg-[#26A69A] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-900/20 transition hover:-translate-y-0.5 hover:bg-[#1f9388]"
      : "inline-flex items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/15";

  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
}

function SectionIntro({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body: string;
}) {
  return (
    <div className="max-w-3xl">
      <p className="text-xs font-semibold uppercase tracking-[0.32em] text-slate-500">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        {title}
      </h2>
      <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
        {body}
      </p>
    </div>
  );
}

function DownloadButtons({
  release,
  tone = "light",
}: {
  release: AppRelease | null;
  tone?: "light" | "dark";
}) {
  const iosHref = release?.ios_testflight_url || "/beta";
  const androidHref = release?.android_build || "/beta";
  const isDark = tone === "dark";

  const shared =
    "inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold transition";
  const secondary = isDark
    ? "border border-white/15 bg-white/5 text-white hover:bg-white/10"
    : "border border-slate-300 bg-white text-slate-900 hover:bg-slate-50";
  const primary = isDark
    ? "bg-white text-slate-900 hover:bg-slate-100"
    : "bg-slate-900 text-white hover:bg-slate-800";

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
      <a href={iosHref} className={`${shared} ${secondary}`}>
        <FaApple className="text-base" />
        Download for iPhone
      </a>
      <a href={androidHref} className={`${shared} ${primary}`}>
        <FaAndroid className="text-base" />
        Download for Android
      </a>
    </div>
  );
}

function FeatureStrip() {
  return (
    <section className="border-t border-slate-200 bg-white py-14 sm:py-16 lg:py-20">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
        <div className="relative overflow-hidden rounded-[2rem] bg-[#2B3439] p-8 text-white shadow-2xl shadow-slate-900/10 sm:p-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(38,166,154,0.26),_transparent_40%)]" />
          <div className="relative">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-white/55">
              Why Gumboot
            </p>
            <h3 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Local jobs without the usual friction.
            </h3>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {heroStats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4"
                >
                  <p className="text-xl font-semibold text-white">{stat.value}</p>
                  <p className="mt-2 text-sm leading-6 text-white/70">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-slate-500">
              Trust Built In
            </p>
            <h3 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Hire faster. Work with confidence.
            </h3>
            <div className="mt-6 space-y-4">
              {trustPoints.map((point) => (
                <div
                  key={point}
                  className="flex gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4"
                >
                  <span className="mt-1 text-base text-[#26A69A]">●</span>
                  <p className="text-sm leading-6 text-slate-600 sm:text-base">{point}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={siteConfig.appUrl}
                className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Open Gumboot
              </a>
              <Link
                href="/beta"
                className="inline-flex items-center justify-center rounded-2xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
              >
                Download the app
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function GumbootersSection() {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <SectionIntro
            eyebrow="Gumbooters"
            title="Meet the local helpers people come back to."
            body="Reliable locals for cleaning, gardening, dog walking, and more."
          />
          <p className="hidden max-w-xs text-sm leading-6 text-slate-500 sm:block">
            Real skills. Clear reviews. Easier choices.
          </p>
        </div>

        <div className="-mx-4 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 sm:pb-0">
          {gumbooters.map((person) => (
            <article
              key={person.name}
              className="min-w-[82%] snap-center overflow-hidden rounded-[1.75rem] border border-slate-200 bg-slate-50 shadow-sm transition hover:-translate-y-1 hover:bg-white hover:shadow-lg sm:min-w-0"
            >
              <div className="relative aspect-[3/4] bg-slate-100">
                <img
                  src={person.image}
                  alt={`${person.name}, ${person.role}`}
                  className="absolute inset-0 h-full w-full object-contain"
                  loading="lazy"
                />
              </div>
              <div className="p-5 sm:p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#26A69A]">
                  {person.role}
                </p>
                <h3 className="mt-3 text-2xl font-bold tracking-tight text-slate-900">
                  {person.name}
                </h3>
                <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
                  &ldquo;{person.review}&rdquo;
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function MobileAppPopup({
  open,
  release,
  onClose,
}: {
  open: boolean;
  release: AppRelease | null;
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center bg-slate-950/45 p-4 sm:items-center">
      <div className="w-full max-w-xl rounded-[2rem] border border-white/10 bg-[#253035] p-6 text-white shadow-2xl sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-white/50">
              Mobile app
            </p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
              Take Gumboot on the road.
            </h2>
            <p className="mt-3 text-sm leading-7 text-white/72 sm:text-base">
              Open the web app or download the latest mobile build.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/80 transition hover:bg-white/10"
            aria-label="Close mobile app popup"
          >
            ×
          </button>
        </div>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <a
            href={siteConfig.appUrl}
            className="inline-flex items-center justify-center rounded-2xl bg-[#26A69A] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1f9388]"
          >
            Open Gumboot on the web
          </a>
          <a
            href={siteConfig.signupUrl}
            className="inline-flex items-center justify-center rounded-2xl border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Sign up
          </a>
        </div>
        <div className="mt-4">
          <DownloadButtons release={release} tone="dark" />
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [release, setRelease] = useState<AppRelease | null>(null);
  const [showMobilePopup, setShowMobilePopup] = useState(false);

  useEffect(() => {
    const dismissed =
      typeof window !== "undefined" &&
      window.localStorage.getItem(MOBILE_POPUP_STORAGE_KEY) === "1";
    if (!dismissed) {
      setShowMobilePopup(true);
    }

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

    const fetchRelease = async () => {
      try {
        const data = await apiFetch<AppRelease>("/api/app/latest/");
        setRelease(data);
      } catch (err) {
        console.error("Failed to fetch latest app release", err);
      }
    };

    fetchPosts();
    fetchRelease();
  }, []);

  const closeMobilePopup = () => {
    setShowMobilePopup(false);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(MOBILE_POPUP_STORAGE_KEY, "1");
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-white text-slate-900">
      <MobileAppPopup
        open={showMobilePopup}
        release={release}
        onClose={closeMobilePopup}
      />

      <section
        className="relative overflow-hidden bg-[#2B3439] bg-cover bg-center"
        style={{ backgroundImage: "url('/hero/hero.png')" }}
      >
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(18,23,27,0.92),rgba(18,23,27,0.78)_48%,rgba(18,23,27,0.34))]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(38,166,154,0.28),_transparent_30%)]" />

        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-28">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.35 }}
            variants={container}
            className="max-w-3xl"
          >
            <motion.p
              variants={item}
              className="text-xs font-semibold uppercase tracking-[0.35em] text-white/60"
            >
              Local jobs. Less friction.
            </motion.p>
            <motion.h1
              variants={item}
              className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl"
            >
              {siteConfig.hero.title}{" "}
              <span className="text-[#9BE3DB]">{siteConfig.hero.highlight}</span>
            </motion.h1>
            <motion.p
              variants={item}
              className="mt-6 max-w-2xl text-base leading-8 text-slate-100 sm:text-lg"
            >
              {siteConfig.hero.subtitle}
            </motion.p>

            <motion.div
              variants={item}
              className="mt-8 flex flex-col gap-3 sm:flex-row"
            >
              <CtaButton href={siteConfig.postJobUrl}>Post a job</CtaButton>
              <CtaButton href={siteConfig.signupUrl} variant="secondary">
                Sign up
              </CtaButton>
            </motion.div>

            <motion.div variants={item} className="mt-4">
              <DownloadButtons release={release} tone="dark" />
            </motion.div>

            <motion.p
              variants={item}
              className="mt-4 text-sm text-white/70"
            >
              {siteConfig.hero.tagline}
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={container}
            className="self-end rounded-[2rem] border border-white/10 bg-white/10 p-6 text-white shadow-xl backdrop-blur-md sm:p-7"
          >
            <motion.p
              variants={item}
              className="text-xs font-semibold uppercase tracking-[0.28em] text-white/55"
            >
              Built For Both Sides
            </motion.p>
            <motion.div variants={item} className="mt-5 grid gap-3">
              {["Post in minutes", "Compare offers", "Earn with local skills"].map(
                (point) => (
                  <div
                    key={point}
                    className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
                  >
                    <span className="h-2 w-2 rounded-full bg-[#9BE3DB]" />
                    <span className="text-sm font-medium text-white/86">{point}</span>
                  </div>
                )
              )}
            </motion.div>
            <motion.div variants={item} className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href={siteConfig.postJobUrl}
                className="inline-flex items-center justify-center rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
              >
                Post a job
              </a>
              <a
                href={siteConfig.signupUrl}
                className="inline-flex items-center justify-center rounded-2xl border border-white/15 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Sign up
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <FeatureStrip />

      <Services />

      <GumbootersSection />

      <section
        id="how-it-works"
        className="bg-gradient-to-b from-white to-slate-50 py-16 sm:py-20 lg:py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <SectionIntro
              eyebrow="How It Works"
              title="Post. Choose. Done."
              body="Local help without the runaround."
            />
            <a
              href={siteConfig.postJobUrl}
              className="inline-flex w-fit items-center justify-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Post a job
            </a>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-4">
            {howItWorks.map((step) => (
              <article
                key={step.step}
                className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm"
              >
                <p className="text-sm font-semibold tracking-[0.24em] text-[#26A69A]">
                  {step.step}
                </p>
                <h3 className="mt-4 text-2xl font-bold text-slate-900">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {step.body}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {["Verified locals", "Secure payments", "Built for NZ jobs"].map((point) => (
              <span
                key={point}
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700"
              >
                {point}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#1F272B] py-16 text-white sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-white/45">
              Built For Trust
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Built for trust from the first message.
            </h2>
            <p className="mt-5 text-base leading-7 text-white/68 sm:text-lg">
              Profiles, reviews, messaging, and payment all work together.
            </p>
          </div>
          <div className="grid gap-4">
            {trustPoints.map((point) => (
              <div
                key={point}
                className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5"
              >
                <p className="text-sm leading-7 text-white/78 sm:text-base">
                  {point}
                </p>
              </div>
            ))}
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href={siteConfig.appUrl}
                className="inline-flex items-center justify-center rounded-2xl bg-[#26A69A] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1f9388]"
              >
                Open Gumboot
              </a>
              <a
                href={siteConfig.signupUrl}
                className="inline-flex items-center justify-center rounded-2xl border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Sign up
              </a>
            </div>
            <div className="pt-1">
              <DownloadButtons release={release} tone="dark" />
            </div>
          </div>
        </div>
      </section>

      <section
        id="blog"
        className="border-y border-slate-200 bg-white py-12 sm:py-16 lg:py-20"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <SectionIntro
              eyebrow="From The Blog"
              title="Guides and updates."
              body="Short reads for better local jobs."
            />
            <div>
              <Link
                href="/blog"
                className="inline-flex items-center text-sm font-semibold text-slate-900 hover:underline"
              >
                View all posts →
              </Link>
            </div>
          </div>

          {loadingPosts ? (
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-[1.75rem] border border-slate-200 bg-slate-50/80 p-5 animate-pulse"
                >
                  <div className="h-32 w-full rounded-2xl bg-slate-200" />
                  <div className="mt-4 h-3 w-24 rounded bg-slate-200" />
                  <div className="mt-3 h-5 w-3/4 rounded bg-slate-200" />
                  <div className="mt-3 h-3 w-full rounded bg-slate-200" />
                  <div className="mt-2 h-3 w-5/6 rounded bg-slate-200" />
                </div>
              ))}
            </div>
          ) : blogPosts.length === 0 ? (
            <p className="mt-8 text-sm text-slate-500">No blog posts yet. Check back soon.</p>
          ) : (
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {blogPosts.slice(0, 3).map((post) => {
                const formatted = new Date(post.published_at).toLocaleDateString(
                  "en-NZ",
                  {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  }
                );

                return (
                  <article
                    key={post.slug}
                    className="group overflow-hidden rounded-[1.75rem] border border-slate-200 bg-slate-50/70 shadow-sm transition hover:-translate-y-1 hover:bg-white hover:shadow-lg"
                  >
                    {post.image && (
                      <div className="relative aspect-[16/9] w-full bg-slate-100">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="absolute inset-0 h-full w-full object-contain"
                          loading="lazy"
                        />
                      </div>
                    )}
                    <div className="p-5">
                      <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-slate-500">
                        {formatted}
                      </p>
                      <h3 className="mt-3 text-lg font-semibold leading-snug text-slate-900">
                        <Link href={`/blog/${post.slug}`} className="hover:underline">
                          {post.title}
                        </Link>
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-slate-600">
                        {post.excerpt}
                      </p>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="mt-5 inline-flex items-center text-sm font-semibold text-slate-900 hover:underline"
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

      <section className="bg-gradient-to-b from-slate-50 to-white py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-slate-500">
            Ready To Try It
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Ready to get started?
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg">
            Open Gumboot, post a job, or create your account today.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={siteConfig.appUrl}
              className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Open Gumboot
            </a>
            <a
              href={siteConfig.postJobUrl}
              className="inline-flex items-center justify-center rounded-2xl border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
            >
              Post a job
            </a>
          </div>
          <div className="mt-4 flex justify-center">
            <DownloadButtons release={release} />
          </div>
        </div>
      </section>
    </main>
  );
}
