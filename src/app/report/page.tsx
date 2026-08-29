"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AlertTriangle, ArrowRight, CheckCircle2, XCircle, Sparkles, Zap, ChevronDown, ChevronUp, BookOpen } from "lucide-react";

export default function ReportPage() {
  const [data, setData] = useState<any>(null);
  const [track, setTrack] = useState<string>("UTBK");
  const [targetName, setTargetName] = useState<string | null>(null);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  useEffect(() => {
    const savedTrack = localStorage.getItem("zanbim_track") || "UTBK";
    const savedTarget = localStorage.getItem("zanbim_target");
    setTrack(savedTrack);
    setTargetName(savedTarget);

    const savedResult = localStorage.getItem("zanbim_diagnosis_result");
    if (savedResult) {
      try {
        setData(JSON.parse(savedResult));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  if (!data) {
    return (
      <div className="max-w-md mx-auto py-16 text-center flex flex-col items-center gap-4">
        <p className="text-sm text-zinc-400">Belum ada data diagnosis. Silakan ikuti tes diagnosis terlebih dahulu.</p>
        <Link
          href="/diagnosis"
          className="px-6 py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-xs shadow-glow hover:bg-indigo-500 transition-all"
        >
          Mulai Tes Diagnosis
        </Link>
      </div>
    );
  }

  const { summary, topGaps, itemAnalysis } = data;
  const isCpnsBelowThreshold = summary.type === "CPNS" && summary.belowThreshold && summary.belowThreshold.length > 0;

  const toggleExpand = (id: string) => {
    setExpandedItem(expandedItem === id ? null : id);
  };

  return (
    <div className="max-w-4xl mx-auto py-6 px-2 flex flex-col gap-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            Laporan Diagnosis {summary.type} <Sparkles className="w-5 h-5 text-indigo-400" />
          </h1>
          <p className="text-xs text-zinc-400">
            Target: <strong className="text-white">{targetName || "Naikkan Indeks (Umum)"}</strong>
          </p>
        </div>

        <Link
          href="/dashboard"
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-bold text-xs shadow-glow hover:opacity-95 transition-all flex items-center gap-2 self-start sm:self-auto"
        >
          Mulai Misi Hari Ini
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Prominent Red Banner for CPNS Below Threshold */}
      {isCpnsBelowThreshold && (
        <div className="p-4 rounded-2xl bg-rose-950/80 border-2 border-rose-500 flex items-start gap-3 shadow-glow-rose">
          <AlertTriangle className="w-6 h-6 text-rose-400 shrink-0 mt-0.5" />
          <div className="flex flex-col gap-1">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              PERHATIAN: SKOR DI BAWAH AMBANG KELULUSAN SKD
            </h3>
            <p className="text-xs text-rose-200 leading-relaxed">
              Subtes berikut masih di bawah Nilai Ambang Batas (Passing Grade):{" "}
              <strong className="underline uppercase tracking-wide">{summary.belowThreshold.join(", ")}</strong>.
              Sistem telah memprioritaskan skill subtes tersebut pada urutan teratas rencana latihan harian kamu!
            </p>
          </div>
        </div>
      )}

      {/* Score Overview Card */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-indigo-500/30 flex flex-col gap-6">
        {summary.type === "UTBK" ? (
          <div className="flex flex-col items-center justify-center gap-3 text-center">
            <span className="text-xs font-semibold text-indigo-300 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/30">
              Indeks Kemampuan ZanBimbel (Internal)
            </span>
            <div className="text-5xl sm:text-6xl font-black tracking-tight text-white glow-text-indigo">
              {summary.indeks}
            </div>
            <p className="text-xs text-zinc-400 max-w-lg">
              {summary.label}. Indeks berkisar antara 200 - 800 berdasarkan pembobotan tingkat kesulitan soal yang berhasil dijawab.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center border-b border-zinc-800 pb-4">
              <div>
                <span className="text-xs text-zinc-400 font-medium">Total Skor SKD CPNS</span>
                <div className="text-4xl font-extrabold text-white">{summary.total} / 550</div>
              </div>
              <span
                className={`px-3 py-1.5 rounded-lg text-xs font-bold border ${
                  summary.isPassedAllThresholds
                    ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                    : "bg-rose-500/20 text-rose-400 border-rose-500/30"
                }`}
              >
                {summary.isPassedAllThresholds ? "Tembus Semua Ambang" : "Di Bawah Ambang"}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className={`p-4 rounded-xl border ${summary.belowThreshold?.includes("TWK") ? "bg-rose-950/40 border-rose-500/40" : "bg-zinc-900/60 border-zinc-800"}`}>
                <span className="text-xs text-zinc-400 block font-medium">TWK (Min 65)</span>
                <span className="text-xl font-bold text-white">{summary.twk} / 150</span>
              </div>
              <div className={`p-4 rounded-xl border ${summary.belowThreshold?.includes("TIU") ? "bg-rose-950/40 border-rose-500/40" : "bg-zinc-900/60 border-zinc-800"}`}>
                <span className="text-xs text-zinc-400 block font-medium">TIU (Min 80)</span>
                <span className="text-xl font-bold text-white">{summary.tiu} / 175</span>
              </div>
              <div className={`p-4 rounded-xl border ${summary.belowThreshold?.includes("TKP") ? "bg-rose-950/40 border-rose-500/40" : "bg-zinc-900/60 border-zinc-800"}`}>
                <span className="text-xs text-zinc-400 block font-medium">TKP (Min 166)</span>
                <span className="text-xl font-bold text-white">{summary.tkp} / 225</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Top 3 Skill Gaps Identified */}
      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Zap className="w-5 h-5 text-cyan-400" />
          3 Skill Gap Prioritas Utama
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {topGaps?.map((gap: any, idx: number) => (
            <div
              key={idx}
              className="glass-panel p-5 rounded-2xl border border-zinc-800 flex flex-col gap-3 glass-panel-hover"
            >
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-zinc-800 text-zinc-400">
                  {gap.subtest}
                </span>
                <span className="text-xs font-bold text-rose-400 font-mono">
                  Priority: {(gap.priority * 100).toFixed(0)}%
                </span>
              </div>
              <h3 className="text-sm font-bold text-white leading-snug">{gap.label}</h3>
              <p className="font-mono text-[11px] text-zinc-500">{gap.code}</p>
            </div>
          ))}
        </div>
      </div>

      {/* DETAILED ITEM ANSWER ANALYSIS SECTION */}
      {itemAnalysis && itemAnalysis.length > 0 && (
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-indigo-400" />
            Rincian Analisis Jawaban Per Nomor ({itemAnalysis.length} Soal)
          </h2>

          <div className="flex flex-col gap-3">
            {itemAnalysis.map((item: any, idx: number) => {
              const isExpanded = expandedItem === item.id;
              const isMCQ = item.item_type === "mcq";

              return (
                <div
                  key={item.id}
                  className="glass-panel rounded-2xl border border-zinc-800 overflow-hidden transition-all"
                >
                  {/* Item Header Accordion */}
                  <div
                    onClick={() => toggleExpand(item.id)}
                    className="p-4 flex items-center justify-between cursor-pointer hover:bg-zinc-900/50"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-lg bg-zinc-800 text-white font-mono font-bold text-xs flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <div className="flex flex-col">
                        <span className="text-xs font-semibold text-white truncate max-w-xs sm:max-w-md">
                          {item.stem}
                        </span>
                        <span className="text-[10px] text-zinc-500 font-mono">
                          Subtes: {item.subtest} • Jawaban Kamu: <strong className="text-white">{item.userChoice}</strong>
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      {isMCQ ? (
                        item.isCorrect ? (
                          <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-400 font-bold text-xs border border-emerald-500/30 flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Benar (+1)
                          </span>
                        ) : (
                          <span className="px-2.5 py-1 rounded bg-rose-500/20 text-rose-400 font-bold text-xs border border-rose-500/30 flex items-center gap-1">
                            <XCircle className="w-3.5 h-3.5" /> Salah
                          </span>
                        )
                      ) : (
                        <span className="px-2.5 py-1 rounded bg-cyan-500/20 text-cyan-400 font-bold text-xs border border-cyan-500/30">
                          Skor TKP: {item.score} / 5
                        </span>
                      )}

                      {isExpanded ? <ChevronUp className="w-4 h-4 text-zinc-400" /> : <ChevronDown className="w-4 h-4 text-zinc-400" />}
                    </div>
                  </div>

                  {/* Item Expanded Breakdown */}
                  {isExpanded && (
                    <div className="p-5 border-t border-zinc-800/80 bg-zinc-950/60 flex flex-col gap-4 text-xs">
                      {/* Options Review */}
                      <div className="flex flex-col gap-2">
                        <span className="font-semibold text-zinc-400">Pilihan Jawaban & Evaluasi:</span>
                        {Object.entries(item.options || {}).map(([key, val]: any) => {
                          const isUserSelected = item.userChoice === key;
                          const isCorrectKey = isMCQ && item.answer === key;

                          let bg = "bg-zinc-900/60 border-zinc-800 text-zinc-300";
                          if (isCorrectKey) bg = "bg-emerald-950/60 border-emerald-500/50 text-white font-bold";
                          else if (isUserSelected && !item.isCorrect) bg = "bg-rose-950/60 border-rose-500/50 text-white";

                          return (
                            <div key={key} className={`p-3 rounded-xl border flex items-center justify-between ${bg}`}>
                              <div className="flex items-center gap-2">
                                <span className="font-mono font-bold">{key}.</span>
                                <span>{val}</span>
                              </div>
                              <span className="font-mono text-[11px]">
                                {isUserSelected && "👈 Jawaban Kamu "}
                                {isCorrectKey && "✅ Kunci"}
                                {!isMCQ && `(Skor: ${item.tkp_key?.[key]})`}
                              </span>
                            </div>
                          );
                        })}
                      </div>

                      {/* Solution Concept & Steps */}
                      {item.solution && (
                        <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-500/20 flex flex-col gap-3">
                          <div>
                            <strong className="text-indigo-300 block mb-1">Konsep Penyelesaian:</strong>
                            <p className="text-zinc-200">{item.solution.concept}</p>
                          </div>

                          {item.solution.steps && (
                            <div>
                              <strong className="text-indigo-300 block mb-1">Langkah-langkah:</strong>
                              <ol className="list-decimal list-inside space-y-1 text-zinc-300">
                                {item.solution.steps.map((st: string, i: number) => (
                                  <li key={i}>{st}</li>
                                ))}
                              </ol>
                            </div>
                          )}

                          {item.solution.traps && (
                            <div className="border-t border-indigo-500/20 pt-3">
                              <strong className="text-rose-300 block mb-1">Jebakan (Traps):</strong>
                              <div className="space-y-1 text-zinc-400 font-mono text-[11px]">
                                {Object.entries(item.solution.traps).map(([k, t]: any) => (
                                  <div key={k}>• Opsi {k}: {t}</div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                    </div>
                  )}

                </div>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
}
