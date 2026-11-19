/**
 * Centralized site configuration and canonical URL helpers for ToolUp VI.
 *
 * Supports domain readiness via NEXT_PUBLIC_SITE_URL environment variable,
 * defaulting to the live Cloudflare Workers deployment URL.
 * When switching to a custom domain (e.g., toolup-vi.com), set NEXT_PUBLIC_SITE_URL
 * without requiring any code changes.
 */

export const DEFAULT_SITE_URL = "https://toolup-vi.wikiguide.workers.dev";

export function getSiteUrl(): string {
  const url = process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL;
  return url.replace(/\/$/, "");
}
