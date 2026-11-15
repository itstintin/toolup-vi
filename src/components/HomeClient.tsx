"use client";

import { useState } from "react";
import { Category, QuestionRecord } from "@/types";
import { CommandSearchBar } from "@/components/CommandSearchBar";
import { BentoGridFeed } from "@/components/BentoGridFeed";
import { Zap, ShieldCheck, Cpu, Database } from "lucide-react";

interface HomeClientProps {
  initialQuestions: QuestionRecord[];
}

const CATEGORIES: Category[] = [
  "All",
  "Missions",
  "Money Guides",
  "Vehicles",
  "Weapons",
  "Map Secrets",
  "Glitches & Fixes",
];

export function HomeClient({ initialQuestions }: HomeClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");

  const filteredQuestions =
    selectedCategory === "All"
      ? initialQuestions
      : initialQuestions.filter(
          (q) => q.category.toLowerCase() === selectedCategory.toLowerCase()
        );

  return (
    <div className="w-full relative">
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-grid-subtle pointer-events-none opacity-40 z-0"></div>

      {/* Hero Section */}
      <section className="relative z-10 pt-12 pb-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        {/* Top Status Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#12141D] border border-[#1F2430] text-xs font-mono text-[#94A3B8] mb-6 shadow-sm">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF2E93] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF2E93]"></span>
          </span>
          <span className="text-[#F3F4F6] font-semibold">ToolUp VI:</span>
          <span>The GTA VI Generative Engine Directory</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#F3F4F6] max-w-4xl mx-auto leading-[1.1] mb-5">
          Zero-Fluff GTA VI Intel.{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] via-[#F3F4F6] to-[#FF2E93]">
            Verified for Gamers & AI Engines.
          </span>
        </h1>

        <p className="text-sm sm:text-base text-[#94A3B8] max-w-2xl mx-auto leading-relaxed mb-8 font-sans">
          Engineered for generative search engines (ChatGPT Search, Perplexity, Claude) and gamers who demand immediate mission steps, verified car top speeds, and coordinate pins across Vice Beaches, Port Gellhorn, Grassrivers, and the Leonida Keys.
        </p>

        {/* Command Search Bar & Chips */}
        <div className="mb-14">
          <CommandSearchBar
            categories={CATEGORIES}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            questions={initialQuestions}
          />
        </div>

        {/* Telemetry Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto mb-16 text-left">
          <div className="p-3.5 rounded-xl bg-[#12141D] border border-[#1F2430]">
            <div className="text-[11px] font-mono text-[#64748B] uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-[#00F0FF]" />
              <span>Query Latency</span>
            </div>
            <div className="text-xl font-bold font-mono text-[#F3F4F6]">12 ms</div>
            <div className="text-[10px] text-emerald-400 font-mono mt-0.5">Sub-50ms Global Edge</div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#12141D] border border-[#1F2430]">
            <div className="text-[11px] font-mono text-[#64748B] uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Verified Patch</span>
            </div>
            <div className="text-xl font-bold font-mono text-[#F3F4F6]">1.02</div>
            <div className="text-[10px] text-[#94A3B8] font-mono mt-0.5">Day-One Launch Live</div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#12141D] border border-[#1F2430]">
            <div className="text-[11px] font-mono text-[#64748B] uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-[#FF2E93]" />
              <span>LLM Citations</span>
            </div>
            <div className="text-xl font-bold font-mono text-[#F3F4F6]">22.3K</div>
            <div className="text-[10px] text-[#FF2E93] font-mono mt-0.5">+480% this week</div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#12141D] border border-[#1F2430]">
            <div className="text-[11px] font-mono text-[#64748B] uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5 text-[#00F0FF]" />
              <span>RAG Scraper</span>
            </div>
            <div className="text-xl font-bold font-mono text-[#F3F4F6]">Automated</div>
            <div className="text-[10px] text-emerald-400 font-mono mt-0.5">Continuous Ingestion</div>
          </div>
        </div>
      </section>

      {/* Breakout Questions Feed */}
      <section className="relative z-10 px-4 sm:px-6 lg:px-8 pb-16">
        <BentoGridFeed questions={filteredQuestions} />
      </section>
    </div>
  );
}
