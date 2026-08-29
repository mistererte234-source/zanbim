"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Timer, Flag, ArrowRight, ArrowLeft, Sparkles, RefreshCw } from "lucide-react";

function DiagnosisContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const track = searchParams.get("track") || "UTBK";

  const [started, setStarted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, { choice: string; timeMs: number }>>({});
  const [flags, setFlags] = useState<Record<string, boolean>>({});
  const [timeLeft, setTimeLeft] = useState(35 * 60);

  useEffect(() => {
    async function fetchItems() {
      setLoading(true);
      try {
        const res = await fetch(`/api/diagnosis?track=${track}`);
        const data = await res.json();
        if (data.items) {
          setItems(data.items);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchItems();
  }, [track]);

  useEffect(() => {
    let timer: any;
    if (started && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [started, timeLeft]);

  const handleChoiceSelect = (choice: string) => {
    const item = items[currentIndex];
    if (!item) return;

    setAnswers((prev) => ({
      ...prev,
      [item.id]: { choice, timeMs: 30000 },
    }));
  };

  const toggleFlag = () => {
    const item = items[currentIndex];
    if (!item) return;
    setFlags((prev) => ({ ...prev, [item.id]: !prev[item.id] }));
  };

  const handleSubmitDiagnosis = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/diagnosis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          track,
          answers,
          target: localStorage.getItem("zanbim_target"),
        }),
      });
      const data = await res.json();
      localStorage.setItem("zanbim_diagnosis_result", JSON.stringify(data));
      router.push(`/report?track=${track}`);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  // Brief Screen
  if (!started) {
    return (
      <div className="max-w-xl mx-auto py-12 px-4 flex flex-col gap-6">
        <div className="glass-panel p-8 rounded-3xl border border-indigo-500/30 flex flex-col gap-6 text-center shadow-glow">
          <div className="w-16 h-16 rounded-2xl bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30 mx-auto">
            <Sparkles className="w-8 h-8 text-indigo-400" />
          </div>

          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-extrabold text-white">Tes Diagnosis ZanBimbel {track}</h1>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Sesi diagnosis bertujuan mengukur indeks baseline awal dan mendeteksi 3 skill gap terbesar lo saat ini.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 bg-zinc-900/60 p-4 rounded-2xl border border-zinc-800 text-left text-xs">
            <div>
              <span className="text-zinc-500 block font-semibold">Durasi</span>
              <span className="text-white font-bold text-sm">35 - 40 Menit</span>
            </div>
            <div>
              <span className="text-zinc-500 block font-semibold">Soal</span>
              <span className="text-white font-bold text-sm">{items.length} Items</span>
            </div>
            <div>
              <span className="text-zinc-500 block font-semibold">Kunci</span>
              <span className="text-amber-400 font-bold text-sm">Disimpan di Akhir</span>
            </div>
          </div>

          <button
            onClick={() => setStarted(true)}
            disabled={loading || items.length === 0}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-bold text-base shadow-glow hover:opacity-95 transition-all flex items-center justify-center gap-2"
          >
            {loading ? <RefreshCw className="w-5 h-5 animate-spin" /> : "Mulai Tes Diagnosis"}
          </button>
        </div>
      </div>
    );
  }

  const currentItem = items[currentIndex];
  if (!currentItem) return null;

  const currentAnswer = answers[currentItem.id]?.choice;
  const isFlagged = flags[currentItem.id];

  return (
    <div className="max-w-4xl mx-auto py-4 px-2 flex flex-col gap-6">
      
      {/* Top Header */}
      <div className="glass-panel p-4 rounded-2xl border border-zinc-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono font-bold text-indigo-400 bg-indigo-500/10 border border-indigo-500/30 px-3 py-1 rounded-lg">
            Soal {currentIndex + 1} / {items.length}
          </span>
          <span className="text-xs text-zinc-400 font-medium hidden sm:inline-block">
            Subtes: <strong className="text-white">{currentItem.subtest}</strong>
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-amber-400 font-mono font-bold text-sm bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-lg">
            <Timer className="w-4 h-4" />
            {formatTime(timeLeft)}
          </div>

          <button
            onClick={toggleFlag}
            className={`p-2 rounded-lg border transition-all ${
              isFlagged
                ? "bg-rose-500/20 border-rose-500/40 text-rose-400"
                : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white"
            }`}
            title="Ragu-ragu (Flag)"
          >
            <Flag className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-zinc-900 h-1.5 rounded-full overflow-hidden">
        <div
          className="bg-gradient-to-r from-indigo-500 to-cyan-400 h-full transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / items.length) * 100}%` }}
        />
      </div>

      {/* Question Card */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-zinc-800 flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          {currentItem.stimulus && (
            <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 text-xs text-zinc-300 italic whitespace-pre-line leading-relaxed">
              {currentItem.stimulus}
            </div>
          )}
          <p className="text-base sm:text-lg font-medium text-white whitespace-pre-line leading-relaxed">
            {currentItem.stem}
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {(["A", "B", "C", "D", "E"] as const).map((key) => {
            const optionText = currentItem.options[key];
            if (!optionText) return null;

            const isSelected = currentAnswer === key;

            return (
              <button
                key={key}
                onClick={() => handleChoiceSelect(key)}
                className={`w-full p-4 rounded-xl border text-left transition-all flex items-start gap-3 ${
                  isSelected
                    ? "bg-indigo-950/60 border-indigo-500 text-white shadow-glow"
                    : "glass-panel border-zinc-800 text-zinc-300 hover:border-zinc-700 hover:bg-zinc-900/60"
                }`}
              >
                <span
                  className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono font-bold text-xs shrink-0 ${
                    isSelected ? "bg-indigo-600 text-white" : "bg-zinc-800 text-zinc-400"
                  }`}
                >
                  {key}
                </span>
                <span className="text-sm font-normal pt-0.5 leading-relaxed">{optionText}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
          disabled={currentIndex === 0}
          className="px-5 py-2.5 rounded-xl glass-panel text-zinc-400 font-semibold text-xs disabled:opacity-30 hover:text-white transition-all flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Sebelumnya
        </button>

        {currentIndex < items.length - 1 ? (
          <button
            onClick={() => setCurrentIndex((prev) => prev + 1)}
            className="px-6 py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-xs shadow-glow hover:bg-indigo-500 transition-all flex items-center gap-2"
          >
            Berikutnya
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={handleSubmitDiagnosis}
            disabled={loading}
            className="px-8 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-cyan-500 text-white font-bold text-xs shadow-glow hover:opacity-95 transition-all flex items-center gap-2"
          >
            {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : "Selesaikan Tes & Lihat Laporan"}
          </button>
        )}
      </div>

    </div>
  );
}

export default function DiagnosisPage() {
  return (
    <Suspense fallback={
      <div className="max-w-md mx-auto py-24 text-center flex flex-col items-center gap-3">
        <RefreshCw className="w-8 h-8 text-indigo-400 animate-spin" />
        <p className="text-xs text-zinc-400">Memuat Diagnosis...</p>
      </div>
    }>
      <DiagnosisContent />
    </Suspense>
  );
}
