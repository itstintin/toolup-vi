"use client";

import { useState } from "react";
import { Zap, Check, Copy, ShieldCheck, Sparkles, MapPin, Tag } from "lucide-react";
import { QuestionRecord } from "@/types";

interface DirectAnswerBlockProps {
  question: QuestionRecord;
}

export function DirectAnswerBlock({ question }: DirectAnswerBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(question.tldrAnswer);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <aside
      id="direct-answer"
      aria-label="Direct Answer & Executive Telemetry"
      className="my-6 scroll-mt-24 rounded-xl border border-[#00F0FF]/40 bg-gradient-to-br from-[#0B1522] via-[#0D121D] to-[#0A0D14] p-5 sm:p-6 shadow-glowCyan relative overflow-hidden group"
    >
      {/* Background Accent Grid / Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#00F0FF]/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3.5 relative z-10">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#00F0FF]/15 text-[#00F0FF] border border-[#00F0FF]/30 shadow-sm">
            <Zap className="w-3.5 h-3.5" />
          </span>
          <span className="font-mono text-xs font-bold tracking-wider uppercase text-[#00F0FF]">
            DIRECT ANSWER // EXECUTIVE INTEL
          </span>
          <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30">
            <ShieldCheck className="w-3 h-3" />
            <span>{question.lastPatchVerified}</span>
          </span>
        </div>

        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#121622] hover:bg-[#1A2132] border border-[#1F2430] hover:border-[#00F0FF]/40 text-xs font-mono text-[#CBD5E1] hover:text-[#00F0FF] transition-all"
          title="Copy direct answer to clipboard"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy Answer</span>
            </>
          )}
        </button>
      </div>

      {/* Direct Answer High-Contrast Prose */}
      <div className="relative z-10">
        <p className="text-base sm:text-lg font-medium text-[#F3F4F6] font-sans leading-relaxed tracking-normal">
          {question.tldrAnswer}
        </p>
      </div>

      {/* Editorial Key Takeaways Bar */}
      <div className="mt-4 pt-3.5 border-t border-[#1F2430]/80 flex flex-wrap items-center gap-2 sm:gap-4 text-xs font-mono text-[#94A3B8] relative z-10">
        {question.region && (
          <div className="flex items-center gap-1 text-[#F3F4F6]">
            <MapPin className="w-3.5 h-3.5 text-[#00F0FF]" />
            <span className="text-[#64748B]">Region:</span>
            <span className="text-[#00F0FF] font-semibold">{question.region}</span>
          </div>
        )}

        <div className="flex items-center gap-1">
          <Tag className="w-3.5 h-3.5 text-[#FF2E93]" />
          <span className="text-[#64748B]">Category:</span>
          <span className="text-[#F3F4F6] font-medium">{question.category}</span>
        </div>

        <div className="flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-[#64748B]">Telemetry Lab:</span>
          <span className="text-[#F3F4F6]">{question.verifiedBy}</span>
        </div>
      </div>
    </aside>
  );
}
