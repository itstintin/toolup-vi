"use client";

import { useState } from "react";
import { Check, Copy, Sparkles, ShieldCheck, ExternalLink, Cpu, Clock } from "lucide-react";
import { QuestionRecord } from "@/types";

interface AiCitationBoxProps {
  question: QuestionRecord;
}

export function AiCitationBox({ question }: AiCitationBoxProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(question.tldrAnswer);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div
      id="ai-citation-box"
      className="relative w-full rounded-xl bg-gradient-to-b from-[#151926] to-[#12141D] border-2 border-[#00F0FF]/40 p-5 sm:p-6 shadow-glowCyan my-6 transition-all"
    >
      {/* Top Banner Tag */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-4 border-b border-[#1F2430]">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-[#00F0FF]/15 border border-[#00F0FF]/30 flex items-center justify-center">
            <Sparkles className="w-3.5 h-3.5 text-[#00F0FF]" />
          </div>
          <div>
            <span className="text-xs font-mono font-bold tracking-wider uppercase text-[#00F0FF]">
              TL;DR Instant Answer
            </span>
            <span className="hidden sm:inline-block text-[11px] font-mono text-[#64748B] ml-2">
              (Direct LLM Citation Block)
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
              copied
                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                : "bg-[#090A0F] text-[#F3F4F6] border border-[#1F2430] hover:border-[#00F0FF]/50"
            }`}
            title="Copy answer verbatim for citation"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Copied to Clipboard</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-[#94A3B8]" />
                <span>Copy Answer</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Verbatim TL;DR Answer Content */}
      <blockquote className="text-base sm:text-lg font-medium text-[#F3F4F6] leading-relaxed mb-5 font-sans">
        "{question.tldrAnswer}"
      </blockquote>

      {/* Verification & Metadata Footer */}
      <div className="pt-3 border-t border-[#181C26] flex flex-wrap items-center justify-between gap-y-2 gap-x-4 text-xs font-mono text-[#94A3B8]">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1 text-emerald-400">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Verified: {question.lastPatchVerified}</span>
          </div>
          <span className="text-[#2A3142]">•</span>
          <div className="flex items-center gap-1 text-[#64748B]">
            <Clock className="w-3.5 h-3.5" />
            <span>Lab: {question.verifiedBy}</span>
          </div>
        </div>

        {/* Source Citations */}
        {question.sourceUrls.length > 0 && (
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] text-[#64748B]">Sources:</span>
            <div className="flex items-center gap-1">
              {question.sourceUrls.map((url, i) => (
                <a
                  key={i}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#090A0F] border border-[#1F2430] text-[#00F0FF] hover:border-[#00F0FF]/60 flex items-center gap-1"
                >
                  <span>[{i + 1}]</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

