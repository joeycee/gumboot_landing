// app/config/siteConfig.ts

export type HeroConfig = {
  title: string;
  highlight: string;
  subtitle: string;
  appStoreLabel: string;
  playStoreLabel: string;
  tagline: string;
};

export type FeatureConfig = {
  title: string;
  desc: string;
};

export type BlogPost = {
  id: string;          // simple id
  slug: string;        // used in URL
  title: string;
  excerpt: string;
  image?: string;
  body: string;        // plain text / paragraphs, we'll split on blank lines
  publishedAt: string; // ISO string e.g. "2025-11-18"
};

export type SiteConfig = {
  hero: HeroConfig;
  features: FeatureConfig[];
  blogs: BlogPost[];
};

export const siteConfig: SiteConfig = {
  hero: {
    title: "Get local jobs done.",
    highlight: "Fast.",
    subtitle:
      "Gumboot connects people who need a hand with locals who can help — mowing, moving, cleaning, painting, delivery and more.",
    appStoreLabel: "App Store (soon)",
    playStoreLabel: "Google Play (soon)",
    tagline: "Free to download • Secure Stripe payments • NZ-first launch",
  },
  features: [
    { title: "Post in minutes", desc: "Describe the job, add photos, set your budget and location." },
    { title: "Smart matching", desc: "Locals nearby get notified and send offers with timelines." },
    { title: "Secure payments", desc: "Funds held in escrow via Stripe. Release when you’re happy." },
    { title: "Real reviews", desc: "Build trust with verified IDs and two-way ratings." },
    { title: "Messaging & photos", desc: "Chat, share images, and coordinate details in-app." },
    { title: "Dispute support", desc: "Our team is here to help if something goes sideways." },
  ],
  blogs: [
    {
      id: "intro-gumboot",
      slug: "what-is-gumboot-local-jobs-app",
      title: "What is Gumboot? The Kiwi Way to Get Local Jobs Done Fast",
      excerpt:
        "Gumboot is a New Zealand–built app that connects people who need a hand with locals who can help.",
      body:
        "Coming soon.\n\nThis post will explain what Gumboot is, who it's for, and how it works in everyday Kiwi life.",
      publishedAt: "2025-11-18",
    },
    {
      id: "why-local-matters",
      slug: "why-local-jobs-and-local-helpers-matter",
      title: "Why Local Jobs and Local Helpers Matter",
      excerpt:
        "Supporting locals doesn’t just get the job done – it keeps money and skills in your community.",
      body:
        "Coming soon.\n\nThis post will cover the benefits of keeping work local, for both posters and taskers.",
      publishedAt: "2025-11-18",
    },
    {
      id: "how-to-post-great-job",
      slug: "how-to-post-a-great-gumboot-job",
      title: "How to Post a Great Gumboot Job (and Get Better Offers)",
      excerpt:
        "Clear photos, honest descriptions and fair budgets lead to faster, better offers on Gumboot.",
      body:
        "Coming soon.\n\nThis post will give tips on writing great job posts, choosing budgets and picking offers.",
      publishedAt: "2025-11-18",
    },
  ],
};
