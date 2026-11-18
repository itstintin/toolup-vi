"use client";

import Link from "next/link";
import { Flame, ShieldCheck, Bookmark, ArrowUpRight, Clock, Eye } from "lucide-react";
import { QuestionRecord } from "@/types";
import { formatNumber } from "@/lib/utils";

interface BentoGridFeedProps {
  questions: QuestionRecord[];
}

export function BentoGridFeed({ questions }: BentoGridFeedProps) {
  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Flame className="w-5 h-5 text-[#FF2E93]" />
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#F3F4F6]">
              Breakout Questions (Last 24h)
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#94A3B8]">
            High-velocity player queries with live game verifications and instant tactical guides.
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono text-[#64748B]">
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#12141D] border border-[#1F2430]">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>Launch Build · Nov 2026</span>
          </span>
        </div>
      </div>

      {/* 3-Column Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {questions.map((q) => {
          return (
            <Link
              key={q.id}
              href={`/q/${q.slug}`}
              className="group relative flex flex-col justify-between p-5 bg-[#12141D] rounded-xl border border-[#1F2430] hover:border-[#00F0FF]/60 hover:shadow-glowCyan transition-all duration-200"
            >
              {/* Header inside Card */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold tracking-wide uppercase bg-[#090A0F] border border-[#1F2430] text-[#00F0FF]">
                      {q.category}
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold text-[#FF2E93] bg-[#FF2E93]/10 border border-[#FF2E93]/30">
                      <Flame className="w-2.5 h-2.5" />
                      {q.velocityChange}
                    </span>
                  </div>

                  <ArrowUpRight className="w-4 h-4 text-[#64748B] group-hover:text-[#00F0FF] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>

                {/* Title */}
                <h3 className="text-base font-bold text-[#F3F4F6] group-hover:text-[#00F0FF] transition-colors leading-snug line-clamp-2 mb-2.5">
                  {q.title}
                </h3>

                {/* 2-Line Answer Preview */}
                <p className="text-xs text-[#94A3B8] leading-relaxed line-clamp-2 mb-4 font-sans">
                  {q.tldrAnswer}
                </p>
              </div>

              {/* Footer Meta */}
              <div className="pt-3 border-t border-[#181C26] flex items-center justify-between text-[11px] font-mono text-[#64748B]">
                <div className="flex items-center gap-1.5 text-emerald-400">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span className="truncate max-w-[140px]">{q.lastPatchVerified}</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1" title="Community Saves">
                    <Bookmark className="w-3 h-3 text-[#00F0FF]" />
                    <span>{formatNumber(q.llmCitationCount)}</span>
                  </span>
                  <span className="flex items-center gap-1" title="Total Views">
                    <Eye className="w-3 h-3 text-[#94A3B8]" />
                    <span>{formatNumber(q.viewsCount)}</span>
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

