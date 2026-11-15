"use client";

import { useState } from "react";
import { WikiSidebarTree } from "./WikiSidebarTree";
import { WikiRightRail, TocItem } from "./WikiRightRail";
import { WikiTreeNode } from "@/lib/wiki-data";
import { QuestionRecord } from "@/types";
import { Menu, X, Compass, ChevronRight } from "lucide-react";
import Link from "next/link";

interface WikiLayoutProps {
  tree: WikiTreeNode[];
  currentSlug?: string;
  question?: QuestionRecord;
  customTocItems?: TocItem[];
  children: React.ReactNode;
  breadcrumb?: {
    region?: string;
    title?: string;
  };
}

export function WikiLayout({
  tree,
  currentSlug,
  question,
  customTocItems,
  children,
  breadcrumb,
}: WikiLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#090A0F] text-[#F3F4F6]">
      {/* Mobile Sticky Sub-Nav with Tree Drawer Toggle */}
      <div className="lg:hidden sticky top-16 z-30 w-full border-b border-[#1F2430] bg-[#090A0F]/95 backdrop-blur px-4 py-2.5 flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-2 truncate">
          <Link href="/wiki" className="text-[#00F0FF] flex items-center gap-1 font-bold">
            <Compass className="w-3.5 h-3.5" />
            <span>Leonida Wiki</span>
          </Link>
          {breadcrumb?.region && (
            <>
              <ChevronRight className="w-3 h-3 text-[#64748B]" />
              <span className="text-[#94A3B8] truncate">{breadcrumb.region}</span>
            </>
          )}
        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#12141D] border border-[#1F2430] text-[#CBD5E1] hover:text-[#00F0FF] transition-colors"
        >
          {mobileMenuOpen ? <X className="w-3.5 h-3.5" /> : <Menu className="w-3.5 h-3.5" />}
          <span>Regions Tree</span>
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/80 backdrop-blur-sm pt-28 px-6 pb-12 overflow-y-auto">
          <div className="max-w-sm mx-auto bg-[#0F1118] border border-[#1F2430] rounded-2xl p-5 shadow-2xl relative">
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-[#181B26] text-[#94A3B8] hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
            <h3 className="text-sm font-bold font-mono text-[#00F0FF] mb-4">
              Leonida Regions Category Tree
            </h3>
            <WikiSidebarTree
              tree={tree}
              currentSlug={currentSlug}
              onNavigateMobile={() => setMobileMenuOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Main 3-Column Container */}
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-8 flex justify-center gap-8">
        {/* Column 1: Sticky 240px Left Category Tree */}
        <aside className="w-[240px] shrink-0 sticky top-24 self-start hidden lg:block">
          <WikiSidebarTree tree={tree} currentSlug={currentSlug} />
        </aside>

        {/* Column 2: 760px Center Article Column */}
        <main className="w-full max-w-[760px] flex-1 min-w-0">
          {children}
        </main>

        {/* Column 3: Sticky 300px Right Rail */}
        <aside className="w-[300px] shrink-0 sticky top-24 self-start hidden xl:block">
          <WikiRightRail question={question} customTocItems={customTocItems} />
        </aside>
      </div>
    </div>
  );
}
