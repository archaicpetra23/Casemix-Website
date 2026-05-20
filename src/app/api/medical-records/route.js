import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { writeLog } from "@/lib/auditLog";

export async function GET(request) {
  try {
    const q = new URL(request.url).searchParams.get("q") ?? "";
    const data = await prisma.rekamMedis.findMany({
      where: q ? { OR: [
        { keluhan: { contains: q } },
        { pasien: { nama: { contains: q } } },
        { nakes: { nama: { contains: q } } },
      ]} : undefined,
      include: {
        pasien: { select: { id_pasien: true, nama: true, nik: true } },
        nakes:  { select: { id_nakes: true, nama: true, spesialisasi: true } },
        rekam_diagnosis: { include: { diagnosis: { select: { kode_icd10: true, nama_diagnosis: true } } } },
        detail_tindakan: { include: { tindakan: { select: { kode_tindakan: true, nama_tindakan: true } } } },
      },
      orderBy: { tanggal_kunjungan: "desc" },
    });
    return NextResponse.json(data);
  } catch (e) { return NextResponse.json({ error: e.message }, { status: 500 }); }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { id_pasien, id_nakes, keluhan, tanggal_kunjungan, catatan, diagnoses, procedures } = body;
    if (!id_pasien || !id_nakes) return NextResponse.json({ error: "id_pasien dan id_nakes wajib" }, { status: 400 });
    const rec = await prisma.rekamMedis.create({
      data: {
        id_pasien: Number(id_pasien), id_nakes: Number(id_nakes),
        keluhan, tanggal_kunjungan: tanggal_kunjungan ? new Date(tanggal_kunjungan) : null, catatan,
        ...(diagnoses?.length && { rekam_diagnosis: { create: diagnoses.map(d => ({ kode_icd10: d.kode_icd10, jenis: d.jenis ?? "utama" })) } }),
        ...(procedures?.length && { detail_tindakan: { create: procedures.map(p => ({ kode_tindakan: p.kode_tindakan, jumlah: p.jumlah ?? 1 })) } }),
      },
      include: {
        pasien: true, nakes: true,
        rekam_diagnosis: { include: { diagnosis: true } },
        detail_tindakan: { include: { tindakan: true } },
      },
    });
    await writeLog(request, `Membuat rekam medis baru untuk pasien: ${rec.pasien?.nama ?? `ID ${id_pasien}`} (RM #${rec.id_rekam})`);
    return NextResponse.json(rec, { status: 201 });
  } catch (e) {
    if (e.code === "P2003") return NextResponse.json({ error: "Referensi tidak ditemukan" }, { status: 400 });
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const id = new URL(request.url).searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Parameter id wajib" }, { status: 400 });
    const { id_nakes, keluhan, tanggal_kunjungan, catatan } = await request.json();
    const r = await prisma.rekamMedis.update({
      where: { id_rekam: Number(id) },
      data: {
        ...(id_nakes !== undefined && { id_nakes: Number(id_nakes) }),
        ...(keluhan !== undefined && { keluhan }),
        ...(catatan !== undefined && { catatan }),
        ...(tanggal_kunjungan !== undefined && { tanggal_kunjungan: tanggal_kunjungan ? new Date(tanggal_kunjungan) : null }),
      },
    });
    await writeLog(request, `Mengubah rekam medis RM #${id}`);
    return NextResponse.json(r);
  } catch (e) {
    if (e.code === "P2025") return NextResponse.json({ error: "Tidak ditemukan" }, { status: 404 });
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const id = new URL(request.url).searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Parameter id wajib" }, { status: 400 });
    await prisma.rekamMedis.delete({ where: { id_rekam: Number(id) } });
    await writeLog(request, `Menghapus rekam medis RM #${id}`);
    return NextResponse.json({ success: true });
  } catch (e) {
    if (e.code === "P2025") return NextResponse.json({ error: "Tidak ditemukan" }, { status: 404 });
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
