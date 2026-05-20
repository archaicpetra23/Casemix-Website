import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const data = await prisma.unit.findMany({ orderBy: { nama_unit: "asc" } });
    return NextResponse.json(data);
  } catch (e) { return NextResponse.json({ error: e.message }, { status: 500 }); }
}
