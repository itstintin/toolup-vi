import { NextRequest, NextResponse } from "next/server";
import { searchQuestions } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q") || undefined;
    const category = searchParams.get("category") || undefined;
    const limit = Math.min(parseInt(searchParams.get("limit") || "20", 10), 50);

    const results = searchQuestions(q, category).slice(0, limit);

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
        tldrAnswer: item.tldrAnswer,
        lastPatchVerified: item.lastPatchVerified,
        searchVolumeScore: item.searchVolumeScore,
        velocityChange: item.velocityChange,
        url: `https://toolup-vi.com/q/${item.slug}`,
      })),
    });
  } catch (err: unknown) {
    console.error("Search API error:", err);
    return NextResponse.json(
      {
        error: "Internal Server Error",
        message: err instanceof Error ? err.message : "Unknown search error",
      },
      { status: 500 }
    );
  }
}
