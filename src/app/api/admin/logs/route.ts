import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const events = await db.event.findMany({
      orderBy: { timestamp: "desc" },
      take: 100,
    });

    const logs = events.map((ev) => {
      let payload: any = {};
      try {
        payload = JSON.parse(ev.payloadJson);
      } catch (e) {}

      return {
        id: ev.id,
        name: ev.name,
        timestamp: ev.timestamp,
        ...payload,
      };
    });

    const totalVisits = events.length;
    const deviceCounts: Record<string, number> = {};
    const trackCounts: Record<string, number> = {};
    const cityCounts: Record<string, number> = {};
    const referrerCounts: Record<string, number> = {};

    logs.forEach((log) => {
      const dev = log.device?.os ? `${log.device.os} (${log.device.model})` : log.device || "Desktop";
      deviceCounts[dev] = (deviceCounts[dev] || 0) + 1;

      const trk = log.session?.track || log.track || "UTBK";
      trackCounts[trk] = (trackCounts[trk] || 0) + 1;

      const city = log.geo?.city || "Surabaya / Jakarta";
      cityCounts[city] = (cityCounts[city] || 0) + 1;

      const ref = log.session?.referrer || "Direct (Ketik URL)";
      referrerCounts[ref] = (referrerCounts[ref] || 0) + 1;
    });

    return NextResponse.json({
      success: true,
      totalVisits,
      deviceCounts,
      trackCounts,
      cityCounts,
      referrerCounts,
      logs,
    });
  } catch (error) {
    return NextResponse.json({
      success: true,
      totalVisits: 0,
      deviceCounts: {},
      trackCounts: {},
      cityCounts: {},
      referrerCounts: {},
      logs: [],
    });
  }
}
