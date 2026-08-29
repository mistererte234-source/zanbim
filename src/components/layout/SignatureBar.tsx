"use client";

import { useState, useEffect } from "react";
import { Calendar } from "lucide-react";
import { getJawaDate, JawaDateInfo } from "@/lib/jawa-calendar";

export function SignatureBar() {
  const [jawa, setJawa] = useState<JawaDateInfo | null>(null);

  useEffect(() => {
    setJawa(getJawaDate());
  }, []);

  if (!jawa) return null;

  return (
    <div className="w-full bg-zinc-950/95 border-b border-zinc-800/60 py-1 px-3 sm:px-4 backdrop-blur-md relative z-40 text-center">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-1.5 text-xs text-zinc-300">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
        <Calendar className="w-3 h-3 text-indigo-400 shrink-0" />
        <span className="font-bold text-white text-[11px] sm:text-xs">{jawa.weton}</span>
        <span className="text-zinc-500">•</span>
        <span className="text-zinc-300 font-mono text-[10px] sm:text-[11px]">{jawa.hijriStr}</span>
        <span className="text-zinc-500 hidden sm:inline">•</span>
        <span className="text-zinc-400 text-[10px] sm:text-[11px] hidden sm:inline">{jawa.gregorianStr} M</span>
      </div>
    </div>
  );
}
