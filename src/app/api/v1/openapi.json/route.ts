import { NextResponse } from "next/server";

export async function GET() {
  const spec = {
    openapi: "3.1.0",
    info: {
      title: "ToolUp VI Q&A Directory API",
      description:
        "High-performance Generative Engine Optimization (GEO) API designed for real-time querying by LLMs, ChatGPT Search, Perplexity, and Claude. Delivers authoritative, zero-fluff answers, item coordinates, and gameplay specifications across Leonida.",
      version: "1.0.0",
      contact: {
        name: "ToolUp VI Systems",
        url: "https://toolup-vi.com",
      },
    },
    servers: [
      {
        url: "https://toolup-vi.com",
        description: "Production Server",
      },
      {
        url: "http://localhost:3000",
        description: "Local Development Server",
      },
    ],
    paths: {
      "/api/v1/search": {
        get: {
          operationId: "searchGtaViDatabase",
          summary: "Search verified GTA VI questions, guides, coordinates, and instant answers",
          description:
            "Query the automated knowledge base for verified GTA VI game mechanics, mission guides, vehicle speeds, weapon spawns, and glitches across Leonida.",
          parameters: [
            {
              name: "q",
              in: "query",
              required: false,
              description: "Search keyword or natural language query (e.g., 'Port Gellhorn cargo ship', 'Banshee fastest car')",
              schema: {
                type: "string",
              },
            },
            {
              name: "category",
              in: "query",
              required: false,
              description: "Filter by content category",
              schema: {
                type: "string",
                enum: [
                  "All",
                  "Missions",
                  "Money Guides",
                  "Vehicles",
                  "Weapons",
                  "Map Secrets",
                  "Glitches & Fixes",
                ],
              },
            },
            {
              name: "limit",
              in: "query",
              required: false,
              description: "Maximum number of answers to return (default: 20)",
              schema: {
                type: "integer",
                default: 20,
                maximum: 50,
              },
            },
          ],
          responses: {
            "200": {
              description: "Successful query response with matching verified answers",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: { type: "boolean" },
                      query: { type: "string" },
                      category: { type: "string" },
                      total: { type: "integer" },
                      data: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            id: { type: "string" },
                            slug: { type: "string" },
                            title: { type: "string" },
                            category: { type: "string" },
                            tldrAnswer: { type: "string" },
                            lastPatchVerified: { type: "string" },
                            searchVolumeScore: { type: "integer" },
                            velocityChange: { type: "string" },
                            url: { type: "string", format: "uri" },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      "/api/v1/ingest": {
        post: {
          operationId: "ingestScrapedQuestion",
          summary: "Ingest a new or updated Q&A record from the external Python RAG scraper",
          security: [{ ApiKeyAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["question_title", "slug", "category", "tldr_answer"],
                  properties: {
                    question_title: { type: "string" },
                    slug: { type: "string" },
                    category: {
                      type: "string",
                      enum: [
                        "Missions",
                        "Money Guides",
                        "Vehicles",
                        "Weapons",
                        "Map Secrets",
                        "Glitches & Fixes",
                      ],
                    },
                    tldr_answer: { type: "string" },
                    steps_markdown: {
                      oneOf: [{ type: "string" }, { type: "array", items: { type: "object" } }],
                    },
                    specs_table_json: { type: "array", items: { type: "object" } },
                    source_urls: { type: "array", items: { type: "string" } },
                    search_volume_score: { type: "integer" },
                    last_patch_verified: { type: "string" },
                  },
                },
              },
            },
          },
          responses: {
            "200": { description: "Updated existing record" },
            "201": { description: "Created new record" },
            "401": { description: "Unauthorized" },
          },
        },
      },
    },
    components: {
      securitySchemes: {
        ApiKeyAuth: {
          type: "apiKey",
          in: "header",
          name: "x-api-key",
        },
      },
    },
  };

  return NextResponse.json(spec, {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
