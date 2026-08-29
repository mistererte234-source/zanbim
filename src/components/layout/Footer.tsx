import Link from "next/link";
import { Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t border-white/10 bg-[#070709]/80 backdrop-blur-xl py-6 pb-28 sm:pb-8 mt-auto relative z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        
        {/* Brand info */}
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-indigo-600/30 flex items-center justify-center border border-indigo-500/40 shrink-0">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          </div>
          <span className="text-xs sm:text-sm font-bold text-white tracking-tight">ZanBimbel v3</span>
          <span className="text-[11px] sm:text-xs text-zinc-500">• Enterprise Adaptive Learning AI</span>
        </div>

        {/* Mandatory Clickable ZanDev Watermark Link */}
        <div className="flex items-center gap-1.5 text-xs text-zinc-400">
          <span>Crafted with precision by</span>
          <a
            href="https://zandev.id"
            target="_blank"
            rel="noopener noreferrer"
            className="font-extrabold text-indigo-400 hover:text-cyan-300 hover:underline transition-colors flex items-center gap-1 bg-indigo-500/10 px-2.5 py-1 rounded-full border border-indigo-500/30 shadow-sm"
          >
            zandev.id
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
          </a>
        </div>

      </div>
    </footer>
  );
}
