import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization") || "";
    const customHeader = req.headers.get("x-revalidate-secret") || "";
    const expectedSecret = process.env.REVALIDATE_SECRET;

    // If no secret configured in environment, disallow unauthorized access
    if (!expectedSecret) {
      return NextResponse.json(
        { error: "Server misconfiguration: REVALIDATE_SECRET is not configured." },
        { status: 500 }
      );
    }

    const bearerToken = authHeader.startsWith("Bearer ") ? authHeader.slice(7).trim() : "";
    const providedSecret = bearerToken || customHeader;

    if (!providedSecret || providedSecret !== expectedSecret) {
      return NextResponse.json({ error: "Unauthorized: Invalid revalidation token." }, { status: 401 });
    }

    let slug = "";
    try {
      const body = await req.json();
      if (body && typeof body.slug === "string") {
        slug = body.slug.trim();
      }
    } catch {
      // Body is optional
    }

    const revalidatedPaths: string[] = [
      "/",
      "/wiki",
      "/sitemap.xml",
      "/llms.txt",
      "/llms-full.txt",
    ];

    // Execute Next.js cache revalidations
    revalidatePath("/");
    revalidatePath("/wiki");
    revalidatePath("/sitemap.xml");
    revalidatePath("/llms.txt");
    revalidatePath("/llms-full.txt");

    if (slug) {
      const qPath = `/q/${slug}`;
      const wikiPath = `/wiki/${slug}`;
      revalidatePath(qPath);
      revalidatePath(wikiPath);
      revalidatedPaths.push(qPath, wikiPath);
    }

    return NextResponse.json({
      success: true,
      revalidated: true,
      timestamp: new Date().toISOString(),
      paths: revalidatedPaths,
    });
  } catch (err: unknown) {
    console.error("Revalidation error:", err);
    return NextResponse.json(
      {
        success: false,
        error: "Internal Server Error",
        message: err instanceof Error ? err.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
