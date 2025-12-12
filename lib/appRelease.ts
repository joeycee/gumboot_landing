// lib/appRelease.ts
import { apiFetch } from "./api";
import type { AppRelease } from "@/types/api";

// GET /api/app/latest/
export async function getLatestAppRelease(): Promise<AppRelease> {
  return apiFetch<AppRelease>("/api/app/latest/");
}
