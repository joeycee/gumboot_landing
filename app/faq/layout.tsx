import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Find answers about Gumboot accounts, posting jobs, applying for work, payments, verification, and support.",
  alternates: {
    canonical: "/faq",
  },
  openGraph: {
    title: "Gumboot Frequently Asked Questions",
    description:
      "Find answers about Gumboot accounts, jobs, payments, verification, and support.",
    url: "https://gumboot.app/faq",
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gumboot Frequently Asked Questions",
    description:
      "Find answers about Gumboot accounts, jobs, payments, verification, and support.",
    images: ["/og.png"],
  },
};

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return children;
}
