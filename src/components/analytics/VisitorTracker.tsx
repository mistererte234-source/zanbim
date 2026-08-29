"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function VisitorTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // Avoid tracking inside admin dashboard itself to avoid noise
    if (pathname.startsWith("/admin")) return;

    const track = localStorage.getItem("zanbim_track") || "UTBK";
    const target = localStorage.getItem("zanbim_target") || "";

    fetch("/api/analytics/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "visitor_access",
        path: pathname,
        track,
        target,
      }),
    }).catch(() => {});
  }, [pathname]);

  return null;
}
