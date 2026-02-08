// app/terms/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use • Gumboot",
  description: "The terms that govern your use of Gumboot’s websites and apps.",
};

const sections = [
  { id: "acceptance", title: "1. Acceptance of Terms" },
  { id: "eligibility", title: "2. Eligibility & Accounts" },
  { id: "conduct", title: "3. User Conduct & Community Rules" },
  { id: "jobs", title: "4. Posting & Doing Jobs" },
  { id: "payments", title: "5. Payments, Fees & Refunds" },
  { id: "cancellations", title: "6. Cancellations & Disputes" },
  { id: "reviews", title: "7. Ratings & Reviews" },
  { id: "safety", title: "8. Safety, Verification & Compliance" },
  { id: "ip", title: "9. Intellectual Property" },
  { id: "license", title: "10. License & Acceptable Use" },
  { id: "thirdparties", title: "11. Third-Party Services" },
  { id: "disclaimers", title: "12. Disclaimers" },
  { id: "liability", title: "13. Limitation of Liability" },
  { id: "indemnity", title: "14. Indemnification" },
  { id: "termination", title: "15. Suspension & Termination" },
  { id: "law", title: "16. Governing Law" },
  { id: "changes", title: "17. Changes to These Terms" },
  { id: "contact", title: "18. Contact" },
];

export default function TermsPage() {
  const effectiveDate = "13 November 2025";

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900">
      {/* Hero */}
      <section className="border-b border-slate-200 bg-gradient-to-b from-white to-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-widest text-slate-500">Gumboot</p>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Terms of Use</h1>
              <p className="mt-2 text-slate-600">
                Effective: {effectiveDate} • Applies to gumboot.app websites and apps
              </p>
            </div>
            <a
              href="/privacy"
              className="self-start rounded-xl bg-slate-900 text-white text-sm px-4 py-2 hover:bg-slate-800"
            >
              Privacy Policy
            </a>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[260px_1fr] gap-10">
          {/* TOC */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 rounded-xl border border-slate-200 bg-white p-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                On this page
              </p>
              <nav className="mt-3">
                <ul className="space-y-2 text-sm">
                  {sections.map((s) => (
                    <li key={s.id}>
                      <a
                        href={`#${s.id}`}
                        className="block rounded-md px-2 py-1 text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                      >
                        {s.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </aside>

          {/* Content */}
          <div className="space-y-8">
            <T id="acceptance" title="1. Acceptance of Terms">
              By accessing or using Gumboot’s websites, mobile apps, or related services (“Services”),
              you agree to these Terms of Use (“Terms”). If you do not agree, do not use the Services.
              You also agree to any policies referenced here (e.g., Privacy Policy) and any feature-specific terms.
            </T>

            <T id="eligibility" title="2. Eligibility & Accounts">
              <ul className="list-disc pl-5 space-y-2">
                <li>You must be at least 16 years old to use the Services.</li>
                <li>You are responsible for your account security and all activity under it.</li>
                <li>Provide accurate information and keep it up-to-date.</li>
              </ul>
            </T>

            <T id="conduct" title="3. User Conduct & Community Rules">
              <ul className="list-disc pl-5 space-y-2">
                <li>No illegal, fraudulent, harmful, or abusive activity.</li>
                <li>No harassment, hate speech, or sharing others’ private information.</li>
                <li>Respect local laws, property, and safety guidelines.</li>
                <li>Use the platform only to post or complete lawful services.</li>
              </ul>
            </T>

            <T id="jobs" title="4. Posting & Doing Jobs">
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  Posters must provide clear, accurate job details (scope, timing, location, budget).
                </li>
                <li>
                  Providers (“Taskers”) are independent contractors—not employees of Gumboot—and are
                  solely responsible for their tools, skills, time, and compliance with law.
                </li>
                <li>
                  Either party may communicate via in-app messaging to clarify details before accepting an offer.
                </li>
              </ul>
            </T>

            <T id="payments" title="5. Payments, Fees & Refunds">
              <p>
                Payments are facilitated by our payment partners (e.g., Stripe). Funds may be held in escrow
                until completion. Fees and charges (including service fees) are displayed before you confirm.
                Refunds, adjustments, or chargebacks are handled per our policies and the payment partner’s rules.
              </p>
            </T>

            <T id="cancellations" title="6. Cancellations & Disputes">
              <ul className="list-disc pl-5 space-y-2">
                <li>Cancellation terms may vary by job status and timing.</li>
                <li>
                  If a dispute arises, contact us promptly with details. We may request evidence (messages,
                  photos) to help assess a resolution but do not guarantee outcomes.
                </li>
              </ul>
            </T>

            <T id="reviews" title="7. Ratings & Reviews">
              <p>
                Reviews must be fair, accurate, and relevant to the job. We may moderate or remove content that
                violates these Terms or our community standards.
              </p>
            </T>

            <T id="safety" title="8. Safety, Verification & Compliance">
              <ul className="list-disc pl-5 space-y-2">
                <li>We may implement identity or eligibility checks; completing checks does not guarantee safety.</li>
                <li>Follow applicable health, safety, licensing, and insurance requirements for your work.</li>
                <li>Do not perform hazardous tasks you’re unqualified or unlicensed to perform.</li>
              </ul>
            </T>

            <T id="ip" title="9. Intellectual Property">
              <p>
                The Services, trademarks, and content are owned by Gumboot or its licensors and are protected by
                IP laws. You may not copy, modify, distribute, reverse engineer, or create derivative works except
                as permitted by law or with our written permission.
              </p>
            </T>

            <T id="license" title="10. License & Acceptable Use">
              <p>
                We grant you a limited, non-exclusive, non-transferable, revocable license to use the Services for
                their intended purpose. You agree not to misuse the Services (e.g., spam, scraping, interfering with
                security, or circumventing features).
              </p>
            </T>

            <T id="thirdparties" title="11. Third-Party Services">
              <p>
                We may link to or integrate third-party services. We are not responsible for their content, policies,
                or practices. Use them at your own discretion and review their terms.
              </p>
            </T>

            <T id="disclaimers" title="12. Disclaimers">
              <p className="text-sm">
                To the extent permitted by law, the Services are provided “as is” and “as available,” without warranties
                of any kind, express or implied (including fitness, merchantability, non-infringement, or accuracy).
                We do not guarantee continuous, error-free, or secure operation.
              </p>
            </T>

            <T id="liability" title="13. Limitation of Liability">
              <p className="text-sm">
                To the maximum extent permitted by law, Gumboot and its directors, officers, employees, and agents
                will not be liable for any indirect, incidental, special, consequential, exemplary, or punitive damages,
                or for loss of profits, data, or goodwill, arising from or related to your use of the Services.
              </p>
            </T>

            <T id="indemnity" title="14. Indemnification">
              <p className="text-sm">
                You agree to indemnify and hold harmless Gumboot from any claims, losses, liabilities, and expenses
                (including reasonable legal fees) arising from your use of the Services, your content, or your breach
                of these Terms or applicable law.
              </p>
            </T>

            <T id="termination" title="15. Suspension & Termination">
              <p>
                We may suspend or terminate access to the Services at any time for suspected violations of these Terms,
                illegal activity, or to protect users or our platform. You may stop using the Services at any time.
              </p>
            </T>

            <T id="law" title="16. Governing Law">
              <p>
                These Terms are governed by the laws of New Zealand. You agree to the exclusive jurisdiction of the
                New Zealand courts for any disputes, subject to any mandatory local consumer protections that apply.
              </p>
            </T>

            <T id="changes" title="17. Changes to These Terms">
              <p>
                We may update these Terms periodically. The updated version will be posted here with a new effective date.
                Material changes may be communicated via additional notice (e.g., email or in-app prompt).
              </p>
            </T>

            <T id="contact" title="18. Contact">
              <ul className="mt-2 space-y-1 text-sm">
                <li>
                  <span className="font-medium">Email:</span>{" "}
                  <a className="underline" href="mailto:hello@gumboot.app">
                    hello@gumboot.app
                  </a>
                </li>
                <li>
                  <span className="font-medium">Company:</span> Gumboot App Limited (New Zealand)
                </li>
              </ul>
            </T>
          </div>
        </div>
      </section>
    </main>
  );
}

/** Reusable section card */
function T({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg sm:text-xl font-semibold">{title}</h2>
        <div className="mt-3 prose prose-slate max-w-none prose-p:leading-relaxed prose-li:leading-relaxed">
          {children}
        </div>
      </div>
    </section>
  );
}
