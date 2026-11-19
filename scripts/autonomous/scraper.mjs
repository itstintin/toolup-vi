#!/usr/bin/env node
/**
 * Stage 1: Multi-Source Scraper for ToolUp VI Autonomous Pipeline.
 *
 * Fetches RSS/Atom feeds from Rockstar Newswire, Google News, gaming outlets,
 * and YouTube channels. Deduplicates against `ingested_sources` in Turso,
 * fetches clean readable text, and returns up to 5 fresh candidate articles.
 */

import fs from "fs";
import path from "path";
import { getDbClient } from "./db-setup.mjs";

const USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36 ToolUpVIBot/1.0";

/**
 * Clean HTML to extract text content, stripping script, style, nav, headers, and tags.
 */
export function cleanHtmlText(html) {
  if (!html) return "";
  let text = html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, " ")
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, " ")
    .replace(/<header\b[^<]*(?:(?!<\/header>)<[^<]*)*<\/header>/gi, " ")
    .replace(/<nav\b[^<]*(?:(?!<\/nav>)<[^<]*)*<\/nav>/gi, " ")
    .replace(/<footer\b[^<]*(?:(?!<\/footer>)<[^<]*)*<\/footer>/gi, " ")
    .replace(/<aside\b[^<]*(?:(?!<\/aside>)<[^<]*)*<\/aside>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return text.slice(0, 8000);
}

/**
 * Parse an RSS or Atom XML string into structured article items.
 */
export function parseFeedXml(xml, sourceName, defaultFilterKeywords = []) {
  const items = [];

  // Match RSS <item> tags
  const rssItems = xml.match(/<item[\s\S]*?<\/item>/gi) || [];
  for (const block of rssItems) {
    const titleMatch = block.match(/<title>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/title>/i);
    const linkMatch = block.match(/<link>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/link>/i) ||
                      block.match(/<link[^>]+href=["']([^"']+)["']/i);
    const descMatch = block.match(/<description>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/description>/i);
    const dateMatch = block.match(/<pubDate>([\s\S]*?)<\/pubDate>/i);

    const title = titleMatch ? cleanHtmlText(titleMatch[1]) : "";
    const link = linkMatch ? linkMatch[1].trim() : "";
    const desc = descMatch ? cleanHtmlText(descMatch[1]) : "";
    const pubDate = dateMatch ? dateMatch[1].trim() : new Date().toISOString();

    if (title && link) {
      items.push({
        sourceName,
        title,
        url: link,
        description: desc,
        publishedAt: pubDate,
        isYouTube: link.includes("youtube.com") || link.includes("youtu.be"),
        filterKeywords: defaultFilterKeywords,
      });
    }
  }

  // Match Atom <entry> tags (YouTube & Atom feeds)
  const atomEntries = xml.match(/<entry[\s\S]*?<\/entry>/gi) || [];
  for (const block of atomEntries) {
    const titleMatch = block.match(/<title[^>]*>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/title>/i);
    const linkMatch = block.match(/<link[^>]+href=["']([^"']+)["']/i) ||
                      block.match(/<link>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/link>/i);
    const summaryMatch = block.match(/<summary[^>]*>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/summary>/i) ||
                         block.match(/<media:description[^>]*>([\s\S]*?)<\/media:description>/i);
    const publishedMatch = block.match(/<published>([\s\S]*?)<\/published>/i) ||
                           block.match(/<updated>([\s\S]*?)<\/updated>/i);

    const title = titleMatch ? cleanHtmlText(titleMatch[1]) : "";
    const link = linkMatch ? linkMatch[1].trim() : "";
    const summary = summaryMatch ? cleanHtmlText(summaryMatch[1]) : "";
    const pubDate = publishedMatch ? publishedMatch[1].trim() : new Date().toISOString();

    if (title && link) {
      items.push({
        sourceName,
        title,
        url: link,
        description: summary,
        publishedAt: pubDate,
        isYouTube: link.includes("youtube.com") || link.includes("youtu.be"),
        filterKeywords: defaultFilterKeywords,
      });
    }
  }

  return items;
}

/**
 * Filter item by GTA VI / GTA 6 relevance keywords.
 */
function isRelevantGtaContent(item) {
  const combined = `${item.title} ${item.description}`.toLowerCase();
  const requiredKeywords = ["gta", "grand theft auto", "leonida", "vice city"];
  const hasBase = requiredKeywords.some((kw) => combined.includes(kw));
  if (!hasBase) return false;

  // If specific filter keywords configured, ensure at least one matches
  if (item.filterKeywords && item.filterKeywords.length > 0) {
    const hasFilterMatch = item.filterKeywords.some((kw) => combined.includes(kw.toLowerCase()));
    if (!hasFilterMatch) return false;
  }

  return true;
}

/**
 * Fetch article full text with defensive timeout and fallback.
 */
export async function fetchArticleContent(url, fallbackDescription = "") {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 10000);

    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent": USER_AGENT,
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      },
    });
    clearTimeout(timer);

    if (!res.ok) {
      return fallbackDescription;
    }

    const html = await res.text();
    const cleaned = cleanHtmlText(html);
    return cleaned.length > 100 ? cleaned : fallbackDescription;
  } catch (err) {
    return fallbackDescription;
  }
}

/**
 * Fetch already ingested URLs from Turso to avoid duplicate processing.
 */
export async function getIngestedUrlSet(client) {
  try {
    const res = await client.execute("SELECT source_url FROM ingested_sources;");
    const set = new Set();
    for (const row of res.rows) {
      if (row.source_url) {
        set.add(String(row.source_url).trim());
      }
    }
    return set;
  } catch (err) {
    console.warn("⚠️ Warning fetching ingested_sources:", err.message);
    return new Set();
  }
}

/**
 * Main Scraper execution: parses feeds, filters GTA VI guides, deduplicates, and limits to 5 candidates.
 */
export async function scrapeCandidates(options = {}) {
  const maxCandidates = options.maxCandidates || 5;
  const sourcesPath = path.join(process.cwd(), "scripts/autonomous/sources.json");

  let sourcesConfig = { rss_feeds: [], youtube_channels: [] };
  if (fs.existsSync(sourcesPath)) {
    try {
      sourcesConfig = JSON.parse(fs.readFileSync(sourcesPath, "utf-8"));
    } catch (err) {
      console.warn("⚠️ Could not parse sources.json, using defaults:", err.message);
    }
  }

  const allFeeds = [
    ...(sourcesConfig.rss_feeds || []),
    ...(sourcesConfig.youtube_channels || []),
  ];

  console.log(`🌐 Scanning ${allFeeds.length} configured content feeds...`);

  // Load existing ingested URLs from Turso if available
  let ingestedSet = new Set();
  try {
    const client = getDbClient();
    ingestedSet = await getIngestedUrlSet(client);
  } catch (err) {
    console.warn("⚠️ Could not connect to Turso for dedup, using fresh session set.");
  }

  const rawDiscovered = [];

  for (const feed of allFeeds) {
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 10000);

      const res = await fetch(feed.url, {
        signal: controller.signal,
        headers: {
          "User-Agent": USER_AGENT,
          Accept: "application/rss+xml, application/xml, text/xml, */*",
        },
      });
      clearTimeout(timer);

      if (!res.ok) {
        console.warn(`  ↳ Feed HTTP ${res.status}: ${feed.name}`);
        continue;
      }

      const xml = await res.text();
      const items = parseFeedXml(xml, feed.name, feed.filter_keywords || []);
      const relevant = items.filter(isRelevantGtaContent);
      rawDiscovered.push(...relevant);
    } catch (err) {
      console.warn(`  ↳ Skipping uncontactable feed ${feed.name}: ${err.message}`);
    }
  }

  console.log(`📡 Discovered ${rawDiscovered.length} relevant GTA articles/videos across feeds.`);

  // Deduplicate and filter already ingested
  const candidates = [];
  const seenUrls = new Set();

  for (const item of rawDiscovered) {
    if (seenUrls.has(item.url) || ingestedSet.has(item.url)) {
      continue;
    }
    seenUrls.add(item.url);

    // Fetch full body text for non-YouTube articles
    let content = item.description;
    if (!item.isYouTube) {
      content = await fetchArticleContent(item.url, item.description);
    }

    candidates.push({
      sourceName: item.sourceName,
      title: item.title,
      url: item.url,
      description: item.description,
      content,
      publishedAt: item.publishedAt,
      isYouTube: item.isYouTube,
    });

    if (candidates.length >= maxCandidates) {
      break;
    }
  }

  console.log(`🎯 Retained ${candidates.length} fresh candidate(s) for authentication (capped at ${maxCandidates}).`);
  return {
    totalDiscovered: rawDiscovered.length,
    candidates,
  };
}

const isMain = process.argv[1] && process.argv[1].endsWith("scraper.mjs");
if (isMain) {
  scrapeCandidates({ maxCandidates: 5 })
    .then((res) => {
      console.log(JSON.stringify(res, null, 2));
      process.exit(0);
    })
    .catch((err) => {
      console.error("❌ Fatal error in scraper:", err);
      process.exit(1);
    });
}
