import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { upsertQuestion } from "@/lib/db";
import { IngestPayload } from "@/types";

const IngestSchema = z.object({
  question_title: z.string().min(5, "Title must be at least 5 characters"),
  slug: z
    .string()
    .min(3)
    .regex(/^[a-z0-9-]+$/, "Slug must only contain lowercase alphanumeric characters and hyphens"),
  category: z.enum([
    "Money & ATMs",
    "Map & Regions",
    "Vehicles & Fences",
    "Weapons & Loadouts",
    "Criminal Profile & Heat",
    "Glitches & Fixes",
  ]),
  tldr_answer: z.string().min(20, "TL;DR answer must be at least 20 characters"),
  steps_markdown: z
    .union([
      z.string(),
      z.array(
        z.object({
          stepNumber: z.number(),
          title: z.string(),
          instruction: z.string(),
          coordinates: z.string().optional(),
          tip: z.string().optional(),
        })
      ),
    ])
    .optional(),
  specs_table_json: z
    .array(
      z.object({
        label: z.string(),
        value: z.string(),
        badge: z.string().optional(),
      })
    )
    .optional(),
  source_urls: z.array(z.string().url()).optional(),
  search_volume_score: z.number().min(0).max(100).optional(),
  last_patch_verified: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get("x-api-key");
    const validApiKey = process.env.INGEST_API_KEY || "geo-nervous-system-secret-key";

    if (!authHeader || authHeader !== validApiKey) {
      return NextResponse.json(
        {
          error: "Unauthorized",
          message: "Invalid or missing x-api-key header.",
        },
        { status: 401 }
      );
    }

    const body = await req.json();
    const parseResult = IngestSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        {
          error: "Validation Failed",
          details: parseResult.error.format(),
        },
        { status: 400 }
      );
    }

    const payload = parseResult.data as IngestPayload;
    const { record, action } = upsertQuestion(payload);

    // On-demand revalidation so the page is published immediately
    try {
      revalidatePath("/");
      revalidatePath(`/q/${record.slug}`);
      revalidatePath("/llms.txt");
      revalidatePath("/llms-full.txt");
    } catch (revalidateError) {
      console.warn("Revalidation notice:", revalidateError);
    }

    return NextResponse.json(
      {
        success: true,
        action,
        slug: record.slug,
        url: `/q/${record.slug}`,
        timestamp: new Date().toISOString(),
        data: {
          id: record.id,
          title: record.title,
          category: record.category,
          region: record.region || "Vice City",
          verifiedPatch: record.verifiedPatch || record.lastPatchVerified || "Launch Build 1.0",
        },
      },
      { status: action === "created" ? 201 : 200 }
    );
  } catch (err: unknown) {
    console.error("Ingestion webhook error:", err);
    return NextResponse.json(
      {
        error: "Internal Server Error",
        message: err instanceof Error ? err.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

