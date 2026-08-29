import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { calculateUtbkIndex, calculateCpnsScore, calculateSkillPriority, DEFAULT_CPNS_RULESET } from "@/lib/scoring";
import { INITIAL_TAXONOMY } from "@/lib/taxonomy";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const track = searchParams.get("track") || "UTBK";

    const dbItems = await db.item.findMany({
      where: {
        track,
        status: "published",
      },
    });

    const items = dbItems.map((i) => {
      try {
        return JSON.parse(i.payload);
      } catch (e) {
        return null;
      }
    }).filter(Boolean);

    return NextResponse.json({ track, items });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { track, answers, target } = body;

    const dbItems = await db.item.findMany({
      where: { track, status: "published" },
    });

    const itemMap = new Map<string, any>();
    for (const i of dbItems) {
      try {
        const payload = JSON.parse(i.payload);
        itemMap.set(i.id, payload);
      } catch (e) {}
    }

    const attemptsToSave: any[] = [];
    const itemAnalysis: any[] = [];
    const skillStats = new Map<string, { n: number; nCorrect: number; weightedAcc: number; subtest: string }>();

    for (const sk of INITIAL_TAXONOMY) {
      if (sk.track === track) {
        skillStats.set(sk.code, { n: 0, nCorrect: 0, weightedAcc: 0, subtest: sk.subtest });
      }
    }

    let utbkInputs: { isCorrect: boolean; difficulty: number }[] = [];
    let cpnsInputs: { subtest: string; score: number }[] = [];

    for (const itemId of Object.keys(answers)) {
      const item = itemMap.get(itemId);
      if (!item) continue;

      const userChoice = answers[itemId].choice;
      const timeMs = answers[itemId].timeMs || 30000;
      let score = 0;
      let isCorrect = false;

      if (item.item_type === "mcq") {
        isCorrect = userChoice === item.answer;
        score = isCorrect ? 1.0 : 0.0;
        if (track === "UTBK") {
          utbkInputs.push({ isCorrect, difficulty: item.difficulty || 2 });
        } else {
          cpnsInputs.push({ subtest: item.subtest, score: isCorrect ? 5 : 0 });
        }
      } else if (item.item_type === "tkp_likert") {
        const itemScore = item.tkp_key?.[userChoice] || 1;
        score = itemScore;
        isCorrect = itemScore >= 4;
        cpnsInputs.push({ subtest: "TKP", score: itemScore });
      }

      attemptsToSave.push({
        itemId,
        version: item.version || 1,
        choice: userChoice,
        score,
        timeMs,
      });

      itemAnalysis.push({
        id: item.id,
        stem: item.stem,
        subtest: item.subtest,
        item_type: item.item_type,
        options: item.options,
        userChoice,
        answer: item.answer,
        tkp_key: item.tkp_key,
        score,
        isCorrect,
        solution: item.solution,
      });

      const st = skillStats.get(item.skill) || { n: 0, nCorrect: 0, weightedAcc: 0, subtest: item.subtest };
      st.n += 1;
      if (isCorrect) st.nCorrect += 1;
      st.weightedAcc = st.nCorrect / st.n;
      skillStats.set(item.skill, st);
    }

    let resultSummary: any = {};

    if (track === "UTBK") {
      const index = calculateUtbkIndex(utbkInputs);
      resultSummary = {
        type: "UTBK",
        indeks: index,
        label: `Indeks Kemampuan ZanBimbel: ${index} (internal, bukan skor SNPMB)`,
      };
    } else {
      const cpnsRes = calculateCpnsScore(cpnsInputs, DEFAULT_CPNS_RULESET);
      resultSummary = {
        type: "CPNS",
        ...cpnsRes,
      };
    }

    const belowThresholdSubtests = resultSummary.belowThreshold || [];
    const skillPriorityList: { code: string; label: string; subtest: string; gap: number; priority: number; n: number }[] = [];

    for (const [code, stat] of skillStats.entries()) {
      const skMeta = INITIAL_TAXONOMY.find((t) => t.code === code);
      const label = skMeta ? skMeta.label : code;
      const calc = calculateSkillPriority(stat, 1.0, belowThresholdSubtests);

      skillPriorityList.push({
        code,
        label,
        subtest: stat.subtest,
        gap: calc.gap,
        priority: calc.priority,
        n: stat.n,
      });
    }

    skillPriorityList.sort((a, b) => b.priority - a.priority);
    const top3Gaps = skillPriorityList.slice(0, 3);

    return NextResponse.json({
      success: true,
      summary: resultSummary,
      topGaps: top3Gaps,
      skillPriorities: skillPriorityList,
      itemAnalysis,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
