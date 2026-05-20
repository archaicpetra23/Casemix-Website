import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { writeLog } from "@/lib/auditLog";

export async function GET(request) {
  try {
    const q = new URL(request.url).searchParams.get("q") ?? "";
    const data = await prisma.tenagaKesehatan.findMany({
      where: q ? { OR: [{ nama: { contains: q } }, { no_str: { contains: q } }, { spesialisasi: { contains: q } }] } : undefined,
      include: { role: { select: { nama_role: true } }, unit: { select: { nama_unit: true } } },
      orderBy: { nama: "asc" },
    });
    return NextResponse.json(data);
  } catch (e) { return NextResponse.json({ error: e.message }, { status: 500 }); }
}

export async function POST(request) {
  try {
    const body = await request.json();
    if (!body.no_str || !body.nama) return NextResponse.json({ error: "No STR dan Nama wajib" }, { status: 400 });
    const w = await prisma.tenagaKesehatan.create({ data: body });
    await writeLog(request, `Menambahkan tenaga kesehatan baru: ${body.nama} (${body.email})`);
    return NextResponse.json(w, { status: 201 });
  } catch (e) {
    if (e.code === "P2002") return NextResponse.json({ error: "No STR/Email sudah terdaftar" }, { status: 409 });
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const id = new URL(request.url).searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Parameter id wajib" }, { status: 400 });
    const body = await request.json();
    const w = await prisma.tenagaKesehatan.update({ where: { id_nakes: Number(id) }, data: body });
    await writeLog(request, `Mengubah data tenaga kesehatan ID ${id}: ${w.nama}`);
    return NextResponse.json(w);
  } catch (e) {
    if (e.code === "P2025") return NextResponse.json({ error: "Tidak ditemukan" }, { status: 404 });
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const id = new URL(request.url).searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Parameter id wajib" }, { status: 400 });
    const w = await prisma.tenagaKesehatan.findUnique({ where: { id_nakes: Number(id) } });
    await prisma.tenagaKesehatan.delete({ where: { id_nakes: Number(id) } });
    await writeLog(request, `Menghapus tenaga kesehatan ID ${id}: ${w?.nama ?? "-"}`);
    return NextResponse.json({ success: true });
  } catch (e) {
    if (e.code === "P2025") return NextResponse.json({ error: "Tidak ditemukan" }, { status: 404 });
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
