#!/usr/bin/env node
/**
 * Stage 4: Zero-Slop Editor + Post-Edit Fidelity Check for ToolUp VI.
 *
 * Implements:
 *  - Editorial Pass (gemini-3.5-flash-lite, pure JSON schema)
 *  - Post-Edit Fidelity Check (gemini-3.8-flash, pure JSON schema)
 */

const GEMINI_API_BASE = "https://generativelanguage.googleapis.com/v1beta/models";

const VALID_CATEGORIES = [
  "Money & ATMs",
  "Map & Regions",
  "Vehicles & Fences",
  "Weapons & Loadouts",
  "Criminal Profile & Heat",
  "Glitches & Fixes",
];

const VALID_REGIONS = [
  "Vice City",
  "Leonida Keys",
  "Grassrivers",
  "Port Gellhorn",
  "Ambrosia",
  "Mount Kalaga National Park",
];

async function callGeminiRest(model, payload, apiKey) {
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is required to call the Gemini API.");
  }

  const url = `${GEMINI_API_BASE}/${model}:generateContent?key=${apiKey}`;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 35000);

  const res = await fetch(url, {
    method: "POST",
    signal: controller.signal,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  clearTimeout(timer);

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Gemini API [${model}] HTTP ${res.status}: ${errorText}`);
  }

  return await res.json();
}

/**
 * Editorial Pass: Transforms verified facts into a polished ToolUp VI guide.
 */
export async function generateEditedGuide(candidate, auditResult, groundingUrls, apiKey) {
  const prompt = `You are the Lead Technical Guide Editor for ToolUp VI.
Transform ONLY the verified facts below into a crisp, authoritative, zero-slop tactical guide for GTA VI players.

STRICT EDITORIAL RULES:
1. NO FILLER OR AI INTROS: Never write "In the sprawling world of Leonida", "Whether you are a newcomer or veteran", or "Grand Theft Auto VI is an exciting game". Start directly with the answer.
2. NO FAKE METRICS: Never include view counts, fake percentages, or synthetic velocity metrics.
3. DIRECT ANSWER: Must be 1-2 punchy sentences, strictly under 60 words, giving the immediate bottom-line solution.
4. ACTIONABLE STEPS: Numbered sequence with exact control inputs, menu paths, and landmarks.
5. STRICT SOURCE GROUNDING: Do NOT invent features, prices, or mechanics not confirmed in VERIFIED FACTS.

SOURCE CANDIDATE:
Title: ${candidate.title}
Source: ${candidate.sourceName}

VERIFIED FACTS:
${auditResult.verified_facts.map((f, i) => `${i + 1}. ${f}`).join("\n")}

PATCH VERSION: ${auditResult.patch_version || "Launch Build 1.0"}
GROUNDING SOURCES:
${groundingUrls.join("\n")}`;

  const payload = {
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: {
      temperature: 0.1,
      responseMimeType: "application/json",
      responseSchema: {
        type: "OBJECT",
        properties: {
          slug: { type: "STRING" },
          title: { type: "STRING" },
          category: {
            type: "STRING",
            enum: VALID_CATEGORIES,
          },
          region: {
            type: "STRING",
            enum: VALID_REGIONS,
          },
          patch_version: { type: "STRING" },
          direct_answer: { type: "STRING" },
          steps: {
            type: "ARRAY",
            items: {
              type: "OBJECT",
              properties: {
                stepNumber: { type: "INTEGER" },
                title: { type: "STRING" },
                instruction: { type: "STRING" },
                coordinates: { type: "STRING" },
                tip: { type: "STRING" },
              },
              required: ["stepNumber", "title", "instruction"],
            },
          },
          specsTable: {
            type: "ARRAY",
            items: {
              type: "OBJECT",
              properties: {
                label: { type: "STRING" },
                value: { type: "STRING" },
                badge: { type: "STRING" },
              },
              required: ["label", "value"],
            },
          },
          body: { type: "STRING" },
          tags: { type: "ARRAY", items: { type: "STRING" } },
          readTime: { type: "STRING" },
        },
        required: [
          "slug",
          "title",
          "category",
          "region",
          "patch_version",
          "direct_answer",
          "steps",
          "specsTable",
          "tags",
        ],
      },
    },
  };

  const response = await callGeminiRest("gemini-3.5-flash-lite", payload, apiKey);
  const rawText = response.candidates?.[0]?.content?.parts?.[0]?.text;
  const guide = JSON.parse(rawText);

  // Normalize slug
  guide.slug = guide.slug
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  // Combine source URLs
  guide.source_urls = Array.from(new Set([candidate.url, ...groundingUrls])).slice(0, 5);
  guide.verifiedBy = "ToolUp VI Autonomous Telemetry Pipeline";
  guide.author = "Automated Systems Lab";
  guide.readTime = guide.readTime || `${Math.max(2, Math.ceil(guide.direct_answer.split(/\s+/).length / 50))} min read`;

  return guide;
}

/**
 * Post-Edit Fidelity Check (gemini-3.8-flash, pure JSON schema, NO tools)
 * Verifies that the edited guide introduced ZERO fabricated claims.
 */
export async function runFidelityCheck(editedGuide, verifiedFacts, apiKey) {
  const prompt = `You are a strict anti-hallucination auditor.
Compare the edited guide draft against the baseline verified facts.
Ensure the editor has NOT fabricated any mechanics, buttons, dollar values, locations, or lore not supported by the verified facts.

BASELINE VERIFIED FACTS:
${verifiedFacts.map((f, i) => `${i + 1}. ${f}`).join("\n")}

EDITED GUIDE DRAFT:
Title: ${editedGuide.title}
Slug: ${editedGuide.slug}
Direct Answer: ${editedGuide.direct_answer}
Steps: ${JSON.stringify(editedGuide.steps)}
Specs: ${JSON.stringify(editedGuide.specsTable)}
Body: ${editedGuide.body || ""}

AUDIT TASK:
1. Check every claim, number, name, and instruction in the edited guide.
2. If ANY detail is invented or unsupported by the verified facts, set fidelity_passed to false and list the unsupported claims.
3. Only return fidelity_passed: true if the guide is 100% faithful to the verified facts.`;

  const payload = {
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: {
      temperature: 0.0,
      responseMimeType: "application/json",
      responseSchema: {
        type: "OBJECT",
        properties: {
          fidelity_passed: { type: "BOOLEAN" },
          unsupported_claims: { type: "ARRAY", items: { type: "STRING" } },
          confidence: { type: "INTEGER" },
          fidelity_notes: { type: "STRING" },
        },
        required: ["fidelity_passed", "unsupported_claims", "confidence"],
      },
    },
  };

  const response = await callGeminiRest("gemini-3.8-flash", payload, apiKey);
  const rawText = response.candidates?.[0]?.content?.parts?.[0]?.text;
  return JSON.parse(rawText);
}
