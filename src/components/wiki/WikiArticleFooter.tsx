"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ThumbsUp, ThumbsDown, Check, ShieldCheck, Cpu } from "lucide-react";
import { QuestionRecord } from "@/types";

interface WikiArticleFooterProps {
  question: QuestionRecord;
  prevGuide: QuestionRecord | null;
  nextGuide: QuestionRecord | null;
}

export function WikiArticleFooter({
  question,
  prevGuide,
  nextGuide,
}: WikiArticleFooterProps) {
  const [feedback, setFeedback] = useState<"yes" | "no" | null>(null);

  return (
    <footer className="mt-12 pt-8 border-t border-[#1F2430] space-y-8">
      {/* Editorial Feedback Widget */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-[#0F1118] border border-[#1F2430]">
        <div>
          <h4 className="text-sm font-semibold text-[#F3F4F6] font-sans">
            Was this field guide helpful?
          </h4>
          <p className="text-xs text-[#94A3B8] font-mono mt-0.5">
            Help improve community telemetry and RAG citation accuracy.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {feedback ? (
            <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/30">
              <Check className="w-3.5 h-3.5" />
              <span>Feedback recorded! Thank you.</span>
            </div>
          ) : (
            <>
              <button
                onClick={() => setFeedback("yes")}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#181B26] hover:bg-[#1E2230] border border-[#1F2430] hover:border-[#00F0FF]/40 text-xs font-mono text-[#CBD5E1] hover:text-[#00F0FF] transition-colors"
              >
                <ThumbsUp className="w-3.5 h-3.5" />
                <span>Yes</span>
              </button>
              <button
                onClick={() => setFeedback("no")}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#181B26] hover:bg-[#1E2230] border border-[#1F2430] hover:border-[#FF2E93]/40 text-xs font-mono text-[#CBD5E1] hover:text-[#FF2E93] transition-colors"
              >
                <ThumbsDown className="w-3.5 h-3.5" />
                <span>No</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Mintlify-Style Previous / Next Navigation Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {prevGuide ? (
          <Link
            href={`/wiki/${prevGuide.slug}`}
            className="group flex flex-col p-4 rounded-xl bg-[#12141D] border border-[#1F2430] hover:border-[#00F0FF]/40 transition-all text-left"
          >
            <span className="flex items-center gap-1 text-[11px] font-mono text-[#64748B] group-hover:text-[#00F0FF] mb-1.5">
              <ArrowLeft className="w-3 h-3 group-hover:-translate-x-0.5 transition-transform" />
              <span>PREVIOUS GUIDE</span>
            </span>
            <span className="text-sm font-semibold text-[#F3F4F6] group-hover:text-[#00F0FF] font-sans line-clamp-2 transition-colors">
              {prevGuide.title}
            </span>
          </Link>
        ) : (
          <div className="hidden sm:block" />
        )}

        {nextGuide && (
          <Link
            href={`/wiki/${nextGuide.slug}`}
            className="group flex flex-col p-4 rounded-xl bg-[#12141D] border border-[#1F2430] hover:border-[#00F0FF]/40 transition-all text-right sm:col-start-2"
          >
            <span className="flex items-center justify-end gap-1 text-[11px] font-mono text-[#64748B] group-hover:text-[#00F0FF] mb-1.5">
              <span>NEXT GUIDE</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </span>
            <span className="text-sm font-semibold text-[#F3F4F6] group-hover:text-[#00F0FF] font-sans line-clamp-2 transition-colors">
              {nextGuide.title}
            </span>
          </Link>
        )}
      </div>

      {/* Meta Telemetry Badge */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono text-[#64748B] pt-4">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Patch Integrity: {question.lastPatchVerified}</span>
        </div>
        <div className="flex items-center gap-2">
          <Cpu className="w-3.5 h-3.5 text-[#00F0FF]" />
          <span>RAG Ingest: Verified by {question.verifiedBy}</span>
        </div>
      </div>
    </footer>
  );
}
