import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getAllQuestions, getQuestionBySlug } from "@/lib/db";
import { getWikiTree, getAdjacentWikiGuides } from "@/lib/wiki-server";
import { WikiLayout } from "@/components/wiki/WikiLayout";
import { DirectAnswerBlock } from "@/components/wiki/DirectAnswerBlock";
import { InteractiveChecklist } from "@/components/wiki/InteractiveChecklist";
import { SortableDataTable } from "@/components/wiki/SortableDataTable";
import { WikiArticleFooter } from "@/components/wiki/WikiArticleFooter";
import {
  generateQaPageSchema,
  generateFaqPageSchema,
  generateArticleSchema,
} from "@/lib/schema-generator";
import {
  ShieldCheck,
  Clock,
  ArrowLeft,
  Calendar,
  User,
  ExternalLink,
  ChevronRight,
  MapPin,
  Cpu,
  Compass,
  AlertTriangle,
} from "lucide-react";
import { formatDate, calculateReadTime } from "@/lib/utils";

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
      title: "Wiki Guide Not Found | ToolUp VI",
    };
  }

  const canonicalUrl = `https://toolup-vi.com/wiki/${question.slug}`;

  return {
    title: `${question.title} - GTA VI Wiki Guide | ToolUp VI`,
    description: question.tldrAnswer,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${question.title} | GTA VI Editorial Wiki`,
      description: question.tldrAnswer,
      url: canonicalUrl,
      type: "article",
      publishedTime: question.createdAt,
      modifiedTime: question.updatedAt,
      authors: [question.author],
      tags: [
        question.category,
        question.region || "Leonida",
        "GTA VI Wiki",
        "Grand Theft Auto VI",
        question.lastPatchVerified,
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: question.title,
      description: question.tldrAnswer,
    },
    other: {
      "llm-extract-target": "direct-answer",
      "game-patch": question.lastPatchVerified,
      "wiki-region": question.region || "Leonida",
      "geo-verification": "verified",
    },
  };
}

export default async function WikiArticlePage({ params }: PageProps) {
  const resolvedParams = await params;
  const question = getQuestionBySlug(resolvedParams.slug);

  if (!question) {
    notFound();
  }

  const tree = getWikiTree();
  const { prev, next } = getAdjacentWikiGuides(question.slug);

  // Schema.org payloads for AI search engines & crawlers
  const qaSchema = generateQaPageSchema(question);
  const faqSchema = generateFaqPageSchema(question);
  const articleSchema = generateArticleSchema(question);

  // Convert step list to interactive checklist items
  const checklistItems = question.steps.map((step) => ({
    id: `step-${step.stepNumber}`,
    title: `Step ${step.stepNumber}: ${step.title}`,
    subtitle: step.instruction,
    coordinates: step.coordinates,
    badge: step.coordinates ? "GPS Verified" : "Objective",
  }));

  return (
    <>
      {/* Schema.org Injections */}
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

      <WikiLayout
        tree={tree}
        currentSlug={question.slug}
        question={question}
        breadcrumb={{
          region: question.region || "Leonida",
          title: question.title,
        }}
      >
        {/* Mintlify-Style Breadcrumbs */}
        <nav className="flex items-center gap-1.5 text-xs font-mono text-[#64748B] mb-5 truncate">
          <Link href="/wiki" className="hover:text-[#F3F4F6] flex items-center gap-1 transition-colors">
            <Compass className="w-3.5 h-3.5 text-[#00F0FF]" />
            <span>Wiki</span>
          </Link>
          <ChevronRight className="w-3 h-3 text-[#1F2430]" />
          {question.region && (
            <>
              <span className="text-[#94A3B8]">{question.region}</span>
              <ChevronRight className="w-3 h-3 text-[#1F2430]" />
            </>
          )}
          <span className="text-[#00F0FF] truncate max-w-[200px] sm:max-w-xs">{question.title}</span>
        </nav>

        {/* Article Header */}
        <header className="pb-6 border-b border-[#1F2430]">
          {/* Header Badges */}
          <div className="flex flex-wrap items-center gap-2 mb-3">
            {question.region && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-mono font-bold uppercase bg-[#00F0FF]/10 text-[#00F0FF] border border-[#00F0FF]/30">
                <MapPin className="w-3 h-3" />
                <span>{question.region}</span>
              </span>
            )}
            <span className="px-2.5 py-1 rounded text-xs font-mono font-bold uppercase bg-[#090A0F] border border-[#1F2430] text-[#CBD5E1]">
              {question.category}
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{question.verifiedPatch || question.lastPatchVerified || "Launch Build 1.0"}</span>
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-mono font-bold text-[#FF2E93] bg-[#FF2E93]/10 border border-[#FF2E93]/30">
              <Clock className="w-3.5 h-3.5" />
              <span>{question.readTime || calculateReadTime(question.tldrAnswer)}</span>
            </span>
          </div>

          {/* H1 Article Title */}
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#F3F4F6] leading-tight mb-4 font-sans">
            {question.title}
          </h1>

          {/* Author & Verification Meta */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#64748B]">
            <div className="flex items-center gap-1.5 text-[#94A3B8]">
              <User className="w-3.5 h-3.5 text-[#00F0FF]" />
              <span>{question.author}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <span>Updated {formatDate(question.updatedAt)}</span>
            </div>
            <div className="flex items-center gap-1.5 text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Verified: {question.verifiedBy}</span>
            </div>
          </div>
        </header>

        {/* 1. Direct Answer Aside Block (Strictly Top) */}
        <DirectAnswerBlock question={question} />

        {/* 2. Interactive LocalStorage Checklist */}
        <InteractiveChecklist
          storageKey={question.slug}
          title="Mission Execution & Objective Tracker"
          subtitle="Check off objectives as you execute them in-game. State is preserved across reloads."
          items={checklistItems}
        />

        {/* 3. Detailed Chronological Step-by-Step Execution */}
        <section id="step-by-step" className="my-8 scroll-mt-24">
          <div className="mb-5">
            <h2 className="text-xl font-bold text-[#F3F4F6] flex items-center gap-2">
              <span className="font-mono text-[#00F0FF]">03.</span>
              <span>Tactical Step-by-Step Execution</span>
            </h2>
            <p className="text-xs text-[#94A3B8] mt-0.5">
              Chronological procedure validated against patrol routes, AI responses, and environmental mechanics.
            </p>
          </div>

          <div className="space-y-4">
            {question.steps.map((step) => (
              <div
                key={step.stepNumber}
                className="p-5 rounded-xl bg-[#12141D] border border-[#1F2430] hover:border-[#2A3142] transition-colors relative"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-[#090A0F] border border-[#1F2430] text-[#00F0FF] font-mono text-xs font-bold flex items-center justify-center">
                      #{step.stepNumber}
                    </span>
                    <h3 className="text-base font-semibold text-[#F3F4F6] font-sans">
                      {step.title}
                    </h3>
                  </div>

                  {step.coordinates && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#090A0F] border border-[#1F2430] text-xs font-mono text-[#00F0FF]">
                      <MapPin className="w-3 h-3 text-[#00F0FF]" />
                      <span>{step.coordinates}</span>
                    </span>
                  )}
                </div>

                <p className="text-sm text-[#CBD5E1] leading-relaxed pl-10 mb-3 font-sans">
                  {step.instruction}
                </p>

                {step.tip && (
                  <div className="ml-10 p-3 rounded-lg bg-[#181B26] border border-[#1F2430] flex items-start gap-2.5 text-xs text-[#94A3B8]">
                    <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                    <div className="leading-snug">
                      <span className="font-semibold text-amber-300 font-mono mr-1.5">INTEL WARNING:</span>
                      <span>{step.tip}</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* 4. Sortable HTML Data Table */}
        <SortableDataTable
          title="Verified Specifications & Telemetry Attributes"
          subtitle="Click column headers to sort parameters, values, and loot classifications."
          data={question.specsTable}
        />

        {/* 5. Verified Source Citations Section */}
        <section id="telemetry-sources" className="my-8 scroll-mt-24 pt-6 border-t border-[#1F2430]">
          <h3 className="text-base font-bold text-[#F3F4F6] mb-2 flex items-center gap-2">
            <Cpu className="w-4 h-4 text-[#00F0FF]" />
            <span>Verified Source Citations & Telemetry Logs</span>
          </h3>
          <p className="text-xs text-[#94A3B8] mb-3">
            Cross-referenced with decompiled game parameters and live RAG telemetry endpoints.
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

        {/* Mintlify-Style Previous / Next & Feedback Footer */}
        <WikiArticleFooter
          question={question}
          prevGuide={prev}
          nextGuide={next}
        />
      </WikiLayout>
    </>
  );
}
