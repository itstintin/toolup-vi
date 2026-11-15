"use client";

import { useState, useMemo } from "react";
import { ArrowUpDown, ArrowUp, ArrowDown, Search, Copy, Check, Table as TableIcon } from "lucide-react";
import { SpecRow } from "@/types";

export interface TableColumn<T> {
  key: keyof T | string;
  header: string;
  sortable?: boolean;
  align?: "left" | "center" | "right";
  className?: string;
  render?: (row: T) => React.ReactNode;
}

interface SortableDataTableProps {
  title?: string;
  subtitle?: string;
  data: SpecRow[];
  searchable?: boolean;
}

export function SortableDataTable({
  title = "Telemetry Specifications & In-Game Parameters",
  subtitle = "Interactive sortable data table validated against live GTA VI game binaries.",
  data,
  searchable = true,
}: SortableDataTableProps) {
  const [sortKey, setSortKey] = useState<"label" | "value" | "badge">("label");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleSort = (key: "label" | "value" | "badge") => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const filteredAndSortedData = useMemo(() => {
    let result = [...data];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (row) =>
          row.label.toLowerCase().includes(q) ||
          row.value.toLowerCase().includes(q) ||
          (row.badge && row.badge.toLowerCase().includes(q))
      );
    }

    result.sort((a, b) => {
      let valA = a[sortKey] || "";
      let valB = b[sortKey] || "";

      if (typeof valA === "string") valA = valA.toLowerCase();
      if (typeof valB === "string") valB = valB.toLowerCase();

      if (valA < valB) return sortOrder === "asc" ? -1 : 1;
      if (valA > valB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

    return result;
  }, [data, searchQuery, sortKey, sortOrder]);

  const copyRow = async (row: SpecRow, idx: number) => {
    try {
      await navigator.clipboard.writeText(`${row.label}: ${row.value}${row.badge ? ` (${row.badge})` : ""}`);
      setCopiedIndex(idx);
      setTimeout(() => setCopiedIndex(null), 1500);
    } catch (e) {
      console.error(e);
    }
  };

  if (!data || data.length === 0) return null;

  return (
    <section id="specs-table" className="my-8 scroll-mt-24">
      <div className="rounded-xl border border-[#1F2430] bg-[#12141D] shadow-card overflow-hidden">
        {/* Table Header & Search Filter */}
        <div className="p-4 sm:p-5 border-b border-[#1F2430] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1 rounded bg-[#00F0FF]/10 text-[#00F0FF] border border-[#00F0FF]/30">
                <TableIcon className="w-4 h-4" />
              </span>
              <h3 className="text-base sm:text-lg font-bold text-[#F3F4F6] font-sans">
                {title}
              </h3>
            </div>
            <p className="text-xs text-[#94A3B8] font-mono mt-1">
              {subtitle}
            </p>
          </div>

          {searchable && (
            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]" />
              <input
                type="text"
                placeholder="Filter parameters..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-[#0F1118] border border-[#1F2430] text-xs font-mono text-[#F3F4F6] placeholder-[#64748B] focus:outline-none focus:border-[#00F0FF]/60 transition-colors"
              />
            </div>
          )}
        </div>

        {/* Sortable HTML Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-[#CBD5E1]">
            <thead className="bg-[#0B0D13] border-b border-[#1F2430] text-[11px] font-mono uppercase tracking-wider text-[#94A3B8] select-none">
              <tr>
                <th
                  scope="col"
                  onClick={() => handleSort("label")}
                  className="px-5 py-3.5 cursor-pointer hover:text-[#00F0FF] transition-colors"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Attribute / Parameter</span>
                    {sortKey === "label" ? (
                      sortOrder === "asc" ? (
                        <ArrowUp className="w-3.5 h-3.5 text-[#00F0FF]" />
                      ) : (
                        <ArrowDown className="w-3.5 h-3.5 text-[#00F0FF]" />
                      )
                    ) : (
                      <ArrowUpDown className="w-3 h-3 text-[#64748B]" />
                    )}
                  </div>
                </th>
                <th
                  scope="col"
                  onClick={() => handleSort("value")}
                  className="px-5 py-3.5 cursor-pointer hover:text-[#00F0FF] transition-colors"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Verified Value</span>
                    {sortKey === "value" ? (
                      sortOrder === "asc" ? (
                        <ArrowUp className="w-3.5 h-3.5 text-[#00F0FF]" />
                      ) : (
                        <ArrowDown className="w-3.5 h-3.5 text-[#00F0FF]" />
                      )
                    ) : (
                      <ArrowUpDown className="w-3 h-3 text-[#64748B]" />
                    )}
                  </div>
                </th>
                <th
                  scope="col"
                  onClick={() => handleSort("badge")}
                  className="px-5 py-3.5 text-right cursor-pointer hover:text-[#00F0FF] transition-colors"
                >
                  <div className="flex items-center justify-end gap-1.5">
                    <span>Tier / Classification</span>
                    {sortKey === "badge" ? (
                      sortOrder === "asc" ? (
                        <ArrowUp className="w-3.5 h-3.5 text-[#00F0FF]" />
                      ) : (
                        <ArrowDown className="w-3.5 h-3.5 text-[#00F0FF]" />
                      )
                    ) : (
                      <ArrowUpDown className="w-3 h-3 text-[#64748B]" />
                    )}
                  </div>
                </th>
                <th scope="col" className="w-12 px-3 py-3.5 text-center">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#181C26] font-sans">
              {filteredAndSortedData.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-5 py-8 text-center text-xs text-[#64748B] font-mono">
                    No matching parameters found for &quot;{searchQuery}&quot;
                  </td>
                </tr>
              ) : (
                filteredAndSortedData.map((row, idx) => (
                  <tr
                    key={idx}
                    className="group hover:bg-[#161A26] transition-colors duration-150"
                  >
                    <td className="px-5 py-3.5 font-medium text-[#F3F4F6] text-xs sm:text-sm">
                      {row.label}
                    </td>
                    <td className="px-5 py-3.5 font-mono text-xs sm:text-sm text-[#00F0FF]">
                      {row.value}
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      {row.badge ? (
                        <span className="inline-block px-2.5 py-0.5 rounded text-[10px] font-mono font-bold tracking-wide uppercase bg-[#FF2E93]/15 text-[#FF2E93] border border-[#FF2E93]/30">
                          {row.badge}
                        </span>
                      ) : (
                        <span className="text-[11px] font-mono text-[#64748B]">
                          Verified
                        </span>
                      )}
                    </td>
                    <td className="px-3 py-3.5 text-center">
                      <button
                        onClick={() => copyRow(row, idx)}
                        className="p-1 rounded hover:bg-[#1E2230] text-[#64748B] hover:text-[#00F0FF] transition-colors opacity-0 group-hover:opacity-100"
                        title="Copy parameter to clipboard"
                      >
                        {copiedIndex === idx ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer info */}
        <div className="px-5 py-2.5 bg-[#0B0D13] border-t border-[#1F2430] flex items-center justify-between text-[11px] font-mono text-[#64748B]">
          <span>Showing {filteredAndSortedData.length} of {data.length} attributes</span>
          <span className="text-[#00F0FF]">Click column header to sort</span>
        </div>
      </div>
    </section>
  );
}
