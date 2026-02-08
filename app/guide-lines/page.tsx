// app/guide-lines/page.tsx
// Gumboot Guidelines landing page (Next.js App Router + Tailwind)

export const metadata = {
  title: "Guidelines | Gumboot",
  description:
    "Community guidelines for Gumboot — how to post jobs, work safely, and keep the platform fair for everyone.",
};

const sections = [
  {
    title: "Be respectful",
    points: [
      "No harassment, hate speech, bullying, or discrimination.",
      "No threats, abusive language, or inappropriate messages.",
      "Assume good intent — keep it constructive and calm.",
    ],
  },
  {
    title: "Post honest jobs",
    points: [
      "Describe the job accurately (what, where, when, and what’s included).",
      "Be upfront about pay, timing, and expectations.",
      "Don’t post fake jobs, spam, or “bait-and-switch” listings.",
    ],
  },
  {
    title: "Be fair with payment",
    points: [
      "Agree on scope and price before work starts.",
      "Pay promptly once the job is completed as agreed.",
      "No pressure for unpaid ‘trial’ work or surprise extras.",
    ],
  },
  {
    title: "Be real on profiles",
    points: [
      "Use accurate details and a genuine profile photo (if you add one).",
      "Don’t impersonate others or misrepresent skills/experience.",
      "Keep reviews and ratings honest and relevant.",
    ],
  },
  {
    title: "Safety first",
    points: [
      "Meet in safe places when possible and trust your instincts.",
      "Don’t share sensitive info (passwords, bank logins, one-time codes).",
      "For high-risk work, use proper safety gear and follow local rules.",
    ],
  },
  {
    title: "No prohibited content",
    points: [
      "No illegal services, scams, or fraud.",
      "No stolen goods, counterfeit items, or suspicious requests.",
      "No adult/explicit services or exploitative content.",
    ],
  },
  {
    title: "Resolve issues properly",
    points: [
      "If something goes wrong, communicate clearly and respectfully.",
      "If you can’t resolve it, report it — don’t retaliate.",
      "Repeated misuse may lead to restrictions or removal.",
    ],
  },
];

function SectionCard({
  title,
  points,
}: {
  title: string;
  points: string[];
}) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-neutral-900">{title}</h3>
      <ul className="mt-4 space-y-2 text-neutral-700">
        {points.map((p) => (
          <li key={p} className="flex gap-3">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-900" />
            <span>{p}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function GuidelinesPage() {
  return (
    <main className="min-h-screen bg-neutral-50">
      {/* HERO */}
      <section className="mx-auto max-w-6xl px-4 pt-14 pb-8 sm:pt-16">
        <div className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm sm:p-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-sm text-neutral-700">
                <span className="text-base"></span> Gumboot Community
              </p>
              <h1 className="mt-4 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
                Gumboot Guidelines
              </h1>
              <p className="mt-3 max-w-2xl text-neutral-700">
                Gumboot is a marketplace built on trust, fairness, and respect.
                These guidelines help keep the platform safe and useful for
                everyone — job posters and workers alike.
              </p>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">
              <a
                href="/contact"
                className="inline-flex items-center justify-center rounded-xl bg-neutral-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-90"
              >
                Contact support
              </a>
              <a
                href="/terms"
                className="inline-flex items-center justify-center rounded-xl border border-neutral-200 bg-white px-5 py-3 text-sm font-semibold text-neutral-900 shadow-sm transition hover:bg-neutral-50"
              >
                View Terms
              </a>
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5">
              <p className="text-sm font-semibold text-neutral-900">Be kind</p>
              <p className="mt-1 text-sm text-neutral-700">
                Respectful communication, always.
              </p>
            </div>
            <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5">
              <p className="text-sm font-semibold text-neutral-900">Be honest</p>
              <p className="mt-1 text-sm text-neutral-700">
                Accurate jobs, real profiles, fair reviews.
              </p>
            </div>
            <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5">
              <p className="text-sm font-semibold text-neutral-900">Be safe</p>
              <p className="mt-1 text-sm text-neutral-700">
                Protect your info and report bad behaviour.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="mx-auto max-w-6xl px-4 pb-14">
        <div className="grid gap-5 md:grid-cols-2">
          {sections.map((s) => (
            <SectionCard key={s.title} title={s.title} points={s.points} />
          ))}
        </div>

        {/* REPORT / ENFORCEMENT */}
        <div className="mt-10 rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm sm:p-10">
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900">
            Reporting & enforcement
          </h2>
          <p className="mt-3 text-neutral-700">
            If you see something that violates these guidelines, please report
            it. We may remove content, restrict accounts, or take other action
            when necessary to protect the community.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6">
              <p className="text-sm font-semibold text-neutral-900">
                What to report
              </p>
              <ul className="mt-3 space-y-2 text-sm text-neutral-700">
                <li>• Scams, suspicious requests, or fraud</li>
                <li>• Harassment or abusive behaviour</li>
                <li>• Unsafe or illegal job listings</li>
                <li>• Impersonation or fake profiles</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6">
              <p className="text-sm font-semibold text-neutral-900">
                How to report
              </p>
              <p className="mt-3 text-sm text-neutral-700">
                Use the in-app report button (where available) or contact support
                with screenshots, usernames, and any helpful context.
              </p>
              <a
                href="/support"
                className="mt-4 inline-flex items-center justify-center rounded-xl bg-neutral-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:opacity-90"
              >
                Report an issue
              </a>
            </div>
          </div>

          <p className="mt-8 text-xs text-neutral-500">
            Last updated: {new Date().toLocaleDateString("en-NZ", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </section>
    </main>
  );
}
