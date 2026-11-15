export type Category =
  | "All"
  | "Missions"
  | "Money Guides"
  | "Vehicles"
  | "Weapons"
  | "Map Secrets"
  | "Glitches & Fixes";

export interface StepItem {
  stepNumber: number;
  title: string;
  instruction: string;
  coordinates?: string;
  tip?: string;
}

export interface SpecRow {
  label: string;
  value: string;
  badge?: string;
}

export interface QuestionRecord {
  id: string;
  slug: string;
  title: string;
  category: Exclude<Category, "All">;
  tldrAnswer: string;
  steps: StepItem[];
  specsTable: SpecRow[];
  sourceUrls: string[];
  searchVolumeScore: number;
  velocityChange: string;
  lastPatchVerified: string;
  verifiedBy: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  viewsCount: number;
  llmCitationCount: number;
  isBreakout?: boolean;
}

export interface IngestPayload {
  question_title: string;
  slug: string;
  category: Exclude<Category, "All">;
  tldr_answer: string;
  steps_markdown?: string | StepItem[];
  specs_table_json?: SpecRow[];
  source_urls?: string[];
  search_volume_score?: number;
  last_patch_verified?: string;
}

