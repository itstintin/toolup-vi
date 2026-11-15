"use client";

import Link from "next/link";
import { Terminal, Cpu, ExternalLink } from "lucide-react";

export function Navigation() {
  const tickerItems = [
    "🔥 BREAKING: Port Gellhorn Cargo Ship Naval Bypass Live (+540% Velocity)",
    "⚡ Bravado Banshee Confirmed #1 Top Speed in Patch 1.02 (186.2 mph)",
    "📍 Grotti Cheetah Classic Keycard Spawn Verified on Starfish Island",
    "💼 Grassrivers Contraband Airboat Loop Yield Benchmarked at $240K/hr",
    "🛡️ Kelly County Air Defense Radar Blind Window Decreased to 240s",
    "🎯 Heavy Sniper Mk II Thermal Sight Coordinates Confirmed in Leonida Keys",
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#1F2430] bg-[#090A0F]/90 backdrop-blur-md">
      {/* Live Trending Queries Ticker */}
      <div className="w-full bg-[#0F1118] border-b border-[#181C26] px-4 py-1.5 overflow-hidden text-xs text-[#94A3B8]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 whitespace-nowrap mr-4">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00F0FF] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00F0FF]"></span>
            </span>
            <span className="font-mono font-semibold text-[#00F0FF] uppercase tracking-wider text-[10px]">
              GEO Telemetry Live
            </span>
          </div>

          <div className="overflow-hidden relative w-full flex-1">
            <div className="inline-flex space-x-8 animate-marquee whitespace-nowrap">
              {tickerItems.concat(tickerItems).map((item, idx) => (
                <span key={idx} className="font-mono text-[11px] text-[#CBD5E1]">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Top Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#12141D] to-[#1E2230] border border-[#1F2430] flex items-center justify-center group-hover:border-[#00F0FF]/60 transition-colors shadow-sm">
            <Terminal className="w-5 h-5 text-[#00F0FF]" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-mono font-extrabold tracking-wider text-base text-[#F3F4F6]">
                ToolUp<span className="text-[#FF2E93]"> VI</span>
              </span>
              <span className="px-1.5 py-0.5 text-[9px] font-mono font-bold tracking-widest uppercase bg-[#00F0FF]/10 text-[#00F0FF] border border-[#00F0FF]/30 rounded">
                v1.02 Live
              </span>
            </div>
            <span className="text-[10px] text-[#64748B] font-mono -mt-0.5">
              Automated GTA VI Generative Engine Directory
            </span>
          </div>
        </Link>

        {/* Center / Right Links */}
        <div className="flex items-center gap-3 sm:gap-4">
          <Link
            href="/llms.txt"
            target="_blank"
            className="hidden md:flex items-center gap-1.5 text-xs font-mono text-[#94A3B8] hover:text-[#00F0FF] px-2.5 py-1.5 rounded border border-[#1F2430] bg-[#12141D] hover:border-[#00F0FF]/40 transition-colors"
          >
            <Cpu className="w-3.5 h-3.5 text-[#00F0FF]" />
            <span>/llms.txt</span>
          </Link>

          <Link
            href="/api/v1/openapi.json"
            target="_blank"
            className="hidden sm:flex items-center gap-1.5 text-xs font-mono text-[#94A3B8] hover:text-[#FF2E93] px-2.5 py-1.5 rounded border border-[#1F2430] bg-[#12141D] hover:border-[#FF2E93]/40 transition-colors"
          >
            <span>OpenAPI 3.1</span>
            <ExternalLink className="w-3 h-3 text-[#FF2E93]" />
          </Link>

          <div className="flex items-center gap-2 pl-2 border-l border-[#1F2430]">
            <div className="flex flex-col items-end text-right">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span className="text-[11px] font-mono font-medium text-[#F3F4F6]">RAG Active</span>
              </div>
              <span className="text-[9px] font-mono text-[#64748B]">Scraper: Connected</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
