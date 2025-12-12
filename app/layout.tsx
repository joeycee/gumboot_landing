import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "Gumboot — Get local jobs done",
  description:
    "Gumboot connects people who need a hand with locals who can help — mowing, moving, cleaning, painting, delivery and more.",
  openGraph: {
    title: "Gumboot",
    description: "Get local jobs done. Fast.",
    url: "https://gumboot.app",
    siteName: "Gumboot",
    images: ["/og.png"],
  },
  twitter: { card: "summary_large_image" },
  metadataBase: new URL("https://gumboot.app"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-b from-white to-slate-50 text-slate-900">

        {/* Header must be inside <body> */}
        <Header />

        {children}

        {/* Global footer */}
        <Footer />

      </body>
    </html>
  );
}
