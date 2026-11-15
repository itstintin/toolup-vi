import { Shield, Zap, ExternalLink, HardDrive } from "lucide-react";

export function SidebarSponsorSlot() {
  return (
    <div className="w-full rounded-xl bg-[#12141D] border border-[#1F2430] p-4 text-xs font-mono">
      <div className="flex items-center justify-between text-[#64748B] text-[10px] uppercase tracking-wider mb-2.5">
        <span className="flex items-center gap-1 text-[#FF2E93] font-bold">
          <Zap className="w-3 h-3 text-[#FF2E93]" />
          Sponsored Partner
        </span>
        <span>Ad Telemetry</span>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-bold text-[#F3F4F6] font-sans leading-snug">
          G-Portal: Dedicated Vice City RP & Crew Servers
        </h4>
        <p className="text-[#94A3B8] font-sans text-xs leading-relaxed">
          Sub-15ms Miami latency, instant DDOS mitigation, and automated modded server backups for Patch 1.02.
        </p>
      </div>

      <a
        href="https://example.com/sponsor-gportal"
        target="_blank"
        rel="noopener noreferrer nofollow"
        className="mt-3.5 flex items-center justify-between w-full px-3 py-2 rounded-lg bg-[#090A0F] border border-[#1F2430] hover:border-[#00F0FF]/40 text-[#00F0FF] text-xs font-mono font-medium transition-colors"
      >
        <span>Deploy Vice Instance</span>
        <ExternalLink className="w-3.5 h-3.5 text-[#00F0FF]" />
      </a>
    </div>
  );
}

export function InContentSponsorBanner() {
  return (
    <div className="my-8 w-full rounded-xl bg-gradient-to-r from-[#12141D] via-[#151926] to-[#12141D] border border-[#1F2430] p-5 shadow-sm">
      <div className="flex items-center justify-between text-[#64748B] text-[10px] font-mono uppercase tracking-wider mb-2">
        <span className="flex items-center gap-1.5 text-[#00F0FF] font-bold">
          <HardDrive className="w-3.5 h-3.5" />
          Hardware & Telemetry Partner
        </span>
        <span className="text-[#64748B]">Verified Sponsor</span>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h4 className="text-base font-bold text-[#F3F4F6] font-sans">
            ApexTelemetry: 240Hz Input Latency Overlay for PC
          </h4>
          <p className="text-xs text-[#94A3B8] font-sans mt-0.5 max-w-xl">
            Live steering curve diagnostics, zero-buffer controller mapping, and instant GTA VI benchmark analytics.
          </p>
        </div>

        <a
          href="https://example.com/sponsor-apex"
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="flex-shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#00F0FF]/10 text-[#00F0FF] border border-[#00F0FF]/30 hover:bg-[#00F0FF]/20 text-xs font-mono font-semibold transition-all"
        >
          <span>Claim 30-Day Pro</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}

