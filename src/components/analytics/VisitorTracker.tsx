"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export function VisitorTracker() {
  const pathname = usePathname();
  const startTimeRef = useRef<number>(Date.now());

  useEffect(() => {
    // Avoid logging admin routes to keep data clean
    if (pathname.startsWith("/admin")) return;

    const track = localStorage.getItem("zanbim_track") || "UTBK";
    const target = localStorage.getItem("zanbim_target") || "Belum Diatur";

    // Detect visit counts & session ID
    let sessionId = sessionStorage.getItem("zanbim_session_id");
    if (!sessionId) {
      sessionId = `sess_${Math.random().toString(36).substring(2, 9)}_${Date.now()}`;
      sessionStorage.setItem("zanbim_session_id", sessionId);
    }

    const visitCount = Number(localStorage.getItem("zanbim_visit_count") || "0") + 1;
    localStorage.setItem("zanbim_visit_count", String(visitCount));

    // Screen & Hardware Info
    const screenRes = typeof window !== "undefined" ? `${window.screen.width}x${window.screen.height} (@${window.devicePixelRatio || 1}x)` : "Unknown";
    const colorDepth = typeof window !== "undefined" ? `${window.screen.colorDepth}-bit` : "24-bit";
    const orientation = typeof window !== "undefined" && window.screen.orientation ? window.screen.orientation.type : "portrait";
    const cpuCores = typeof navigator !== "undefined" ? navigator.hardwareConcurrency || 4 : 4;
    const deviceRam = typeof (navigator as any) !== "undefined" && (navigator as any).deviceMemory ? `${(navigator as any).deviceMemory} GB` : "4+ GB";
    const userLanguage = typeof navigator !== "undefined" ? navigator.language : "id-ID";
    const timeZone = typeof Intl !== "undefined" ? Intl.DateTimeFormat().resolvedOptions().timeZone : "Asia/Jakarta";

    // Network Info
    const navConn = typeof navigator !== "undefined" ? (navigator as any).connection : null;
    const networkType = navConn?.effectiveType ? navConn.effectiveType.toUpperCase() : "4G/WiFi";
    const downlinkSpeed = navConn?.downlink ? `${navConn.downlink} Mbps` : "Fast";
    const rttLatency = navConn?.rtt ? `${navConn.rtt} ms` : "30 ms";

    // Referrer & Source
    let referrer = typeof document !== "undefined" ? document.referrer || "Direct (Ketik URL / Bookmarks)" : "Direct";
    if (referrer.includes("whatsapp") || referrer.includes("wa.me") || referrer.includes("l.wl.co")) {
      referrer = "💬 WhatsApp Group / Chat";
    } else if (referrer.includes("instagram")) {
      referrer = "📸 Instagram";
    } else if (referrer.includes("t.co") || referrer.includes("twitter") || referrer.includes("x.com")) {
      referrer = "🐦 Twitter / X";
    } else if (referrer.includes("google")) {
      referrer = "🔍 Google Search";
    }

    // Battery API (Optional)
    const sendLog = async (batteryStr: string = "N/A") => {
      try {
        await fetch("/api/analytics/track", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: "page_view",
            path: pathname,
            track,
            target,
            sessionId,
            visitCount,
            screenRes,
            colorDepth,
            orientation,
            cpuCores,
            deviceRam,
            userLanguage,
            timeZone,
            networkType,
            downlinkSpeed,
            rttLatency,
            referrer,
            batteryStr,
            pageTitle: document.title,
          }),
        });
      } catch (err) {}
    };

    if (typeof navigator !== "undefined" && (navigator as any).getBattery) {
      (navigator as any).getBattery().then((battery: any) => {
        const batteryStr = `${Math.round(battery.level * 100)}% ${battery.charging ? "⚡ (Charging)" : "🔋"}`;
        sendLog(batteryStr);
      }).catch(() => sendLog("N/A"));
    } else {
      sendLog("N/A");
    }
  }, [pathname]);

  return null;
}
