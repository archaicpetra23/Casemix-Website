import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { writeLog } from "@/lib/auditLog";

export async function GET(request) {
  try {
    const q = new URL(request.url).searchParams.get("q") ?? "";
    const data = await prisma.diagnosis.findMany({
      where: q ? { OR: [{ kode_icd10: { contains: q } }, { nama_diagnosis: { contains: q } }, { kategori: { contains: q } }] } : undefined,
      orderBy: { kode_icd10: "asc" },
    });
    return NextResponse.json(data);
  } catch (e) { return NextResponse.json({ error: e.message }, { status: 500 }); }
}

export async function POST(request) {
  try {
    const { kode_icd10, nama_diagnosis, kategori } = await request.json();
    if (!kode_icd10 || !nama_diagnosis) return NextResponse.json({ error: "Kode dan Nama wajib" }, { status: 400 });
    const d = await prisma.diagnosis.create({ data: { kode_icd10, nama_diagnosis, kategori } });
    await writeLog(request, `Menambahkan diagnosis ICD-10: ${kode_icd10} — ${nama_diagnosis}`);
    return NextResponse.json(d, { status: 201 });
  } catch (e) {
    if (e.code === "P2002") return NextResponse.json({ error: "Kode ICD-10 sudah ada" }, { status: 409 });
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const code = new URL(request.url).searchParams.get("code");
    if (!code) return NextResponse.json({ error: "Parameter code wajib" }, { status: 400 });
    const { nama_diagnosis, kategori } = await request.json();
    const d = await prisma.diagnosis.update({
      where: { kode_icd10: code },
      data: { ...(nama_diagnosis && { nama_diagnosis }), ...(kategori !== undefined && { kategori }) },
    });
    await writeLog(request, `Mengubah diagnosis ICD-10: ${code} — ${nama_diagnosis ?? d.nama_diagnosis}`);
    return NextResponse.json(d);
  } catch (e) {
    if (e.code === "P2025") return NextResponse.json({ error: "Tidak ditemukan" }, { status: 404 });
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const code = new URL(request.url).searchParams.get("code");
    if (!code) return NextResponse.json({ error: "Parameter code wajib" }, { status: 400 });
    await prisma.diagnosis.delete({ where: { kode_icd10: code } });
    await writeLog(request, `Menghapus diagnosis ICD-10: ${code}`);
    return NextResponse.json({ success: true });
  } catch (e) {
    if (e.code === "P2025") return NextResponse.json({ error: "Tidak ditemukan" }, { status: 404 });
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
