#!/usr/bin/env node
/**
 * Master Pipeline Orchestrator for ToolUp VI Autonomous Content Engine.
 *
 * Flow:
 *  1. Scrape candidates (scripts/autonomous/scraper.mjs)
 *  2. For each candidate:
 *     - Topic Classifier (scripts/autonomous/authenticator.mjs)
 *     - Level 1 Independent Web Verification (google_search grounding)
 *     - Level 2 Adversarial Skeptic Judge
 *     - Level 3 Hardcode Firewall
 *     - Zero-Slop Editor (scripts/autonomous/editor.mjs)
 *     - Post-Edit Fidelity Check
 *     - Auto-Upload to Turso (questions & guides) + Cache Revalidation
 *  3. Audit log to pipeline_runs & ingested_sources
 *
 * Usage:
 *  node scripts/autonomous/run-pipeline.mjs
 *  node scripts/autonomous/run-pipeline.mjs --dry-run
 */

import { getDbClient, setupDatabase } from "./db-setup.mjs";
import { scrapeCandidates } from "./scraper.mjs";
import {
  getGeminiApiKey,
  classifyCandidate,
  runWebVerification,
  runAdversarialAudit,
  evaluateHardCodeFirewall,
} from "./authenticator.mjs";
import { generateEditedGuide, runFidelityCheck } from "./editor.mjs";

const isDryRun = process.argv.includes("--dry-run");

async function fetchExistingGuides(client) {
  try {
    const res = await client.execute("SELECT slug, title, category FROM questions LIMIT 100;");
    return res.rows.map((r) => ({
      slug: String(r.slug),
      title: String(r.title),
      category: String(r.category),
    }));
  } catch (err) {
    console.warn("⚠️ Could not fetch existing guides from Turso:", err.message);
    return [];
  }
}

async function triggerRevalidation(siteUrl, secret, slug) {
  if (!siteUrl || !secret) {
    console.log("ℹ️ Skipping cache revalidation (SITE_URL or REVALIDATE_SECRET not set).");
    return;
  }

  try {
    const endpoint = `${siteUrl.replace(/\/$/, "")}/api/revalidate`;
    console.log(`🔄 Triggering edge cache revalidation at ${endpoint} for slug: ${slug}...`);

    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${secret}`,
      },
      body: JSON.stringify({ slug }),
    });

    if (res.ok) {
      console.log(`  ✓ Cache revalidation succeeded for ${slug}`);
    } else {
      console.warn(`  ⚠️ Cache revalidation HTTP ${res.status}: ${await res.text()}`);
    }
  } catch (err) {
    console.warn(`  ⚠️ Cache revalidation request failed: ${err.message}`);
  }
}

async function upsertGuideToDb(client, guide) {
  const now = new Date().toISOString();
  const id = `gta6-q-${guide.slug}`;

  const query = `
    INSERT INTO questions (
      id, slug, title, category, region, tldr_answer, direct_answer, steps_json,
      specs_table_json, source_urls, last_patch_verified, verified_patch, patch_version,
      read_time, verified_by, author, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(slug) DO UPDATE SET
      title = excluded.title,
      category = excluded.category,
      region = excluded.region,
      tldr_answer = excluded.tldr_answer,
      direct_answer = excluded.direct_answer,
      steps_json = excluded.steps_json,
      specs_table_json = excluded.specs_table_json,
      source_urls = excluded.source_urls,
      last_patch_verified = excluded.last_patch_verified,
      verified_patch = excluded.verified_patch,
      patch_version = excluded.patch_version,
      read_time = excluded.read_time,
      verified_by = excluded.verified_by,
      author = excluded.author,
      updated_at = excluded.updated_at;
  `;

  const args = [
    id,
    guide.slug,
    guide.title,
    guide.category,
    guide.region,
    guide.direct_answer,
    guide.direct_answer,
    JSON.stringify(guide.steps),
    JSON.stringify(guide.specsTable),
    JSON.stringify(guide.source_urls),
    guide.patch_version || "Launch Build 1.0",
    guide.patch_version || "Launch Build 1.0",
    guide.patch_version || "Launch Build 1.0",
    guide.readTime || "2 min read",
    guide.verifiedBy || "ToolUp VI Autonomous Telemetry Pipeline",
    guide.author || "Automated Systems Lab",
    now,
    now,
  ];

  await client.execute({ sql: query, args });

  // Also mirror to guides table if it exists
  try {
    await client.execute({
      sql: query.replace("INTO questions", "INTO guides"),
      args,
    });
  } catch {
    // optional mirror table
  }
}

export async function runPipeline() {
  const runId = `run-${Date.now().toString(36)}`;
  const startedAt = new Date().toISOString();
  console.log(`\n========================================================`);
  console.log(`🚀 TOOLUP VI AUTONOMOUS CONTENT ENGINE: RUN ${runId}`);
  console.log(`Mode: ${isDryRun ? "DRY-RUN (Simulated / No DB writes)" : "LIVE PRODUCTION"}`);
  console.log(`Started at: ${startedAt}`);
  console.log(`========================================================\n`);

  let client = null;
  try {
    client = getDbClient();
    await setupDatabase();
  } catch (err) {
    if (!isDryRun) {
      throw err;
    }
    console.warn("⚠️ Proceeding with in-memory pipeline mock for dry-run.");
  }

  // 1. Stage 1: Scrape candidates
  const { totalDiscovered, candidates } = await scrapeCandidates({ maxCandidates: 5 });

  const stats = {
    discovered: totalDiscovered,
    published: 0,
    updated: 0,
    quarantined: 0,
    skipped: 0,
    errors: [],
  };

  const existingGuides = client ? await fetchExistingGuides(client) : [];
  const apiKey = getGeminiApiKey();

  if (!apiKey) {
    console.warn("\n⚠️ NOTICE: GEMINI_API_KEY is not set.");
    console.warn("Skipping AI verification steps. (In production/GitHub Actions, this key is provided as a secret).\n");

    if (client) {
      await client.execute({
        sql: `INSERT INTO pipeline_runs (run_id, started_at, finished_at, discovered, published, updated, quarantined, skipped, status, error_log)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        args: [
          runId,
          startedAt,
          new Date().toISOString(),
          stats.discovered,
          0,
          0,
          0,
          candidates.length,
          "COMPLETED_NO_KEY",
          "GEMINI_API_KEY not configured for full AI evaluation.",
        ],
      });
    }

    console.log(`🏁 Pipeline completed dry-check. Scanned ${candidates.length} candidate URLs successfully.`);
    return stats;
  }

  // 2. Evaluate each candidate
  for (let idx = 0; idx < candidates.length; idx++) {
    const candidate = candidates[idx];
    console.log(`\n--------------------------------------------------------`);
    console.log(`🔍 [${idx + 1}/${candidates.length}] Evaluating: "${candidate.title}"`);
    console.log(`Source: ${candidate.sourceName} | URL: ${candidate.url}`);

    try {
      // Step A: Topic & Dedup Classifier
      console.log("  ↳ Step A: Classifying topic and novelty (gemini-3.5-flash-lite)...");
      const classification = await classifyCandidate(candidate, existingGuides, apiKey);
      console.log(`    Result: ${classification.classification} (${classification.reason})`);

      if (classification.classification === "IRRELEVANT_OR_DUPLICATE") {
        stats.skipped++;
        if (client && !isDryRun) {
          await client.execute({
            sql: `INSERT INTO ingested_sources (source_url, source_name, title, decision, confidence, grounding_domains, reason, processed_at)
                  VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                  ON CONFLICT(source_url) DO UPDATE SET decision = excluded.decision, processed_at = excluded.processed_at;`,
            args: [candidate.url, candidate.sourceName, candidate.title, "SKIPPED", 0, 0, classification.reason, new Date().toISOString()],
          });
        }
        continue;
      }

      // Step B: Level 1 Live Web Verification with google_search tool
      console.log("  ↳ Step B: Level 1 Independent Google Search Grounding (gemini-3.8-flash)...");
      const verificationDossier = await runWebVerification(candidate, apiKey);
      console.log(`    Found ${verificationDossier.uniqueDomains.length} independent grounding domain(s): ${verificationDossier.uniqueDomains.join(", ")}`);

      // Step C: Level 2 Adversarial Skeptic Judge
      console.log("  ↳ Step C: Level 2 Adversarial Skeptic Audit (gemini-3.8-flash)...");
      const auditResult = await runAdversarialAudit(candidate, verificationDossier, apiKey);
      console.log(`    Audit Verdict: confirmed=${auditResult.is_retail_confirmed}, confidence=${auditResult.confidence_score}/100, facts=${auditResult.verified_facts?.length || 0}`);

      // Step D: Level 3 Hardcode Firewall
      console.log("  ↳ Step D: Level 3 Deterministic Hard Code Firewall...");
      const firewall = evaluateHardCodeFirewall(auditResult, verificationDossier.uniqueDomains, candidate);

      if (!firewall.passed) {
        console.warn(`    ❌ FIREWALL REJECTED: ${firewall.rejectionReason}`);
        stats.quarantined++;

        if (client && !isDryRun) {
          const qId = `quarantine-${Date.now().toString(36)}`;
          await client.execute({
            sql: `INSERT INTO quarantined_guides (id, source_url, candidate_title, draft_json, audit_json, rejection_reason, confidence, created_at)
                  VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            args: [
              qId,
              candidate.url,
              candidate.title,
              JSON.stringify(candidate),
              JSON.stringify(auditResult),
              firewall.rejectionReason,
              auditResult.confidence_score || 0,
              new Date().toISOString(),
            ],
          });

          await client.execute({
            sql: `INSERT INTO ingested_sources (source_url, source_name, title, decision, confidence, grounding_domains, reason, processed_at)
                  VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                  ON CONFLICT(source_url) DO UPDATE SET decision = excluded.decision, processed_at = excluded.processed_at;`,
            args: [
              candidate.url,
              candidate.sourceName,
              candidate.title,
              "QUARANTINED",
              auditResult.confidence_score || 0,
              verificationDossier.uniqueDomains.length,
              firewall.rejectionReason,
              new Date().toISOString(),
            ],
          });
        }
        continue;
      }

      // Step E: Stage 4 Zero-Slop Editor
      console.log("  ↳ Step E: Drafting Zero-Slop Guide (gemini-3.5-flash-lite)...");
      const editedGuide = await generateEditedGuide(candidate, auditResult, verificationDossier.groundingUrls, apiKey);
      console.log(`    Drafted Guide: "${editedGuide.title}" (slug: ${editedGuide.slug})`);

      // Step F: Post-Edit Fidelity Check
      console.log("  ↳ Step F: Anti-Hallucination Fidelity Check (gemini-3.8-flash)...");
      const fidelity = await runFidelityCheck(editedGuide, auditResult.verified_facts, apiKey);

      if (!fidelity.fidelity_passed) {
        console.warn(`    ❌ FIDELITY REJECTED: ${fidelity.unsupported_claims?.join("; ")}`);
        stats.quarantined++;

        if (client && !isDryRun) {
          const qId = `quarantine-${Date.now().toString(36)}`;
          await client.execute({
            sql: `INSERT INTO quarantined_guides (id, source_url, candidate_title, draft_json, audit_json, rejection_reason, confidence, created_at)
                  VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            args: [
              qId,
              candidate.url,
              candidate.title,
              JSON.stringify(editedGuide),
              JSON.stringify(fidelity),
              `Fidelity failure: ${fidelity.unsupported_claims?.join("; ")}`,
              fidelity.confidence || 0,
              new Date().toISOString(),
            ],
          });
        }
        continue;
      }

      // Step G: Publication & Revalidation
      if (isDryRun) {
        console.log(`    ✨ [DRY-RUN APPROVED] Would publish: /q/${editedGuide.slug}`);
        stats.published++;
      } else if (client) {
        console.log(`    💾 Storing verified guide in Turso: /q/${editedGuide.slug}...`);
        await upsertGuideToDb(client, editedGuide);

        const decision = classification.classification === "PATCH_UPDATE" ? "UPDATED" : "PUBLISHED";
        if (decision === "UPDATED") stats.updated++;
        else stats.published++;

        await client.execute({
          sql: `INSERT INTO ingested_sources (source_url, source_name, title, decision, confidence, grounding_domains, reason, processed_at)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                ON CONFLICT(source_url) DO UPDATE SET decision = excluded.decision, processed_at = excluded.processed_at;`,
          args: [
            candidate.url,
            candidate.sourceName,
            candidate.title,
            decision,
            auditResult.confidence_score,
            verificationDossier.uniqueDomains.length,
            "100% Verified & Authenticated",
            new Date().toISOString(),
          ],
        });

        // Trigger cache revalidation
        const siteUrl = process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL;
        const revalidateSecret = process.env.REVALIDATE_SECRET;
        await triggerRevalidation(siteUrl, revalidateSecret, editedGuide.slug);
      }
    } catch (err) {
      console.error(`    💥 Error processing candidate ${candidate.url}:`, err.message);
      stats.errors.push(`${candidate.url}: ${err.message}`);
    }
  }

  const finishedAt = new Date().toISOString();
  console.log(`\n========================================================`);
  console.log(`🏁 PIPELINE SUMMARY: RUN ${runId}`);
  console.log(`Discovered: ${stats.discovered} | Published: ${stats.published} | Updated: ${stats.updated} | Quarantined: ${stats.quarantined} | Skipped: ${stats.skipped}`);
  console.log(`Finished at: ${finishedAt}`);
  console.log(`========================================================\n`);

  if (client && !isDryRun) {
    await client.execute({
      sql: `INSERT INTO pipeline_runs (run_id, started_at, finished_at, discovered, published, updated, quarantined, skipped, status, error_log)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        runId,
        startedAt,
        finishedAt,
        stats.discovered,
        stats.published,
        stats.updated,
        stats.quarantined,
        stats.skipped,
        stats.errors.length > 0 ? "COMPLETED_WITH_ERRORS" : "COMPLETED_SUCCESS",
        stats.errors.join("\n"),
      ],
    });
  }

  return stats;
}

const isMain = process.argv[1] && process.argv[1].endsWith("run-pipeline.mjs");
if (isMain) {
  runPipeline()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error("❌ Fatal error in autonomous pipeline run:", err);
      process.exit(1);
    });
}
