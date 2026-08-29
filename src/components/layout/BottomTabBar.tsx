"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Compass, Target, BookOpen, Sparkles, UserCheck } from "lucide-react";

export function BottomTabBar() {
  const pathname = usePathname();

  const tabs = [
    { href: "/dashboard", label: "Home", icon: Compass },
    { href: "/diagnosis", label: "Diagnosis", icon: Target },
    { href: "/drill", label: "Drill", icon: BookOpen },
    { href: "/tryout", label: "Tryout", icon: Sparkles },
    { href: "/onboarding", label: "Target", icon: UserCheck },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-zinc-950/85 backdrop-blur-2xl border-t border-zinc-800/80 px-2 pb-safe pt-2">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive =
            tab.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(tab.href);

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition-all duration-200 ${
                isActive
                  ? "text-indigo-400 font-bold scale-105"
                  : "text-zinc-400 hover:text-zinc-200 font-medium"
              }`}
            >
              <div
                className={`p-1.5 rounded-xl transition-all ${
                  isActive ? "bg-indigo-500/20 shadow-glow" : "bg-transparent"
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? "text-indigo-400 stroke-[2.5]" : "text-zinc-400 stroke-[1.75]"}`} />
              </div>
              <span className="text-[10px] mt-0.5 tracking-tight font-sans">{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
