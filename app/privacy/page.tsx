// app/privacy/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy • Gumboot",
  description: "How Gumboot collects, uses, and protects your information.",
};

const sections = [
  { id: "intro", title: "Introduction" },
  { id: "data-we-collect", title: "Data We Collect" },
  { id: "how-we-use", title: "How We Use Your Data" },
  { id: "payments", title: "Payments & Security" },
  { id: "sharing", title: "Sharing & Third Parties" },
  { id: "retention", title: "Data Retention" },
  { id: "your-rights", title: "Your Rights & Choices" },
  { id: "children", title: "Children’s Privacy" },
  { id: "changes", title: "Changes to This Policy" },
  { id: "contact", title: "Contact Us" },
];

export default function PrivacyPage() {
  const lastUpdated = "13 November 2025";

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900">
      {/* Hero */}
      <section className="border-b border-slate-200 bg-gradient-to-b from-white to-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-widest text-slate-500">Gumboot</p>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Privacy Policy</h1>
              <p className="mt-2 text-slate-600">
                Last updated: {lastUpdated} • Applies to gumboot.app websites and apps
              </p>
            </div>
            <a
              href="#contact"
              className="self-start rounded-xl bg-slate-900 text-white text-sm px-4 py-2 hover:bg-slate-800"
            >
              Contact us
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
            {/* Helper: section card */}
            <PolicySection id="intro" title="Introduction">
              <p>
                This Privacy Policy explains how <strong>Gumboot App Limited</strong> (“Gumboot”,
                “we”, “us”, or “our”) collects, uses, and protects your information when you use our
                websites, mobile apps, and related services (together, the “Services”). By using the
                Services, you agree to the practices described here.
              </p>
            </PolicySection>

            <PolicySection id="data-we-collect" title="Data We Collect">
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Account & Profile:</strong> name, email, phone number, profile details,
                  location you provide, preferences.
                </li>
                <li>
                  <strong>Content:</strong> job posts, messages, reviews, photos you upload.
                </li>
                <li>
                  <strong>Device & Usage:</strong> app version, device type, IP, pages/screens
                  viewed, interactions, diagnostics, cookies or similar technologies.
                </li>
                <li>
                  <strong>Location (optional):</strong> if you grant permission for location-based
                  features.
                </li>
                <li>
                  <strong>Payments:</strong> processed by our payment partners; we do not store full
                  card numbers on our servers.
                </li>
              </ul>
            </PolicySection>

            <PolicySection id="how-we-use" title="How We Use Your Data">
              <ul className="list-disc pl-5 space-y-2">
                <li>Provide and improve the Services, including matching posters and helpers.</li>
                <li>Enable secure payments, dispute support, and customer service.</li>
                <li>Personalise content, recommendations, and communications.</li>
                <li>
                  Monitor safety, detect fraud or abuse, and enforce our Terms and community
                  guidelines.
                </li>
                <li>Comply with legal obligations and respond to lawful requests.</li>
              </ul>
            </PolicySection>

            <PolicySection id="payments" title="Payments & Security">
              <p>
                Payments are facilitated by trusted providers (e.g., Stripe). Card data is handled
                and stored by those providers in accordance with PCI-DSS standards. Gumboot
                receives limited payment metadata (e.g., status, last 4 digits, expiry month/year)
                to operate the Service and for receipts, refunds, or dispute resolution. We apply
                technical and organisational safeguards to protect your data; however, no method of
                transmission or storage is 100% secure.
              </p>
            </PolicySection>

            <PolicySection id="sharing" title="Sharing & Third Parties">
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Other users:</strong> information you choose to share (e.g., profile, job
                  details, messages, reviews) is visible to the relevant parties.
                </li>
                <li>
                  <strong>Service providers:</strong> vendors who help us operate (hosting, analytics,
                  payments, communications) under contracts that protect your information.
                </li>
                <li>
                  <strong>Legal & safety:</strong> if required by law, regulation, or to protect rights,
                  property, or safety of users, the public, or Gumboot.
                </li>
                <li>
                  <strong>Business transfers:</strong> as part of a merger, acquisition, or sale of
                  assets, subject to this Policy or a successor policy with notice.
                </li>
              </ul>
            </PolicySection>

            <PolicySection id="retention" title="Data Retention">
              <p>
                We keep your information only as long as needed for the purposes in this Policy,
                including providing the Services, complying with legal obligations, resolving
                disputes, and enforcing agreements. When no longer required, we take steps to delete
                or de-identify it.
              </p>
            </PolicySection>

            <PolicySection id="your-rights" title="Your Rights & Choices">
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Access & update:</strong> view or edit your profile and settings in the app.
                </li>
                <li>
                  <strong>Marketing:</strong> opt out of non-essential emails via the unsubscribe link.
                </li>
                <li>
                  <strong>Permissions:</strong> you can revoke device permissions (e.g., location) at
                  any time in your OS settings.
                </li>
                <li>
                  <strong>Requests:</strong> contact us to request access, correction, or deletion,
                  subject to applicable law and legitimate interests (e.g., fraud prevention).
                </li>
              </ul>
            </PolicySection>

            <PolicySection id="children" title="Children’s Privacy">
              <p>
                Gumboot is not intended for individuals under 16. We do not knowingly collect
                personal information from children. If you believe a child has provided personal
                data, please contact us so we can take appropriate action.
              </p>
            </PolicySection>

            <PolicySection id="changes" title="Changes to This Policy">
              <p>
                We may update this Privacy Policy from time to time. We’ll post the updated version
                and revise the “Last updated” date above. Material changes may be communicated by
                additional notice (e.g., email or in-app prompt).
              </p>
            </PolicySection>

            <PolicySection id="contact" title="Contact Us">
              <p>
                If you have questions or requests about this Privacy Policy, please contact:
              </p>
              <ul className="mt-2 space-y-1 text-sm">
                <li>
                  <span className="font-medium">Email:</span>{" "}
                  <a className="underline" href="mailto:support@gumboot.app">
                    support@gumboot.app
                  </a>
                </li>
                <li>
                  <span className="font-medium">Company:</span> Gumboot App Limited (New Zealand)
                </li>
              </ul>
            </PolicySection>
          </div>
        </div>
      </section>
    </main>
  );
}

/** Simple section block with consistent styling */
function PolicySection({
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
        <h2 className="text-xl font-semibold">{title}</h2>
        <div className="mt-3 prose prose-slate max-w-none prose-p:leading-relaxed prose-li:leading-relaxed">
          {children}
        </div>
      </div>
    </section>
  );
}
