import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { calculateUtbkIndex, calculateCpnsScore, calculateIqIndex, calculateDewanEligibility, calculateSkillPriority } from "@/lib/scoring";
import { Track } from "@/lib/types";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const track = (searchParams.get("track") as Track) || "UTBK";

  try {
    const items = await db.item.findMany({
      where: {
        track: track,
        status: "published",
      },
      take: 10,
    });

    const parsedItems = items.map((item) => JSON.parse(item.payload));
    return NextResponse.json({ success: true, track, items: parsedItems });
  } catch (error) {
    console.error("Failed to fetch diagnosis items:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { track, answers } = body as {
      track: Track;
      answers: Record<string, { selectedOption: string; isCorrect?: boolean; score?: number }>;
    };

    const itemIds = Object.keys(answers);
    const dbItems = await db.item.findMany({
      where: { id: { in: itemIds } },
    });

    const itemsMap = new Map(dbItems.map((item) => [item.id, JSON.parse(item.payload)]));
    const skillStats: Record<string, { total: number; correct: number; subtest: string }> = {};
    const itemAnalysis: any[] = [];

    // Scoring accumulators
    const utbkAttempts: { isCorrect: boolean; difficulty: number }[] = [];
    const cpnsAttempts: { subtest: string; score: number }[] = [];
    const iqAttempts: { isCorrect: boolean; difficulty: number }[] = [];
    const dewanAttempts: { score: number; maxScore: number }[] = [];

    for (const itemId of itemIds) {
      const payload = itemsMap.get(itemId);
      const userAns = answers[itemId];
      if (!payload) continue;

      let isCorrect = false;
      let scoreGained = 0;

      if (payload.item_type === "mcq") {
        isCorrect = userAns.selectedOption === payload.answer;
        scoreGained = isCorrect ? 5 : 0;
        utbkAttempts.push({ isCorrect, difficulty: payload.difficulty });
        iqAttempts.push({ isCorrect, difficulty: payload.difficulty });
        dewanAttempts.push({ score: isCorrect ? 10 : 0, maxScore: 10 });
      } else if (payload.item_type === "tkp_likert") {
        scoreGained = payload.tkp_key?.[userAns.selectedOption] || 1;
        isCorrect = scoreGained >= 4;
        cpnsAttempts.push({ subtest: payload.subtest, score: scoreGained });
        dewanAttempts.push({ score: scoreGained, maxScore: 5 });
      }

      // Collect per-item solution analysis
      itemAnalysis.push({
        id: payload.id,
        stem: payload.stem,
        userSelected: userAns.selectedOption,
        correctAnswer: payload.answer || null,
        isCorrect,
        scoreGained,
        concept: payload.solution?.concept || "",
        steps: payload.solution?.steps || [],
        trapExplanation: payload.solution?.traps?.[userAns.selectedOption] || null,
      });

      // Update skill stats
      const skillCode = payload.skill;
      if (!skillStats[skillCode]) {
        skillStats[skillCode] = { total: 0, correct: 0, subtest: payload.subtest };
      }
      skillStats[skillCode].total += 1;
      if (isCorrect) skillStats[skillCode].correct += 1;
    }

    let utbkIndex = 200;
    let cpnsResult = null;
    let iqResult = null;
    let dewanResult = null;

    if (track === "UTBK") {
      utbkIndex = calculateUtbkIndex(utbkAttempts);
    } else if (track === "CPNS") {
      cpnsResult = calculateCpnsScore(cpnsAttempts);
    } else if (track === "REKRUTMEN") {
      iqResult = calculateIqIndex(iqAttempts);
    } else if (track === "DEWAN_RI") {
      dewanResult = calculateDewanEligibility(dewanAttempts);
    }

    const belowThresholdSubtests = cpnsResult?.belowThreshold || [];
    const skillPriorities = Object.entries(skillStats).map(([skillCode, stat]) => {
      const acc = stat.total > 0 ? stat.correct / stat.total : 0;
      const calc = calculateSkillPriority(
        { n: stat.total, weightedAcc: acc, subtest: stat.subtest },
        1.0,
        belowThresholdSubtests
      );
      return {
        skillCode,
        subtest: stat.subtest,
        accuracy: acc,
        priority: calc.priority,
        gap: calc.gap,
      };
    });

    skillPriorities.sort((a, b) => b.priority - a.priority);
    const topGaps = skillPriorities.slice(0, 3);

    return NextResponse.json({
      success: true,
      track,
      utbkIndex,
      cpnsResult,
      iqResult,
      dewanResult,
      topGaps,
      itemAnalysis,
    });
  } catch (error) {
    console.error("Diagnosis scoring error:", error);
    return NextResponse.json({ success: false, error: "Scoring Error" }, { status: 500 });
  }
}
