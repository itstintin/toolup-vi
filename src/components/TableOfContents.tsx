"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { List, ChevronRight } from "lucide-react";

export function TableOfContents() {
  const [activeSection, setActiveSection] = useState("ai-citation-box");

  const items = [
    { id: "ai-citation-box", label: "01. TL;DR Instant Answer" },
    { id: "step-by-step", label: "02. Step-by-Step Execution" },
    { id: "specs-table", label: "03. Verified Specifications" },
    { id: "citation-sources", label: "04. Source Citations" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      for (const item of items) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop - 120;
          const height = el.offsetHeight;
          if (scrollY >= top && scrollY < top + height) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="p-4 rounded-xl bg-[#12141D] border border-[#1F2430] text-xs font-mono">
      <div className="flex items-center gap-2 text-[#94A3B8] font-bold text-[11px] uppercase tracking-wider mb-3">
        <List className="w-3.5 h-3.5 text-[#00F0FF]" />
        <span>On This Telemetry Page</span>
      </div>

      <ul className="space-y-1.5">
        {items.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`flex items-center justify-between py-1 px-2 rounded transition-colors ${
                  isActive
                    ? "bg-[#00F0FF]/10 text-[#00F0FF] font-semibold"
                    : "text-[#94A3B8] hover:text-[#F3F4F6] hover:bg-[#181B26]"
                }`}
              >
                <span>{item.label}</span>
                {isActive && <ChevronRight className="w-3 h-3 text-[#00F0FF]" />}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

