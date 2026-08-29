"use client";

import { useState, useEffect } from "react";
import { Calendar, Clock, Moon, ChevronDown, ChevronUp } from "lucide-react";
import { getJawaDate, JawaDateInfo } from "@/lib/jawa-calendar";
import { getJadwalSholat, JadwalSholatInfo } from "@/lib/jadwal-sholat";

export function SignatureBar() {
  const [jawa, setJawa] = useState<JawaDateInfo | null>(null);
  const [sholat, setSholat] = useState<JadwalSholatInfo | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setJawa(getJawaDate());
    setSholat(getJadwalSholat());

    const interval = setInterval(() => {
      setSholat(getJadwalSholat());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  if (!jawa || !sholat) return null;

  return (
    <div className="w-full bg-zinc-950/90 border-b border-zinc-800/80 text-xs py-1.5 px-3 sm:px-4 backdrop-blur-md relative z-40">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 text-zinc-300">
        
        {/* Tanggal Jawa & Hijriah (Mobile optimized) */}
        <div className="flex items-center gap-1.5 font-medium truncate">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
          <Calendar className="w-3.5 h-3.5 text-indigo-400 shrink-0 hidden xs:inline" />
          <span className="font-bold text-white text-[11px] sm:text-xs truncate">{jawa.weton}</span>
          <span className="text-zinc-500">•</span>
          <span className="text-zinc-300 font-mono text-[10px] sm:text-[11px] truncate">{jawa.hijriStr}</span>
          <span className="text-zinc-500 hidden md:inline">•</span>
          <span className="text-zinc-400 text-[11px] hidden md:inline">({jawa.gregorianStr} M)</span>
        </div>

        {/* Jadwal Sholat Badge with Dropdown Modal */}
        <div className="relative shrink-0">
          <button
            onClick={() => setShowModal(!showModal)}
            className="flex items-center gap-1.5 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-800/80 transition-all font-mono text-[10px] sm:text-[11px] text-zinc-200"
          >
            <Moon className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Sholat: </span>
            <strong className="text-white">{sholat.nextPrayerName} {sholat.nextPrayerTime}</strong>
            <span className="px-1 py-0.2 rounded bg-amber-500/20 text-amber-300 font-semibold text-[9px] sm:text-[10px]">
              {sholat.remainingTimeStr}
            </span>
            {showModal ? <ChevronUp className="w-3 h-3 text-zinc-400" /> : <ChevronDown className="w-3 h-3 text-zinc-400" />}
          </button>

          {/* Jadwal Sholat Dropdown Modal */}
          {showModal && (
            <div className="absolute right-0 top-8 z-50 w-64 max-w-[calc(100vw-2rem)] glass-panel p-4 rounded-2xl border border-zinc-800 shadow-glow flex flex-col gap-3">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                <span className="font-bold text-white text-xs flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-indigo-400" /> Jadwal Sholat (WIB)
                </span>
                <span className="text-[10px] text-zinc-500">Jakarta & Sekitarnya</span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                {[
                  { name: "Subuh", time: sholat.subuh },
                  { name: "Terbit", time: sholat.terbit },
                  { name: "Dzuhur", time: sholat.dzuhur },
                  { name: "Ashar", time: sholat.ashar },
                  { name: "Maghrib", time: sholat.maghrib },
                  { name: "Isya", time: sholat.isya },
                ].map((item) => (
                  <div
                    key={item.name}
                    className={`p-2 rounded-lg border flex justify-between items-center ${
                      sholat.nextPrayerName.startsWith(item.name)
                        ? "bg-amber-500/20 border-amber-500/40 text-amber-300 font-bold"
                        : "bg-zinc-900/60 border-zinc-800 text-zinc-300"
                    }`}
                  >
                    <span>{item.name}</span>
                    <span>{item.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
