import Link from "next/link";
import { Terminal, Compass, ArrowLeft, Search, AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 relative">
      <div className="absolute inset-0 bg-grid-subtle pointer-events-none opacity-30 z-0"></div>

      <div className="relative z-10 max-w-xl w-full text-center p-8 sm:p-10 rounded-2xl bg-[#12141D] border border-[#1F2430] shadow-card">
        {/* Status Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#090A0F] border border-[#1F2430] text-xs font-mono text-amber-400 mb-6">
          <AlertCircle className="w-3.5 h-3.5" />
          <span>404 // SIGNAL UNRESOLVED</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold font-mono text-[#F3F4F6] mb-3 tracking-tight">
          Guide Not Found
        </h1>

        <p className="text-sm text-[#94A3B8] font-sans leading-relaxed mb-8">
          The requested coordinate or tactical guide does not exist in the active Leonida database. It may have been relocated, or the URL slug may be mistyped.
        </p>

        {/* Action Links */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#00F0FF]/15 text-[#00F0FF] border border-[#00F0FF]/40 text-xs font-mono font-semibold hover:bg-[#00F0FF]/25 transition-all shadow-glowCyan"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Live Index</span>
          </Link>

          <Link
            href="/wiki"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#FF2E93]/15 text-[#FF2E93] border border-[#FF2E93]/40 text-xs font-mono font-semibold hover:bg-[#FF2E93]/25 transition-all shadow-glowCoral"
          >
            <Compass className="w-4 h-4" />
            <span>Explore Editorial Wiki</span>
          </Link>
        </div>

        {/* Quick Directory Hints */}
        <div className="mt-8 pt-6 border-t border-[#181C26] text-left">
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#64748B] block mb-2">
            Suggested Core Guides:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
            <Link
              href="/q/how-to-deposit-cash-at-atms-without-losing-money-on-death"
              className="text-[#94A3B8] hover:text-[#00F0FF] transition-colors truncate"
            >
              → ATM Money Protection
            </Link>
            <Link
              href="/q/how-to-strip-gps-trackers-at-a-fence-and-register-stolen-cars"
              className="text-[#94A3B8] hover:text-[#00F0FF] transition-colors truncate"
            >
              → GPS Tracker Stripping
            </Link>
            <Link
              href="/q/how-the-car-trunk-weapon-system-works"
              className="text-[#94A3B8] hover:text-[#00F0FF] transition-colors truncate"
            >
              → Car Trunk Armory
            </Link>
            <Link
              href="/q/all-6-confirmed-regions-of-leonida-and-key-shops"
              className="text-[#94A3B8] hover:text-[#00F0FF] transition-colors truncate"
            >
              → 6 Regions of Leonida
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
