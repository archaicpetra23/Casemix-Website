import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET all health workers as "users"
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get("q") ?? "";
    const roleId = searchParams.get("role_id") ?? "";

    const where = {
      ...(q ? {
        OR: [
          { nama: { contains: q } },
          { email: { contains: q } },
          { no_str: { contains: q } },
        ],
      } : {}),
      ...(roleId ? { id_role: parseInt(roleId) } : {}),
    };

    const users = await prisma.tenagaKesehatan.findMany({
      where,
      include: {
        role: { select: { id_role: true, nama_role: true } },
        unit: { select: { id_unit: true, nama_unit: true } },
        _count: { select: { rekam_medis: true, log_aktivitas: true } },
      },
      orderBy: { nama: "asc" },
    });

    return NextResponse.json(users);
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
