import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Gumboot",
  description:
    "Learn about Gumboot's mission to make local work simple, accessible, and trustworthy across New Zealand.",
};

const beliefs = [
  "Anyone should be able to find help quickly",
  "Anyone should be able to earn money on their own terms",
  "Local communities should be more connected",
];

const steps = [
  {
    title: "1. Post a job",
    body: "Describe what you need, add photos, set your budget and location.",
  },
  {
    title: "2. Get offers",
    body: "Local helpers are notified and send through offers with timelines.",
  },
  {
    title: "3. Choose and chat",
    body: "Pick the right person, message in-app, and organise details.",
  },
  {
    title: "4. Pay securely",
    body: "Payments are handled safely, only released when the job is complete.",
  },
];

const needHelp = [
  "Get jobs done faster",
  "Compare offers and reviews",
  "Work with trusted, verified locals",
];

const wantToEarn = [
  "Flexible, on-demand work",
  "No long-term commitments",
  "Turn your skills into income",
];

const trustItems = [
  "Verified user profiles",
  "Ratings and reviews",
  "Secure payments",
  "In-app messaging and support",
];

const visionItems = [
  "Every small job has a simple solution",
  "Every person has access to flexible income",
  "Every community is more connected",
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-white text-slate-900">
      <section className="border-b border-slate-200 bg-[radial-gradient(circle_at_top_left,_rgba(15,23,42,0.05),_transparent_35%),linear-gradient(to_bottom,_white,_rgb(248_250_252))]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">About Gumboot</p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
              A faster, simpler way to get everyday jobs done.
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              Gumboot is building a faster, simpler way to get everyday jobs done by connecting
              people who need help with locals who are ready to get it done.
            </p>
            <p className="mt-4 text-base leading-7 text-slate-600">
              From mowing lawns and moving furniture to cleaning, deliveries, and odd jobs,
              Gumboot turns what used to be frustrating, slow, or unreliable into something
              seamless and local.
            </p>
            <p className="mt-4 text-base leading-7 text-slate-600">
              At its core, Gumboot is about unlocking opportunity for both sides.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/beta"
                className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
              >
                Join Gumboot early
              </Link>
              <Link
                href="/contact"
                className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-900 transition hover:bg-slate-50"
              >
                Contact us
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">Our Mission</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight">To make local work simple, accessible, and trustworthy.</h2>
            <ul className="mt-8 space-y-4">
              {beliefs.map((belief) => (
                <li key={belief} className="flex items-start gap-3 text-slate-700">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-slate-900" />
                  <span>{belief}</span>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-base leading-7 text-slate-600">
              Gumboot exists to remove friction from everyday work: no more endless messaging, no
              more unreliable posts, no more guesswork.
            </p>
          </div>

          <div className="rounded-3xl bg-slate-900 p-8 text-white shadow-sm sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-300">Why We Built Gumboot</p>
            <p className="mt-4 text-xl font-semibold">Finding casual help in New Zealand is still messy.</p>
            <p className="mt-4 leading-7 text-slate-300">
              Facebook groups are hit-or-miss. Classifieds are outdated. And most platforms
              are not built for quick, local jobs.
            </p>
            <p className="mt-4 leading-7 text-slate-300">
              So we built Gumboot, a modern marketplace designed specifically for small jobs,
              local connections, and real people.
            </p>
            <p className="mt-4 leading-7 text-slate-300">
              Instead of scrolling, posting, and hoping for replies, Gumboot makes it structured,
              fast, and reliable.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">How It Works</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight">Simple from start to finish.</h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {steps.map((step) => (
              <article key={step.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{step.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-2">
            <article className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">Built for Both Sides</p>
              <h2 className="mt-3 text-2xl font-bold tracking-tight">For people who need help</h2>
              <ul className="mt-6 space-y-3 text-slate-700">
                {needHelp.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-slate-900" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>

            <article className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">Built for Both Sides</p>
              <h2 className="mt-3 text-2xl font-bold tracking-tight">For people who want to earn</h2>
              <ul className="mt-6 space-y-3 text-slate-700">
                {wantToEarn.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-slate-900" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section className="bg-slate-900 py-16 text-white sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-300">Trust and Safety</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight">Trust is everything in a local marketplace.</h2>
            <p className="mt-5 leading-7 text-slate-300">
              We are building a platform where people feel confident working with someone down the road.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {trustItems.map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="font-medium">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <article className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">Built in New Zealand</p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight">Proudly built for New Zealand.</h2>
            <p className="mt-5 leading-7 text-slate-600">
              We are starting local because we believe the best marketplaces begin with strong communities.
            </p>
            <p className="mt-4 leading-7 text-slate-600">
              From Auckland to small towns, Gumboot is designed to work the way Kiwis live, work,
              and help each other.
            </p>
          </article>

          <article className="rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">Where We&apos;re Going</p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight">We are just getting started.</h2>
            <p className="mt-5 leading-7 text-slate-600">
              Our vision is to become the go-to platform for local work, where:
            </p>
            <ul className="mt-6 space-y-3 text-slate-700">
              {visionItems.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-slate-900" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">Join Us</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight">Whether you need help or want to earn, Gumboot is built for you.</h2>
          <p className="mt-5 text-base leading-7 text-slate-600">
            Get involved early, shape the platform, and be part of building something local.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/beta"
              className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              Get the app
            </Link>
            <Link
              href="/contact"
              className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-medium text-slate-900 transition hover:bg-slate-50"
            >
              Talk to the team
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
