"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { AlertTriangle, CheckCircle, Target, ArrowRight, BookOpen, ChevronDown, ChevronUp, HelpCircle, ShieldAlert, Briefcase, Landmark, Award, GraduationCap } from "lucide-react";
import { Track } from "@/lib/types";

function ReportContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [reportData, setReportData] = useState<any>(null);
  const [targetName, setTargetName] = useState<string>("");
  const [openItemIndex, setOpenItemIndex] = useState<number | null>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem("zanbim_last_report");
    const savedTarget = localStorage.getItem("zanbim_target") || "Target Belum Diatur";
    setTargetName(savedTarget);

    if (raw) {
      try {
        setReportData(JSON.parse(raw));
      } catch (e) {
        console.error("Failed to parse report data:", e);
      }
    }
  }, []);

  if (!reportData) {
    return (
      <div className="max-w-2xl mx-auto py-16 text-center flex flex-col items-center gap-4">
        <AlertTriangle className="w-12 h-12 text-amber-400 animate-bounce" />
        <h2 className="text-xl font-extrabold text-white">Belum Ada Data Hasil Diagnosis</h2>
        <p className="text-sm text-zinc-400">Silakan ikuti tes diagnosis terlebih dahulu untuk melihat hasil analisis.</p>
        <button
          onClick={() => router.push("/diagnosis")}
          className="mt-2 px-6 py-3 rounded-xl bg-indigo-600 text-white font-bold text-sm shadow-glow hover:opacity-90"
        >
          Mulai Tes Diagnosis Sekarang
        </button>
      </div>
    );
  }

  const { track, utbkIndex, cpnsResult, iqResult, dewanResult, dosenResult, topGaps, itemAnalysis } = reportData;

  const toggleAccordion = (idx: number) => {
    setOpenItemIndex(openItemIndex === idx ? null : idx);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 flex flex-col gap-8">
      {/* Target Banner */}
      <div className="glass-panel p-6 rounded-2xl border border-indigo-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 bg-gradient-to-r from-indigo-950/40 via-purple-950/20 to-zinc-900/60 shadow-glow">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400 font-bold text-xl">
            🎯
          </div>
          <div>
            <span className="text-xs text-indigo-300 font-semibold uppercase tracking-wider">
              Laporan Posisi vs Target ({track})
            </span>
            <h2 className="text-xl font-extrabold text-white">{targetName}</h2>
          </div>
        </div>
        <button
          onClick={() => router.push("/onboarding")}
          className="text-xs text-zinc-400 hover:text-white underline"
        >
          Ubah Target
        </button>
      </div>

      {/* TRACK 1: UTBK REPORT */}
      {track === "UTBK" && (
        <div className="glass-panel p-8 rounded-3xl border border-zinc-800 text-center flex flex-col items-center gap-3 relative overflow-hidden">
          <div className="absolute -right-12 -top-12 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl" />
          <span className="text-xs text-zinc-400 font-medium">Estimasi Indeks Kemampuan UTBK</span>
          <div className="text-5xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-400 font-mono tracking-tight">
            {utbkIndex} <span className="text-xl text-zinc-500 font-normal">/ 800</span>
          </div>
          <p className="text-xs text-zinc-400 max-w-md">
            Skor dihitung berdasarkan pembobotan tingkat kesulitan soal (Diff 1: 1.0, Diff 2: 1.25, Diff 3: 1.6).
          </p>
        </div>
      )}

      {/* TRACK 2: CPNS REPORT */}
      {track === "CPNS" && cpnsResult && (
        <div className="flex flex-col gap-6">
          {!cpnsResult.isPassedAllThresholds && (
            <div className="p-5 rounded-2xl bg-rose-950/50 border border-rose-500/60 flex items-start gap-4 text-rose-200 animate-pulse">
              <AlertTriangle className="w-6 h-6 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-extrabold text-white text-sm">Peringatan Syarat Passing Grade CPNS!</h4>
                <p className="text-xs text-rose-300 mt-1">
                  Subtest <strong>{cpnsResult.belowThreshold.join(", ")}</strong> berada di bawah nilai ambang batas minimal. Kelulusan CPNS gugur jika salah satu subtest tidak mencapai passing grade.
                </p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center">
            <div className="glass-panel p-5 rounded-2xl border border-zinc-800">
              <span className="text-xs text-zinc-400">TWK (Min 65)</span>
              <div className={`text-2xl font-black mt-1 font-mono ${cpnsResult.twk < 65 ? "text-rose-400" : "text-emerald-400"}`}>
                {cpnsResult.twk}
              </div>
            </div>
            <div className="glass-panel p-5 rounded-2xl border border-zinc-800">
              <span className="text-xs text-zinc-400">TIU (Min 80)</span>
              <div className={`text-2xl font-black mt-1 font-mono ${cpnsResult.tiu < 80 ? "text-rose-400" : "text-emerald-400"}`}>
                {cpnsResult.tiu}
              </div>
            </div>
            <div className="glass-panel p-5 rounded-2xl border border-zinc-800">
              <span className="text-xs text-zinc-400">TKP (Min 166)</span>
              <div className={`text-2xl font-black mt-1 font-mono ${cpnsResult.tkp < 166 ? "text-rose-400" : "text-emerald-400"}`}>
                {cpnsResult.tkp}
              </div>
            </div>
            <div className="glass-panel p-5 rounded-2xl border border-indigo-500/40 bg-indigo-950/20">
              <span className="text-xs text-indigo-300 font-bold">Total SKD</span>
              <div className="text-2xl font-black mt-1 font-mono text-white">
                {cpnsResult.total}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TRACK 3: REKRUTMEN HRD REPORT */}
      {track === "REKRUTMEN" && iqResult && (
        <div className="glass-panel p-8 rounded-3xl border border-emerald-500/40 text-center flex flex-col items-center gap-3 bg-gradient-to-br from-emerald-950/30 via-zinc-900 to-zinc-950 shadow-glow">
          <Briefcase className="w-10 h-10 text-emerald-400 mb-1" />
          <span className="text-xs text-emerald-300 font-semibold uppercase tracking-wider">Hasil Asesmen Rekrutmen Karyawan HRD</span>
          <div className="text-5xl sm:text-6xl font-black text-emerald-400 font-mono tracking-tight">
            IQ {iqResult.iqScore} <span className="text-xl text-zinc-500 font-normal">/ 150</span>
          </div>
          <div className="px-4 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold mt-1">
            Kategori: {iqResult.category}
          </div>
          <p className="text-xs text-zinc-400 max-w-md mt-2">
            Hasil pengujian ini diukur berdasar Matriks Raven Spasial, Logika Numerik, & Psikotes Kepemimpinan HRD Standar Perusahaan Top-Tier.
          </p>
        </div>
      )}

      {/* TRACK 4: DEWAN RI REPORT */}
      {track === "DEWAN_RI" && dewanResult && (
        <div className="glass-panel p-8 rounded-3xl border border-amber-500/40 text-center flex flex-col items-center gap-3 bg-gradient-to-br from-amber-950/30 via-zinc-900 to-zinc-950 shadow-glow">
          <Landmark className="w-10 h-10 text-amber-400 mb-1" />
          <span className="text-xs text-amber-300 font-semibold uppercase tracking-wider">Hasil Uji Fit & Proper Test DPR RI</span>
          <div className="text-5xl sm:text-6xl font-black text-amber-400 font-mono tracking-tight">
            {dewanResult.percentage}% <span className="text-xl text-zinc-500 font-normal">Skor Kelayakan</span>
          </div>
          <div className="px-4 py-1.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold mt-1 flex items-center gap-1.5">
            <Award className="w-4 h-4 text-amber-400" />
            Status: {dewanResult.status}
          </div>
          <p className="text-xs text-zinc-400 max-w-md mt-2">
            Mengukur kesiapan fungsi Legislasi, Penganggaran APBN, & Wawasan Regulasi Komisi DPR RI pilihan Anda.
          </p>
        </div>
      )}

      {/* TRACK 5: DOSEN REPORT */}
      {track === "DOSEN" && dosenResult && (
        <div className="glass-panel p-8 rounded-3xl border border-purple-500/40 text-center flex flex-col items-center gap-3 bg-gradient-to-br from-purple-950/30 via-zinc-900 to-zinc-950 shadow-glow">
          <GraduationCap className="w-10 h-10 text-purple-400 mb-1" />
          <span className="text-xs text-purple-300 font-semibold uppercase tracking-wider">Hasil Seleksi & Asesmen Dosen PTN/PTS</span>
          <div className="text-5xl sm:text-6xl font-black text-purple-400 font-mono tracking-tight">
            {dosenResult.percentage}% <span className="text-xl text-zinc-500 font-normal">Indeks Kualifikasi</span>
          </div>
          <div className="px-4 py-1.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40 text-xs font-bold mt-1 flex items-center gap-1.5">
            <Award className="w-4 h-4 text-purple-400" />
            Status: {dosenResult.status}
          </div>
          <p className="text-xs text-zinc-400 max-w-md mt-2">
            Rekomendasi Tim Asesor: <strong>{dosenResult.recommendation}</strong>
          </p>
        </div>
      )}

      {/* Top 3 Skill Gaps */}
      <div className="glass-panel p-6 rounded-2xl border border-zinc-800 flex flex-col gap-4">
        <h3 className="font-extrabold text-white text-base flex items-center gap-2">
          <Target className="w-4 h-4 text-indigo-400" />
          3 Top Gaps (Prioritas Latihan Teratas)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {topGaps.map((gapItem: any, idx: number) => (
            <div key={gapItem.skillCode} className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 flex flex-col justify-between gap-3">
              <div>
                <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider">Gap #{idx + 1}</span>
                <h4 className="font-bold text-white text-sm mt-0.5">{gapItem.skillCode}</h4>
                <span className="text-xs text-zinc-400">Subtest: {gapItem.subtest}</span>
              </div>

              <div className="flex items-center justify-between text-xs font-mono pt-2 border-t border-zinc-800/80">
                <span className="text-zinc-500">Akurasi: {Math.round(gapItem.accuracy * 100)}%</span>
                <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-bold">
                  Priority {(gapItem.priority).toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => router.push("/drill")}
          className="w-full mt-2 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 text-white font-bold text-sm shadow-glow hover:opacity-90 flex items-center justify-center gap-2"
        >
          Mulai Misi Drill Terfokus untuk Menutup Gap
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Item-by-Item Answer Analysis Accordion */}
      {itemAnalysis && itemAnalysis.length > 0 && (
        <div className="glass-panel p-6 rounded-2xl border border-zinc-800 flex flex-col gap-4">
          <h3 className="font-extrabold text-white text-base flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-cyan-400" />
            Rincian Analisis Jawaban Per Nomor
          </h3>

          <div className="flex flex-col gap-3">
            {itemAnalysis.map((item: any, idx: number) => (
              <div key={item.id} className="border border-zinc-800 rounded-xl overflow-hidden bg-zinc-900/50">
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full p-4 flex items-center justify-between text-left hover:bg-zinc-800/50 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center font-mono ${
                      item.isCorrect ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40" : "bg-rose-500/20 text-rose-300 border border-rose-500/40"
                    }`}>
                      #{idx + 1}
                    </span>
                    <div>
                      <span className="text-xs text-zinc-400 line-clamp-1">{item.stem}</span>
                      <div className="flex items-center gap-2 mt-0.5 text-[11px]">
                        <span className="text-zinc-300 font-semibold">Pilihan Lo: Option {item.userSelected}</span>
                        <span className="text-zinc-500">•</span>
                        <span className={item.isCorrect ? "text-emerald-400 font-bold" : "text-rose-400 font-bold"}>
                          {item.isCorrect ? "Benar" : "Salah"} (Skor: {item.scoreGained})
                        </span>
                      </div>
                    </div>
                  </div>
                  {openItemIndex === idx ? <ChevronUp className="w-4 h-4 text-zinc-400" /> : <ChevronDown className="w-4 h-4 text-zinc-400" />}
                </button>

                {openItemIndex === idx && (
                  <div className="p-4 border-t border-zinc-800 bg-zinc-950/80 text-xs flex flex-col gap-3">
                    {/* Concept */}
                    <div>
                      <span className="font-bold text-indigo-400 block mb-1">💡 Konsep Utama:</span>
                      <p className="text-zinc-300 leading-relaxed bg-zinc-900 p-2.5 rounded-lg border border-zinc-800">{item.concept}</p>
                    </div>

                    {/* Solution Steps */}
                    {item.steps && item.steps.length > 0 && (
                      <div>
                        <span className="font-bold text-cyan-400 block mb-1">📝 Langkah Cara Penyelesaian:</span>
                        <ol className="list-decimal list-inside space-y-1 text-zinc-300 bg-zinc-900 p-2.5 rounded-lg border border-zinc-800">
                          {item.steps.map((step: string, sIdx: number) => (
                            <li key={sIdx}>{step}</li>
                          ))}
                        </ol>
                      </div>
                    )}

                    {/* Trap Explanation */}
                    {item.trapExplanation && (
                      <div>
                        <span className="font-bold text-amber-400 block mb-1">⚠️ Penjelasan Jebakan Opsi {item.userSelected}:</span>
                        <p className="text-amber-200/90 leading-relaxed bg-amber-950/30 p-2.5 rounded-lg border border-amber-500/30">{item.trapExplanation}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function ReportPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-zinc-400">Memuat Laporan Diagnosis...</div>}>
      <ReportContent />
    </Suspense>
  );
}
