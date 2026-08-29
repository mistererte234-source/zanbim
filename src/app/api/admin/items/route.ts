import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { validateItemGate } from "@/lib/gate-validator";

export async function GET(req: NextRequest) {
  try {
    const items = await db.item.findMany({
      orderBy: { createdAt: "desc" },
    });

    const parsedItems = items.map((i) => {
      try {
        return {
          dbRecord: i,
          payload: JSON.parse(i.payload),
        };
      } catch (e) {
        return { dbRecord: i, payload: null };
      }
    });

    return NextResponse.json({ items: parsedItems });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Mode Bulk Import JSONL
    if (body.type === "jsonl_import") {
      const lines: string[] = body.content.split("\n");
      const results: { line: number; valid: boolean; errors?: string[]; id?: string }[] = [];
      let successCount = 0;

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;

        try {
          const itemPayload = JSON.parse(line);
          const gateResult = validateItemGate(itemPayload);

          if (!gateResult.valid) {
            results.push({ line: i + 1, valid: false, errors: gateResult.errors });
          } else {
            await db.item.upsert({
              where: {
                id_version: {
                  id: itemPayload.id,
                  version: itemPayload.version || 1,
                },
              },
              update: {
                itemType: itemPayload.item_type,
                track: itemPayload.track,
                subtest: itemPayload.subtest,
                skillCode: itemPayload.skill,
                difficulty: itemPayload.difficulty || 2,
                status: itemPayload.status || "published",
                payload: JSON.stringify(itemPayload),
              },
              create: {
                id: itemPayload.id,
                version: itemPayload.version || 1,
                itemType: itemPayload.item_type,
                track: itemPayload.track,
                subtest: itemPayload.subtest,
                skillCode: itemPayload.skill,
                difficulty: itemPayload.difficulty || 2,
                status: itemPayload.status || "published",
                payload: JSON.stringify(itemPayload),
              },
            });
            results.push({ line: i + 1, valid: true, id: itemPayload.id });
            successCount++;
          }
        } catch (err: any) {
          results.push({ line: i + 1, valid: false, errors: [`JSON Parse Error: ${err.message}`] });
        }
      }

      return NextResponse.json({ success: true, successCount, results });
    }

    // Single Item Creation / Update
    const gateResult = validateItemGate(body);
    if (!gateResult.valid) {
      return NextResponse.json({ valid: false, errors: gateResult.errors }, { status: 400 });
    }

    const item = await db.item.upsert({
      where: {
        id_version: {
          id: body.id,
          version: body.version || 1,
        },
      },
      update: {
        itemType: body.item_type,
        track: body.track,
        subtest: body.subtest,
        skillCode: body.skill,
        difficulty: body.difficulty || 2,
        status: body.status || "published",
        payload: JSON.stringify(body),
      },
      create: {
        id: body.id,
        version: body.version || 1,
        itemType: body.item_type,
        track: body.track,
        subtest: body.subtest,
        skillCode: body.skill,
        difficulty: body.difficulty || 2,
        status: body.status || "published",
        payload: JSON.stringify(body),
      },
    });

    return NextResponse.json({ success: true, item });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
