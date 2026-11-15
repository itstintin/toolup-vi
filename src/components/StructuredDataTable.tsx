import { Table, Layers } from "lucide-react";
import { SpecRow } from "@/types";

interface StructuredDataTableProps {
  specs: SpecRow[];
}

export function StructuredDataTable({ specs }: StructuredDataTableProps) {
  if (!specs || specs.length === 0) return null;

  return (
    <section id="specs-table" className="my-8 scroll-mt-24">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-[#F3F4F6] flex items-center gap-2">
          <span className="font-mono text-[#00F0FF]">03.</span>
          <span>Verified Specifications & Loot Metrics</span>
        </h2>
        <p className="text-xs text-[#94A3B8] mt-0.5">
          Standardized telemetry data ingested and cross-validated against game memory manifests.
        </p>
      </div>

      <div className="overflow-x-auto rounded-xl border border-[#1F2430] bg-[#12141D] shadow-card">
        <table className="w-full text-left text-sm text-[#CBD5E1]">
          <thead className="bg-[#0F1118] border-b border-[#1F2430] text-[11px] font-mono uppercase tracking-wider text-[#94A3B8]">
            <tr>
              <th scope="col" className="px-5 py-3 font-semibold">
                Parameter / Attribute
              </th>
              <th scope="col" className="px-5 py-3 font-semibold">
                Verified Value / Metric
              </th>
              <th scope="col" className="px-5 py-3 text-right font-semibold">
                Classification
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#181C26]">
            {specs.map((row, idx) => (
              <tr key={idx} className="hover:bg-[#151924] transition-colors">
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
                    <span className="text-[11px] font-mono text-[#64748B]">Standard</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

