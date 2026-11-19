#!/usr/bin/env node
/**
 * Database Automation Tables Setup for ToolUp VI Autonomous Pipeline.
 *
 * Ensures the following tables exist in Turso:
 *  - questions (primary live guides table used by Next.js app)
 *  - guides (alias/mirrored guides table)
 *  - ingested_sources (tracker for processed URLs & decisions)
 *  - quarantined_guides (log of rejected candidates failing verification/fidelity)
 *  - pipeline_runs (audit ledger of each autonomous pipeline execution)
 */

import { createClient } from "@libsql/client/web";
import fs from "fs";
import path from "path";

export function resolveEnv() {
  function loadEnvFile(filePath) {
    if (fs.existsSync(filePath)) {
      const lines = fs.readFileSync(filePath, "utf-8").split("\n");
      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith("#")) continue;
        const match = trimmed.match(/^([A-Za-z0-9_]+)=(.*)$/);
        if (match) {
          const key = match[1];
          let val = match[2].trim();
          if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
            val = val.slice(1, -1);
          }
          if (!process.env[key]) {
            process.env[key] = val;
          }
        }
      }
    }
  }

  const rootDir = process.cwd();
  loadEnvFile(path.join(rootDir, ".env.local"));
  loadEnvFile(path.join(rootDir, ".env"));

  const dbUrl = process.env.LIBSQL_DATABASE_URL || "libsql://toolup-vi-itstintin.aws-ap-south-1.turso.io";
  const authToken = process.env.LIBSQL_AUTH_TOKEN || "";
  return { dbUrl, authToken };
}

export function getDbClient() {
  const { dbUrl, authToken } = resolveEnv();
  if (!authToken) {
    throw new Error("LIBSQL_AUTH_TOKEN is required to connect to Turso.");
  }
  return createClient({
    url: dbUrl,
    authToken,
  });
}

export async function setupDatabase() {
  const client = getDbClient();
  console.log("🛠️ Initializing database automation tables...");

  // 1. Ingested Sources table
  await client.execute(`
    CREATE TABLE IF NOT EXISTS ingested_sources (
      source_url TEXT PRIMARY KEY,
      source_name TEXT,
      title TEXT,
      decision TEXT,
      confidence INTEGER,
      grounding_domains INTEGER,
      reason TEXT,
      processed_at TEXT
    );
  `);
  await client.execute(`CREATE INDEX IF NOT EXISTS idx_ingested_sources_processed ON ingested_sources(processed_at);`);
  await client.execute(`CREATE INDEX IF NOT EXISTS idx_ingested_sources_decision ON ingested_sources(decision);`);

  // 2. Quarantined Guides table
  await client.execute(`
    CREATE TABLE IF NOT EXISTS quarantined_guides (
      id TEXT PRIMARY KEY,
      source_url TEXT,
      candidate_title TEXT,
      draft_json TEXT,
      audit_json TEXT,
      rejection_reason TEXT,
      confidence INTEGER,
      created_at TEXT
    );
  `);
  await client.execute(`CREATE INDEX IF NOT EXISTS idx_quarantined_created ON quarantined_guides(created_at);`);

  // 3. Pipeline Runs audit table
  await client.execute(`
    CREATE TABLE IF NOT EXISTS pipeline_runs (
      run_id TEXT PRIMARY KEY,
      started_at TEXT,
      finished_at TEXT,
      discovered INTEGER DEFAULT 0,
      published INTEGER DEFAULT 0,
      updated INTEGER DEFAULT 0,
      quarantined INTEGER DEFAULT 0,
      skipped INTEGER DEFAULT 0,
      status TEXT,
      error_log TEXT
    );
  `);
  await client.execute(`CREATE INDEX IF NOT EXISTS idx_pipeline_runs_started ON pipeline_runs(started_at);`);

  // 4. Ensure questions & guides tables exist with full column support
  await client.execute(`
    CREATE TABLE IF NOT EXISTS questions (
      id TEXT PRIMARY KEY,
      slug TEXT UNIQUE NOT NULL,
      title TEXT NOT NULL,
      category TEXT NOT NULL,
      region TEXT NOT NULL DEFAULT 'Vice City',
      tldr_answer TEXT NOT NULL,
      direct_answer TEXT,
      steps_json TEXT NOT NULL DEFAULT '[]',
      specs_table_json TEXT NOT NULL DEFAULT '[]',
      source_urls TEXT NOT NULL DEFAULT '[]',
      last_patch_verified TEXT NOT NULL DEFAULT 'Launch Build 1.0',
      verified_patch TEXT NOT NULL DEFAULT 'Launch Build 1.0',
      patch_version TEXT NOT NULL DEFAULT 'Launch Build 1.0',
      read_time TEXT NOT NULL DEFAULT '3 min read',
      verified_by TEXT NOT NULL DEFAULT 'ToolUp VI Tactical Lab',
      author TEXT NOT NULL DEFAULT 'Lead Editor',
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
  `);

  await client.execute(`
    CREATE TABLE IF NOT EXISTS guides (
      id TEXT PRIMARY KEY,
      slug TEXT UNIQUE NOT NULL,
      title TEXT NOT NULL,
      category TEXT NOT NULL,
      region TEXT NOT NULL DEFAULT 'Vice City',
      tldr_answer TEXT NOT NULL,
      direct_answer TEXT,
      steps_json TEXT NOT NULL DEFAULT '[]',
      specs_table_json TEXT NOT NULL DEFAULT '[]',
      source_urls TEXT NOT NULL DEFAULT '[]',
      last_patch_verified TEXT NOT NULL DEFAULT 'Launch Build 1.0',
      verified_patch TEXT NOT NULL DEFAULT 'Launch Build 1.0',
      patch_version TEXT NOT NULL DEFAULT 'Launch Build 1.0',
      read_time TEXT NOT NULL DEFAULT '3 min read',
      verified_by TEXT NOT NULL DEFAULT 'ToolUp VI Tactical Lab',
      author TEXT NOT NULL DEFAULT 'Lead Editor',
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
  `);

  console.log("✅ All automation tables verified successfully in Turso.");
}

const isMain = process.argv[1] && process.argv[1].endsWith("db-setup.mjs");
if (isMain) {
  setupDatabase()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error("❌ Fatal error setting up database:", err);
      process.exit(1);
    });
}
