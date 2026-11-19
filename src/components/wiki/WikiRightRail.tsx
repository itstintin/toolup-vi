"use client";

import { useEffect, useState } from "react";
import {
  List,
  ChevronRight,
  Zap,
  ExternalLink,
  HardDrive,
  Share2,
  Check,
  Shield,
  Layers,
  MapPin,
  Clock,
} from "lucide-react";
import { QuestionRecord } from "@/types";
import { calculateReadTime } from "@/lib/utils";

export interface TocItem {
  id: string;
  label: string;
}

interface WikiRightRailProps {
  question?: QuestionRecord;
  customTocItems?: TocItem[];
}

export function WikiRightRail({ question, customTocItems }: WikiRightRailProps) {
  const [activeId, setActiveId] = useState<string>("direct-answer");
  const [copiedLink, setCopiedLink] = useState(false);

  const defaultItems: TocItem[] = [
    { id: "direct-answer", label: "01. Direct Answer" },
    { id: "interactive-checklist", label: "02. Objective Checklist" },
    { id: "step-by-step", label: "03. Execution Walkthrough" },
    { id: "specs-table", label: "04. Specifications Table" },
    { id: "telemetry-sources", label: "05. Verified Citations" },
  ];

  const items = customTocItems || defaultItems;

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      for (const item of items) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop - 130;
          const height = el.offsetHeight;
          if (scrollY >= top && scrollY < top + height) {
            setActiveId(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [items]);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <aside
      aria-label="Wiki Right Rail"
      className="w-[300px] shrink-0 space-y-6 text-xs font-mono"
    >
      {/* 1. On This Page Jump-Links */}
      <div className="rounded-xl border border-[#1F2430] bg-[#12141D] p-4 shadow-card">
        <div className="flex items-center gap-2 text-[#94A3B8] font-bold text-[11px] uppercase tracking-wider mb-3">
          <List className="w-3.5 h-3.5 text-[#00F0FF]" />
          <span>On This Page</span>
        </div>

        <ul className="space-y-1.5">
          {items.map((item) => {
            const isActive = activeId === item.id;
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={`flex items-center justify-between py-1.5 px-2.5 rounded-md transition-all ${
                    isActive
                      ? "bg-[#00F0FF]/15 text-[#00F0FF] font-semibold border-l-2 border-[#00F0FF]"
                      : "text-[#94A3B8] hover:text-[#F3F4F6] hover:bg-[#181B26]"
                  }`}
                >
                  <span className="truncate">{item.label}</span>
                  {isActive && <ChevronRight className="w-3 h-3 text-[#00F0FF] flex-shrink-0" />}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Quick Action: Share/Copy Link */}
        <div className="mt-4 pt-3 border-t border-[#1F2430]">
          <button
            onClick={handleCopyLink}
            className="w-full flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg bg-[#0F1118] hover:bg-[#181B26] border border-[#1F2430] hover:border-[#00F0FF]/40 text-xs text-[#CBD5E1] hover:text-[#00F0FF] transition-colors"
          >
            {copiedLink ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-semibold">Link Copied</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5" />
                <span>Share Guide URL</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 2. Quick Field Intel Card (if on a guide) */}
      {question && (
        <div className="rounded-xl border border-[#1F2430] bg-[#12141D] p-4 space-y-3">
          <div className="flex items-center gap-2 text-[#94A3B8] font-bold text-[11px] uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5 text-[#FF2E93]" />
            <span>Field Telemetry Intel</span>
          </div>

          <div className="space-y-2 text-[11px] divide-y divide-[#181C26]">
            {question.region && (
              <div className="flex items-center justify-between pt-1">
                <span className="text-[#64748B]">Region</span>
                <span className="text-[#00F0FF] font-medium">{question.region}</span>
              </div>
            )}
            <div className="flex items-center justify-between pt-2">
              <span className="text-[#64748B]">Verified Patch</span>
              <span className="text-emerald-400 font-semibold">{question.verifiedPatch || question.lastPatchVerified || "Launch Build 1.0"}</span>
            </div>
            <div className="flex items-center justify-between pt-2">
              <span className="text-[#64748B]">Estimated Read</span>
              <span className="text-[#00F0FF] font-semibold flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{question.readTime || calculateReadTime(question.tldrAnswer)}</span>
              </span>
            </div>
            <div className="flex items-center justify-between pt-2">
              <span className="text-[#64748B]">Verification Lab</span>
              <span className="text-[#CBD5E1] truncate max-w-[140px]">{question.verifiedBy}</span>
            </div>
          </div>
        </div>
      )}

      {/* 3. Native Gaming Sponsor Slot 1 (Server Hosting) */}
      <div className="rounded-xl border border-[#1F2430] bg-[#12141D] p-4 text-xs font-mono relative overflow-hidden">
        <div className="flex items-center justify-between text-[#64748B] text-[10px] uppercase tracking-wider mb-2">
          <span className="flex items-center gap-1 text-[#FF2E93] font-bold">
            <Zap className="w-3 h-3 text-[#FF2E93]" />
            Sponsored Host
          </span>
          <span>Verified Partner</span>
        </div>

        <div className="space-y-1.5">
          <h4 className="text-sm font-bold text-[#F3F4F6] font-sans leading-snug">
            G-Portal: Dedicated Leonida RP & Heist Servers
          </h4>
          <p className="text-[#94A3B8] font-sans text-xs leading-relaxed">
            Ultra-low latency Miami nodes, automated DDOS protection, and instant Launch Build server hosting.
          </p>
        </div>

        <a
          href="https://example.com/sponsor-gportal"
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="mt-3 flex items-center justify-between w-full px-3 py-2 rounded-lg bg-[#090A0F] border border-[#1F2430] hover:border-[#00F0FF]/40 text-[#00F0FF] text-xs font-mono font-medium transition-colors"
        >
          <span>Deploy Server (10% Off)</span>
          <ExternalLink className="w-3.5 h-3.5 text-[#00F0FF]" />
        </a>
      </div>

      {/* 4. Native Gaming Sponsor Slot 2 (Hardware / Telemetry) */}
      <div className="rounded-xl border border-[#1F2430] bg-gradient-to-br from-[#12141D] to-[#151926] border-[#1F2430] p-4 text-xs font-mono">
        <div className="flex items-center justify-between text-[#64748B] text-[10px] uppercase tracking-wider mb-2">
          <span className="flex items-center gap-1 text-[#00F0FF] font-bold">
            <HardDrive className="w-3 h-3 text-[#00F0FF]" />
            Telemetry Hardware
          </span>
          <span>Sponsor</span>
        </div>

        <h4 className="text-sm font-bold text-[#F3F4F6] font-sans leading-snug">
          ApexTelemetry: 240Hz Input Latency Overlay
        </h4>
        <p className="text-[#94A3B8] font-sans text-xs leading-relaxed mt-1">
          Real-time steering curves, frame time jitter tracking, and precision gamepad benchmarking for GTA VI.
        </p>

        <a
          href="https://example.com/sponsor-apex"
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="mt-3 flex items-center justify-between w-full px-3 py-2 rounded-lg bg-[#00F0FF]/10 hover:bg-[#00F0FF]/20 border border-[#00F0FF]/30 text-[#00F0FF] text-xs font-mono font-medium transition-colors"
        >
          <span>Download HUD Overlay</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </aside>
  );
}
