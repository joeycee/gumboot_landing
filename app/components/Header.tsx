"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useMemo } from "react";

type NavItem = { label: string; href: string; type?: "anchor" | "route" };

const NAV_ITEMS: NavItem[] = [
  { label: "Features", href: "https://gumboot.app#features", type: "anchor" },
  { label: "FAQ", href: "https://gumboot.app/faq", type: "anchor" },
  { label: "Contact", href: "https://gumboot.app/contact", type: "anchor" },
  { label: "Beta", href: "https://gumboot.app/beta", type: "route" },
  { label: "Blogs", href: "https://gumboot.app/blog", type: "route" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // If not on "/", anchor links should go to "/#id"
  const normalizeHref = (item: NavItem) =>
    item.type === "anchor" ? (pathname === "/" ? item.href : `/${item.href}`) : item.href;

  const isActive = (href: string) => href.startsWith("/") && href === pathname;

  const desktopNav = useMemo(
    () =>
      NAV_ITEMS.map((item) => {
        const link = normalizeHref(item);
        const active = isActive(link);
        return (
          <Link
            key={item.label}
            href={link}
            className={`text-sm transition ${
              active ? "text-slate-900 font-semibold" : "text-slate-700 hover:text-slate-900"
            }`}
            onClick={() => setOpen(false)}
          >
            {item.label}
          </Link>
        );
      }),
    [pathname] // eslint-disable-line react-hooks/exhaustive-deps
  );

  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-white/70 border-b border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <img src="/logo/logo.png" alt="Gumboot app logo" className="h-16 w-auto" />
            <span className="font-semibold text-slate-900">Gumboot</span>
          </Link>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">{desktopNav}</nav>

        {/* Right side CTA */}
        <div className="hidden sm:flex items-center gap-3">
          <Link href="/contact" className="text-sm hover:underline">
            Support
          </Link>
          <Link
            href="/beta"
            className="rounded-xl px-4 py-2 text-sm font-medium bg-slate-900 text-white hover:bg-slate-800"
          >
            Get the app
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden inline-flex items-center justify-center rounded-lg p-2 text-slate-700 hover:bg-slate-100"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden border-t border-slate-200 bg-white/90 backdrop-blur">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 flex flex-col gap-2">
            {NAV_ITEMS.map((item) => {
              const link = normalizeHref(item);
              const active = isActive(link);
              return (
                <Link
                  key={item.label}
                  href={link}
                  className={`py-2 ${
                    active ? "text-slate-900 font-semibold" : "text-slate-700 hover:text-slate-900"
                  }`}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}
            <div className="pt-2 border-t border-slate-200 mt-2 flex items-center gap-3">
              <Link href="/support" className="text-sm hover:underline">
                Support
              </Link>
              <Link
                href="/beta"
                className="rounded-xl px-3 py-1.5 text-sm font-medium bg-slate-900 text-white hover:bg-slate-800"
                onClick={() => setOpen(false)}
              >
                Get the app
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
