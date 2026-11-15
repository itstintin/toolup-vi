/**
 * Example RAG Scraper Ingestion Client
 * Usage: node scripts/example-scraper.js
 */

const INGEST_URL = process.env.INGEST_URL || "http://localhost:3000/api/v1/ingest";
const API_KEY = process.env.INGEST_API_KEY || "geo-nervous-system-secret-key";

async function ingestMockRecord() {
  const payload = {
    question_title: "How to Obtain the Skimmer Seaplane at Vice Beach Marina?",
    slug: "skimmer-seaplane-spawn-vice-beach-marina",
    category: "Vehicles",
    tldr_answer:
      "The Dodo/Skimmer Seaplane spawns docked at Pier 4 of the Vice Beach Marina between 06:00 and 18:00 game time. Board the pilot seat and use Lucia's ignition hotwire trick to bypass the $10,000 marina mooring lock fee.",
    steps_markdown: [
      {
        stepNumber: 1,
        title: "Locate Pier 4 Marina Slip",
        instruction: "Navigate to the southern boardwalk pier at Vice Beach marina.",
        coordinates: "25.772° N, 80.134° W",
      },
      {
        stepNumber: 2,
        title: "Hotwire the Seaplane Ignition",
        instruction: "Access the cockpit and complete the dual-wire contact minigame.",
      },
    ],
    specs_table_json: [
      { label: "Vehicle Class", value: "Amphibious Light Aircraft", badge: "Rare Spawn" },
      { label: "Takeoff Water Run", value: "180 Meters" },
      { label: "Top Cruise Speed", value: "135 Knots (155 mph)" },
    ],
    source_urls: ["https://vice-aviation.org/hangar/skimmer"],
    search_volume_score: 87,
    last_patch_verified: "Patch 1.02 (Day-One Live)",
  };

  console.log(`Sending ingestion payload to ${INGEST_URL}...`);
  try {
    const res = await fetch(INGEST_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    console.log("Ingestion result:", JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Ingestion failed:", error);
  }
}

ingestMockRecord();

