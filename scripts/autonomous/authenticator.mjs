#!/usr/bin/env node
/**
 * Stage 2 & 3: Multi-Level Authenticator for ToolUp VI.
 *
 * Implements:
 *  - Topic & Dedup Classifier (gemini-3.5-flash-lite, pure JSON)
 *  - Level 1: Independent Live Web Verification (gemini-3.8-flash WITH google_search, plain text)
 *  - Level 2: Adversarial Skeptic Judge (gemini-3.8-flash, pure JSON, NO tools)
 *  - Level 3: Deterministic Hard Code Firewall (Pure JS)
 */

const GEMINI_API_BASE = "https://generativelanguage.googleapis.com/v1beta/models";

export function getGeminiApiKey() {
  return process.env.GEMINI_API_KEY || "";
}

/**
 * Call Gemini REST API with defensive retry and timeout.
 */
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
 * Step A: Topic & Dedup Classifier (gemini-3.5-flash-lite, pure JSON)
 */
export async function classifyCandidate(candidate, existingGuides, apiKey) {
  const existingGuidesSummary = existingGuides
    .map((g) => `- [${g.slug}] ${g.title} (${g.category})`)
    .join("\n");

  const prompt = `You are a strict editorial curator for ToolUp VI (an authoritative, zero-fluff GTA VI tactical wiki).
Classify whether this scraped gaming article represents a completely new retail guide, a patch update for an existing guide, or should be skipped as irrelevant, speculative, or a duplicate.

EXISTING TOOLUP VI GUIDES:
${existingGuidesSummary}

CANDIDATE ARTICLE:
Title: ${candidate.title}
Source: ${candidate.sourceName}
URL: ${candidate.url}
Content Snippet:
${candidate.content.slice(0, 3000)}

CLASSIFICATION RULES:
1. NEW_GUIDE: Concrete, verified, practical walkthrough of a retail launch mechanic, system, mission, or trick not already covered.
2. PATCH_UPDATE: Updates an existing guide with concrete new patch changes or newly discovered official values. Provide target_slug.
3. IRRELEVANT_OR_DUPLICATE: Skip if it is an opinion piece, stock/financial news, release hype, unverified leak, cosplay, speedrun gossip, or already fully covered in our existing guides without new facts.`;

  const payload = {
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: {
      temperature: 0.1,
      responseMimeType: "application/json",
      responseSchema: {
        type: "OBJECT",
        properties: {
          classification: {
            type: "STRING",
            enum: ["NEW_GUIDE", "PATCH_UPDATE", "IRRELEVANT_OR_DUPLICATE"],
          },
          target_slug: { type: "STRING" },
          reason: { type: "STRING" },
          summary: { type: "STRING" },
        },
        required: ["classification", "reason"],
      },
    },
  };

  const response = await callGeminiRest("gemini-3.5-flash-lite", payload, apiKey);
  const rawText = response.candidates?.[0]?.content?.parts?.[0]?.text;
  return JSON.parse(rawText);
}

/**
 * Level 1: Independent Live Web Verification
 * (gemini-3.8-flash WITH google_search, plain text output, NO JSON schema)
 */
export async function runWebVerification(candidate, apiKey) {
  const prompt = `Perform an exhaustive, independent live web search using Google Search to verify every concrete mechanic, mission name, character name, region, shop, dollar amount, weapon limit, and control input mentioned in this report:

CANDIDATE REPORT:
Title: ${candidate.title}
Content:
${candidate.content.slice(0, 4000)}

INVESTIGATION INSTRUCTIONS:
1. Search official Rockstar sources, patch notes, reputable retail walkthroughs, and verified community consensus.
2. Verify exact numbers, names, locations, and steps.
3. Explicitly identify any unverified rumors, leaks, speculation, or contradictions.
4. Output an exhaustive verification dossier summarizing confirmed facts and disputed claims.`;

  const payload = {
    contents: [{ parts: [{ text: prompt }] }],
    tools: [
      {
        google_search: {},
      },
    ],
    generationConfig: {
      temperature: 0.1,
      // NOTE: NEVER set responseMimeType: "application/json" when google_search tool is enabled
    },
  };

  const response = await callGeminiRest("gemini-3.8-flash", payload, apiKey);
  const candidateObj = response.candidates?.[0];
  const dossierText = candidateObj?.content?.parts?.[0]?.text || "";

  // Extract grounding URLs and unique domains
  const groundingChunks = candidateObj?.groundingMetadata?.groundingChunks || [];
  const extractedUrls = [];
  const uniqueDomains = new Set();

  for (const chunk of groundingChunks) {
    if (chunk.web?.uri) {
      extractedUrls.push(chunk.web.uri);
      try {
        const u = new URL(chunk.web.uri);
        const host = u.hostname.replace(/^www\./, "");
        if (host) uniqueDomains.add(host);
      } catch {}
    }
  }

  return {
    dossierText,
    groundingUrls: extractedUrls,
    uniqueDomains: Array.from(uniqueDomains),
  };
}

/**
 * Level 2: Adversarial Skeptic Judge
 * (gemini-3.8-flash, pure JSON, strict responseSchema, NO tools)
 */
export async function runAdversarialAudit(candidate, verificationDossier, apiKey) {
  const prompt = `You are the Lead Adversarial Fact-Checker for ToolUp VI.
Your mission is to rigorously audit this candidate guide against the independent search verification dossier.
You must aggressively reject any unconfirmed leaks, speculative clickbait, modded gameplay, or hypothetical features.

CANDIDATE ARTICLE:
Title: ${candidate.title}
Source: ${candidate.sourceName}
Content:
${candidate.content.slice(0, 3000)}

INDEPENDENT SEARCH DOSSIER:
${verificationDossier.dossierText}

GROUNDING DOMAINS VERIFIED:
${verificationDossier.uniqueDomains.join(", ")}

AUDIT CRITERIA:
- is_retail_confirmed: true ONLY if multiple independent sources verify this is an active, playable mechanic in Launch Build 1.0.
- confidence_score: 0-100 (Score 95+ only for irrefutable facts confirmed by multiple independent domains).
- contradictions: List any factual discrepancies between the article and verified reality.
- verified_facts: List concrete, bulletproof verified facts (names, numbers, steps, controls).
- patch_version: Current game patch verified (e.g., "Launch Build 1.0").
- rejection_reason: Empty string if approved; detailed rationale if rejected.`;

  const payload = {
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: {
      temperature: 0.1,
      responseMimeType: "application/json",
      responseSchema: {
        type: "OBJECT",
        properties: {
          is_retail_confirmed: { type: "BOOLEAN" },
          confidence_score: { type: "INTEGER" },
          contradictions: { type: "ARRAY", items: { type: "STRING" } },
          verified_facts: { type: "ARRAY", items: { type: "STRING" } },
          patch_version: { type: "STRING" },
          rejection_reason: { type: "STRING" },
        },
        required: [
          "is_retail_confirmed",
          "confidence_score",
          "contradictions",
          "verified_facts",
          "patch_version",
          "rejection_reason",
        ],
      },
    },
  };

  const response = await callGeminiRest("gemini-3.8-flash", payload, apiKey);
  const rawText = response.candidates?.[0]?.content?.parts?.[0]?.text;
  return JSON.parse(rawText);
}

/**
 * Level 3: Deterministic Hard Code Firewall (Pure JS)
 */
export function evaluateHardCodeFirewall(auditResult, uniqueDomains, candidate) {
  const RUMOR_REGEX = /\b(rumor|rumored|leaked|leak|allegedly|reportedly|unconfirmed|speculated|might be)\b/i;

  const reasons = [];

  if (auditResult.is_retail_confirmed !== true) {
    reasons.push("Not retail confirmed (is_retail_confirmed !== true)");
  }

  if (auditResult.confidence_score < 95) {
    reasons.push(`Confidence score below 95 threshold (${auditResult.confidence_score})`);
  }

  if (auditResult.contradictions && auditResult.contradictions.length > 0) {
    reasons.push(`Contradictions identified: ${auditResult.contradictions.join("; ")}`);
  }

  if (uniqueDomains.length < 2) {
    reasons.push(`Insufficient independent grounding domains (${uniqueDomains.length} < 2)`);
  }

  if (!auditResult.verified_facts || auditResult.verified_facts.length < 3) {
    reasons.push(`Insufficient verified facts (${auditResult.verified_facts?.length || 0} < 3)`);
  }

  // Check rumor keywords across title, content, and verified facts
  if (RUMOR_REGEX.test(candidate.title)) {
    reasons.push("Title contains speculative/rumor language");
  }
  if (RUMOR_REGEX.test(candidate.content)) {
    reasons.push("Article body contains speculative/rumor language");
  }
  if (auditResult.verified_facts?.some((f) => RUMOR_REGEX.test(f))) {
    reasons.push("Verified facts list matched rumor keywords");
  }

  const passed = reasons.length === 0;

  return {
    passed,
    reasons,
    rejectionReason: reasons.join(" | "),
  };
}
