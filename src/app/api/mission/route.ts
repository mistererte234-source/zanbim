import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const track = searchParams.get("track") || "UTBK";
    const skillCode = searchParams.get("skill");

    let whereClause: any = { track, status: "published" };
    if (skillCode) {
      whereClause.skillCode = skillCode;
    }

    const itemsDb = await db.item.findMany({
      where: whereClause,
      take: 12,
    });

    const items = itemsDb.map((i) => {
      try {
        return JSON.parse(i.payload);
      } catch (e) {
        return null;
      }
    }).filter(Boolean);

    return NextResponse.json({
      success: true,
      track,
      totalMissionItems: items.length,
      items,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
