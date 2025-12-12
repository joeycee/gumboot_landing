"use client";

import { useEffect, useState } from "react";
import {
  type SiteConfig,
  type BlogPost,
} from "../config/siteConfig";

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASS || "gumboot-admin";

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");

  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  /* ---------- Auth ---------- */
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === ADMIN_PASSWORD) {
      setAuthed(true);
    } else {
      alert("Incorrect admin password.");
    }
  };

  /* ---------- Load config from API once authed ---------- */
  useEffect(() => {
    if (!authed) return;

    const loadConfig = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch("/api/admin/config");
        if (!res.ok) {
          throw new Error(`Failed to load config (${res.status})`);
        }
        const data = (await res.json()) as SiteConfig;
        setConfig(data);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Could not load config.");
      } finally {
        setLoading(false);
      }
    };

    loadConfig();
  }, [authed]);

  /* ---------- Hero handlers ---------- */
  const handleHeroChange = (field: keyof SiteConfig["hero"], value: string) => {
    if (!config) return;
    setConfig((prev) =>
      prev
        ? {
            ...prev,
            hero: {
              ...prev.hero,
              [field]: value,
            },
          }
        : prev
    );
  };

  /* ---------- Features handlers ---------- */
  const handleFeatureChange = (
    index: number,
    field: keyof SiteConfig["features"][number],
    value: string
  ) => {
    if (!config) return;
    setConfig((prev) => {
      if (!prev) return prev;
      const next = [...prev.features];
      next[index] = { ...next[index], [field]: value };
      return { ...prev, features: next };
    });
  };

  const addFeature = () => {
    if (!config) return;
    setConfig((prev) =>
      prev
        ? {
            ...prev,
            features: [
              ...prev.features,
              {
                title: "New feature",
                desc: "Describe this feature.",
              },
            ],
          }
        : prev
    );
  };

  const removeFeature = (index: number) => {
    if (!config) return;
    setConfig((prev) => {
      if (!prev) return prev;
      const next = [...prev.features];
      next.splice(index, 1);
      return { ...prev, features: next };
    });
  };

  /* ---------- Blog handlers ---------- */
  const handleBlogChange = (
    index: number,
    field: keyof BlogPost,
    value: string
  ) => {
    if (!config) return;
    setConfig((prev) => {
      if (!prev) return prev;
      const next = [...prev.blogs];
      next[index] = { ...next[index], [field]: value };
      return { ...prev, blogs: next };
    });
  };

  const addBlog = () => {
    if (!config) return;
    setConfig((prev) =>
      prev
        ? {
            ...prev,
            blogs: [
              ...prev.blogs,
              {
                id: `post-${prev.blogs.length + 1}`,
                slug: `new-post-${prev.blogs.length + 1}`,
                title: "New post title",
                excerpt: "Short summary for this post.",
                image: "/blog/your-image.jpg",
                body:
                  "Write your blog post content here.\n\nUse blank lines to create new paragraphs.",
                publishedAt: new Date().toISOString().slice(0, 10),
              },
            ],
          }
        : prev
    );
  };

  const removeBlog = (index: number) => {
    if (!config) return;
    setConfig((prev) => {
      if (!prev) return prev;
      const next = [...prev.blogs];
      next.splice(index, 1);
      return { ...prev, blogs: next };
    });
  };

  /* ---------- Save to API ---------- */
  const handleSave = async () => {
    if (!config) return;
    try {
      setSaving(true);
      setError(null);
      const res = await fetch("/api/admin/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config),
      });
      if (!res.ok) {
        throw new Error(`Failed to save config (${res.status})`);
      }
      alert("Saved changes ✅");
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Could not save config.");
      alert("Could not save changes.");
    } finally {
      setSaving(false);
    }
  };

  /* ---------- Copy JSON ---------- */
  const handleCopy = async () => {
    if (!config) return;
    try {
      await navigator.clipboard.writeText(JSON.stringify(config, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error(err);
      alert("Could not copy JSON to clipboard.");
    }
  };

  /* ---------- Login screen ---------- */
  if (!authed) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-50 flex items-center justify-center px-4">
        <div className="w-full max-w-sm rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl">
          <h1 className="text-lg font-semibold text-slate-50">Gumboot Admin</h1>
          <p className="mt-1 text-xs text-slate-400">
            Enter the admin password to configure hero, features and blog
            content.
          </p>
          <form onSubmit={handleLogin} className="mt-4 space-y-3">
            <div>
              <label className="block text-xs font-medium text-slate-300">
                Admin password
              </label>
              <input
                type="password"
                className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-50 outline-none focus:ring-2 focus:ring-slate-500"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-xl bg-slate-50 text-slate-900 text-sm font-medium py-2.5 hover:bg-white"
            >
              Enter admin
            </button>
          </form>
        </div>
      </main>
    );
  }

  /* ---------- Loading / error states ---------- */
  if (loading || !config) {
    return (
      <main className="min-h-screen bg-slate-950 text-slate-50 flex items-center justify-center">
        <p className="text-sm text-slate-400">
          {error ? `Error: ${error}` : "Loading config…"}
        </p>
      </main>
    );
  }

  /* ---------- Admin UI ---------- */
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <section className="py-10 sm:py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <header className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-widest text-slate-500">
                Internal
              </p>
              <h1 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight">
                Gumboot site admin
              </h1>
              <p className="mt-2 text-sm text-slate-400 max-w-2xl">
                Tweak hero copy, home-page features and blog posts. Click{" "}
                <span className="font-semibold text-slate-200">
                  Save changes
                </span>{" "}
                to persist to the database.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleCopy}
                className="rounded-xl bg-slate-800 text-slate-50 text-xs font-medium px-3 py-2 hover:bg-slate-700"
              >
                {copied ? "Copied ✓" : "Copy JSON"}
              </button>
              <button
                type="button"
                onClick={handleSave}
                disabled={saving}
                className="rounded-xl bg-emerald-500 text-slate-950 text-xs font-semibold px-4 py-2 hover:bg-emerald-400 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {saving ? "Saving…" : "Save changes"}
              </button>
            </div>
          </header>

          <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.2fr)]">
            {/* LEFT: Forms */}
            <div className="space-y-6">
              {/* Hero config */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-lg">
                <h2 className="text-lg font-semibold text-slate-50">
                  Hero section
                </h2>
                <p className="mt-1 text-xs text-slate-400">
                  Controls the main heading, subheading and CTA labels on the
                  homepage.
                </p>

                <div className="mt-4 space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300">
                      Title (first line)
                    </label>
                    <input
                      type="text"
                      className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-50 outline-none focus:ring-2 focus:ring-slate-500"
                      value={config.hero.title}
                      onChange={(e) =>
                        handleHeroChange("title", e.target.value)
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300">
                      Highlight (second word/line)
                    </label>
                    <input
                      type="text"
                      className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-50 outline-none focus:ring-2 focus:ring-slate-500"
                      value={config.hero.highlight}
                      onChange={(e) =>
                        handleHeroChange("highlight", e.target.value)
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300">
                      Subtitle
                    </label>
                    <textarea
                      className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-50 outline-none focus:ring-2 focus:ring-slate-500"
                      rows={3}
                      value={config.hero.subtitle}
                      onChange={(e) =>
                        handleHeroChange("subtitle", e.target.value)
                      }
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-300">
                        App Store label
                      </label>
                      <input
                        type="text"
                        className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-50 outline-none focus:ring-2 focus:ring-slate-500"
                        value={config.hero.appStoreLabel}
                        onChange={(e) =>
                          handleHeroChange("appStoreLabel", e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-300">
                        Play Store label
                      </label>
                      <input
                        type="text"
                        className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-50 outline-none focus:ring-2 focus:ring-slate-500"
                        value={config.hero.playStoreLabel}
                        onChange={(e) =>
                          handleHeroChange("playStoreLabel", e.target.value)
                        }
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300">
                      Tagline (small text under buttons)
                    </label>
                    <input
                      type="text"
                      className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-50 outline-none focus:ring-2 focus:ring-slate-500"
                      value={config.hero.tagline}
                      onChange={(e) =>
                        handleHeroChange("tagline", e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>

              {/* Features config */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-lg">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-semibold text-slate-50">
                      Features grid
                    </h2>
                    <p className="mt-1 text-xs text-slate-400">
                      Cards shown under &quot;Everything you need to get it
                      done&quot; on the homepage.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={addFeature}
                    className="rounded-xl bg-slate-100 text-slate-900 text-xs font-medium px-3 py-1.5 hover:bg-white"
                  >
                    + Add feature
                  </button>
                </div>

                <div className="mt-4 space-y-4">
                  {config.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="rounded-xl border border-slate-800 bg-slate-950/40 p-4 space-y-3"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-xs font-semibold text-slate-400">
                          Feature {idx + 1}
                        </p>
                        <button
                          type="button"
                          onClick={() => removeFeature(idx)}
                          className="rounded-lg border border-red-500/30 bg-red-500/10 px-2 py-1 text-[11px] font-medium text-red-200 hover:bg-red-500/20"
                        >
                          Remove
                        </button>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-300">
                          Title
                        </label>
                        <input
                          type="text"
                          className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-50 outline-none focus:ring-2 focus:ring-slate-500"
                          value={feature.title}
                          onChange={(e) =>
                            handleFeatureChange(idx, "title", e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-300">
                          Description
                        </label>
                        <textarea
                          className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-50 outline-none focus:ring-2 focus:ring-slate-500"
                          rows={2}
                          value={feature.desc}
                          onChange={(e) =>
                            handleFeatureChange(idx, "desc", e.target.value)
                          }
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Blog posts config */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-lg">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-semibold text-slate-50">
                      Blog posts
                    </h2>
                    <p className="mt-1 text-xs text-slate-400">
                      Posts shown on <code>/blog</code> and{" "}
                      <code>/blog/[slug]</code>.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={addBlog}
                    className="rounded-xl bg-slate-100 text-slate-900 text-xs font-medium px-3 py-1.5 hover:bg-white"
                  >
                    + Add post
                  </button>
                </div>

                <div className="mt-4 space-y-4">
                  {config.blogs.map((post, idx) => (
                    <div
                      key={post.id || idx}
                      className="rounded-xl border border-slate-800 bg-slate-950/40 p-4 space-y-3"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-xs font-semibold text-slate-400">
                          Post {idx + 1}
                        </p>
                        <button
                          type="button"
                          onClick={() => removeBlog(idx)}
                          className="rounded-lg border border-red-500/30 bg-red-500/10 px-2 py-1 text-[11px] font-medium text-red-200 hover:bg-red-500/20"
                        >
                          Remove
                        </button>
                      </div>

                      {/* Title + Slug */}
                      <div className="grid md:grid-cols-[2fr_1.2fr] gap-3">
                        <div>
                          <label className="block text-xs font-medium text-slate-300">
                            Title
                          </label>
                          <input
                            type="text"
                            className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-50 outline-none focus:ring-2 focus:ring-slate-500"
                            value={post.title}
                            onChange={(e) =>
                              handleBlogChange(idx, "title", e.target.value)
                            }
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-slate-300">
                            Slug (URL)
                          </label>
                          <input
                            type="text"
                            className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-50 outline-none focus:ring-2 focus:ring-slate-500"
                            value={post.slug}
                            onChange={(e) =>
                              handleBlogChange(idx, "slug", e.target.value)
                            }
                          />
                          <p className="mt-1 text-[11px] text-slate-500">
                            Full URL:{" "}
                            <code>/blog/{post.slug || "your-slug"}</code>
                          </p>
                        </div>
                      </div>

                      {/* Image + Excerpt + Date */}
                      <div className="grid md:grid-cols-3 gap-3">
                        <div className="md:col-span-2">
                          <label className="block text-xs font-medium text-slate-300">
                            Excerpt
                          </label>
                          <textarea
                            className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-50 outline-none focus:ring-2 focus:ring-slate-500"
                            rows={2}
                            value={post.excerpt}
                            onChange={(e) =>
                              handleBlogChange(
                                idx,
                                "excerpt",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-slate-300">
                            Published date
                          </label>
                          <input
                            type="date"
                            className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-50 outline-none focus:ring-2 focus:ring-slate-500"
                            value={post.publishedAt}
                            onChange={(e) =>
                              handleBlogChange(
                                idx,
                                "publishedAt",
                                e.target.value
                              )
                            }
                          />
                          <label className="mt-3 block text-xs font-medium text-slate-300">
                            Cover image path
                          </label>
                          <input
                            type="text"
                            placeholder="/blog/local-jobs-nz.jpg"
                            className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-slate-50 outline-none focus:ring-2 focus:ring-slate-500"
                            value={post.image || ""}
                            onChange={(e) =>
                              handleBlogChange(
                                idx,
                                "image",
                                e.target.value
                              )
                            }
                          />
                        </div>
                      </div>

                      {/* Body */}
                      <div>
                        <label className="block text-xs font-medium text-slate-300">
                          Body (plain text, blank line = new paragraph)
                        </label>
                        <textarea
                          className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-50 outline-none focus:ring-2 focus:ring-slate-500"
                          rows={5}
                          value={post.body}
                          onChange={(e) =>
                            handleBlogChange(idx, "body", e.target.value)
                          }
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT: JSON preview */}
            <aside className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4 sm:p-5 shadow-lg flex flex-col max-h-[80vh]">
              <div className="flex items-center justify-between gap-3 mb-3">
                <div>
                  <h2 className="text-sm font-semibold text-slate-50">
                    Current config (JSON)
                  </h2>
                  <p className="text-[11px] text-slate-400">
                    Snapshot of what will be saved.
                  </p>
                </div>
              </div>
              <div className="relative flex-1 overflow-auto rounded-xl border border-slate-800 bg-slate-950 text-xs font-mono text-slate-200 p-3">
                <pre className="whitespace-pre">
                  {JSON.stringify(config, null, 2)}
                </pre>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
