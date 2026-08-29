"use client";

import { useState, useEffect } from "react";
import { getJawaDate, JawaDateInfo } from "@/lib/jawa-calendar";
import { getJadwalSholatLive, JadwalSholatDetail } from "@/lib/jadwal-sholat";

export function SignatureBar() {
  const [jawa, setJawa] = useState<JawaDateInfo | null>(null);
  const [sholat, setSholat] = useState<JadwalSholatDetail | null>(null);
  const [liveTime, setLiveTime] = useState<string>("09:44:01 WIB");

  useEffect(() => {
    const updateTick = () => {
      const now = new Date();
      setJawa(getJawaDate(now));
      setSholat(getJadwalSholatLive(now, "Surabaya"));

      const pad = (n: number) => n.toString().padStart(2, "0");
      setLiveTime(`${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())} WIB`);
    };

    updateTick();
    const interval = setInterval(updateTick, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!jawa || !sholat) return null;

  return (
    <div className="w-full py-2 px-3 sm:px-4 flex flex-col items-center justify-center gap-1.5 z-40 border-b border-white/5 bg-black/30 backdrop-blur-xl">
      
      {/* Card 1: Tanggal Jawa, Hijriah, Masehi & Live Digital Clock (Frosted Glass) */}
      <div className="w-full max-w-2xl glass-panel rounded-2xl py-2 px-3 sm:px-6 flex flex-col items-center justify-center shadow-lg border border-white/10">
        <span className="text-[11px] sm:text-xs font-bold text-white tracking-wide font-sans text-center truncate w-full">
          {jawa.fullHeaderStr}
        </span>
        <span className="text-base sm:text-xl font-black text-white font-mono tracking-widest mt-0.5">
          {liveTime}
        </span>
      </div>

      {/* Card 2: Prayer Countdown Pill with Neon Green Border & Glow */}
      <div className="w-full max-w-2xl bg-zinc-950/70 border border-emerald-500/70 backdrop-blur-xl rounded-xl py-1.5 px-4 flex items-center justify-center text-center font-mono text-[11px] sm:text-xs text-white shadow-[0_0_20px_-3px_rgba(16,185,129,0.25)]">
        <span>
          {sholat.city} – <strong className="text-emerald-400 font-bold">{sholat.nextPrayerName}</strong> dalam <span className="text-white font-bold">{sholat.countdownStr}</span> lagi
        </span>
      </div>

    </div>
  );
}
