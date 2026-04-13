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
  { value: "2-sided", label: "Built for posters and taskers" },
  { value: "1 flow", label: "Post, chat, hire, and pay" },
  { value: "NZ-first", label: "Designed for local jobs" },
];

const trustPoints = [
  "ID verification is required, and verified profiles with reviews help users choose with confidence.",
  "A valid card is required to post a job, and all payments are handled through Gumboot with Stripe.",
  "In-app messaging keeps job details, updates, and payment flow in one place instead of scattered chats.",
];

const howItWorks = [
  {
    step: "01",
    title: "Post the job",
    body: "Tell people what you need, where it is, and how much you want to spend.",
  },
  {
    step: "02",
    title: "Compare local offers",
    body: "Nearby taskers can respond with pricing, timing, and profile details.",
  },
  {
    step: "03",
    title: "Hire with confidence",
    body: "Pick the right person, message directly, and line everything up quickly.",
  },
  {
    step: "04",
    title: "Pay securely",
    body: "Handle payment through Gumboot with Stripe once the work is done and you are happy.",
  },
];

const audienceCards = [
  {
    eyebrow: "For people who need help",
    title: "Post a job and get local help moving.",
    body: "From lawns and cleaning to moving, painting, and deliveries, Gumboot gives you a faster way to hire nearby help. A valid card is required to post.",
    ctaLabel: "Post a job",
    ctaHref: siteConfig.postJobUrl,
    points: ["Post in minutes", "Compare offers", "Pay securely"],
  },
  {
    eyebrow: "For people who want to earn",
    title: "Turn spare time and practical skills into income.",
    body: "Create a profile, complete ID verification, browse nearby jobs, send offers, and build trust through great work and reviews.",
    ctaLabel: "Sign up",
    ctaHref: siteConfig.signupUrl,
    points: ["Flexible local work", "Verified profiles", "Simple job flow"],
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
              Why it converts
            </p>
            <h3 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Built to reduce the usual local-job friction.
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
              Why Gumboot
            </p>
            <h3 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              A faster marketplace for everyday local jobs.
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
              Take Gumboot on the road with the app.
            </h2>
            <p className="mt-3 text-sm leading-7 text-white/72 sm:text-base">
              Open Gumboot on the web, or download the latest iPhone and Android builds for jobs on the go.
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
            className="grid gap-4"
          >
            {audienceCards.map((card) => (
              <motion.article
                key={card.title}
                variants={item}
                className="rounded-[2rem] border border-white/10 bg-white/10 p-6 text-white shadow-xl backdrop-blur-md"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/55">
                  {card.eyebrow}
                </p>
                <h2 className="mt-3 text-2xl font-bold tracking-tight">
                  {card.title}
                </h2>
                <p className="mt-3 text-sm leading-7 text-white/72 sm:text-base">
                  {card.body}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {card.points.map((point) => (
                    <span
                      key={point}
                      className="rounded-full border border-white/12 bg-white/6 px-3 py-1 text-xs font-medium text-white/80"
                    >
                      {point}
                    </span>
                  ))}
                </div>
                <a
                  href={card.ctaHref}
                  className="mt-6 inline-flex items-center text-sm font-semibold text-[#9BE3DB] hover:text-white"
                >
                  {card.ctaLabel} →
                </a>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      <FeatureStrip />

      <Services />

      <section id="how-it-works" className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionIntro
            eyebrow="How It Works"
            title="Clear steps, fast decisions, fewer dead-end messages."
            body="The point of the landing page is not just to look good. It should make the next click obvious. Gumboot already has the web flow to support that."
          />

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {howItWorks.map((step) => (
              <article
                key={step.step}
                className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6 shadow-sm"
              >
                <p className="text-sm font-semibold tracking-[0.24em] text-[#26A69A]">
                  {step.step}
                </p>
                <h3 className="mt-4 text-xl font-semibold text-slate-900">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
                  {step.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="features"
        className="bg-gradient-to-b from-slate-50 to-white py-16 sm:py-20 lg:py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionIntro
            eyebrow="Features"
            title="Everything needed to turn interest into action."
            body="These are the marketplace mechanics that make the homepage believable: speed, clarity, trust, and obvious next steps."
          />

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {siteConfig.features.map((feature) => (
              <article
                key={feature.title}
                className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <h3 className="text-lg font-semibold text-slate-900">
                  {feature.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
                  {feature.desc}
                </p>
              </article>
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
              The landing page should keep selling confidence, not just features.
            </h2>
            <p className="mt-5 text-base leading-7 text-white/68 sm:text-lg">
              Strong CTAs work best when they are backed by signals that the marketplace is safe, structured, and worth trying right now.
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
              title="Learn more about how Gumboot works."
              body="Keep the rest of the homepage conversion-focused, then let deeper content support trust and SEO."
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
            Push people into the product, not into a holding pattern.
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg">
            The web app is live, so the homepage should keep inviting users to take the next real step: open Gumboot, post a job, create an account, or download the app.
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
