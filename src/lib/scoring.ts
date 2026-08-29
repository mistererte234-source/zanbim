export interface UtbkAttemptInput {
  isCorrect: boolean;
  difficulty: number; // 1, 2, 3
}

export function calculateUtbkIndex(attempts: UtbkAttemptInput[]): number {
  if (attempts.length === 0) return 200;
  
  let totalWeightedScore = 0;
  let totalMaxWeight = 0;

  for (const item of attempts) {
    const weight = item.difficulty === 3 ? 1.6 : item.difficulty === 2 ? 1.25 : 1.0;
    totalMaxWeight += weight;
    if (item.isCorrect) {
      totalWeightedScore += weight;
    }
  }

  const raw = totalMaxWeight > 0 ? totalWeightedScore / totalMaxWeight : 0;
  const index = Math.round(200 + raw * 600);
  return Math.min(800, Math.max(200, index));
}

export interface CpnsRuleset {
  twkThreshold: number;
  tiuThreshold: number;
  tkpThreshold: number;
}

export const DEFAULT_CPNS_RULESET: CpnsRuleset = {
  twkThreshold: 65,
  tiuThreshold: 80,
  tkpThreshold: 166,
};

export interface CpnsAttemptInput {
  subtest: "TWK" | "TIU" | "TKP" | string;
  score: number; // MCQ: 5 or 0, TKP: 1..5
}

export interface CpnsScoreResult {
  twk: number;
  tiu: number;
  tkp: number;
  total: number;
  belowThreshold: string[]; // e.g. ["TWK", "TIU"]
  isPassedAllThresholds: boolean;
}

export function calculateCpnsScore(
  attempts: CpnsAttemptInput[],
  ruleset: CpnsRuleset = DEFAULT_CPNS_RULESET
): CpnsScoreResult {
  let twk = 0;
  let tiu = 0;
  let tkp = 0;

  for (const att of attempts) {
    if (att.subtest === "TWK") twk += att.score;
    else if (att.subtest === "TIU") tiu += att.score;
    else if (att.subtest === "TKP") tkp += att.score;
  }

  const belowThreshold: string[] = [];
  if (twk < ruleset.twkThreshold) belowThreshold.push("TWK");
  if (tiu < ruleset.tiuThreshold) belowThreshold.push("TIU");
  if (tkp < ruleset.tkpThreshold) belowThreshold.push("TKP");

  return {
    twk,
    tiu,
    tkp,
    total: twk + tiu + tkp,
    belowThreshold,
    isPassedAllThresholds: belowThreshold.length === 0,
  };
}

export interface SkillStateInput {
  n: number;
  nCorrect: number;
  weightedAcc: Float32Array | number;
  subtest: string;
}

export function calculateSkillPriority(
  state: { n: number; weightedAcc: number; subtest: string },
  wTarget: number = 1.0,
  belowThresholdSubtests: string[] = []
): { gap: number; conf: number; priority: number } {
  const gap = state.n === 0 ? 1.0 : Math.max(0, 1.0 - state.weightedAcc);
  const conf = Math.min(1.0, state.n / 8.0);
  const threshBoost = belowThresholdSubtests.includes(state.subtest) ? 1.4 : 1.0;
  
  const priority = gap * wTarget * conf * threshBoost;
  return { gap, conf, priority };
}
