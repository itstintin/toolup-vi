import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: [
          "Googlebot",
          "Bingbot",
          "OAI-SearchBot",
          "ChatGPT-User",
          "ClaudeBot",
          "PerplexityBot",
        ],
        allow: "/",
      },
    ],
    sitemap: "https://toolup-vi.com/sitemap.xml",
  };
}

