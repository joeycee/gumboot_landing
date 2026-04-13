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
  appUrl: string;
  signupUrl: string;
  postJobUrl: string;
  loginUrl: string;
  hero: HeroConfig;
  features: FeatureConfig[];
  blogs: BlogPost[];
};

export const siteConfig: SiteConfig = {
  appUrl: "https://web.gumboot.app",
  signupUrl: "https://web.gumboot.app/auth/signup",
  postJobUrl: "https://web.gumboot.app/jobs/post",
  loginUrl: "https://web.gumboot.app/auth/login",
  hero: {
    title: "Book trusted local help.",
    highlight: "Today.",
    subtitle:
      "Gumboot connects people who need a hand with locals who can help. Post jobs, compare offers, chat in one place, and pay securely through Gumboot with Stripe.",
    appStoreLabel: "Post a job",
    playStoreLabel: "Earn with Gumboot",
    tagline: "Live on the web • Secure Stripe payments • Built for New Zealand",
  },
  features: [
    { title: "Post in minutes", desc: "Describe the job, add photos, set your budget, and publish without the back-and-forth." },
    { title: "Fast local offers", desc: "Nearby taskers can spot the job quickly and send offers with timing and price." },
    { title: "Secure payments", desc: "All payments are handled through Gumboot with Stripe, keeping checkout simple and professional for both sides." },
    { title: "Verified profiles", desc: "ID verification is required, and profiles, ratings, and reviews make it easier to choose the right person with confidence." },
    { title: "Messaging that stays organised", desc: "Keep job details, photos, offers, and updates in one workflow instead of scattered chats." },
    { title: "Built for NZ jobs", desc: "From mowing and moving to cleaning and odd jobs, Gumboot is designed for local, everyday work." },
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
