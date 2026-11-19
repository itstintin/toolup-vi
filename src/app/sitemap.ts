import type { MetadataRoute } from "next";
import { searchQuestionsFromDb } from "@/lib/db";
import { getSiteUrl } from "@/lib/site";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const questions = await searchQuestionsFromDb(undefined, undefined, 100);
  const baseUrl = getSiteUrl();
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/wiki`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/llms.txt`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/llms-full.txt`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/api/v1/openapi.json`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];

  const questionRoutes: MetadataRoute.Sitemap = questions.flatMap((q) => [
    {
      url: `${baseUrl}/q/${q.slug}`,
      lastModified: new Date(q.updatedAt || now),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/wiki/${q.slug}`,
      lastModified: new Date(q.updatedAt || now),
      changeFrequency: "daily",
      priority: 0.8,
    },
  ]);

  return [...staticRoutes, ...questionRoutes];
}

