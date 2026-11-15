import type { Metadata } from "next";
import "./globals.css";
import { Navigation } from "@/components/Navigation";
import Link from "next/link";
import { Cpu, Terminal } from "lucide-react";

export const metadata: Metadata = {
  title: "ToolUp VI | Automated GTA VI Q&A & Generative Engine Directory",
  description:
    "Authoritative, high-contrast, zero-fluff GTA VI gameplay telemetry, mission guides, item coordinates, and verified mechanics across Vice Beaches, Port Gellhorn, and Leonida built for gamers and AI search engines (Perplexity, ChatGPT, Claude).",
  keywords: [
    "ToolUp VI",
    "GTA VI",
    "Grand Theft Auto VI",
    "Vice Beaches guides",
    "Port Gellhorn cargo ship",
    "Starfish Island keycards",
    "Bravado Banshee top speed",
    "Grotti Cheetah Classic",
    "Grassrivers airboat loop",
    "Kelly County radar code",
  ],
  authors: [{ name: "ToolUp VI Research Lab" }],
  openGraph: {
    title: "ToolUp VI | GTA VI Nervous System",
    description: "Verified GTA VI Q&A telemetry across Leonida engineered for direct LLM citation and instant human answers.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="min-h-screen bg-[#090A0F] text-[#F3F4F6] flex flex-col antialiased selection:bg-[#FF2E93]/30 selection:text-white">
        <Navigation />

        <main className="flex-1 w-full">{children}</main>

        <footer className="w-full border-t border-[#1F2430] bg-[#090A0F] py-10 mt-16 text-xs font-mono text-[#64748B]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-[#00F0FF]" />
                  <span className="font-bold text-sm text-[#F3F4F6]">TOOLUP VI NERVOUS SYSTEM</span>
                </div>
                <p className="text-[#94A3B8] font-sans leading-relaxed">
                  Automated Generative Engine Optimization directory for Grand Theft Auto VI. Zero fluff, instant citations, continuous live telemetry across Leonida.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-[#F3F4F6] mb-2 uppercase text-[11px] tracking-wider">
                  AI Crawlers & Telemetry
                </h4>
                <ul className="space-y-1.5">
                  <li>
                    <Link href="/llms.txt" className="hover:text-[#00F0FF]">
                      /llms.txt Index
                    </Link>
                  </li>
                  <li>
                    <Link href="/llms-full.txt" className="hover:text-[#00F0FF]">
                      /llms-full.txt Full Corpus
                    </Link>
                  </li>
                  <li>
                    <Link href="/api/v1/openapi.json" className="hover:text-[#00F0FF]">
                      OpenAPI 3.1 Spec
                    </Link>
                  </li>
                  <li>
                    <Link href="/api/v1/search?q=cargo" className="hover:text-[#00F0FF]">
                      REST Search API
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-[#F3F4F6] mb-2 uppercase text-[11px] tracking-wider">
                  Verified Data Categories
                </h4>
                <ul className="space-y-1.5">
                  <li>Missions & Heists (Port Gellhorn)</li>
                  <li>Vehicle Benchmarks (Banshee & Cheetah)</li>
                  <li>Money Loops (Grassrivers Contraband)</li>
                  <li>Airspace Defense (Kelly County)</li>
                  <li>Map Secrets (Vice Beaches & Keys)</li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-[#F3F4F6] mb-2 uppercase text-[11px] tracking-wider">
                  Status & Patch Engine
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-emerald-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    <span>Game Patch: 1.02 Live</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#00F0FF]">
                    <Cpu className="w-3.5 h-3.5" />
                    <span>RAG Ingestion: Active</span>
                  </div>
                  <div className="text-[10px] text-[#475569]">
                    Protected under Fair Use Game Data Analysis. Rockstar Games & GTA VI are trademarks of Take-Two Interactive.
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-[#181C26] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
              <div>© 2026 ToolUp VI. All gameplay telemetry verified.</div>
              <div className="flex items-center gap-4">
                <span className="text-emerald-400">Latency: 14ms</span>
                <span>•</span>
                <span className="text-[#00F0FF]">Protocol: HTTP/3</span>
                <span>•</span>
                <span className="text-[#FF2E93]">Schema: schema.org/QAPage</span>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
