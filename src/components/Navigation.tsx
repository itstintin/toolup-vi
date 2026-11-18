"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Terminal, LayoutGrid, BookOpen } from "lucide-react";

export function Navigation() {
  const pathname = usePathname();

  const tickerItems = [
    "🏧 Cash Protection: Deposit money at ATMs under Jason or Lucia's separate accounts to avoid death forfeiture",
    "🚗 Vehicle Garages: Pay N' Spray (Base Game) / Rideout Customs & One-Eyed Willie's Mod Shop (Ultimate Edition)",
    "🔫 Weapon Limits: Car trunk armory stashes long rifles; player carry limited to 2 concealed sidearms",
    "⭐ Heat Reduction: 5-Rank Criminal Profile (Professional, Hardened, Violent, Psycho, Irredeemable) requires multi-county heat cooling",
    "📱 Leonida Network: WAINK, Scooter Bros, BuckMe (peer transfers), and RydeMe (rideshare & vehicle hailing) active on smartphone OS",
    "🗺️ 6 Regions Mapped: Vice City, Leonida Keys, Grassrivers, Port Gellhorn, Ambrosia, Mount Kalaga National Park (PTT Youngin$ Ultimate Edition)",
  ];

  // View Switcher logic (App View vs Wiki View)
  const isWikiView = pathname ? pathname.startsWith("/wiki") : false;

  let appViewHref = "/";
  let wikiViewHref = "/wiki";

  if (pathname?.startsWith("/wiki/")) {
    const slug = pathname.replace(/^\/wiki\//, "");
    appViewHref = `/q/${slug}`;
    wikiViewHref = pathname;
  } else if (pathname?.startsWith("/q/")) {
    const slug = pathname.replace(/^\/q\//, "");
    appViewHref = pathname;
    wikiViewHref = `/wiki/${slug}`;
  } else if (isWikiView) {
    appViewHref = "/";
    wikiViewHref = "/wiki";
  } else {
    appViewHref = pathname || "/";
    wikiViewHref = "/wiki";
  }

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
              Leonida Live Dispatch
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand / Logo */}
        <Link href="/" className="flex items-center gap-3 group shrink-0">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#12141D] to-[#1E2230] border border-[#1F2430] flex items-center justify-center group-hover:border-[#00F0FF]/60 transition-colors shadow-sm">
            <Terminal className="w-5 h-5 text-[#00F0FF]" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-mono font-extrabold tracking-wider text-base text-[#F3F4F6]">
                ToolUp<span className="text-[#FF2E93]"> VI</span>
              </span>
              <span className="px-1.5 py-0.5 text-[9px] font-mono font-bold tracking-widest uppercase bg-[#00F0FF]/10 text-[#00F0FF] border border-[#00F0FF]/30 rounded">
                Launch Build
              </span>
            </div>
            <span className="hidden sm:inline-block text-[10px] text-[#64748B] font-mono -mt-0.5">
              Unofficial Leonida Tactical Database
            </span>
          </div>
        </Link>

        {/* Global View Switcher Toggle: App View vs Wiki View */}
        <nav
          aria-label="View Switcher"
          className="flex items-center p-1 rounded-xl bg-[#0F1118] border border-[#1F2430] shadow-sm shrink-0"
        >
          <Link
            href={appViewHref}
            aria-pressed={!isWikiView}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all ${
              !isWikiView
                ? "bg-[#00F0FF]/15 text-[#00F0FF] border border-[#00F0FF]/40 shadow-sm"
                : "text-[#94A3B8] hover:text-[#F3F4F6] hover:bg-[#181B26]"
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>App View</span>
          </Link>

          <Link
            href={wikiViewHref}
            aria-pressed={isWikiView}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all ${
              isWikiView
                ? "bg-[#FF2E93]/15 text-[#FF2E93] border border-[#FF2E93]/40 shadow-sm"
                : "text-[#94A3B8] hover:text-[#F3F4F6] hover:bg-[#181B26]"
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Wiki View</span>
          </Link>
        </nav>

        {/* Right Status Pill */}
        <div className="flex items-center gap-2 pl-3 border-l border-[#1F2430]">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#12141D] border border-[#1F2430] shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span className="text-[11px] font-mono font-medium text-[#F3F4F6]">Live Guide Index</span>
          </div>
        </div>
      </div>
    </header>
  );
}
