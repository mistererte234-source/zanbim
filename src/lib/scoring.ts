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
  subtest: string;
  score: number;
}

export interface CpnsScoreResult {
  twk: number;
  tiu: number;
  tkp: number;
  total: number;
  belowThreshold: string[];
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

// Rekrutmen HRD IQ Calculator (Skala IQ 80 - 150)
export function calculateIqIndex(attempts: { isCorrect: boolean; difficulty: number }[]): {
  iqScore: number;
  category: string;
} {
  if (attempts.length === 0) return { iqScore: 100, category: "Rata-rata (Average)" };

  let correctCount = 0;
  for (const a of attempts) {
    if (a.isCorrect) correctCount++;
  }

  const acc = correctCount / attempts.length;
  const iqScore = Math.round(80 + acc * 70); // 80..150 scale

  let category = "Rata-rata (Average)";
  if (iqScore >= 130) category = "Sangat Unggul (Very Superior / High Potential)";
  else if (iqScore >= 120) category = "Unggul (Superior)";
  else if (iqScore >= 110) category = "Di Atas Rata-rata (High Average)";
  else if (iqScore >= 90) category = "Rata-rata (Average)";
  else category = "Perlu Pengembangan (Below Average)";

  return { iqScore, category };
}

// Dewan RI Eligibility Calculator (0 - 100%)
export function calculateDewanEligibility(attempts: { score: number; maxScore: number }[]): {
  percentage: number;
  status: string;
  badgeColor: string;
} {
  if (attempts.length === 0) return { percentage: 0, status: "Perlu Pembekalan", badgeColor: "rose" };

  let totalScore = 0;
  let totalMax = 0;
  for (const a of attempts) {
    totalScore += a.score;
    totalMax += a.maxScore || 1;
  }

  const percentage = Math.round((totalScore / (totalMax || 1)) * 100);

  let status = "Perlu Pembekalan Legislatif";
  let badgeColor = "rose";

  if (percentage >= 85) {
    status = "Sangat Layak (Fit & Proper)";
    badgeColor = "emerald";
  } else if (percentage >= 70) {
    status = "Cukup Layak";
    badgeColor = "amber";
  }

  return { percentage, status, badgeColor };
}

// Dosen PTN/PTS Qualification Calculator (0 - 100%)
export function calculateDosenScore(attempts: { isCorrect: boolean; difficulty: number }[]): {
  percentage: number;
  status: string;
  recommendation: string;
} {
  if (attempts.length === 0) return { percentage: 0, status: "Perlu Pembekalan", recommendation: "Pendampingan Tri Dharma" };

  let correct = 0;
  for (const a of attempts) {
    if (a.isCorrect) correct++;
  }

  const percentage = Math.round((correct / attempts.length) * 100);

  let status = "Perlu Pembekalan Tri Dharma";
  let recommendation = "Perlu peningkatan publikasi Scopus/Sinta & Metode Pedagogik";

  if (percentage >= 80) {
    status = "Lolos Kualifikasi Dosen (Sangat Layak)";
    recommendation = "Direkomendasikan Lolos Seleksi Dosen PTN/PTS & NIDN";
  } else if (percentage >= 65) {
    status = "Cukup Kualifikasi";
    recommendation = "Direkomendasikan Lolos dengan Catatan Pelatihan Pekerti/AA";
  }

  return { percentage, status, recommendation };
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
