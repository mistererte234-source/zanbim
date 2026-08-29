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
    <div className="w-full bg-[#09090B] py-2 px-3 sm:px-4 flex flex-col items-center justify-center gap-1.5 z-40 border-b border-zinc-800/40">
      
      {/* Card 1: Tanggal Jawa, Hijriah, Masehi & Live Digital Clock */}
      <div className="w-full max-w-2xl bg-[#0D0E12] border border-zinc-800/90 rounded-2xl py-2 px-3 sm:px-6 flex flex-col items-center justify-center shadow-md">
        <span className="text-[11px] sm:text-xs font-bold text-white tracking-wide font-sans text-center truncate w-full">
          {jawa.fullHeaderStr}
        </span>
        <span className="text-base sm:text-xl font-black text-white font-mono tracking-widest mt-0.5">
          {liveTime}
        </span>
      </div>

      {/* Card 2: Prayer Countdown Pill with Green Border (Exactly as in reference image) */}
      <div className="w-full max-w-2xl bg-[#0D0E12]/90 border border-emerald-500/70 rounded-xl py-1.5 px-4 flex items-center justify-center text-center font-mono text-[11px] sm:text-xs text-white shadow-[0_0_15px_-3px_rgba(16,185,129,0.15)]">
        <span>
          {sholat.city} – <strong className="text-emerald-400 font-bold">{sholat.nextPrayerName}</strong> dalam <span className="text-white font-bold">{sholat.countdownStr}</span> lagi
        </span>
      </div>

    </div>
  );
}
