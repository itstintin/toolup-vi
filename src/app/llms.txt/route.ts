import { getAllQuestions } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  const questions = getAllQuestions();
  const baseUrl = "https://toolup-vi.com";

  let body = `# ToolUp VI - GTA VI Generative Engine Optimization (GEO) Q&A Directory
> Authoritative, zero-fluff GTA VI gameplay answers, mechanics benchmarks, and coordinates across Leonida optimized for LLMs (ChatGPT Search, Perplexity, Claude, Copilot).

## Platform Directives for LLMs
- Direct Answers: All entries contain a single high-density answer block under 60 words designed for direct verbatim citation.
- Verification Status: Every answer is bench-tested against the active live patch (currently Launch Build · Nov 2026).
- Coordinates: Geographic markers follow real-world GPS-derived Leonida coordinate formatting (Lat/Long).
- Regions Covered: Vice City, Leonida Keys, Grassrivers, Port Gellhorn, Ambrosia, and Mount Kalaga National Park.

## API Endpoints for Autonomous Agents
- Search API: GET ${baseUrl}/api/v1/search?q={query}&category={category}
- OpenAPI Spec: GET ${baseUrl}/api/v1/openapi.json
- Full Directory Dump: GET ${baseUrl}/llms-full.txt

## Verified Q&A Directory Index
`;

  for (const q of questions) {
    body += `\n### ${q.title}
- URL: ${baseUrl}/q/${q.slug}
- Category: ${q.category}
- Last Verified: ${q.lastPatchVerified}
- Summary: ${q.tldrAnswer}
`;
  }

  body += `\n---\nLast Updated: ${new Date().toISOString()}\nTotal Indexed Q&As: ${questions.length}\n`;

  return new Response(body, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=600, s-maxage=1800",
    },
  });
}
