"use client";

import { useState, useEffect } from "react";
import { Moon, Clock } from "lucide-react";
import { getJadwalSholat, JadwalSholatInfo } from "@/lib/jadwal-sholat";

export function PrayerTimesBottomWidget() {
  const [sholat, setSholat] = useState<JadwalSholatInfo | null>(null);

  useEffect(() => {
    setSholat(getJadwalSholat());
    const interval = setInterval(() => {
      setSholat(getJadwalSholat());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  if (!sholat) return null;

  const prayerList = [
    { name: "Subuh", time: sholat.subuh },
    { name: "Terbit", time: sholat.terbit },
    { name: "Dzuhur", time: sholat.dzuhur },
    { name: "Ashar", time: sholat.ashar },
    { name: "Maghrib", time: sholat.maghrib },
    { name: "Isya", time: sholat.isya },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 mb-6">
      <div className="glass-panel p-3.5 sm:p-4 rounded-2xl border border-zinc-800/80 shadow-sm flex flex-col md:flex-row items-center justify-between gap-3">
        
        {/* Left Status & Countdown */}
        <div className="flex items-center gap-2.5 shrink-0 text-center sm:text-left">
          <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
            <Moon className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 justify-center sm:justify-start">
              <span className="text-xs font-bold text-white">Jadwal Sholat (WIB)</span>
              <span className="text-[10px] text-zinc-500">• Jakarta & Sekitarnya</span>
            </div>
            <p className="text-[11px] text-zinc-400 mt-0.5">
              Mendatang: <strong className="text-amber-300">{sholat.nextPrayerName} ({sholat.nextPrayerTime})</strong> — <span className="text-zinc-300 font-mono font-semibold">{sholat.remainingTimeStr} lagi</span>
            </p>
          </div>
        </div>

        {/* 6 Prayer Pills Grid / Row (Fully Responsive) */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5 w-full md:w-auto font-mono text-[11px]">
          {prayerList.map((item) => {
            const isNext = sholat.nextPrayerName.startsWith(item.name);
            return (
              <div
                key={item.name}
                className={`py-1 px-2 rounded-xl border flex flex-col items-center justify-center transition-all ${
                  isNext
                    ? "bg-amber-500/20 border-amber-500/50 text-amber-300 font-bold shadow-glow-amber scale-105"
                    : "bg-zinc-900/60 border-zinc-800 text-zinc-300"
                }`}
              >
                <span className="text-[10px] text-zinc-400">{item.name}</span>
                <span className="font-semibold text-white">{item.time}</span>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
