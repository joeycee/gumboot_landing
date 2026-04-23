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
    title: "Post a job. Accept an offer.",
    highlight: "Job done.",
    subtitle:
      "Find local help, agree the details, and pay securely in one place.",
    appStoreLabel: "Post a job",
    playStoreLabel: "Earn with Gumboot",
    tagline: "Live on the web • Secure Stripe payments • Built for New Zealand",
  },
  features: [
    { title: "Post in minutes", desc: "Describe the job, add photos, set a budget, and publish." },
    { title: "Fast local offers", desc: "Compare nearby helpers by price, timing, and profile." },
    { title: "Secure payments", desc: "Pay through Gumboot with Stripe once the job is done." },
    { title: "Verified profiles", desc: "ID checks, ratings, and reviews help you choose well." },
    { title: "Organised messaging", desc: "Keep job details, photos, and updates in one place." },
    { title: "Built for NZ jobs", desc: "Made for lawns, cleaning, moving, odd jobs, and more." },
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
