"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Search, X, Command, Sparkles, ArrowRight, ShieldCheck, Zap } from "lucide-react";
import { Category, QuestionRecord } from "@/types";

interface CommandSearchBarProps {
  categories: Category[];
  selectedCategory: Category;
  onSelectCategory: (cat: Category) => void;
  questions: QuestionRecord[];
}

export function CommandSearchBar({
  categories,
  selectedCategory,
  onSelectCategory,
  questions,
}: CommandSearchBarProps) {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Keyboard shortcut Cmd+K or Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === "Escape") {
        inputRef.current?.blur();
        setIsFocused(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Filter questions for the autocomplete preview
  const filteredQuestions = questions
    .filter((q) => {
      const matchCat =
        selectedCategory === "All" || q.category.toLowerCase() === selectedCategory.toLowerCase();
      if (!matchCat) return false;
      if (!query.trim()) return true;

      const qLower = query.toLowerCase();
      return (
        q.title.toLowerCase().includes(qLower) ||
        q.tldrAnswer.toLowerCase().includes(qLower) ||
        q.category.toLowerCase().includes(qLower)
      );
    })
    .slice(0, 5);

  const handleKeyDownInInput = (e: React.KeyboardEvent) => {
    if (filteredQuestions.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredQuestions.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredQuestions.length) % filteredQuestions.length);
    } else if (e.key === "Enter" && filteredQuestions[selectedIndex]) {
      e.preventDefault();
      router.push(`/q/${filteredQuestions[selectedIndex].slug}`);
      setIsFocused(false);
    }
  };

  return (
    <div className="w-full relative max-w-4xl mx-auto">
      {/* Search Bar Input Container */}
      <div
        className={`relative flex items-center w-full bg-[#12141D] rounded-xl border transition-all duration-200 shadow-card ${
          isFocused
            ? "border-[#00F0FF] shadow-glowCyan bg-[#0F1118]"
            : "border-[#1F2430] hover:border-[#2A3142]"
        }`}
      >
        <div className="pl-4 pr-3 text-[#94A3B8] flex items-center">
          <Search className={`w-5 h-5 ${isFocused ? "text-[#00F0FF]" : "text-[#64748B]"}`} />
        </div>

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setSelectedIndex(0);
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            // slight delay to allow clicking suggestions
            setTimeout(() => setIsFocused(false), 200);
          }}
          onKeyDown={handleKeyDownInInput}
          placeholder="Search verified GTA VI missions, money loops, car speeds, item coordinates..."
          className="w-full bg-transparent py-4 text-sm sm:text-base text-[#F3F4F6] placeholder-[#64748B] focus:outline-none"
        />

        {query && (
          <button
            onClick={() => {
              setQuery("");
              inputRef.current?.focus();
            }}
            className="p-1 mr-2 text-[#64748B] hover:text-[#F3F4F6] rounded transition-colors"
            title="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        <div className="pr-4 hidden sm:flex items-center gap-1">
          <kbd className="inline-flex items-center gap-0.5 px-2 py-1 text-[11px] font-mono text-[#94A3B8] bg-[#090A0F] border border-[#1F2430] rounded shadow-inner">
            <Command className="w-3 h-3" />
            <span>K</span>
          </kbd>
        </div>
      </div>

      {/* Category Filter Chips */}
      <div className="flex items-center gap-2 mt-4 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`whitespace-nowrap px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all duration-150 border ${
                isActive
                  ? "bg-[#FF2E93]/15 text-[#FF2E93] border-[#FF2E93] shadow-glowCoral"
                  : "bg-[#12141D] text-[#94A3B8] border-[#1F2430] hover:text-[#F3F4F6] hover:border-[#2A3142]"
              }`}
            >
              {cat === "All" ? "All Guides" : cat}
            </button>
          );
        })}
      </div>

      {/* Autocomplete Dropdown Preview */}
      {isFocused && query.trim().length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 z-40 bg-[#12141D] border border-[#1F2430] rounded-xl shadow-2xl overflow-hidden backdrop-blur-xl">
          <div className="p-2 border-b border-[#181C26] flex items-center justify-between text-[11px] font-mono text-[#64748B] px-3">
            <span>Instant Results ({filteredQuestions.length})</span>
            <span>Use ↑↓ to navigate, ↵ to select</span>
          </div>

          {filteredQuestions.length === 0 ? (
            <div className="p-6 text-center text-sm text-[#94A3B8]">
              No verified records found for <span className="text-[#F3F4F6]">&ldquo;{query}&rdquo;</span>.
              <div className="text-xs text-[#64748B] mt-1 font-mono">
                Leonida guide index updates continuously.
              </div>
            </div>
          ) : (
            <div className="divide-y divide-[#181C26]">
              {filteredQuestions.map((q, idx) => {
                const isSelected = idx === selectedIndex;
                return (
                  <Link
                    key={q.id}
                    href={`/q/${q.slug}`}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`block p-3.5 transition-colors ${
                      isSelected ? "bg-[#181B26] text-white" : "hover:bg-[#151822]"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3 mb-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#090A0F] border border-[#1F2430] text-[#00F0FF]">
                          {q.category}
                        </span>
                        <h4 className="text-sm font-semibold text-[#F3F4F6] line-clamp-1">
                          {q.title}
                        </h4>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0 text-[11px] font-mono text-[#64748B]">
                        <span className="text-emerald-400 flex items-center gap-1">
                          <ShieldCheck className="w-3 h-3" />
                          {q.lastPatchVerified.split(" ")[0]}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#94A3B8]" />
                      </div>
                    </div>
                    <p className="text-xs text-[#94A3B8] line-clamp-1 pl-0.5">
                      {q.tldrAnswer}
                    </p>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

