import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { writeLog } from "@/lib/auditLog";

export async function GET(request) {
  try {
    const q = new URL(request.url).searchParams.get("q") ?? "";
    const data = await prisma.tarifCbgs.findMany({
      where: q ? { OR: [{ kode_cbgs: { contains: q } }, { deskripsi: { contains: q } }] } : undefined,
      orderBy: { kode_cbgs: "asc" },
    });
    return NextResponse.json(data);
  } catch (e) { return NextResponse.json({ error: e.message }, { status: 500 }); }
}

export async function POST(request) {
  try {
    const { kode_cbgs, deskripsi, tarif } = await request.json();
    if (!kode_cbgs || !deskripsi) return NextResponse.json({ error: "Kode dan Deskripsi wajib" }, { status: 400 });
    const t = await prisma.tarifCbgs.create({ data: { kode_cbgs, deskripsi, tarif: Number(tarif) || 0 } });
    await writeLog(request, `Menambahkan tarif CBGs: ${kode_cbgs} — ${deskripsi}`);
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
    const { deskripsi, tarif } = await request.json();
    const t = await prisma.tarifCbgs.update({
      where: { kode_cbgs: code },
      data: { ...(deskripsi && { deskripsi }), ...(tarif !== undefined && { tarif: Number(tarif) }) },
    });
    await writeLog(request, `Mengubah tarif CBGs: ${code} — ${deskripsi ?? t.deskripsi}`);
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
    await prisma.tarifCbgs.delete({ where: { kode_cbgs: code } });
    await writeLog(request, `Menghapus tarif CBGs: ${code}`);
    return NextResponse.json({ success: true });
  } catch (e) {
    if (e.code === "P2025") return NextResponse.json({ error: "Tidak ditemukan" }, { status: 404 });
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
