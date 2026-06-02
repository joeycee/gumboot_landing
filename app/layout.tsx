import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: {
    default: "Gumboot | Trusted Local Jobs and Help Across New Zealand",
    template: "%s | Gumboot",
  },
  description:
    "Post local jobs, compare offers, chat with verified helpers, and pay securely on Gumboot's live web app across New Zealand.",
  applicationName: "Gumboot",
  openGraph: {
    title: "Gumboot",
    description:
      "Post local jobs, compare offers, and work with trusted helpers through Gumboot.",
    url: "https://gumboot.app",
    siteName: "Gumboot",
    images: ["/og.png"],
    locale: "en_NZ",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gumboot",
    description:
      "Post local jobs, compare offers, and pay securely through Gumboot.",
    images: ["/og.png"],
  },
  metadataBase: new URL("https://gumboot.app"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/icon.png",
    apple: "/logo/logo.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const organizationStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Gumboot",
    url: "https://gumboot.app",
    logo: "https://gumboot.app/logo/logo.png",
    email: "hello@gumboot.app",
    sameAs: [],
  };

  const websiteStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Gumboot",
    url: "https://gumboot.app",
    inLanguage: "en-NZ",
  };

  return (
    <html lang="en">
      <body className="bg-gradient-to-b from-white to-slate-50 text-slate-900">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationStructuredData) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteStructuredData) }}
        />

        {/* Header must be inside <body> */}
        <Header />

        {children}

        {/* Global footer */}
        <Footer />

      </body>
    </html>
  );
}
