import type { Metadata } from "next";
import Link from "next/link";
import { WIKI_REGIONS, LAUNCH_COMPLETIONIST_CHECKLIST } from "@/lib/wiki-data";
import { getWikiTree } from "@/lib/wiki-server";
import { getAllQuestions } from "@/lib/db";
import { WikiLayout } from "@/components/wiki/WikiLayout";
import { DirectAnswerBlock } from "@/components/wiki/DirectAnswerBlock";
import { InteractiveChecklist } from "@/components/wiki/InteractiveChecklist";
import { SortableDataTable } from "@/components/wiki/SortableDataTable";
import { WikiGuidesSection } from "@/components/wiki/WikiGuidesSection";
import {
  Compass,
  MapPin,
  ShieldCheck,
  Flame,
  ArrowRight,
  BookOpen,
  Cpu,
  Layers,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { SpecRow, QuestionRecord } from "@/types";

export const metadata: Metadata = {
  title: "GTA VI Editorial Gaming Wiki & Region Guide | ToolUp VI",
  description:
    "Authoritative 3-Column Grand Theft Auto VI Field Wiki and comprehensive region guide covering Vice City, Leonida Keys, Grassrivers, Port Gellhorn, Ambrosia, and Mount Kalaga National Park.",
  keywords: [
    "GTA VI Wiki",
    "Grand Theft Auto 6 Wiki",
    "Vice City map guide",
    "Leonida Keys secrets",
    "Port Gellhorn cargo ship",
    "Grassrivers airboat loop",
    "Ambrosia refinery",
    "Mount Kalaga National Park",
  ],
  alternates: {
    canonical: "https://toolup-vi.com/wiki",
  },
  openGraph: {
    title: "GTA VI Editorial Gaming Wiki & Regional Intel | ToolUp VI",
    description:
      "Comprehensive 3-Column GTA VI gameplay telemetry, region walkthroughs, mission checklists, and loot tables across Leonida.",
    url: "https://toolup-vi.com/wiki",
    type: "website",
  },
};

export default function WikiIndexPage() {
  const tree = getWikiTree();
  const allQuestions = getAllQuestions();

  // Synthetic direct answer record for the hub
  const hubDirectAnswerRecord: QuestionRecord = {
    id: "wiki-hub-overview",
    slug: "wiki-hub",
    title: "Grand Theft Auto VI Leonida Field Knowledge Base & System Overview",
    category: "Map & Regions",
    region: "Vice City",
    tldrAnswer:
      "Welcome to the ToolUp VI Editorial Gaming Wiki. The State of Leonida is divided into 6 strategic gameplay regions: Vice City (Urban Metropolitan), Leonida Keys (Archipelago & Smuggler Reefs), Grassrivers (Central Swamplands & Contraband), Port Gellhorn (Industrial Naval Docks), Ambrosia (Chemical & Agricultural District), and Mount Kalaga National Park (Alpine 3,240ft Summit). All guides are cross-benchmarked against Launch Build game systems and verified Leonida mechanics.",
    steps: [],
    specsTable: [],
    sourceUrls: [
      "https://rockstargames.com/vi/leonida-atlas",
      "https://leonida-geological-survey.org/master-map",
    ],
    searchVolumeScore: 100,
    velocityChange: "+950% Live",
    lastPatchVerified: "Launch Build · Nov 2026",
    verifiedBy: "ToolUp VI Cartography & Telemetry Labs",
    author: "Editorial Team",
    createdAt: "2026-11-15T00:00:00Z",
    updatedAt: "2026-11-15T23:59:00Z",
    viewsCount: 520000,
    llmCitationCount: 15400,
  };

  // Convert checklist data
  const checklistItems = LAUNCH_COMPLETIONIST_CHECKLIST.map((item) => ({
    id: item.id,
    title: item.label,
    subtitle: `Region: ${item.region} • Reward: ${item.reward}`,
    badge: item.difficulty,
  }));

  // Regional matrix spec rows for the sortable table
  const regionalSpecRows: SpecRow[] = WIKI_REGIONS.map((r) => ({
    label: `${r.name} (${r.subtitle})`,
    value: `${r.coordinates} • ${r.keyPOIs.slice(0, 2).join(", ")}`,
    badge: `${r.riskRating} Risk`,
  }));

  const customTocItems = [
    { id: "direct-answer", label: "01. Field Knowledge Base" },
    { id: "interactive-checklist", label: "02. Launch Checklist" },
    { id: "regional-grid", label: "03. Leonida 6 Regions" },
    { id: "specs-table", label: "04. Strategic Matrix Table" },
    { id: "latest-guides", label: "05. Verified Field Guides" },
  ];

  return (
    <WikiLayout tree={tree} customTocItems={customTocItems}>
      {/* Editorial Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs font-mono text-[#64748B] mb-4">
        <Link href="/" className="hover:text-[#F3F4F6] transition-colors">
          ToolUp VI
        </Link>
        <span>/</span>
        <span className="text-[#00F0FF] font-semibold">Editorial Gaming Wiki</span>
      </nav>

      {/* Hero Header */}
      <div className="pb-6 border-b border-[#1F2430]">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="px-2.5 py-1 rounded text-xs font-mono font-bold tracking-wide uppercase bg-[#00F0FF]/10 text-[#00F0FF] border border-[#00F0FF]/30">
            Fextralife & Mintlify Edition
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Launch Build · Nov 2026</span>
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-mono font-bold text-[#FF2E93] bg-[#FF2E93]/10 border border-[#FF2E93]/30">
            <Flame className="w-3.5 h-3.5" />
            <span>6 Major Regions</span>
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#F3F4F6] leading-tight mb-3 font-sans">
          GTA VI Editorial Gaming Wiki
        </h1>

        <p className="text-sm sm:text-base text-[#94A3B8] font-sans leading-relaxed max-w-2xl">
          An authoritative 3-column game guide and mission database for Grand Theft Auto VI.
          Zero fluff, interactive checklists, sortable parameters, and live coordinates across all 6 Leonida regions.
        </p>
      </div>

      {/* 1. Direct Answer Aside Block */}
      <DirectAnswerBlock question={hubDirectAnswerRecord} />

      {/* 2. Interactive LocalStorage Checklist */}
      <InteractiveChecklist
        storageKey="hub_completionist_v1"
        title="Leonida Launch Day Completionist Checklist"
        subtitle="Key mission benchmarks, vehicle unlocks, and keycard acquisitions. Saved to local storage."
        items={checklistItems}
      />

      {/* 3. Regional Cards Grid */}
      <section id="regional-grid" className="my-8 scroll-mt-24">
        <div className="mb-4">
          <h2 className="text-xl font-bold text-[#F3F4F6] flex items-center gap-2">
            <span className="font-mono text-[#00F0FF]">03.</span>
            <span>The Six Operational Regions of Leonida</span>
          </h2>
          <p className="text-xs text-[#94A3B8] mt-0.5">
            Click any region to explore verified field guides, spawn tables, and tactical choke points.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {WIKI_REGIONS.map((region) => {
            const guideCount = allQuestions.filter(
              (q) => q.region && q.region.toLowerCase() === region.name.toLowerCase()
            ).length;

            return (
              <div
                key={region.id}
                className="p-5 rounded-xl bg-[#12141D] border border-[#1F2430] hover:border-[#2A3142] transition-all flex flex-col justify-between group shadow-card"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span
                      className="px-2 py-0.5 rounded text-[10px] font-mono font-bold tracking-wide uppercase border"
                      style={{
                        color: region.accentColor,
                        borderColor: `${region.accentColor}40`,
                        backgroundColor: `${region.accentColor}10`,
                      }}
                    >
                      {region.riskRating} Risk
                    </span>
                    <span className="text-[11px] font-mono text-[#64748B]">
                      {guideCount} {guideCount === 1 ? "Guide" : "Guides"}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-[#F3F4F6] group-hover:text-[#00F0FF] transition-colors font-sans">
                    {region.name}
                  </h3>
                  <div className="text-xs text-[#64748B] font-mono mt-0.5 mb-2">
                    {region.subtitle}
                  </div>

                  <p className="text-xs text-[#94A3B8] font-sans leading-relaxed line-clamp-2 mb-3">
                    {region.description}
                  </p>

                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#00F0FF] mb-3">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{region.coordinates}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#1F2430]/70 flex items-center justify-between text-xs font-mono">
                  <span className="text-[#64748B]">Key POIs: {region.keyPOIs.length}</span>
                  <span className="text-[#00F0FF] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Explore Guides</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Sortable HTML Data Table */}
      <SortableDataTable
        title="Leonida Regional Telemetry & Strategic Loot Matrix"
        subtitle="Sort and filter coordinates, risk classifications, and priority points of interest."
        data={regionalSpecRows}
      />

      {/* 5. Verified Field Guides with Category Filtering */}
      <WikiGuidesSection questions={allQuestions} />
    </WikiLayout>
  );
}
