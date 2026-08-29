export type Track = "UTBK" | "CPNS" | "REKRUTMEN" | "DEWAN_RI" | "DOSEN";

export type ItemType = "mcq" | "tkp_likert";

export type ItemStatus = "draft" | "validate" | "review" | "published" | "archived";

export interface ItemSolution {
  concept: string;
  steps: string[];
  traps: Record<string, string>;
}

export interface BaseItemPayload {
  id: string;
  version: number;
  track: Track;
  subtest: string;
  skill: string;
  difficulty: number; // 1 | 2 | 3
  status: ItemStatus;
  item_type: ItemType;
  stem: string;
  stimulus?: string | null;
  options: Record<"A" | "B" | "C" | "D" | "E", string>;
  solution: ItemSolution;
  diagnostic_only?: boolean;
  source_type?: string;
  parent_id?: string | null;
  variant_type?: string | null;
}

export interface MCQItemPayload extends BaseItemPayload {
  item_type: "mcq";
  answer: "A" | "B" | "C" | "D" | "E";
}

export interface TKPItemPayload extends BaseItemPayload {
  item_type: "tkp_likert";
  tkp_key: Record<"A" | "B" | "C" | "D" | "E", number>;
}

export type ItemPayload = MCQItemPayload | TKPItemPayload;

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

export interface TaxonomySkill {
  code: string;
  track: Track;
  subtest: string;
  domain: string;
  label: string;
  version: number;
}
