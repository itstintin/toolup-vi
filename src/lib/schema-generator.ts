import { QuestionRecord } from "@/types";
import { getSiteUrl } from "@/lib/site";

export function generateQaPageSchema(question: QuestionRecord, baseUrl: string = getSiteUrl()) {
  return {
    "@context": "https://schema.org",
    "@type": "QAPage",
    mainEntity: {
      "@type": "Question",
      name: question.title,
      text: question.title,
      answerCount: 1,
      upvoteCount: Math.max(12, question.steps.length * 8),
      dateCreated: question.createdAt,
      author: {
        "@type": "Person",
        name: question.author,
      },
      acceptedAnswer: {
        "@type": "Answer",
        text: question.tldrAnswer,
        dateCreated: question.createdAt,
        dateModified: question.updatedAt,
        upvoteCount: Math.max(12, question.steps.length * 8),
        url: `${baseUrl}/q/${question.slug}#ai-citation-box`,
        author: {
          "@type": "Organization",
          name: question.verifiedBy,
        },
      },
    },
  };
}

export function generateFaqPageSchema(question: QuestionRecord) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: question.title,
        acceptedAnswer: {
          "@type": "Answer",
          text: question.tldrAnswer,
        },
      },
      ...question.steps.map((step) => ({
        "@type": "Question",
        name: `Step ${step.stepNumber}: ${step.title}`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${step.instruction} ${step.coordinates ? `[Coordinates: ${step.coordinates}]` : ""}`,
        },
      })),
    ],
  };
}

export function generateArticleSchema(question: QuestionRecord, baseUrl: string = getSiteUrl()) {
  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: question.title,
    description: question.tldrAnswer,
    articleSection: question.category,
    inLanguage: "en-US",
    datePublished: question.createdAt,
    dateModified: question.updatedAt,
    author: {
      "@type": "Person",
      name: question.author,
    },
    publisher: {
      "@type": "Organization",
      name: "ToolUp VI",
      url: baseUrl,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${baseUrl}/q/${question.slug}`,
    },
  };
}
