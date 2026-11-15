#!/usr/bin/env python3
"""
End-to-End Runner Script for ToolUp VI Automation Pipeline
1. Triggers the Automated Question Scraper (automation/scraper.py) to harvest breakout GTA VI questions.
2. Selects trending unindexed questions.
3. Invokes the RAG Answer Engine (automation/rag_publisher.py) to synthesize grounded, lore-verified answers.
4. Auto-publishes the structured records to the Next.js ingestion API (/api/v1/ingest).
5. Prints the live localhost URLs and updates the queue state.
"""

import argparse
import json
import os
import sys
import time
from pathlib import Path
from typing import Dict, List, Optional

# Ensure paths are set for importing automation sibling modules
SCRIPT_DIR = Path(__file__).resolve().parent
PROJECT_ROOT = SCRIPT_DIR.parent
if str(SCRIPT_DIR) not in sys.path:
    sys.path.insert(0, str(SCRIPT_DIR))
if str(PROJECT_ROOT) not in sys.path:
    sys.path.insert(0, str(PROJECT_ROOT))

# Import scraper and publisher modules
from scraper import load_queue, run_scraper
from rag_publisher import (
    DEFAULT_API_KEY,
    DEFAULT_INGEST_ENDPOINT,
    mark_queue_item_published,
    publish_record,
    research_and_ground_question,
    validate_ingestion_payload,
)


def run_pipeline(
    test_mode: bool = False,
    count: int = 2,
    endpoint: str = DEFAULT_INGEST_ENDPOINT,
    api_key: str = DEFAULT_API_KEY,
    force_fallback: bool = False,
) -> List[Dict]:
    """
    Execute the automated end-to-end question discovery, RAG grounding, and publication pipeline.
    """
    print("\n" + "=" * 70)
    print("🚀 TOOLUP VI — AUTOMATED RAG INGESTION PIPELINE")
    print("=" * 70)
    print(f"[*] Mode:        {'TEST RUN (--test)' if test_mode else 'PRODUCTION BATCH'}")
    print(f"[*] Target Count: {count} questions")
    print(f"[*] Endpoint:    {endpoint}")
    print(f"[*] Timestamp:   {time.strftime('%Y-%m-%d %H:%M:%S UTC', time.gmtime())}")
    print("=" * 70 + "\n")

    # Step 1: Trigger the Scraper
    print("--- [STAGE 1: SCRAPER DISCOVERY] ---")
    print("[*] Triggering Reddit feed scraper & trend discovery...")
    new_scraped, total_in_queue = run_scraper(force_fallback=force_fallback, max_items=15)
    print(f"[+] Scraper finished. {len(new_scraped)} new items added, total queue: {total_in_queue}.\n")

    # Step 2: Select Trending Unindexed Questions
    print("--- [STAGE 2: QUEUE SELECTION] ---")
    current_queue = load_queue()
    unindexed = [item for item in current_queue if item.get("status") != "published"]

    if not unindexed:
        print("[!] No unindexed questions found in queue. Resetting queue for test run...")
        # In test mode, if all are published, pick the highest scoring items to refresh
        unindexed = sorted(current_queue, key=lambda x: x.get("score", 0), reverse=True)[:count]

    # Sort candidates by trend score
    candidates = sorted(unindexed, key=lambda x: x.get("score", 0), reverse=True)[:count]
    print(f"[+] Selected {len(candidates)} trending questions for grounded RAG synthesis:")
    for idx, c in enumerate(candidates, 1):
        print(f"    {idx}. [{c.get('category')}] {c.get('title')} (Trend Score: {c.get('score', 0)})")
    print()

    # Step 3 & 4: RAG Grounding & Auto-Publication
    print("--- [STAGE 3 & 4: RAG SYNTHESIS & INGESTION] ---")
    published_results = []

    for idx, candidate in enumerate(candidates, 1):
        title = candidate.get("title", "")
        slug = candidate.get("slug", "")
        category = candidate.get("category", "Missions")

        print(f"\n[{idx}/{len(candidates)}] Processing: '{title}'")
        print(f"    Category: {category} | Slug: {slug}")

        # RAG Grounding
        print("    [*] Grounding question with verified Leonida locations & vehicles...")
        grounded_record = research_and_ground_question(candidate)

        # Validate Ingestion Payload
        is_valid, validation_errors = validate_ingestion_payload(grounded_record)
        if not is_valid:
            print(f"    [-] Validation FAILED: {', '.join(validation_errors)}")
            continue

        tldr_words = len(grounded_record["tldr_answer"].split())
        print(f"    [+] Grounded TLDR ({tldr_words} words): \"{grounded_record['tldr_answer']}\"")
        print(f"    [+] Steps: {len(grounded_record.get('steps_markdown', []))} | Specs: {len(grounded_record.get('specs_table_json', []))}")

        # Publish to Next.js API
        print(f"    [*] POSTing to {endpoint} with x-api-key...")
        try:
            resp = publish_record(grounded_record, endpoint_url=endpoint, api_key=api_key)
            if resp.get("success"):
                action = resp.get("action", "created")
                path_url = resp.get("url", f"/q/{grounded_record['slug']}")
                full_app_url = f"http://localhost:3000{path_url}"
                full_wiki_url = f"http://localhost:3000/wiki/{grounded_record['slug']}"

                print(f"    [SUCCESS] Ingested ({action.upper()})!")
                print(f"    -> App View:  {full_app_url}")
                print(f"    -> Wiki View: {full_wiki_url}")

                mark_queue_item_published(grounded_record["slug"], path_url)

                published_results.append({
                    "title": grounded_record["question_title"],
                    "slug": grounded_record["slug"],
                    "category": grounded_record["category"],
                    "action": action,
                    "app_url": full_app_url,
                    "wiki_url": full_wiki_url,
                    "score": candidate.get("score", 0),
                    "tldr": grounded_record["tldr_answer"],
                })
            else:
                print(f"    [ERROR] Ingestion response rejected: {resp}")
        except Exception as e:
            print(f"    [ERROR] Network or publication failure: {e}")

    # Step 5: Summary Report
    print("\n" + "=" * 70)
    print("🎯 PIPELINE EXECUTION SUMMARY")
    print("=" * 70)
    print(f"Total Processed: {len(candidates)}")
    print(f"Successfully Published: {len(published_results)} / {len(candidates)}")
    print("\nLive Localhost Published URLs:")
    for item in published_results:
        print(f"\n  • Title: {item['title']}")
        print(f"    Category: [{item['category']}] | Status: {item['action']}")
        print(f"    App View:  {item['app_url']}")
        print(f"    Wiki View: {item['wiki_url']}")
    print("=" * 70 + "\n")

    return published_results


def main():
    parser = argparse.ArgumentParser(description="ToolUp VI End-to-End Ingestion Pipeline Runner")
    parser.add_argument(
        "--test",
        action="store_true",
        help="Run in test mode: triggers scraper for 2 trending questions, generates answers, and publishes to localhost",
    )
    parser.add_argument(
        "--count",
        type=int,
        default=2,
        help="Number of questions to ingest (default: 2)",
    )
    parser.add_argument(
        "--endpoint",
        default=DEFAULT_INGEST_ENDPOINT,
        help=f"Ingestion API endpoint (default: {DEFAULT_INGEST_ENDPOINT})",
    )
    parser.add_argument(
        "--api-key",
        default=DEFAULT_API_KEY,
        help="Secret API key for x-api-key header",
    )
    parser.add_argument(
        "--force-fallback",
        action="store_true",
        help="Force using curated fallback data without attempting Reddit API",
    )

    args = parser.parse_args()

    # If --test is provided, default count is 2
    count = args.count if args.count else 2
    if args.test and count != 2 and "--count" not in sys.argv:
        count = 2

    results = run_pipeline(
        test_mode=args.test,
        count=count,
        endpoint=args.endpoint,
        api_key=args.api_key,
        force_fallback=args.force_fallback,
    )

    if not results:
        print("[-] Pipeline finished with 0 questions published.")
        sys.exit(1)
    else:
        print(f"[+] Pipeline completed successfully. {len(results)} questions live.")
        sys.exit(0)


if __name__ == "__main__":
    main()
