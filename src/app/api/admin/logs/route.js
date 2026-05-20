import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page   = Math.max(1, parseInt(searchParams.get("page")  || "1"));
    const limit  = Math.min(100, parseInt(searchParams.get("limit") || "50"));
    const q      = searchParams.get("q") ?? "";
    const nakesId = searchParams.get("nakes_id") ?? "";

    const where = {
      ...(q ? {
        OR: [
          { aktivitas: { contains: q } },
          { nakes: { nama: { contains: q } } },
        ],
      } : {}),
      ...(nakesId ? { id_nakes: parseInt(nakesId) } : {}),
    };

    const [logs, total] = await Promise.all([
      prisma.logAktivitas.findMany({
        where,
        include: {
          nakes: {
            select: { nama: true, profesi: true, email: true, role: { select: { nama_role: true } } },
          },
        },
        orderBy: { waktu: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.logAktivitas.count({ where }),
    ]);

    return NextResponse.json({ logs, total, page, limit, totalPages: Math.ceil(total / limit) });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { id_nakes, aktivitas } = await request.json();
    if (!id_nakes || !aktivitas) {
      return NextResponse.json({ error: "id_nakes dan aktivitas wajib" }, { status: 400 });
    }
    const log = await prisma.logAktivitas.create({
      data: { id_nakes, aktivitas, waktu: new Date() },
    });
    return NextResponse.json(log, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (id) {
      await prisma.logAktivitas.delete({ where: { id_log: parseInt(id) } });
      return NextResponse.json({ ok: true });
    }
    // Clear all
    await prisma.logAktivitas.deleteMany({});
    return NextResponse.json({ ok: true, message: "Semua log dihapus" });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
