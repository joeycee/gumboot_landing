import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import {
  FaCamera,
  FaCheckCircle,
  FaComments,
  FaCreditCard,
  FaIdCard,
  FaMapMarkedAlt,
  FaMobileAlt,
  FaRegClock,
  FaRegUserCircle,
  FaShieldAlt,
  FaUpload,
} from "react-icons/fa";
import { siteConfig } from "../config/siteConfig";

export const metadata: Metadata = {
  title: "How to Get Started with Gumboot | Post Jobs, Apply for Work, and Pay Safely",
  description:
    "Learn how to sign up for Gumboot, post local jobs, apply for work, message safely, complete jobs, and release payment through one clear platform flow.",
  keywords: [
    "Gumboot",
    "how Gumboot works",
    "post local jobs",
    "apply for jobs",
    "local work app New Zealand",
    "job marketplace NZ",
    "secure job payments",
    "ID verification for workers",
  ],
  alternates: {
    canonical: "/onboarding",
  },
  openGraph: {
    title: "How to Get Started with Gumboot",
    description:
      "See exactly how Gumboot works for posters and workers, from signup through to job completion and payment release.",
    url: "https://gumboot.app/onboarding",
    siteName: "Gumboot",
    images: ["/og.png"],
    locale: "en_NZ",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Get Started with Gumboot",
    description:
      "Learn how to sign up, post jobs, apply for work, and complete payments safely on Gumboot.",
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const signupSteps = [
  {
    step: "01",
    title: "Open Gumboot",
    body: "Start in the Gumboot app or open the Gumboot website to begin.",
    icon: FaMobileAlt,
  },
  {
    step: "02",
    title: "Create an account",
    body: "Tap Sign Up, enter your details, and set up your profile.",
    icon: FaRegUserCircle,
  },
  {
    step: "03",
    title: "Land on the home page",
    body: "From there you can post a job, browse the map, or apply for available work.",
    icon: FaMapMarkedAlt,
  },
];

const postingSteps = [
  {
    title: "Add a valid card",
    body: "A card is required before a job can be posted. If you have not added one yet, Gumboot will guide you there first.",
    icon: FaCreditCard,
  },
  {
    title: "Post your job",
    body: "Create the job from the home page with the details someone local needs to get started.",
    icon: FaMobileAlt,
  },
  {
    title: "Receive offers",
    body: "Interested workers can send offers based on the job and the amount they think suits the work.",
    icon: FaComments,
  },
  {
    title: "Accept or decline",
    body: "Review each offer, compare your options, and choose the person you want to work with.",
    icon: FaCheckCircle,
  },
];

const applyingSteps = [
  {
    title: "Verify your ID",
    body: "Before applying, workers need to complete ID verification to help keep the platform safe.",
    icon: FaIdCard,
  },
  {
    title: "Upload ID and selfie",
    body: "You can use a passport, driver's licence, or other accepted ID, along with a selfie to confirm it is really you.",
    icon: FaCamera,
  },
  {
    title: "Browse the map",
    body: "Once verified, available jobs appear on the map so you can see what is nearby.",
    icon: FaMapMarkedAlt,
  },
  {
    title: "Send your offer",
    body: "Apply for the job and include the amount you believe is appropriate for the work.",
    icon: FaRegClock,
  },
];

const acceptedFlow = [
  "The job becomes scheduled once the poster accepts an offer.",
  "Both people can message each other to confirm timing, access, and job details.",
  "Gumboot holds the payment securely while the work is underway.",
  "Holding payment helps reduce risk for both sides and supports a safer, fairer process.",
];

const workerChecklist = [
  "Complete the job",
  "Upload photos of the finished work",
  "Press Complete",
];

const posterChecklist = [
  "Receive a notification",
  "Review the uploaded photos",
  "Press Complete if everything looks right",
];

const faqs = [
  {
    q: "Do I need an account to use Gumboot?",
    a: "Yes. You need a Gumboot account to post a job, apply for work, message other users, and complete jobs through the platform.",
  },
  {
    q: "Do I need a card to post a job?",
    a: "Yes. A valid card is required before you can post a job so Gumboot can support a secure payment flow.",
  },
  {
    q: "Why do workers need ID verification?",
    a: "ID verification helps Gumboot confirm that the person applying for work is who they say they are, which supports trust and safety across the platform.",
  },
  {
    q: "What ID can I use?",
    a: "Accepted ID can include a passport, driver's licence, or other supported identification shown during the verification flow.",
  },
  {
    q: "Can I message the other person?",
    a: "Yes. Posters and workers can message each other during the process to confirm details, timing, and any questions about the job.",
  },
  {
    q: "What happens after I accept an offer?",
    a: "The job is scheduled, messaging stays open, and Gumboot holds the payment securely while the work is being completed.",
  },
  {
    q: "Why is payment held by Gumboot?",
    a: "Payment is held to help protect both sides, reduce risk, and give everyone more confidence while the job is in progress.",
  },
  {
    q: "What happens when the job is complete?",
    a: "The worker uploads completion photos and presses Complete. The poster reviews the work and also presses Complete, then payment can be released according to the platform flow.",
  },
];

function SectionHeading({
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
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
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

function PillButton({
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
      ? "inline-flex items-center justify-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
      : "inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50";

  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
}

function InternalButton({
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
      ? "inline-flex items-center justify-center rounded-2xl bg-[#26A69A] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1f9388]"
      : "inline-flex items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/15";

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

function IconCard({
  title,
  body,
  icon: Icon,
}: {
  title: string;
  body: string;
  icon: typeof FaShieldAlt;
}) {
  return (
    <article className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#26A69A]/10 text-xl text-[#26A69A]">
        <Icon />
      </div>
      <h3 className="mt-5 text-xl font-semibold tracking-tight text-slate-900">
        {title}
      </h3>
      <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">{body}</p>
    </article>
  );
}

export default function OnboardingPage() {
  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://gumboot.app/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "How it works",
        item: "https://gumboot.app/onboarding",
      },
    ],
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-white text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
      />

      <section className="relative overflow-hidden bg-[#2B3439]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(38,166,154,0.24),_transparent_30%),linear-gradient(135deg,rgba(18,23,27,0.96),rgba(18,23,27,0.78)_55%,rgba(18,23,27,0.88))]" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-24">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/60">
              Help Centre
            </p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              How to get started with Gumboot
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-100 sm:text-lg">
              Gumboot helps people post local jobs, apply for work, message each
              other, and complete jobs safely through one clear platform flow.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <PillButton href={siteConfig.appUrl}>Open Gumboot</PillButton>
              <InternalButton href="#signup-flow" variant="secondary">
                Learn how it works
              </InternalButton>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                "Post a job with confidence",
                "Apply for local work nearby",
                "Message and complete jobs in one place",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm leading-6 text-white/80"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="relative w-full max-w-xl rounded-[2rem] border border-white/10 bg-white/10 p-5 shadow-2xl backdrop-blur md:p-6">
              <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
                <div className="mx-auto flex w-full max-w-[750px] items-center justify-center lg:-ml-2 lg:max-w-[820px]">
                  <Image
                    src="/phone/gumboot_ph.png"
                    alt="Gumboot app shown on a phone"
                    width={500}
                    height={800}
                    priority
                    sizes="(min-width: 1024px) 640px, 320px"
                    className="h-auto w-full max-w-[320px] drop-shadow-[0_24px_42px_rgba(0,0,0,0.35)] lg:max-w-[640px]"
                  />
                </div>

                <div className="grid content-start gap-4">
                  <div className="rounded-[1.75rem] border border-white/10 bg-white/8 p-5 text-white">
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/55">
                      Posters
                    </p>
                    <p className="mt-3 text-lg font-semibold">
                      Add a card, post a job, and compare offers.
                    </p>
                  </div>
                  <div className="rounded-[1.75rem] border border-white/10 bg-white/8 p-5 text-white">
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/55">
                      Workers
                    </p>
                    <p className="mt-3 text-lg font-semibold">
                      Verify your ID, browse the map, and send an offer.
                    </p>
                  </div>
                  <div className="rounded-[1.75rem] border border-white/10 bg-white/8 p-5 text-white">
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/55">
                      Trust
                    </p>
                    <p className="mt-3 text-lg font-semibold">
                      Messaging and payment stay inside the Gumboot flow.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="signup-flow"
        className="border-b border-slate-200 bg-white py-16 sm:py-20"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Sign Up"
            title="A simple start for everyone"
            body="Whether you want to post a job or earn from local work, the first steps are the same. Open Gumboot, create your account, and head to the home page."
          />
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {signupSteps.map((step) => {
              const Icon = step.icon;
              return (
                <article
                  key={step.step}
                  className="relative overflow-hidden rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6 shadow-sm"
                >
                  <div className="absolute right-5 top-5 text-5xl font-bold tracking-tight text-slate-200">
                    {step.step}
                  </div>
                  <div className="relative">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-xl text-white">
                      <Icon />
                    </div>
                    <h3 className="mt-5 text-xl font-semibold tracking-tight text-slate-900">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
                      {step.body}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="For Posters"
            title="Posting a job"
            body="People who want work done can create a job from the home page. Gumboot keeps the process clear from setup through to choosing an offer."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {postingSteps.map((step) => (
              <IconCard
                key={step.title}
                title={step.title}
                body={step.body}
                icon={step.icon}
              />
            ))}
          </div>
          <div className="mt-8 rounded-[1.75rem] border border-[#26A69A]/20 bg-[#26A69A]/8 p-6 sm:p-7">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-700">
              Why the card step matters
            </p>
            <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600">
              Requiring a valid card helps Gumboot support a secure process and
              makes it possible for payment to be held safely while a job is
              completed.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="For Workers"
            title="Applying for work"
            body="Workers can browse available jobs on the map and apply for the ones that suit them. Verification comes first so the platform stays safer and more trustworthy."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {applyingSteps.map((step) => (
              <IconCard
                key={step.title}
                title={step.title}
                body={step.body}
                icon={step.icon}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
          <div className="rounded-[2rem] bg-slate-900 p-8 text-white shadow-xl sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/55">
              Accepted Offer
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              What happens when an offer is accepted?
            </h2>
            <p className="mt-5 text-base leading-7 text-white/75">
              Once an offer is accepted, Gumboot shifts from matching people to
              helping them finish the job with more confidence.
            </p>
          </div>

          <div className="grid gap-4">
            {acceptedFlow.map((item) => (
              <div
                key={item}
                className="flex gap-4 rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5"
              >
                <span className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#26A69A]/12 text-[#26A69A]">
                  <FaShieldAlt />
                </span>
                <p className="text-sm leading-7 text-slate-600 sm:text-base">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-[linear-gradient(to_bottom,_white,_rgb(248_250_252))] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Completion"
            title="Completing the job"
            body="Both sides have a clear role at the end of the job. The worker confirms the work is done, and the poster confirms the result before payment moves forward."
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <article className="rounded-[1.75rem] border border-slate-200 bg-white p-7 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
                Worker Flow
              </p>
              <ul className="mt-6 space-y-4">
                {workerChecklist.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-1 text-[#26A69A]">
                      {item.includes("Upload") ? <FaUpload /> : <FaCheckCircle />}
                    </span>
                    <span className="text-sm leading-7 text-slate-600 sm:text-base">{item}</span>
                  </li>
                ))}
              </ul>
            </article>

            <article className="rounded-[1.75rem] border border-slate-200 bg-white p-7 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
                Poster Flow
              </p>
              <ul className="mt-6 space-y-4">
                {posterChecklist.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-1 text-[#26A69A]">
                      {item.includes("photos") ? <FaCamera /> : <FaCheckCircle />}
                    </span>
                    <span className="text-sm leading-7 text-slate-600 sm:text-base">{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>
          <div className="mt-8 rounded-[1.75rem] border border-slate-200 bg-slate-900 p-6 text-white sm:p-7">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-white/60">
              Payment release
            </p>
            <p className="mt-3 max-w-3xl text-base leading-7 text-white/78">
              Once both sides have marked the job complete, payment can be
              released according to the Gumboot platform flow.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <article className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-7">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
              Messaging
            </p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900">
              Keep the job conversation in one place
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              Posters and workers can message each other during the job process
              to confirm details, ask questions, and keep everything clear in
              one thread.
            </p>
          </article>

          <article className="rounded-[1.75rem] border border-slate-200 bg-[#26A69A]/8 p-7">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
              Trust and Safety
            </p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900">
              Why Gumboot holds payment
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              Gumboot holds payment during the job process to help protect both
              the person posting the job and the person completing the work.
              This reduces risk, gives both sides more confidence, and supports
              a safer local job experience.
            </p>
          </article>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="FAQ"
            title="Common questions"
            body="A few quick answers for first-time users."
          />
          <div className="mt-10 space-y-4">
            {faqs.map((item) => (
              <details
                key={item.q}
                className="group rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                  <span className="text-left text-base font-semibold text-slate-900">
                    {item.q}
                  </span>
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 text-slate-500 transition group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-[2rem] bg-slate-900 px-6 py-10 text-center text-white shadow-xl sm:px-10 sm:py-12">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/55">
              Ready
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to get started?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-white/75">
              Create your account, open Gumboot, and move from signup to your
              first job with a clear step-by-step flow.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <PillButton href={siteConfig.signupUrl}>Sign Up</PillButton>
              <PillButton href={siteConfig.appUrl} variant="secondary">
                Open Gumboot
              </PillButton>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/15"
              >
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
