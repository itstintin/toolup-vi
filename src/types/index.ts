export type Category =
  | "All"
  | "Money & ATMs"
  | "Map & Regions"
  | "Vehicles & Fences"
  | "Weapons & Loadouts"
  | "Criminal Profile & Heat"
  | "Glitches & Fixes";

export type WikiRegion =
  | "Vice City"
  | "Leonida Keys"
  | "Grassrivers"
  | "Port Gellhorn"
  | "Ambrosia"
  | "Mount Kalaga National Park";

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
  region?: WikiRegion | string;
  tldrAnswer: string;
  steps: StepItem[];
  specsTable: SpecRow[];
  sourceUrls: string[];
  lastPatchVerified: string;
  verifiedPatch?: string;
  readTime?: string;
  verifiedBy: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  searchVolumeScore?: number;
  velocityChange?: string;
  viewsCount?: number;
  llmCitationCount?: number;
  isBreakout?: boolean;
}

export interface IngestPayload {
  question_title: string;
  slug: string;
  category: Exclude<Category, "All">;
  region?: WikiRegion | string;
  tldr_answer: string;
  steps_markdown?: string | StepItem[];
  specs_table_json?: SpecRow[];
  source_urls?: string[];
  last_patch_verified?: string;
  verified_patch?: string;
  read_time?: string;
  search_volume_score?: number;
}
