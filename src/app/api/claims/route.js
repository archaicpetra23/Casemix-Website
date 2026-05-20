import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { writeLog } from "@/lib/auditLog";

export async function GET(request) {
  try {
    const status = new URL(request.url).searchParams.get("status");
    const data = await prisma.klaim.findMany({
      where: status ? { status_klaim: status } : undefined,
      include: {
        rekam_medis: { include: { pasien: { select: { id_pasien: true, nama: true, nik: true } } } },
        tarif_cbgs:  { select: { kode_cbgs: true, deskripsi: true, tarif: true } },
      },
      orderBy: { tanggal_klaim: "desc" },
    });
    return NextResponse.json(data);
  } catch (e) { return NextResponse.json({ error: e.message }, { status: 500 }); }
}

export async function POST(request) {
  try {
    const { id_rekam, kode_cbgs, status_klaim, tanggal_klaim } = await request.json();
    if (!id_rekam) return NextResponse.json({ error: "id_rekam wajib" }, { status: 400 });
    const k = await prisma.klaim.create({
      data: {
        id_rekam: Number(id_rekam), kode_cbgs: kode_cbgs || null,
        status_klaim: status_klaim ?? "pending",
        tanggal_klaim: tanggal_klaim ? new Date(tanggal_klaim) : new Date(),
      },
      include: { rekam_medis: { include: { pasien: true } }, tarif_cbgs: true },
    });
    const pasienNama = k.rekam_medis?.pasien?.nama ?? `RM #${id_rekam}`;
    await writeLog(request, `Membuat klaim baru #${k.id_klaim} untuk pasien: ${pasienNama} (CBGs: ${kode_cbgs ?? "-"})`);
    return NextResponse.json(k, { status: 201 });
  } catch (e) {
    if (e.code === "P2003") return NextResponse.json({ error: "Referensi tidak ditemukan" }, { status: 400 });
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const id = new URL(request.url).searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Parameter id wajib" }, { status: 400 });
    const { kode_cbgs, status_klaim, tanggal_klaim } = await request.json();
    const k = await prisma.klaim.update({
      where: { id_klaim: Number(id) },
      data: {
        ...(kode_cbgs !== undefined && { kode_cbgs }),
        ...(status_klaim && { status_klaim }),
        ...(tanggal_klaim !== undefined && { tanggal_klaim: tanggal_klaim ? new Date(tanggal_klaim) : null }),
      },
    });
    await writeLog(request, `Mengubah status klaim #${id} menjadi: ${status_klaim ?? "tidak berubah"}`);
    return NextResponse.json(k);
  } catch (e) {
    if (e.code === "P2025") return NextResponse.json({ error: "Tidak ditemukan" }, { status: 404 });
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const id = new URL(request.url).searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Parameter id wajib" }, { status: 400 });
    await prisma.klaim.delete({ where: { id_klaim: Number(id) } });
    await writeLog(request, `Menghapus klaim #${id}`);
    return NextResponse.json({ success: true });
  } catch (e) {
    if (e.code === "P2025") return NextResponse.json({ error: "Tidak ditemukan" }, { status: 404 });
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
