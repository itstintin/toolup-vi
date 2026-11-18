"use client";

import { useState } from "react";
import Link from "next/link";
import { Category, QuestionRecord } from "@/types";

interface WikiGuidesSectionProps {
  questions: QuestionRecord[];
}

const CATEGORIES: Category[] = [
  "All",
  "Money & ATMs",
  "Map & Regions",
  "Vehicles & Fences",
  "Weapons & Loadouts",
  "Criminal Profile & Heat",
  "Glitches & Fixes",
];

export function WikiGuidesSection({ questions }: WikiGuidesSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");

  const filtered =
    selectedCategory === "All"
      ? questions
      : questions.filter(
          (q) => q.category.toLowerCase() === selectedCategory.toLowerCase()
        );

  return (
    <section id="latest-guides" className="my-8 scroll-mt-24">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-[#F3F4F6] flex items-center gap-2">
          <span className="font-mono text-[#00F0FF]">05.</span>
          <span>All Verified Field Guides</span>
        </h2>
        <p className="text-xs text-[#94A3B8] mt-0.5">
          Full step-by-step telemetry, direct answers, and memory-tested blueprints.
        </p>
      </div>

      {/* Category Filter Chips for Wiki View */}
      <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-2 scrollbar-none">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all duration-150 border ${
                isActive
                  ? "bg-[#FF2E93]/15 text-[#FF2E93] border-[#FF2E93] shadow-glowCoral"
                  : "bg-[#12141D] text-[#94A3B8] border-[#1F2430] hover:text-[#F3F4F6] hover:border-[#2A3142]"
              }`}
            >
              {cat === "All" ? "All Guides" : cat}
            </button>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <div className="p-8 text-center rounded-xl bg-[#12141D] border border-[#1F2430] text-sm text-[#94A3B8]">
          No guides found for category <span className="text-[#F3F4F6]">"{selectedCategory}"</span>.
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((question) => (
            <Link
              key={question.id}
              href={`/wiki/${question.slug}`}
              className="group block p-4 rounded-xl bg-[#12141D] border border-[#1F2430] hover:border-[#00F0FF]/40 transition-all shadow-sm"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold tracking-wide uppercase bg-[#090A0F] border border-[#1F2430] text-[#00F0FF]">
                    {question.region || "Leonida"}
                  </span>
                  <span className="text-[10px] font-mono text-[#94A3B8]">
                    {question.category}
                  </span>
                </div>

                <span className="text-[10px] font-mono text-emerald-400">
                  {question.lastPatchVerified}
                </span>
              </div>

              <h3 className="text-base font-semibold text-[#F3F4F6] group-hover:text-[#00F0FF] font-sans transition-colors">
                {question.title}
              </h3>

              <p className="text-xs text-[#94A3B8] font-sans line-clamp-2 mt-1 leading-relaxed">
                {question.tldrAnswer}
              </p>

              <div className="mt-3 pt-2.5 border-t border-[#181C26] flex items-center justify-between text-xs font-mono text-[#64748B]">
                <span>{question.steps.length} Steps Verified</span>
                <span className="text-[#FF2E93]">{question.velocityChange}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
