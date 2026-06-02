"use client";

import { useEffect, useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, type Easing } from "framer-motion";
import { FaApple, FaAndroid } from "react-icons/fa";
import Services from "./Services";
import { siteConfig } from "../config/siteConfig";
import type { AppRelease, BlogPost } from "@/types/api";

const GUMBOOT_LAUNCH_DATE_ISO = "2026-07-01T10:00:00+12:00";

const heroStats = [
  { value: "Trusted", label: "Local jobs across New Zealand" },
  { value: "Verified", label: "Helpers and worker profiles" },
  { value: "Secure", label: "Payment handled in one flow" },
];

const trustPoints = [
  "Verified helpers, reviews, and clear job details make it easier to choose with confidence.",
  "A valid card is required before you can post a job, helping Gumboot support secure payment from the start.",
  "Messages, updates, offers, and payment all stay in one place so local work is easier to manage.",
];

const howItWorks = [
  {
    step: "01",
    title: "Post a job",
    body: "Share the job details, location, and timing so trusted local helpers can see what you need.",
  },
  {
    step: "02",
    title: "Accept an offer",
    body: "Compare offers, chat in one thread, and choose the right person for the work.",
  },
  {
    step: "03",
    title: "Get the work done",
    body: "Keep the job moving with updates, photos, and clear communication from start to finish.",
  },
  {
    step: "04",
    title: "Job done",
    body: "Confirm the work is complete and release secure payment through the Gumboot flow.",
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
    review: "Chloe is reliable, detail-focused, and always leaves the garden looking amazing.",
  },
  {
    name: "Sarah T.",
    role: "Dog Walker",
    image: "/people/sarah.png",
    review: "Sarah is fantastic with dogs, friendly, punctual, and always ensures a safe, happy walk.",
  },
];

const posterBenefits = [
  "Post a job in minutes with clear local job details and photos.",
  "Compare offers from verified helpers before you accept an offer.",
  "Keep messages, scheduling, and secure payment in one place.",
];

const workerBenefits = [
  "Find work nearby and send offers for local work that suits your skills.",
  "Build trust through ID verification, reviews, and reliable communication.",
  "Take on local jobs across New Zealand without juggling multiple apps or chats.",
];

const communityPoints = [
  "Built for everyday local jobs such as cleaning, gardening, moving, deliveries, dog walking, and odd jobs.",
  "Designed to help people get trusted local jobs done faster while helping others earn from flexible local work.",
  "Focused on help across New Zealand, with a flow that feels simple whether you are posting work or looking for it.",
];

const shortFaqs = [
  {
    q: "What is Gumboot?",
    a: "Gumboot is a local jobs platform where people can post a job, receive offers, message securely, and get the work done with one clear payment flow.",
  },
  {
    q: "Do I need a card to post a job?",
    a: "Yes. A valid card is required before posting so Gumboot can support secure payment while the work is underway.",
  },
  {
    q: "Can workers find work nearby?",
    a: "Yes. Verified workers can browse available jobs on the map, find work nearby, and send offers that match the job.",
  },
  {
    q: "Why does Gumboot hold payment securely?",
    a: "Holding payment helps reduce risk for both sides and creates more confidence from the moment an offer is accepted to the moment the job is done.",
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

function getTimeRemaining(targetDateIso: string) {
  const diff = new Date(targetDateIso).getTime() - Date.now();

  if (diff <= 0) {
    return { total: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return { total: diff, days, hours, minutes, seconds };
}

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
              Trusted Local Jobs
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Local jobs across New Zealand without the usual friction.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/72 sm:text-base">
              Gumboot helps people post a job, connect with verified helpers, and
              move from the first offer to secure payment in one clear flow.
            </p>
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
              What Is Gumboot?
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Trusted help across New Zealand for people who need work done and people looking for work.
            </h2>
            <p className="mt-5 text-base leading-7 text-slate-600">
              Gumboot is a local work marketplace built for everyday jobs. If you
              need a hand with cleaning, gardening, moving, dog walking, or odd
              jobs, you can post a job and receive offers from people nearby.
            </p>
            <p className="mt-4 text-base leading-7 text-slate-600">
              If you want to earn, Gumboot helps you find work nearby, send
              offers, message clearly, and complete local jobs with a secure
              payment flow that is designed to reduce risk for both sides.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={siteConfig.appUrl}
                className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Open Gumboot
              </a>
              <Link
                href="/onboarding"
                className="inline-flex items-center justify-center rounded-2xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
              >
                Learn how it works
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
            eyebrow="Verified Helpers"
            title="Meet the local helpers people come back to."
            body="Gumboot is built around trusted local jobs, verified helpers, and the kind of local work people rely on every week."
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
                <Image
                  src={person.image}
                  alt={`${person.name}, ${person.role}`}
                  fill
                  className="object-contain"
                  loading="lazy"
                  sizes="(min-width: 640px) 30vw, 82vw"
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

function LaunchCountdown() {
  const [timeRemaining, setTimeRemaining] = useState(() =>
    getTimeRemaining(GUMBOOT_LAUNCH_DATE_ISO)
  );

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setTimeRemaining(getTimeRemaining(GUMBOOT_LAUNCH_DATE_ISO));
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, []);

  const hasLaunched = timeRemaining.total <= 0;

  return (
    <div className="mt-8 rounded-[1.75rem] border border-white/10 bg-white/10 p-5 text-white shadow-xl backdrop-blur-md sm:p-6">
      {hasLaunched ? (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#9BE3DB]">
              We&apos;re live
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
              Gumboot has officially launched.
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-white/74 sm:text-base">
              Open Gumboot now and be part of the first wave of trusted local jobs across New Zealand.
            </p>
          </div>
          <a
            href={siteConfig.appUrl}
            className="inline-flex w-fit items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
          >
            Open Gumboot
          </a>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#9BE3DB]">
              Official Launch
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
              Countdown to 10:00am NZT on July 1
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-white/74 sm:text-base">
              The countdown is on for Gumboot&apos;s official launch and the next chapter of trusted local jobs, verified helpers, and secure payment across New Zealand.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { label: "Days", value: timeRemaining.days },
              { label: "Hours", value: timeRemaining.hours },
              { label: "Minutes", value: timeRemaining.minutes },
              { label: "Seconds", value: timeRemaining.seconds },
            ].map((unit) => (
              <div
                key={unit.label}
                className="rounded-2xl border border-white/10 bg-[#12171B]/55 p-4 text-center"
              >
                <p className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  {String(unit.value).padStart(2, "0")}
                </p>
                <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/55">
                  {unit.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function HomePageClient({
  blogPosts,
  release,
}: {
  blogPosts: BlogPost[];
  release: AppRelease | null;
}) {
  const [showMobilePopup, setShowMobilePopup] = useState(false);

  useEffect(() => {
    const dismissed =
      typeof window !== "undefined" &&
      window.localStorage.getItem(MOBILE_POPUP_STORAGE_KEY) === "1";
    if (!dismissed) {
      setShowMobilePopup(true);
    }
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

      <section className="relative overflow-hidden bg-[#2B3439]">
        <Image
          src="/hero/hero.png"
          alt="People using Gumboot for trusted local jobs across New Zealand"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
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
              Trusted local jobs. Help across New Zealand.
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
              Gumboot makes it easy to post a job, accept an offer, and get the
              job done with verified helpers, secure payment, and a clear local
              work flow built for communities across New Zealand.
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
              {[
                "Post a job in minutes",
                "Accept an offer with confidence",
                "Find work nearby with verified local demand",
              ].map((point) => (
                <div
                  key={point}
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
                >
                  <span className="h-2 w-2 rounded-full bg-[#9BE3DB]" />
                  <span className="text-sm font-medium text-white/86">{point}</span>
                </div>
              ))}
            </motion.div>
            <motion.p
              variants={item}
              className="mt-5 text-sm leading-7 text-white/72"
            >
              Gumboot helps people find trusted local jobs, secure help across
              New Zealand, and manage the whole process from the first message
              to secure payment.
            </motion.p>
            <motion.div variants={item} className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href={siteConfig.postJobUrl}
                className="inline-flex items-center justify-center rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
              >
                Post a job
              </a>
              <Link
                href="/onboarding"
                className="inline-flex items-center justify-center rounded-2xl border border-white/15 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                How it works
              </Link>
            </motion.div>
          </motion.div>
        </div>

        <div className="relative mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8 lg:pb-24">
          <LaunchCountdown />
        </div>
      </section>

      <FeatureStrip />

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.02fr_0.98fr] lg:px-8">
          <div>
            <SectionIntro
              eyebrow="How Gumboot Works"
              title="A clear local jobs flow from post a job to job done."
              body="The homepage promise and the real product flow now match: post a job, accept an offer, and get the job done with help that feels organised, local, and trustworthy."
            />
            <p className="mt-6 text-base leading-7 text-slate-600">
              For people posting jobs, Gumboot makes it easier to explain the
              work, compare offers, and choose verified helpers without bouncing
              between different apps. For people looking for work, it creates a
              more reliable way to find work nearby and respond with clear local
              offers.
            </p>
            <p className="mt-4 text-base leading-7 text-slate-600">
              That means fewer dead ends, less guesswork, and a better path from
              the first message to secure payment. If you want the full step by
              step flow, you can also read the detailed{" "}
              <Link href="/onboarding" className="font-semibold text-slate-900 hover:underline">
                Gumboot onboarding guide
              </Link>
              .
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {howItWorks.map((step) => (
              <article
                key={step.step}
                className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5 shadow-sm"
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
        </div>
      </section>

      <Services />

      <section className="border-y border-slate-200 bg-slate-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-2">
            <article className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-slate-500">
                For People Posting Jobs
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
                Get trusted local jobs sorted faster.
              </h2>
              <p className="mt-5 text-base leading-7 text-slate-600">
                If you need help across New Zealand, Gumboot gives you a simpler
                way to post a job, receive offers, compare verified helpers, and
                keep everything in one secure place.
              </p>
              <ul className="mt-6 space-y-3">
                {posterBenefits.map((point) => (
                  <li key={point} className="flex gap-3 text-sm leading-7 text-slate-600 sm:text-base">
                    <span className="mt-2 h-2 w-2 rounded-full bg-[#26A69A]" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </article>

            <article className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-slate-500">
                For People Looking For Work
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
                Find work nearby and build trust as you go.
              </h2>
              <p className="mt-5 text-base leading-7 text-slate-600">
                Gumboot is also for workers who want flexible local work. Once
                verified, you can find work nearby, send offers, and complete
                local jobs across New Zealand with clearer expectations.
              </p>
              <ul className="mt-6 space-y-3">
                {workerBenefits.map((point) => (
                  <li key={point} className="flex gap-3 text-sm leading-7 text-slate-600 sm:text-base">
                    <span className="mt-2 h-2 w-2 rounded-full bg-[#26A69A]" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </section>

      <GumbootersSection />

      <section className="bg-[#1F272B] py-16 text-white sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-white/45">
              Why Gumboot Holds Payment Securely
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Built for trust from the first message to secure payment.
            </h2>
            <p className="mt-5 text-base leading-7 text-white/68 sm:text-lg">
              Gumboot holds payment securely during the job process to help
              protect both the person posting the job and the person completing
              the work. It is a practical way to reduce risk and create more
              confidence around local work.
            </p>
            <p className="mt-4 text-base leading-7 text-white/68">
              Instead of relying on scattered messages and uncertain handoffs,
              Gumboot keeps profiles, reviews, job details, and payment in one
              clear system that supports trusted local jobs across New Zealand.
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
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-2xl border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Contact support
              </Link>
            </div>
            <div className="pt-1">
              <DownloadButtons release={release} tone="dark" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_0.95fr] lg:px-8">
          <div>
            <SectionIntro
              eyebrow="Built For Communities"
              title="Built for local communities across New Zealand"
              body="Gumboot is designed around the way people actually get everyday work done: locally, quickly, and with more trust."
            />
            <p className="mt-6 text-base leading-7 text-slate-600">
              Some platforms are built for huge projects or long hiring cycles.
              Gumboot focuses on local jobs across New Zealand that need to move
              faster. That could mean a lawn to mow, a room to clean, a dog to
              walk, furniture to move, or a quick hand with something practical.
            </p>
            <p className="mt-4 text-base leading-7 text-slate-600">
              By bringing local work, verified helpers, clear offers, and secure
              payment together, Gumboot gives people a better way to get help
              and a better way to earn from local skills.
            </p>
          </div>
          <div className="grid gap-4">
            {communityPoints.map((point) => (
              <article
                key={point}
                className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5 shadow-sm"
              >
                <p className="text-sm leading-7 text-slate-600 sm:text-base">
                  {point}
                </p>
              </article>
            ))}
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
              title="Guides and updates for posters and workers."
              body="Read practical advice on trusted local jobs, how Gumboot works, and how to get more out of the platform."
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

          {blogPosts.length === 0 ? (
            <p className="mt-8 text-sm text-slate-500">No blog posts yet. Check back soon.</p>
          ) : (
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {blogPosts.slice(0, 3).map((post) => {
                const formatted = new Date(post.published_at || post.created_at).toLocaleDateString(
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
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-contain"
                          loading="lazy"
                          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                          unoptimized
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

      <section className="border-b border-slate-200 bg-slate-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <SectionIntro
              eyebrow="Short FAQ"
              title="Quick answers for first-time Gumboot users"
              body="A few fast answers about trusted local jobs, verified helpers, secure payment, and local work."
            />
            <Link
              href="/faq"
              className="inline-flex w-fit items-center text-sm font-semibold text-slate-900 hover:underline"
            >
              View full FAQ →
            </Link>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {shortFaqs.map((faq) => (
              <article
                key={faq.q}
                className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm"
              >
                <h3 className="text-lg font-semibold tracking-tight text-slate-900">
                  {faq.q}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{faq.a}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-slate-50 to-white py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-slate-500">
            Ready To Try It
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Ready to get started with Gumboot?
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg">
            Open Gumboot, post a job, find work nearby, or learn more about how
            trusted local jobs work across New Zealand.
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
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-2xl border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
            >
              Contact support
            </Link>
          </div>
          <div className="mt-4 flex justify-center">
            <DownloadButtons release={release} />
          </div>
        </div>
      </section>
    </main>
  );
}
