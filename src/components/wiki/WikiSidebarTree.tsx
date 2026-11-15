"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Compass,
  ChevronDown,
  ChevronRight,
  Search,
  BookOpen,
  MapPin,
  ExternalLink,
  Flame,
  CheckCircle2,
} from "lucide-react";
import { WikiTreeNode, WIKI_REGIONS } from "@/lib/wiki-data";
import { QuestionRecord } from "@/types";

interface WikiSidebarTreeProps {
  tree: WikiTreeNode[];
  currentSlug?: string;
  onNavigateMobile?: () => void;
}

export function WikiSidebarTree({
  tree,
  currentSlug,
  onNavigateMobile,
}: WikiSidebarTreeProps) {
  const pathname = usePathname();
  const [searchFilter, setSearchFilter] = useState("");

  // Determine active region from currentSlug
  const activeRegionName = useMemo(() => {
    if (!currentSlug) return null;
    for (const node of tree) {
      if (node.guides.some((g) => g.slug.toLowerCase() === currentSlug.toLowerCase())) {
        return node.region.name;
      }
    }
    return null;
  }, [tree, currentSlug]);

  // Collapsible regions state (default open all or open active)
  const [openRegions, setOpenRegions] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    WIKI_REGIONS.forEach((r) => {
      initial[r.name] = true; // default all regions open like Mintlify / Fextralife
    });
    return initial;
  });

  const toggleRegion = (regionName: string) => {
    setOpenRegions((prev) => ({
      ...prev,
      [regionName]: !prev[regionName],
    }));
  };

  // Filter tree based on search
  const filteredTree = useMemo(() => {
    if (!searchFilter.trim()) return tree;
    const q = searchFilter.toLowerCase().trim();

    return tree
      .map((node) => {
        const matchesRegion =
          node.region.name.toLowerCase().includes(q) ||
          node.region.subtitle.toLowerCase().includes(q);

        const matchingGuides = node.guides.filter(
          (g) =>
            g.title.toLowerCase().includes(q) ||
            g.category.toLowerCase().includes(q) ||
            g.slug.toLowerCase().includes(q)
        );

        if (matchesRegion || matchingGuides.length > 0) {
          return {
            ...node,
            guides: matchesRegion ? node.guides : matchingGuides,
          };
        }
        return null;
      })
      .filter(Boolean) as WikiTreeNode[];
  }, [tree, searchFilter]);

  return (
    <nav
      aria-label="Wiki Region Category Tree"
      className="w-[240px] shrink-0 text-xs font-mono select-none"
    >
      {/* Category Tree Search */}
      <div className="mb-4">
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-[#64748B]" />
          <input
            type="text"
            placeholder="Search regions..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            className="w-full pl-8 pr-2.5 py-1.5 rounded-lg bg-[#0F1118] border border-[#1F2430] text-[11px] font-mono text-[#F3F4F6] placeholder-[#64748B] focus:outline-none focus:border-[#00F0FF]/60 transition-colors"
          />
        </div>
      </div>

      {/* Wiki Hub Home Link */}
      <div className="mb-4 pb-3 border-b border-[#1F2430]">
        <Link
          href="/wiki"
          onClick={onNavigateMobile}
          className={`flex items-center gap-2 px-2.5 py-2 rounded-lg transition-all ${
            pathname === "/wiki"
              ? "bg-[#00F0FF]/15 text-[#00F0FF] border border-[#00F0FF]/40 font-bold shadow-sm"
              : "text-[#94A3B8] hover:text-[#F3F4F6] hover:bg-[#12141D]"
          }`}
        >
          <Compass className="w-4 h-4 text-[#00F0FF]" />
          <div className="flex flex-col">
            <span className="text-xs font-bold leading-tight font-sans">Wiki Field Hub</span>
            <span className="text-[10px] text-[#64748B]">Leonida Knowledge Base</span>
          </div>
        </Link>
      </div>

      {/* Category Tree Sections Header */}
      <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-[#64748B] font-bold px-2 mb-2">
        <span>Leonida Regions (6)</span>
        <span className="text-[9px] px-1.5 py-0.2 rounded bg-[#181B26] text-[#94A3B8]">
          Patch 1.02
        </span>
      </div>

      {/* Tree Nodes (6 Regions) */}
      <div className="space-y-1">
        {filteredTree.map(({ region, guides }) => {
          const isOpen = openRegions[region.name] ?? true;
          const isCurrentRegion = activeRegionName === region.name;

          return (
            <div key={region.id} className="rounded-lg">
              {/* Region Group Header */}
              <button
                type="button"
                onClick={() => toggleRegion(region.name)}
                className={`w-full flex items-center justify-between px-2 py-1.5 rounded-md text-left transition-colors group ${
                  isCurrentRegion
                    ? "text-[#00F0FF] bg-[#121520]"
                    : "text-[#CBD5E1] hover:text-[#F3F4F6] hover:bg-[#12141D]"
                }`}
              >
                <div className="flex items-center gap-1.5 truncate">
                  <span
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: region.accentColor }}
                  />
                  <span className="font-semibold text-xs tracking-tight truncate font-sans">
                    {region.name}
                  </span>
                </div>

                <div className="flex items-center gap-1 flex-shrink-0 text-[#64748B]">
                  <span className="text-[9px] px-1 rounded bg-[#090A0F] border border-[#1F2430]">
                    {guides.length}
                  </span>
                  {isOpen ? (
                    <ChevronDown className="w-3.5 h-3.5 text-[#64748B] group-hover:text-[#F3F4F6]" />
                  ) : (
                    <ChevronRight className="w-3.5 h-3.5 text-[#64748B] group-hover:text-[#F3F4F6]" />
                  )}
                </div>
              </button>

              {/* Nested Guides for this region */}
              {isOpen && (
                <div className="mt-0.5 ml-2.5 pl-2.5 border-l border-[#1F2430] space-y-0.5">
                  {guides.length === 0 ? (
                    <div className="py-1 px-2 text-[10px] text-[#475569] italic">
                      Telemetry sync pending...
                    </div>
                  ) : (
                    guides.map((guide) => {
                      const isActive =
                        currentSlug &&
                        guide.slug.toLowerCase() === currentSlug.toLowerCase();

                      return (
                        <Link
                          key={guide.id}
                          href={`/wiki/${guide.slug}`}
                          onClick={onNavigateMobile}
                          title={guide.title}
                          className={`group flex items-center justify-between py-1.5 px-2 rounded-md text-[11px] transition-all leading-snug ${
                            isActive
                              ? "bg-[#00F0FF]/15 text-[#00F0FF] font-semibold border-l-2 border-[#00F0FF] pl-2.5"
                              : "text-[#94A3B8] hover:text-[#F3F4F6] hover:bg-[#12141D]/80"
                          }`}
                        >
                          <span className="truncate font-sans">{guide.title}</span>
                          {guide.isBreakout && (
                            <Flame className="w-3 h-3 text-[#FF2E93] flex-shrink-0 ml-1" />
                          )}
                        </Link>
                      );
                    })
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Tree Footer / Quick Info */}
      <div className="mt-6 pt-4 border-t border-[#1F2430] px-2 text-[11px] text-[#64748B] space-y-2">
        <div className="flex items-center justify-between">
          <span>Active Dataset</span>
          <span className="text-[#00F0FF]">10 Guides</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Coverage</span>
          <span className="text-emerald-400">6/6 Regions</span>
        </div>
      </div>
    </nav>
  );
}
