import Link from "next/link";
import { Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t border-border/40 bg-zinc-950/80 backdrop-blur-md py-6 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-indigo-600/30 flex items-center justify-center border border-indigo-500/40 shrink-0">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          </div>
          <span className="text-xs sm:text-sm font-semibold text-zinc-300">ZanBimbel v3</span>
          <span className="text-[11px] sm:text-xs text-zinc-500">• Enterprise Adaptive Learning AI</span>
        </div>

        {/* Mandatory ZanDev Watermark Link */}
        <div className="flex items-center gap-1.5 text-xs text-zinc-400">
          <span>Crafted with precision by</span>
          <a
            href="https://zandev.id"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-indigo-400 hover:text-indigo-300 hover:underline transition-colors flex items-center gap-1"
          >
            ZanDev
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
          </a>
        </div>

      </div>
    </footer>
  );
}
