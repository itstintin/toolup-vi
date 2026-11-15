# ToolUp VI - Automated GTA VI Q&A Platform ("The Nervous System")

> High-Performance Generative Engine Optimization (GEO) Web Directory engineered for dual ingestion: **Human Gamers** seeking instant, zero-fluff answers across Leonida and **AI Search Engines / Web Crawlers** (ChatGPT Search, Perplexity, Claude, Copilot) indexing structured gameplay data.

---

## ⚡ Architecture Overview

```
                          [ External Python RAG Scraper ]
                                        │
                         POST /api/v1/ingest (x-api-key)
                                        │
                                        ▼
                  ┌───────────────────────────────────────────┐
                  │ Next.js App Router (Autonomous Directory) │
                  └─────────────────────┬─────────────────────┘
                                        │
          ┌─────────────────────────────┼─────────────────────────────┐
          ▼                             ▼                             ▼
   [ Human Gamers ]            [ AI Crawlers / LLMs ]       [ Connected GPTs / Agents ]
 - Command-First (Cmd+K)     - /llms.txt Directory Index    - OpenAPI 3.1.0 Spec
 - Filter Pills (Missions,   - /llms-full.txt Full Corpus   - GET /api/v1/search
   Money, Vehicles...)       - JSON-LD QAPage, FAQPage,       (Real-Time Parametric)
 - TL;DR Instant Answer Box    and TechArticle Schemas
 - GPS Pin Coordinates       - Verbatim Answer Citations
 - Spec Tables & Loot Data   - Patch 1.02 Validation Tags
```

---

## 🎨 Visual System: "Vice City Modern Utility"

- **Platform Brand:** `ToolUp VI`
- **Background:** Deep obsidian `#090A0F` with subtle 32px grid overlays.
- **Card Surfaces:** Elevated slate `#12141D` with 1px subtle borders `#1F2430`.
- **Typography:** Crisp off-white `#F3F4F6` for headers, slate `#94A3B8` for secondary text, and `ui-monospace` for coordinates and telemetry data.
- **Semantic Accents:**
  - Vice Coral/Magenta (`#FF2E93`): Active filters, search velocity badges (`+540%`).
  - Vice Cyan (`#00F0FF`): Command focus rings, verified citation boxes, coordinates.
  - Emerald (`#10B981`): Game patch verification badges (`Patch 1.02 Live`).

---

## 🚀 Key Machine-Readability Routes

| Route | Method | Description |
| :--- | :--- | :--- |
| `/` | `GET` | Discovery feed with live ticker, Command Search Bar (Cmd+K), and 3-column breakout bento grid. |
| `/q/[slug]` | `GET` | Strict Answer-First GEO page with TL;DR AI Citation Box, Step-by-Step guide, and JSON-LD schemas. |
| `/llms.txt` | `GET` | Automated plain-text directory index mapping all questions, slugs, and 1-sentence summaries for LLM crawlers. |
| `/llms-full.txt` | `GET` | Complete markdown text dump of all questions, steps, specs, and coordinates for single-prompt ingestion. |
| `/api/v1/openapi.json` | `GET` | OpenAPI 3.1.0 specification for ChatGPT Actions & Custom GPT plugins. |
| `/api/v1/search` | `GET` | Parametric search endpoint supporting `?q={query}&category={category}&limit={limit}`. |
| `/api/v1/ingest` | `POST` | Secure RAG webhook protected by `x-api-key` header with Zod validation and on-demand ISR revalidation. |

---

## 🛠️ Ingestion Webhook Payload Example

```bash
curl -X POST http://localhost:3000/api/v1/ingest \
  -H "Content-Type: application/json" \
  -H "x-api-key: geo-nervous-system-secret-key" \
  -d '{
    "question_title": "How to Hijack the Port Gellhorn Cargo Ship in GTA VI?",
    "slug": "how-to-steal-cargo-ship-port-gellhorn",
    "category": "Missions",
    "tldr_answer": "Infiltrate the Port Gellhorn naval dock at 02:00 game time via submersible or rebreather. Bypass the starboard bilge valve (Terminal B-4), disable the automated coastal beacon, and eliminate 4 private security contractors on the bridge before accessing the master helm override.",
    "steps_markdown": [
      {
        "stepNumber": 1,
        "title": "Approach via Submersible",
        "instruction": "Approach submerged below 15m to evade coastal radar.",
        "coordinates": "27.142° N, 82.319° W"
      }
    ],
    "specs_table_json": [
      { "label": "Estimated Payout", "value": "$2,450,000 + Cargo", "badge": "High Yield" }
    ],
    "source_urls": ["https://rockstargames.com/newswire/gtavi-patch-102"],
    "search_volume_score": 98,
    "last_patch_verified": "Patch 1.02 (Day-One Live)"
  }'
```

---

## 📦 Running Locally

```bash
npm install
npm run build
npm start
```
The platform runs on `http://localhost:3000`.
