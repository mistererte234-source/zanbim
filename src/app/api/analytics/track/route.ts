import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name = "page_view",
      path = "/",
      track = "UTBK",
      target = "",
      sessionId = "",
      visitCount = 1,
      screenRes = "",
      colorDepth = "",
      orientation = "",
      cpuCores = 4,
      deviceRam = "",
      userLanguage = "id-ID",
      timeZone = "Asia/Jakarta",
      networkType = "4G/WiFi",
      downlinkSpeed = "",
      rttLatency = "",
      referrer = "Direct",
      batteryStr = "N/A",
      pageTitle = "",
    } = body;

    // IP Address extraction
    const forwarded = req.headers.get("x-forwarded-for");
    const realIp = req.headers.get("x-real-ip");
    const cfIp = req.headers.get("cf-connecting-ip");
    const ip = cfIp || (forwarded ? forwarded.split(",")[0].trim() : realIp || "127.0.0.1");

    // Vercel / Edge Geo Headers
    const city = req.headers.get("x-vercel-ip-city") || "Surabaya / Jakarta";
    const country = req.headers.get("x-vercel-ip-country") || "ID";
    const region = req.headers.get("x-vercel-ip-country-region") || "Jawa Timur";
    const latitude = req.headers.get("x-vercel-ip-latitude") || "-7.2575";
    const longitude = req.headers.get("x-vercel-ip-longitude") || "112.7521";

    const userAgent = req.headers.get("user-agent") || "Mozilla/5.0";

    // Detailed OS & Browser Parsing
    let os = "Windows";
    let deviceModel = "PC Desktop";
    if (/iPhone/i.test(userAgent)) {
      os = "iOS";
      deviceModel = "Apple iPhone";
    } else if (/iPad/i.test(userAgent)) {
      os = "iPadOS";
      deviceModel = "Apple iPad";
    } else if (/Android/i.test(userAgent)) {
      os = "Android";
      const match = userAgent.match(/Android\s([0-9\.]+);\s*([^;]+)\sBuild/i);
      deviceModel = match ? match[2] : "Android Smartphone";
    } else if (/Macintosh/i.test(userAgent)) {
      os = "macOS";
      deviceModel = "Apple Mac";
    } else if (/Linux/i.test(userAgent)) {
      os = "Linux";
      deviceModel = "Linux Workstation";
    }

    let browser = "Chrome";
    if (/Chrome/i.test(userAgent) && !/Edg/i.test(userAgent) && !/OPR/i.test(userAgent)) {
      browser = "Google Chrome";
    } else if (/Safari/i.test(userAgent) && !/Chrome/i.test(userAgent)) {
      browser = "Apple Safari";
    } else if (/Edg/i.test(userAgent)) {
      browser = "Microsoft Edge";
    } else if (/Firefox/i.test(userAgent)) {
      browser = "Mozilla Firefox";
    }

    const payload = {
      ip,
      geo: {
        city,
        region,
        country: country === "ID" ? "Indonesia 🇮🇩" : country,
        latitude,
        longitude,
      },
      device: {
        model: deviceModel,
        os,
        browser,
        screenRes,
        colorDepth,
        orientation,
        cpuCores,
        ram: deviceRam,
        battery: batteryStr,
      },
      network: {
        type: networkType,
        speed: downlinkSpeed,
        latency: rttLatency,
        language: userLanguage,
        timeZone,
      },
      session: {
        sessionId,
        visitCount,
        referrer,
        path,
        pageTitle,
        track,
        target,
        timestamp: new Date().toISOString(),
      },
    };

    const event = await db.event.create({
      data: {
        name,
        payloadJson: JSON.stringify(payload),
      },
    });

    return NextResponse.json({ success: true, eventId: event.id });
  } catch (error) {
    return NextResponse.json({ success: true, logged: false });
  }
}
