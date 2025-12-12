// app/faq/page.tsx
"use client";

import { useMemo, useState } from "react";

type QA = { q: string; a: React.ReactNode; cat: "general" | "post" | "do" };

const ALL_QA: QA[] = [
  // General
  {
    cat: "general",
    q: "How do I create an account?",
    a: "Tap “Sign up” and follow the steps to verify your email/phone and create your profile.",
  },
  {
    cat: "general",
    q: "Is my personal information secure?",
    a: "Yes. We take privacy seriously. Data is encrypted in transit and at rest. We only share what’s needed to operate bookings, payments, and support.",
  },
  {
    cat: "general",
    q: "Is Gumboot available in my area?",
    a: "We’re rolling out across New Zealand. Turn on location in the app to see availability near you.",
  },
  {
    cat: "general",
    q: "How does payment work?",
    a: "Once a job is completed, payout is initiated to the provider’s bank account via our payment partner. Processing can take up to 4 business days.",
  },
  {
    cat: "general",
    q: "What is the minimum age to sign up?",
    a: "16 years of age.",
  },

  // Posting Jobs
  {
    cat: "post",
    q: "How do I post a job?",
    a: "Log in, tap the map at (or near) your job location, then enter details, photos, and your budget/timeframe.",
  },
  {
    cat: "post",
    q: "How do I know if someone has applied?",
    a: "You’ll receive a push notification and see offers in your job view. Compare profiles, chat, and accept the offer you prefer.",
  },
  {
    cat: "post",
    q: "Can I cancel or reschedule?",
    a: "Yes—manage this in your job view. Please check any applicable cancellation policies before making changes.",
  },

  // Doing Jobs
  {
    cat: "do",
    q: "How do I apply for a job?",
    a: "Log in, browse the map, tap a job, review details, then send your offer with a message and price.",
  },
  {
    cat: "do",
    q: "How are providers verified?",
    a: "We verify identity details and rely on ongoing ratings/reviews to maintain trust and safety in the community.",
  },
  {
    cat: "do",
    q: "What are my tax responsibilities?",
    a: (
      <>
        When providing services on Gumboot, you act as an independent contractor and are responsible for your
        own income tax and GST obligations under New Zealand law (IRD).
      </>
    ),
  },
  {
    cat: "do",
    q: "Do I need to register for GST?",
    a: (
      <>
        You must register if your projected turnover exceeds <strong>$60,000</strong> within 12 months. Consider
        seeking professional advice to determine if/when you should register.
      </>
    ),
  },
  {
    cat: "do",
    q: "What happens if I don’t comply with tax obligations?",
    a: (
      <>
        Failing to meet obligations under the Income Tax Act 2007, the Goods and Services Tax Act 1985, and
        related legislation may result in penalties and interest.
      </>
    ),
  },
];

const CATS = [
  { key: "general", label: "General" },
  { key: "post", label: "Posting Jobs" },
  { key: "do", label: "Doing Jobs" },
] as const;

export default function FAQPage() {
  const [active, setActive] = useState<(typeof CATS)[number]["key"]>("general");
  const faqs = useMemo(() => ALL_QA.filter((x) => x.cat === active), [active]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-slate-50 text-slate-900">
      {/* Hero */}
      <section className="border-b border-slate-200 bg-gradient-to-b from-white to-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-widest text-slate-500">Help Centre</p>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Frequently Asked Questions</h1>
              <p className="mt-2 text-slate-600">
                Quick answers about accounts, posting, doing jobs, payments, and more.
              </p>
            </div>
            <a
              href="/#contact"
              className="self-start rounded-xl bg-slate-900 text-white text-sm px-4 py-2 hover:bg-slate-800"
            >
              Contact support
            </a>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[260px_1fr] gap-10">
          {/* Sidebar tabs */}
          <aside className="hidden lg:block">
            <nav
              aria-label="FAQ categories"
              className="sticky top-24 rounded-xl border border-slate-200 bg-white p-4"
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">Browse</p>
              <ul className="mt-3 space-y-2 text-sm">
                {CATS.map((c) => (
                  <li key={c.key}>
                    <button
                      onClick={() => setActive(c.key)}
                      className={`w-full text-left rounded-md px-2 py-1 transition ${
                        active === c.key
                          ? "bg-slate-900 text-white"
                          : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                      }`}
                      aria-current={active === c.key ? "page" : undefined}
                    >
                      {c.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          {/* Main column */}
          <div>
            {/* Mobile tabs */}
            <div className="lg:hidden mb-6 flex gap-2">
              {CATS.map((c) => (
                <button
                  key={c.key}
                  onClick={() => setActive(c.key)}
                  className={`rounded-full px-4 py-2 text-sm border transition ${
                    active === c.key
                      ? "bg-slate-900 text-white border-slate-900"
                      : "bg-white text-slate-700 border-slate-200"
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>

            <FAQList items={faqs} />
          </div>
        </div>
      </section>
    </main>
  );
}

/** Accessible accordion list */
function FAQList({ items }: { items: QA[] }) {
  return (
    <div className="space-y-4">
      {items.map((item, i) => (
        <details
          key={i}
          className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm open:shadow transition"
        >
          <summary className="flex cursor-pointer select-none items-center justify-between gap-3">
            <h3 className="font-medium text-slate-900">{item.q}</h3>
            <span
              className="ml-2 grid h-6 w-6 place-items-center rounded-full border border-slate-300 text-slate-600 transition group-open:rotate-45"
              aria-hidden="true"
            >
              +
            </span>
          </summary>
          <div className="mt-3 text-slate-700 leading-relaxed">{item.a}</div>
        </details>
      ))}
    </div>
  );
}
