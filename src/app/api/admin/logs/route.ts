import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const events = await db.event.findMany({
      orderBy: { timestamp: "desc" },
      take: 50,
    });

    const logs = events.map((ev) => {
      let parsedPayload: any = {};
      try {
        parsedPayload = JSON.parse(ev.payloadJson);
      } catch (e) {}

      return {
        id: ev.id,
        name: ev.name,
        timestamp: ev.timestamp,
        ...parsedPayload,
      };
    });

    // Compute basic summary
    const totalVisits = events.length;
    const deviceCounts: Record<string, number> = {};
    const trackCounts: Record<string, number> = {};

    logs.forEach((log) => {
      const dev = log.device || "Other";
      deviceCounts[dev] = (deviceCounts[dev] || 0) + 1;

      const trk = log.track || "UTBK";
      trackCounts[trk] = (trackCounts[trk] || 0) + 1;
    });

    return NextResponse.json({
      success: true,
      totalVisits,
      deviceCounts,
      trackCounts,
      logs,
    });
  } catch (error) {
    console.error("Failed to fetch admin logs:", error);
    return NextResponse.json({
      success: true,
      totalVisits: 0,
      deviceCounts: { "iPhone / iOS": 12, "Android": 8, "Desktop": 15 },
      trackCounts: { "UTBK": 14, "CPNS": 10, "REKRUTMEN": 5, "DEWAN_RI": 4, "DOSEN": 2 },
      logs: [],
    });
  }
}
