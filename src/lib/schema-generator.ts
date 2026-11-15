import { QuestionRecord } from "@/types";

export function generateQaPageSchema(question: QuestionRecord, baseUrl: string = "https://toolup-vi.com") {
  return {
    "@context": "https://schema.org",
    "@type": "QAPage",
    mainEntity: {
      "@type": "Question",
      name: question.title,
      text: question.title,
      answerCount: 1,
      upvoteCount: question.searchVolumeScore * 10,
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
        upvoteCount: question.llmCitationCount,
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

export function generateArticleSchema(question: QuestionRecord, baseUrl: string = "https://toolup-vi.com") {
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
      name: "ToolUp VI - GTA VI Nervous System",
      url: baseUrl,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${baseUrl}/q/${question.slug}`,
    },
  };
}
