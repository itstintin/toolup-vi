import { QuestionRecord } from "@/types";
import { getAllQuestions } from "@/lib/db";
import { WIKI_REGIONS, WikiTreeNode } from "@/lib/wiki-data";

export function getWikiTree(): WikiTreeNode[] {
  const allQuestions = getAllQuestions();

  return WIKI_REGIONS.map((region) => {
    const matchingGuides = allQuestions.filter(
      (q) => q.region && q.region.toLowerCase() === region.name.toLowerCase()
    );

    return {
      region,
      guides: matchingGuides,
    };
  });
}

export function getAdjacentWikiGuides(currentSlug: string): {
  prev: QuestionRecord | null;
  next: QuestionRecord | null;
} {
  const allQuestions = getAllQuestions();
  const currentIndex = allQuestions.findIndex(
    (q) => q.slug.toLowerCase() === currentSlug.toLowerCase()
  );

  if (currentIndex === -1) {
    return { prev: null, next: null };
  }

  const prev = currentIndex > 0 ? allQuestions[currentIndex - 1] : null;
  const next = currentIndex < allQuestions.length - 1 ? allQuestions[currentIndex + 1] : null;

  return { prev, next };
}

