import { NextRequest, NextResponse } from "next/server";
import { searchQuestionsFromDb, searchQuestions } from "@/lib/db";
import { calculateReadTime } from "@/lib/utils";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q") || undefined;
    const category = searchParams.get("category") || undefined;
    const limit = Math.min(parseInt(searchParams.get("limit") || "20", 10), 50);

    const results = await searchQuestionsFromDb(q, category, limit);

    return NextResponse.json({
      success: true,
      platform: "ToolUp VI",
      query: q || "",
      category: category || "All",
      total: results.length,
      data: results.map((item) => ({
        id: item.id,
        slug: item.slug,
        title: item.title,
        category: item.category,
        region: item.region || "Vice City",
        tldrAnswer: item.tldrAnswer,
        verifiedPatch: item.verifiedPatch || item.lastPatchVerified || "Launch Build 1.0",
        readTime: item.readTime || calculateReadTime(item.tldrAnswer),
        stepsCount: item.steps ? item.steps.length : 0,
        url: `https://toolup-vi.com/q/${item.slug}`,
      })),
    });
  } catch (err: unknown) {
    console.error("Search API error, utilizing safe in-memory fallback:", err);
    try {
      const { searchParams } = new URL(req.url);
      const q = searchParams.get("q") || undefined;
      const category = searchParams.get("category") || undefined;
      const limit = Math.min(parseInt(searchParams.get("limit") || "20", 10), 50);
      const fallbackResults = searchQuestions(q, category).slice(0, limit);

      return NextResponse.json({
        success: true,
        platform: "ToolUp VI",
        query: q || "",
        category: category || "All",
        total: fallbackResults.length,
        data: fallbackResults.map((item) => ({
          id: item.id,
          slug: item.slug,
          title: item.title,
          category: item.category,
          region: item.region || "Vice City",
          tldrAnswer: item.tldrAnswer,
          verifiedPatch: item.verifiedPatch || item.lastPatchVerified || "Launch Build 1.0",
          readTime: item.readTime || calculateReadTime(item.tldrAnswer),
          stepsCount: item.steps ? item.steps.length : 0,
          url: `https://toolup-vi.com/q/${item.slug}`,
        })),
      });
    } catch {
      return NextResponse.json(
        {
          success: false,
          error: "Internal Server Error",
          message: err instanceof Error ? err.message : "Unknown search error",
        },
        { status: 500 }
      );
    }
  }
}
