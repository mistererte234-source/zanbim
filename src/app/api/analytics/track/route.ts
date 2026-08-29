import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name = "page_view", path = "/", track = "UTBK", target = "" } = body;

    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0].trim() : "127.0.0.1";
    const userAgent = req.headers.get("user-agent") || "Unknown Device";

    let device = "Desktop";
    if (/iPhone|iPad|iPod/i.test(userAgent)) device = "iPhone / iOS";
    else if (/Android/i.test(userAgent)) device = "Android";
    else if (/Macintosh/i.test(userAgent)) device = "Mac OS";
    else if (/Windows/i.test(userAgent)) device = "Windows";

    const payloadJson = JSON.stringify({
      ip,
      userAgent,
      device,
      path,
      track,
      target,
      time: new Date().toISOString(),
    });

    const event = await db.event.create({
      data: {
        name,
        payloadJson,
      },
    });

    return NextResponse.json({ success: true, eventId: event.id });
  } catch (error) {
    // If DB is offline or table pending, return mock success so user experience is not disrupted
    return NextResponse.json({ success: true, logged: false });
  }
}
