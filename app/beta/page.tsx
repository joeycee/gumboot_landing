import { getLatestAppRelease } from "@/lib/appRelease";
import { FaApple, FaAndroid } from "react-icons/fa";

export default async function BetaPage() {
  const release = await getLatestAppRelease();

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-slate-50 text-slate-900">
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-xl px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <header className="mb-10 text-center">
            <p className="text-xs uppercase tracking-widest text-slate-500">
              Beta Testing
            </p>
            <h1 className="mt-1 text-4xl font-bold tracking-tight text-slate-900">
              Gumboot App Releases
            </h1>
            <p className="mt-4 text-slate-600">
              Get early access to the Gumboot app before launch. Download the latest Android beta or join our iOS TestFlight.
            </p>
          </header>

          {/* Release Card */}
          <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-lg backdrop-blur-sm">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-slate-900">
                Latest Release — v{release.version}
              </h2>
              <p className="text-sm text-slate-600 mt-1">{release.name}</p>
            </div>

            {/* Buttons */}
            <div className="mt-8 space-y-4">
              {release.android_build && (
                <a
                  href={release.android_build}
                  className="group flex items-center justify-center gap-3 w-full rounded-xl border border-slate-300 py-3 text-sm font-medium bg-gradient-to-r from-slate-50 to-white hover:from-slate-100 hover:to-white transition shadow-sm hover:shadow"
                >
                  <FaAndroid className="text-green-600 text-xl group-hover:scale-110 transition" />
                  <span>Download Android APK</span>
                </a>
              )}

              {release.ios_testflight_url && (
                <a
                  href={release.ios_testflight_url}
                  className="group flex items-center justify-center gap-3 w-full rounded-xl border border-slate-300 py-3 text-sm font-medium bg-gradient-to-r from-slate-50 to-white hover:from-slate-100 hover:to-white transition shadow-sm hover:shadow"
                >
                  <FaApple className="text-black text-xl group-hover:scale-110 transition" />
                  <span>Join iOS TestFlight</span>
                </a>
              )}
            </div>

            {/* Notes */}
            {release.notes && (
              <div className="mt-8 text-sm text-slate-700 whitespace-pre-line">
                <h3 className="font-semibold mb-2 text-slate-900">Release Notes</h3>
                <div className="rounded-xl bg-slate-50 p-4 border border-slate-200 leading-relaxed shadow-inner">
                  {release.notes}
                </div>
              </div>
            )}

            {/* Metadata */}
            <p className="mt-8 text-xs text-slate-500 text-center">
              Released on{" "}
              {new Date(release.created_at).toLocaleDateString("en-NZ", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </p>
          </div>

          {/* Footer Note */}
          <p className="mt-10 text-center text-xs text-slate-500">
            Thanks for helping shape the Gumboot experience.
          </p>
        </div>
      </section>
    </main>
  );
}
