import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { writeLog } from "@/lib/auditLog";

export async function GET(request) {
  try {
    const q = new URL(request.url).searchParams.get("q") ?? "";
    const data = await prisma.pasien.findMany({
      where: q ? { OR: [{ nama: { contains: q } }, { nik: { contains: q } }] } : undefined,
      orderBy: { nama: "asc" },
      include: { _count: { select: { rekam_medis: true } } },
    });
    return NextResponse.json(data);
  } catch (e) { return NextResponse.json({ error: e.message }, { status: 500 }); }
}

export async function POST(request) {
  try {
    const { nik, nama, tanggal_lahir, jenis_kelamin, alamat, no_hp } = await request.json();
    if (!nik || !nama) return NextResponse.json({ error: "NIK dan Nama wajib" }, { status: 400 });
    const p = await prisma.pasien.create({
      data: { nik, nama, tanggal_lahir: tanggal_lahir ? new Date(tanggal_lahir) : null, jenis_kelamin: jenis_kelamin ?? "L", alamat, no_hp },
    });
    await writeLog(request, `Menambahkan pasien baru: ${nama} (NIK: ${nik})`);
    return NextResponse.json(p, { status: 201 });
  } catch (e) {
    if (e.code === "P2002") return NextResponse.json({ error: "NIK sudah terdaftar" }, { status: 409 });
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Parameter id wajib" }, { status: 400 });
    const body = await request.json();
    const { nik, nama, tanggal_lahir, jenis_kelamin, alamat, no_hp } = body;
    const p = await prisma.pasien.update({
      where: { id_pasien: Number(id) },
      data: {
        ...(nik && { nik }), ...(nama && { nama }),
        ...(tanggal_lahir !== undefined && { tanggal_lahir: tanggal_lahir ? new Date(tanggal_lahir) : null }),
        ...(jenis_kelamin && { jenis_kelamin }),
        ...(alamat !== undefined && { alamat }),
        ...(no_hp !== undefined && { no_hp }),
      },
    });
    await writeLog(request, `Mengubah data pasien ID ${id}: ${p.nama}`);
    return NextResponse.json(p);
  } catch (e) {
    if (e.code === "P2025") return NextResponse.json({ error: "Tidak ditemukan" }, { status: 404 });
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const id = new URL(request.url).searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Parameter id wajib" }, { status: 400 });
    const p = await prisma.pasien.findUnique({ where: { id_pasien: Number(id) } });
    await prisma.pasien.delete({ where: { id_pasien: Number(id) } });
    await writeLog(request, `Menghapus pasien ID ${id}: ${p?.nama ?? "-"}`);
    return NextResponse.json({ success: true });
  } catch (e) {
    if (e.code === "P2025") return NextResponse.json({ error: "Tidak ditemukan" }, { status: 404 });
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
