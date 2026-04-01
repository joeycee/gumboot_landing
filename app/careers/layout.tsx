import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers at Gumboot",
  description:
    "Interested in helping bring Gumboot to market? Reach out through our careers form.",
};

export default function CareersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
