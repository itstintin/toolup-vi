"use client";

import { useState } from "react";
import { MapPin, Check, Copy, AlertTriangle, ArrowRight } from "lucide-react";
import { StepItem } from "@/types";

interface StepExecutionProps {
  steps: StepItem[];
}

export function StepExecution({ steps }: StepExecutionProps) {
  const [copiedCoords, setCopiedCoords] = useState<string | null>(null);

  if (!steps || steps.length === 0) {
    return null;
  }

  const handleCopyCoord = async (coords: string) => {
    try {
      await navigator.clipboard.writeText(coords);
      setCopiedCoords(coords);
      setTimeout(() => setCopiedCoords(null), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section id="step-by-step" className="my-8 scroll-mt-24">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-xl font-bold text-[#F3F4F6] flex items-center gap-2">
            <span className="font-mono text-[#00F0FF]">02.</span>
            <span>Step-by-Step Execution</span>
          </h2>
          <p className="text-xs text-[#94A3B8] mt-0.5">
            Verified chronological sequence tested against in-game environmental physics and AI patrols.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {steps.map((step) => (
          <div
            key={step.stepNumber}
            className="p-5 rounded-xl bg-[#12141D] border border-[#1F2430] hover:border-[#2A3142] transition-colors relative"
          >
            {/* Step Header */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-[#090A0F] border border-[#1F2430] text-[#00F0FF] font-mono text-xs font-bold flex items-center justify-center">
                  #{step.stepNumber}
                </span>
                <h3 className="text-base font-semibold text-[#F3F4F6]">{step.title}</h3>
              </div>

              {/* Coordinates Pill with Copy Action */}
              {step.coordinates && (
                <button
                  onClick={() => handleCopyCoord(step.coordinates!)}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#090A0F] border border-[#1F2430] hover:border-[#00F0FF]/40 text-xs font-mono text-[#00F0FF] transition-colors"
                  title="Copy GPS coordinates"
                >
                  <MapPin className="w-3 h-3 text-[#00F0FF]" />
                  <span>{step.coordinates}</span>
                  {copiedCoords === step.coordinates ? (
                    <Check className="w-3 h-3 text-emerald-400 ml-1" />
                  ) : (
                    <Copy className="w-3 h-3 text-[#64748B] ml-1" />
                  )}
                </button>
              )}
            </div>

            {/* Instruction Body */}
            <p className="text-sm text-[#CBD5E1] leading-relaxed pl-10 mb-3 font-sans">
              {step.instruction}
            </p>

            {/* Optional Pro Tip */}
            {step.tip && (
              <div className="ml-10 p-3 rounded-lg bg-[#181B26] border border-[#1F2430] flex items-start gap-2.5 text-xs text-[#94A3B8]">
                <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <div className="leading-snug">
                  <span className="font-semibold text-amber-300 font-mono mr-1.5">INTEL TIP:</span>
                  <span>{step.tip}</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

