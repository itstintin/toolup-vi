"use client";

import { useState, useEffect } from "react";
import { CheckSquare, Square, RotateCcw, CheckCircle2, Trophy, Sparkles } from "lucide-react";

export interface ChecklistItem {
  id: string;
  title: string;
  subtitle?: string;
  coordinates?: string;
  badge?: string;
}

interface InteractiveChecklistProps {
  storageKey: string;
  title?: string;
  subtitle?: string;
  items: ChecklistItem[];
}

export function InteractiveChecklist({
  storageKey,
  title = "Interactive Mission & Objective Checklist",
  subtitle = "Track your live in-game completion. Progress persists automatically in local storage.",
  items,
}: InteractiveChecklistProps) {
  const [checkedIds, setCheckedIds] = useState<Record<string, boolean>>({});
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    try {
      const saved = localStorage.getItem(`gta6_wiki_checklist_${storageKey}`);
      if (saved) {
        setCheckedIds(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Failed to load checklist from localStorage", e);
    }
  }, [storageKey]);

  const toggleItem = (id: string) => {
    const updated = {
      ...checkedIds,
      [id]: !checkedIds[id],
    };
    setCheckedIds(updated);
    try {
      localStorage.setItem(`gta6_wiki_checklist_${storageKey}`, JSON.stringify(updated));
    } catch (e) {
      console.error("Failed to save checklist to localStorage", e);
    }
  };

  const handleReset = () => {
    setCheckedIds({});
    try {
      localStorage.removeItem(`gta6_wiki_checklist_${storageKey}`);
    } catch (e) {
      console.error(e);
    }
  };

  const handleCompleteAll = () => {
    const allChecked: Record<string, boolean> = {};
    items.forEach((item) => {
      allChecked[item.id] = true;
    });
    setCheckedIds(allChecked);
    try {
      localStorage.setItem(`gta6_wiki_checklist_${storageKey}`, JSON.stringify(allChecked));
    } catch (e) {
      console.error(e);
    }
  };

  const completedCount = isMounted
    ? items.filter((item) => checkedIds[item.id]).length
    : 0;
  const totalCount = items.length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  const isAllComplete = completedCount === totalCount && totalCount > 0;

  return (
    <section id="interactive-checklist" className="my-8 scroll-mt-24">
      <div className="rounded-xl border border-[#1F2430] bg-gradient-to-b from-[#12141D] to-[#0D0F16] p-5 sm:p-6 shadow-card">
        {/* Header & Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#1F2430]">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1 rounded bg-[#00F0FF]/10 text-[#00F0FF] border border-[#00F0FF]/30">
                <CheckSquare className="w-4 h-4" />
              </span>
              <h3 className="text-base sm:text-lg font-bold text-[#F3F4F6] font-sans">
                {title}
              </h3>
            </div>
            <p className="text-xs text-[#94A3B8] font-mono mt-1">
              {subtitle}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCompleteAll}
              className="px-2.5 py-1 text-[11px] font-mono font-medium rounded bg-[#181B26] hover:bg-[#1E2230] text-[#94A3B8] hover:text-[#00F0FF] border border-[#1F2430] transition-colors"
            >
              Check All
            </button>
            <button
              onClick={handleReset}
              className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-mono font-medium rounded bg-[#181B26] hover:bg-[#1E2230] text-[#94A3B8] hover:text-[#FF2E93] border border-[#1F2430] transition-colors"
              title="Reset checklist progress"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="py-4">
          <div className="flex items-center justify-between text-xs font-mono mb-2">
            <div className="flex items-center gap-2">
              <span className="text-[#94A3B8]">Completion Progress:</span>
              <span className="font-bold text-[#00F0FF]">
                {completedCount} of {totalCount} Steps
              </span>
            </div>
            <div className="flex items-center gap-1.5 font-bold">
              {isAllComplete ? (
                <span className="text-emerald-400 flex items-center gap-1">
                  <Trophy className="w-3.5 h-3.5" />
                  <span>100% COMPLETE</span>
                </span>
              ) : (
                <span className="text-[#00F0FF]">{progressPercent}%</span>
              )}
            </div>
          </div>

          <div className="h-2 w-full bg-[#090A0F] rounded-full overflow-hidden border border-[#1F2430]">
            <div
              className={`h-full transition-all duration-300 ${
                isAllComplete
                  ? "bg-gradient-to-r from-emerald-500 to-[#00F0FF]"
                  : "bg-gradient-to-r from-[#00F0FF] to-[#FF2E93]"
              }`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Checklist Items */}
        <div className="space-y-2.5 pt-1">
          {items.map((item, index) => {
            const isChecked = isMounted && Boolean(checkedIds[item.id]);

            return (
              <div
                key={item.id}
                onClick={() => toggleItem(item.id)}
                className={`group flex items-start gap-3 p-3 rounded-lg border transition-all cursor-pointer ${
                  isChecked
                    ? "bg-[#10B981]/5 border-emerald-500/30 text-[#64748B]"
                    : "bg-[#0F1118] border-[#1F2430] hover:border-[#2A3142] text-[#CBD5E1]"
                }`}
              >
                <div className="pt-0.5 flex-shrink-0">
                  {isChecked ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Square className="w-4 h-4 text-[#64748B] group-hover:text-[#00F0FF] transition-colors" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span
                      className={`text-sm font-medium font-sans leading-snug transition-colors ${
                        isChecked
                          ? "line-through text-[#64748B]"
                          : "text-[#F3F4F6] group-hover:text-[#00F0FF]"
                      }`}
                    >
                      <span className="font-mono text-xs text-[#00F0FF] mr-2">
                        #{index + 1}
                      </span>
                      {item.title}
                    </span>

                    {item.badge && (
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                          isChecked
                            ? "bg-[#181B26] text-[#64748B] border-[#1F2430]"
                            : "bg-[#00F0FF]/10 text-[#00F0FF] border-[#00F0FF]/30"
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </div>

                  {item.subtitle && (
                    <p
                      className={`text-xs mt-1 font-sans leading-relaxed ${
                        isChecked ? "text-[#475569]" : "text-[#94A3B8]"
                      }`}
                    >
                      {item.subtitle}
                    </p>
                  )}

                  {item.coordinates && (
                    <div className="mt-1.5 flex items-center gap-1.5 text-[11px] font-mono text-[#00F0FF]">
                      <span className="text-[#64748B]">GPS:</span>
                      <span>{item.coordinates}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {isAllComplete && (
          <div className="mt-4 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-2.5 text-xs text-emerald-400 font-mono">
            <Sparkles className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>
              All objectives verified in current session. Intel ready for mission execution in Patch 1.02.
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
