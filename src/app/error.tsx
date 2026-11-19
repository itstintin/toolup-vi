"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Runtime error caught by boundary:", error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 relative">
      <div className="absolute inset-0 bg-grid-subtle pointer-events-none opacity-30 z-0"></div>

      <div className="relative z-10 max-w-lg w-full text-center p-8 sm:p-10 rounded-2xl bg-[#12141D] border border-red-500/30 shadow-card">
        {/* Status Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-xs font-mono text-red-400 mb-6">
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>RUNTIME EXCEPTION INTERCEPTED</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold font-mono text-[#F3F4F6] mb-3 tracking-tight">
          System Fault Encountered
        </h1>

        <p className="text-sm text-[#94A3B8] font-sans leading-relaxed mb-6">
          A client-side execution error occurred while processing gameplay telemetry. The incident has been isolated.
        </p>

        {error?.digest && (
          <div className="mb-6 p-2.5 rounded-lg bg-[#090A0F] border border-[#1F2430] text-[11px] font-mono text-[#64748B] text-left">
            <span>Digest: </span>
            <span className="text-[#94A3B8]">{error.digest}</span>
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#00F0FF]/15 text-[#00F0FF] border border-[#00F0FF]/40 text-xs font-mono font-semibold hover:bg-[#00F0FF]/25 transition-all shadow-glowCyan"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Retry Connection</span>
          </button>

          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#181B26] text-[#F3F4F6] border border-[#1F2430] text-xs font-mono font-semibold hover:border-[#2A3142] transition-all"
          >
            <Home className="w-4 h-4" />
            <span>Return to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
