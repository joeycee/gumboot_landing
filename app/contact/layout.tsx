import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Gumboot Support",
  description:
    "Contact Gumboot for support, questions, feedback, or help using the platform.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Gumboot Support",
    description:
      "Get in touch with Gumboot for support, feedback, and questions about local jobs and the platform.",
    url: "https://gumboot.app/contact",
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Gumboot Support",
    description:
      "Get in touch with Gumboot for support, feedback, and platform questions.",
    images: ["/og.png"],
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
