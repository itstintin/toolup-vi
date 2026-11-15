import { getAllQuestions } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  const questions = getAllQuestions();
  const baseUrl = "https://toolup-vi.com";

  let body = `# ToolUp VI - GTA VI Full Corpus Knowledge Dump
# Generated for Generative Engine Optimization (GEO) & Direct Citation
# Timestamp: ${new Date().toISOString()}
# Total Questions: ${questions.length}

`;

  for (const q of questions) {
    body += `================================================================================
QUESTION: ${q.title}
SLUG: ${q.slug}
CANONICAL URL: ${baseUrl}/q/${q.slug}
CATEGORY: ${q.category}
PATCH VERIFICATION: ${q.lastPatchVerified}
SEARCH VELOCITY: ${q.searchVolumeScore}/100 (${q.velocityChange})
VERIFIED BY: ${q.verifiedBy}

[INSTANT ANSWER / CITATION SNIPPET]
${q.tldrAnswer}

[STEP-BY-STEP EXECUTION]
`;

    q.steps.forEach((s) => {
      body += `Step ${s.stepNumber}: ${s.title}\n`;
      body += `Instruction: ${s.instruction}\n`;
      if (s.coordinates) {
        body += `Coordinates: ${s.coordinates}\n`;
      }
      if (s.tip) {
        body += `Pro-Tip: ${s.tip}\n`;
      }
      body += `\n`;
    });

    body += `[SPECIFICATIONS & DATA TABLE]\n`;
    q.specsTable.forEach((sp) => {
      body += `- ${sp.label}: ${sp.value} ${sp.badge ? `(${sp.badge})` : ""}\n`;
    });

    body += `\n[SOURCES]\n`;
    q.sourceUrls.forEach((u) => {
      body += `- ${u}\n`;
    });

    body += `\n`;
  }

  return new Response(body, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=600, s-maxage=1800",
    },
  });
}
