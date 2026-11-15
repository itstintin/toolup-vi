import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { getAllQuestions, getQuestionBySlug } from "@/lib/db";
import {
  generateQaPageSchema,
  generateFaqPageSchema,
  generateArticleSchema,
} from "@/lib/schema-generator";
import { AiCitationBox } from "@/components/AiCitationBox";
import { StepExecution } from "@/components/StepExecution";
import { StructuredDataTable } from "@/components/StructuredDataTable";
import { SidebarSponsorSlot, InContentSponsorBanner } from "@/components/NativeSponsorSlots";
import { TableOfContents } from "@/components/TableOfContents";
import {
  ShieldCheck,
  Flame,
  ArrowLeft,
  Calendar,
  User,
  ExternalLink,
  ChevronRight,
  Database,
  Cpu,
} from "lucide-react";
import { formatDate } from "@/lib/utils";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const questions = getAllQuestions();
  return questions.map((q) => ({ slug: q.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const question = getQuestionBySlug(resolvedParams.slug);

  if (!question) {
    return {
      title: "Question Not Found | ToolUp VI",
    };
  }

  const canonicalUrl = `https://toolup-vi.com/q/${question.slug}`;

  return {
    title: `${question.title} - ToolUp VI Verified Intel`,
    description: question.tldrAnswer,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${question.title} | ToolUp VI`,
      description: question.tldrAnswer,
      url: canonicalUrl,
      type: "article",
      publishedTime: question.createdAt,
      modifiedTime: question.updatedAt,
      authors: [question.author],
      tags: [question.category, "GTA VI", "Leonida", "Vice Beaches", question.lastPatchVerified],
    },
    twitter: {
      card: "summary_large_image",
      title: question.title,
      description: question.tldrAnswer,
    },
    other: {
      "llm-extract-target": "ai-citation-box",
      "game-patch": question.lastPatchVerified,
      "geo-verification": "verified",
    },
  };
}

export default async function QuestionPage({ params }: PageProps) {
  const resolvedParams = await params;
  const question = getQuestionBySlug(resolvedParams.slug);

  if (!question) {
    notFound();
  }

  // Schema.org JSON-LD Payloads
  const qaSchema = generateQaPageSchema(question);
  const faqSchema = generateFaqPageSchema(question);
  const articleSchema = generateArticleSchema(question);

  return (
    <>
      {/* Schema.org Injections for AI Crawlers (Perplexity, ChatGPT, Claude) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(qaSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumbs Navigation */}
        <nav className="flex items-center gap-2 text-xs font-mono text-[#64748B] mb-6">
          <Link href="/" className="hover:text-[#F3F4F6] flex items-center gap-1 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>ToolUp VI Telemetry</span>
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#1F2430]" />
          <span className="text-[#94A3B8]">{question.category}</span>
          <ChevronRight className="w-3.5 h-3.5 text-[#1F2430]" />
          <span className="text-[#F3F4F6] truncate max-w-[240px] sm:max-w-md">{question.title}</span>
        </nav>

        {/* Main Content Layout (2-Column with Sticky Sidebar) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Article Stream (8 Columns) */}
          <article className="lg:col-span-8 min-w-0">
            {/* Header Badges & Patch Status */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="px-2.5 py-1 rounded text-xs font-mono font-bold tracking-wide uppercase bg-[#090A0F] border border-[#1F2430] text-[#00F0FF]">
                {question.category}
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{question.lastPatchVerified}</span>
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-mono font-bold text-[#FF2E93] bg-[#FF2E93]/10 border border-[#FF2E93]/30">
                <Flame className="w-3.5 h-3.5" />
                <span>Velocity: {question.velocityChange}</span>
              </span>
            </div>

            {/* H1 Question Title */}
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#F3F4F6] leading-tight mb-4">
              {question.title}
            </h1>

            {/* Author & Verification Meta */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#64748B] pb-6 border-b border-[#1F2430]">
              <div className="flex items-center gap-1.5 text-[#94A3B8]">
                <User className="w-3.5 h-3.5 text-[#00F0FF]" />
                <span>{question.author}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>Published {formatDate(question.createdAt)}</span>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-400">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Lab: {question.verifiedBy}</span>
              </div>
            </div>

            {/* COMPONENT A: The AI Citation Box (Strictly directly below H1) */}
            <AiCitationBox question={question} />

            {/* COMPONENT B: Step-by-Step Execution */}
            <StepExecution steps={question.steps} />

            {/* COMPONENT D (In-Content Native Sponsor Banner) */}
            <InContentSponsorBanner />

            {/* COMPONENT C: Structured Data Table */}
            <StructuredDataTable specs={question.specsTable} />

            {/* Sources & Citations Section */}
            <section id="citation-sources" className="my-8 scroll-mt-24 pt-6 border-t border-[#1F2430]">
              <h3 className="text-base font-bold text-[#F3F4F6] mb-2 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-[#00F0FF]" />
                <span>Verified Source Citations & Telemetry Logs</span>
              </h3>
              <p className="text-xs text-[#94A3B8] mb-3">
                Extracted by external RAG scrapers and cross-referenced with GTA VI decompiled game variables across Leonida.
              </p>
              <ul className="space-y-1.5">
                {question.sourceUrls.map((url, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs font-mono">
                    <span className="text-[#64748B]">[{i + 1}]</span>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#00F0FF] hover:underline flex items-center gap-1 truncate max-w-xl"
                    >
                      <span>{url}</span>
                      <ExternalLink className="w-3 h-3 flex-shrink-0" />
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          </article>

          {/* Sticky Right Sidebar (4 Columns) */}
          <aside className="lg:col-span-4 space-y-6">
            {/* Sticky Table of Contents */}
            <div className="sticky top-24 space-y-6">
              <TableOfContents />

              {/* COMPONENT D (Sidebar Sticky Sponsor Slot) */}
              <SidebarSponsorSlot />

              {/* Machine-Readability Quick Actions */}
              <div className="p-4 rounded-xl bg-[#0F1118] border border-[#1F2430] text-xs font-mono space-y-2.5">
                <div className="flex items-center gap-1.5 text-[#00F0FF] font-semibold text-[11px] uppercase">
                  <Database className="w-3.5 h-3.5" />
                  <span>GEO Machine Endpoint</span>
                </div>
                <p className="text-[#94A3B8] text-[11px] leading-relaxed">
                  Query this single record directly via REST API or ingest the full plain-text bundle:
                </p>
                <div className="space-y-1.5 pt-1">
                  <Link
                    href={`/api/v1/search?q=${encodeURIComponent(question.slug)}`}
                    target="_blank"
                    className="block px-2.5 py-1.5 rounded bg-[#12141D] border border-[#1F2430] hover:border-[#00F0FF]/40 text-[#00F0FF] text-[11px] truncate transition-colors"
                  >
                    GET /api/v1/search?q={question.slug}
                  </Link>
                  <Link
                    href="/llms.txt"
                    target="_blank"
                    className="block px-2.5 py-1.5 rounded bg-[#12141D] border border-[#1F2430] hover:border-[#FF2E93]/40 text-[#FF2E93] text-[11px] truncate transition-colors"
                  >
                    GET /llms.txt (Directory Index)
                  </Link>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
