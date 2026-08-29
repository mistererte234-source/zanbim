"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowRight, RefreshCw, Crown, Sparkles } from "lucide-react";

function DrillContent() {
  const searchParams = useSearchParams();
  const track = searchParams.get("track") || "UTBK";
  const skillCode = searchParams.get("skill");

  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState<"cara" | "jebakan" | "variant">("cara");
  const [errorTag, setErrorTag] = useState<string | null>(null);
  const [isPro, setIsPro] = useState(false);

  useEffect(() => {
    setIsPro(localStorage.getItem("zanbim_pro") === "true");

    async function fetchMissionItems() {
      setLoading(true);
      try {
        let url = `/api/mission?track=${track}`;
        if (skillCode) url += `&skill=${skillCode}`;
        const res = await fetch(url);
        const data = await res.json();
        if (data.items) {
          setItems(data.items);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchMissionItems();
  }, [track, skillCode]);

  const currentItem = items[currentIndex];

  const handleChoiceSelect = (key: string) => {
    if (submitted) return;
    setSelectedChoice(key);
  };

  const handleSubmitAnswer = () => {
    if (!selectedChoice) return;
    setSubmitted(true);
    setActiveTab("cara");
  };

  const handleNextItem = () => {
    setSelectedChoice(null);
    setSubmitted(false);
    setErrorTag(null);
    setActiveTab("cara");
    setCurrentIndex((prev) => Math.min(items.length - 1, prev + 1));
  };

  if (loading) {
    return (
      <div className="max-w-md mx-auto py-24 text-center flex flex-col items-center gap-3">
        <RefreshCw className="w-8 h-8 text-indigo-400 animate-spin" />
        <p className="text-xs text-zinc-400">Memuat Misi Latihan...</p>
      </div>
    );
  }

  if (!currentItem) {
    return (
      <div className="max-w-md mx-auto py-16 text-center flex flex-col items-center gap-4">
        <p className="text-sm text-zinc-400">Belum ada item latihan untuk skill ini.</p>
      </div>
    );
  }

  const isMCQ = currentItem.item_type === "mcq";
  const isCorrect = isMCQ ? selectedChoice === currentItem.answer : (currentItem.tkp_key?.[selectedChoice || ""] || 0) >= 4;

  return (
    <div className="max-w-4xl mx-auto py-4 px-2 flex flex-col gap-6">
      
      {/* Header Info */}
      <div className="glass-panel p-4 rounded-2xl border border-zinc-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono font-bold text-indigo-400 bg-indigo-500/10 border border-indigo-500/30 px-3 py-1 rounded-lg">
            Misi {currentIndex + 1} / {items.length}
          </span>
          <span className="text-xs text-zinc-400 font-medium hidden sm:inline-block">
            Skill: <strong className="text-white font-mono">{currentItem.skill}</strong>
          </span>
        </div>

        <span className="text-xs text-zinc-500 font-mono">
          Difficulty: {currentItem.difficulty}
        </span>
      </div>

      {/* Question Card */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-zinc-800 flex flex-col gap-6">
        
        <p className="text-base sm:text-lg font-medium text-white whitespace-pre-line leading-relaxed">
          {currentItem.stem}
        </p>

        {/* Options (A-E) */}
        <div className="flex flex-col gap-3">
          {(["A", "B", "C", "D", "E"] as const).map((key) => {
            const optionText = currentItem.options[key];
            if (!optionText) return null;

            const isSelected = selectedChoice === key;
            const isRightAnswer = isMCQ && currentItem.answer === key;

            let borderStyle = "border-zinc-800 text-zinc-300 hover:border-zinc-700";
            if (submitted) {
              if (isMCQ && isRightAnswer) {
                borderStyle = "bg-emerald-950/60 border-emerald-500 text-white font-bold";
              } else if (isSelected && !isCorrect) {
                borderStyle = "bg-rose-950/60 border-rose-500 text-white";
              } else if (isSelected) {
                borderStyle = "bg-indigo-950/60 border-indigo-500 text-white";
              }
            } else if (isSelected) {
              borderStyle = "bg-indigo-950/60 border-indigo-500 text-white shadow-glow";
            }

            return (
              <button
                key={key}
                disabled={submitted}
                onClick={() => handleChoiceSelect(key)}
                className={`w-full p-4 rounded-xl border text-left transition-all flex items-start gap-3 ${borderStyle}`}
              >
                <span className="w-7 h-7 rounded-lg bg-zinc-800 text-zinc-400 flex items-center justify-center font-mono font-bold text-xs shrink-0">
                  {key}
                </span>
                <span className="text-sm font-normal pt-0.5 leading-relaxed">{optionText}</span>
                {submitted && isMCQ && (
                  <span className="ml-auto font-mono text-xs text-zinc-400 shrink-0">
                    {currentItem.solution?.traps?.[key] ? "⚠️ Jebakan" : isRightAnswer ? "✅ Kunci" : ""}
                  </span>
                )}
                {submitted && !isMCQ && (
                  <span className="ml-auto font-mono text-xs font-bold text-cyan-400 shrink-0">
                    Skor: {currentItem.tkp_key?.[key]}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Submit Answer Button */}
        {!submitted && (
          <button
            onClick={handleSubmitAnswer}
            disabled={!selectedChoice}
            className="w-full py-3.5 rounded-xl bg-indigo-600 text-white font-bold text-sm shadow-glow disabled:opacity-40 hover:bg-indigo-500 transition-all"
          >
            Submit Jawaban
          </button>
        )}

      </div>

      {/* Post-Answer Section: Tabs */}
      {submitted && (
        <div className="glass-panel p-6 rounded-3xl border border-indigo-500/30 flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
          
          <div className="flex border-b border-zinc-800 pb-3 gap-2">
            <button
              onClick={() => setActiveTab("cara")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === "cara" ? "bg-indigo-600 text-white shadow-glow" : "text-zinc-400 hover:text-white"
              }`}
            >
              📖 Cara / Langkah
            </button>
            <button
              onClick={() => setActiveTab("jebakan")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === "jebakan" ? "bg-indigo-600 text-white shadow-glow" : "text-zinc-400 hover:text-white"
              }`}
            >
              ⚠️ Jebakan Jawaban
            </button>
            <button
              onClick={() => setActiveTab("variant")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                activeTab === "variant" ? "bg-indigo-600 text-white shadow-glow" : "text-zinc-400 hover:text-white"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Coba Lagi (Varian Isomorf)
            </button>
          </div>

          {activeTab === "cara" && (
            <div className="flex flex-col gap-4">
              <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-500/20 text-xs text-indigo-200">
                <strong>Konsep Utama:</strong> {currentItem.solution?.concept}
              </div>
              <ol className="list-decimal list-inside space-y-2 text-xs text-zinc-300">
                {currentItem.solution?.steps?.map((step: string, idx: number) => (
                  <li key={idx} className="leading-relaxed">{step}</li>
                ))}
              </ol>
            </div>
          )}

          {activeTab === "jebakan" && (
            <div className="flex flex-col gap-3">
              {Object.entries(currentItem.solution?.traps || {}).map(([key, trapText]: any) => (
                <div key={key} className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 text-xs flex items-start gap-2">
                  <span className="font-mono font-bold text-rose-400">Opsi {key}:</span>
                  <span className="text-zinc-300 leading-relaxed">{trapText}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === "variant" && (
            <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 flex flex-col gap-3 text-xs text-zinc-300">
              {isPro ? (
                <div className="flex flex-col gap-2">
                  <span className="font-bold text-amber-400 flex items-center gap-1.5">
                    <Crown className="w-4 h-4 text-amber-400" /> Varian Isomorfik Type A (Angka Mutasi)
                  </span>
                  <p className="text-zinc-400">
                    Varian isomorfik siap dikerjakan untuk membuktikan pemahaman konsep tanpa menghafal 1 soal.
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-2 text-center py-2">
                  <span className="font-bold text-white">Varian Isomorfik Terkunci (Khusus Pro)</span>
                  <p className="text-zinc-400">Upgrade ke Pro untuk mencoba 2 varian angka mutasi tiap kali salah.</p>
                </div>
              )}
            </div>
          )}

          {!isCorrect && (
            <div className="flex flex-col gap-2 border-t border-zinc-800 pt-4">
              <span className="text-[11px] text-zinc-400 font-semibold">Tandai penyebab kesalahan kamu:</span>
              <div className="flex flex-wrap gap-2">
                {["konsep", "hitung", "salah_baca", "waktu"].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setErrorTag(tag)}
                    className={`px-3 py-1 rounded-lg text-xs font-mono border transition-all ${
                      errorTag === tag
                        ? "bg-rose-500/20 text-rose-300 border-rose-500/40"
                        : "bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white"
                    }`}
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={handleNextItem}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-bold text-xs shadow-glow hover:opacity-95 transition-all flex items-center justify-center gap-2 mt-2"
          >
            Lanjut ke Soal Berikutnya
            <ArrowRight className="w-4 h-4" />
          </button>

        </div>
      )}

    </div>
  );
}

export default function DrillPage() {
  return (
    <Suspense fallback={
      <div className="max-w-md mx-auto py-24 text-center flex flex-col items-center gap-3">
        <RefreshCw className="w-8 h-8 text-indigo-400 animate-spin" />
        <p className="text-xs text-zinc-400">Memuat Drill...</p>
      </div>
    }>
      <DrillContent />
    </Suspense>
  );
}
