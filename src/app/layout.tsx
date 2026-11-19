import type { Metadata } from "next";
import "./globals.css";
import { Navigation } from "@/components/Navigation";
import Link from "next/link";
import { Cpu, Terminal, Compass, Shield } from "lucide-react";
import { getSiteUrl } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: "ToolUp VI | Unofficial Leonida Tactical Database & Guides",
  description:
    "Authoritative, high-contrast, zero-fluff GTA VI gameplay telemetry, mission guides, item coordinates, and verified mechanics across Vice Beaches, Port Gellhorn, and Leonida built for PS5 & Xbox Series X|S players seeking instant answers with zero filler.",
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
    "GTA VI Wiki",
    "Leonida field guide",
  ],
  authors: [{ name: "ToolUp VI Research Lab" }],
  openGraph: {
    title: "ToolUp VI | Unofficial Leonida Tactical Database",
    description: "Verified GTA VI tactical guides and telemetry across Leonida engineered for instant human answers.",
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
                  <span className="font-bold text-sm text-[#F3F4F6]">ToolUp VI</span>
                </div>
                <p className="text-[#94A3B8] font-sans leading-relaxed">
                  Unofficial Leonida Tactical Database for Grand Theft Auto VI. Instant answers, zero filler, verified mission steps and coordinates across Leonida.
                </p>
                <div className="pt-2">
                  <Link
                    href="/wiki"
                    className="inline-flex items-center gap-1.5 text-xs text-[#00F0FF] hover:underline"
                  >
                    <Compass className="w-3.5 h-3.5" />
                    <span>Explore 3-Column Editorial Wiki</span>
                  </Link>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-[#F3F4F6] mb-2 uppercase text-[11px] tracking-wider">
                  APIs & Data Index
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
                  <li>Money & ATMs (Leonida Banking)</li>
                  <li>Map & Regions (Vice City to Kalaga)</li>
                  <li>Vehicles & Fences (GPS Tracker Removal)</li>
                  <li>Weapons & Loadouts (Trunk Armory)</li>
                  <li>Criminal Profile & Heat (5-Rank System)</li>
                  <li>Glitches & Fixes (WAINK, BuckMe & RydeMe)</li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-[#F3F4F6] mb-2 uppercase text-[11px] tracking-wider">
                  Status & Patch Engine
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-emerald-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    <span>Game Build: Launch Build 1.0</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#00F0FF]">
                    <Cpu className="w-3.5 h-3.5" />
                    <span>Community Updates: Active</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#94A3B8]">
                    <Shield className="w-3.5 h-3.5 text-amber-400" />
                    <span>Editorial Wiki: Online</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Clean Legal Disclaimer */}
            <div className="my-6 p-4 rounded-xl bg-[#0F1118] border border-[#1F2430] text-[11px] text-[#94A3B8] font-sans leading-relaxed">
              <span className="font-bold text-[#F3F4F6] font-mono uppercase tracking-wider block mb-1 text-[10px]">
                Legal Disclaimer:
              </span>
              ToolUp VI is an unofficial fan database not affiliated with Rockstar Games or Take-Two Interactive.
              Grand Theft Auto, GTA VI, Vice City, and all associated logos, characters, and trademarks are the registered property of Take-Two Interactive Software, Inc. and Rockstar Games. Gameplay telemetry and coordinates are provided under fair-use commentary and community educational documentation.
            </div>

            <div className="pt-6 border-t border-[#181C26] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
              <div>© 2026 ToolUp VI. All gameplay telemetry verified.</div>
              <div className="flex items-center gap-4">
                <span className="text-emerald-400">Build: Launch Build 1.0</span>
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
