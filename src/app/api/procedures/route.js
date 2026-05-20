import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { writeLog } from "@/lib/auditLog";

export async function GET(request) {
  try {
    const q = new URL(request.url).searchParams.get("q") ?? "";
    const data = await prisma.tindakan.findMany({
      where: q ? { OR: [{ kode_tindakan: { contains: q } }, { nama_tindakan: { contains: q } }] } : undefined,
      orderBy: { kode_tindakan: "asc" },
    });
    return NextResponse.json(data);
  } catch (e) { return NextResponse.json({ error: e.message }, { status: 500 }); }
}

export async function POST(request) {
  try {
    const { kode_tindakan, nama_tindakan, tarif } = await request.json();
    if (!kode_tindakan || !nama_tindakan) return NextResponse.json({ error: "Kode dan Nama wajib" }, { status: 400 });
    const t = await prisma.tindakan.create({ data: { kode_tindakan, nama_tindakan, tarif: Number(tarif) || 0 } });
    await writeLog(request, `Menambahkan tindakan ICD-9: ${kode_tindakan} — ${nama_tindakan}`);
    return NextResponse.json(t, { status: 201 });
  } catch (e) {
    if (e.code === "P2002") return NextResponse.json({ error: "Kode sudah ada" }, { status: 409 });
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const code = new URL(request.url).searchParams.get("code");
    if (!code) return NextResponse.json({ error: "Parameter code wajib" }, { status: 400 });
    const { nama_tindakan, tarif } = await request.json();
    const t = await prisma.tindakan.update({
      where: { kode_tindakan: code },
      data: { ...(nama_tindakan && { nama_tindakan }), ...(tarif !== undefined && { tarif: Number(tarif) }) },
    });
    await writeLog(request, `Mengubah tindakan ICD-9: ${code} — ${nama_tindakan ?? t.nama_tindakan}`);
    return NextResponse.json(t);
  } catch (e) {
    if (e.code === "P2025") return NextResponse.json({ error: "Tidak ditemukan" }, { status: 404 });
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const code = new URL(request.url).searchParams.get("code");
    if (!code) return NextResponse.json({ error: "Parameter code wajib" }, { status: 400 });
    await prisma.tindakan.delete({ where: { kode_tindakan: code } });
    await writeLog(request, `Menghapus tindakan ICD-9: ${code}`);
    return NextResponse.json({ success: true });
  } catch (e) {
    if (e.code === "P2025") return NextResponse.json({ error: "Tidak ditemukan" }, { status: 404 });
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
