// app/components/Footer.tsx
"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer id="contact" className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-8 text-sm">
        <div>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-slate-900 text-white grid place-items-center font-bold">
              G
            </div>
            <span className="font-semibold">Gumboot</span>
          </div>
          <p className="mt-3 text-slate-600">
            NZ-based support • hello@gumboot.app
          </p>
        </div>

        <div>
          <h4 className="font-semibold">Company</h4>
          <ul className="mt-3 space-y-2">
            <li>
              <Link className="hover:underline" href="/about">
                About
              </Link>
            </li>
            <li>
              <Link className="hover:underline" href="/blog">
                Blog
              </Link>
            </li>
            <li>
              <Link className="hover:underline" href="/careers">
                Careers
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold">Legal</h4>
          <ul className="mt-3 space-y-2">
            <li>
              <Link className="hover:underline" href="/privacy">
                Privacy
              </Link>
            </li>
            <li>
              <Link className="hover:underline" href="/terms">
                Terms
              </Link>
            </li>
            <li>
              <Link className="hover:underline" href="/guide-lines">
                Guidelines
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold">Get the app</h4>
          <ul className="mt-3 space-y-2">
            <li>
              <a className="hover:underline" href="/beta">
                Download beta
              </a>
            </li>
            <li>
              <Link className="hover:underline" href="/beta">
                Beta &amp; release notes
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="px-4 sm:px-6 lg:px-8 text-xs text-slate-500 pb-10">
        © {new Date().getFullYear()} Gumboot App Limited. All rights reserved.
      </div>
    </footer>
  );
}
