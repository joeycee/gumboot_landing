// types/api.ts

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  image: string | null;          // URL from DRF ImageField
  published_at: string | null;   // ISO string
  created_at: string;            // ISO string
}

export interface AppRelease {
  id: number;
  name: string;
  version: string;
  android_build: string | null;      // URL from DRF FileField
  ios_testflight_url: string | null;
  is_active: boolean;
  notes: string | null;
  created_at: string;                // ISO string
}
