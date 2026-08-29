import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

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
    return NextResponse.json({
      success: true,
      totalVisits: 0,
      deviceCounts: {},
      trackCounts: {},
      logs: [],
    });
  }
}
