import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const [totalPasien, totalNakes, totalKlaim, klaimPending, klaimDisetujui, klaimDitolak, klaimTerbaru, topDiag] = await Promise.all([
      prisma.pasien.count(),
      prisma.tenagaKesehatan.count(),
      prisma.klaim.count(),
      prisma.klaim.count({ where: { status_klaim: "pending" } }),
      prisma.klaim.count({ where: { status_klaim: "disetujui" } }),
      prisma.klaim.count({ where: { status_klaim: "ditolak" } }),
      prisma.klaim.findMany({
        take: 5, orderBy: { tanggal_klaim: "desc" },
        include: { rekam_medis: { include: { pasien: { select: { nama: true } } } }, tarif_cbgs: { select: { kode_cbgs: true } } },
      }),
      prisma.rekamDiagnosis.groupBy({ by: ["kode_icd10"], _count: { kode_icd10: true }, orderBy: { _count: { kode_icd10: "desc" } }, take: 7 }),
    ]);
    const codes = topDiag.map(d => d.kode_icd10);
    const names = await prisma.diagnosis.findMany({ where: { kode_icd10: { in: codes } }, select: { kode_icd10: true, nama_diagnosis: true } });
    const nm = Object.fromEntries(names.map(d => [d.kode_icd10, d.nama_diagnosis]));

    return NextResponse.json({
      stats: { totalPasien, totalNakes, totalKlaim, klaimPending, klaimDisetujui, klaimDitolak },
      klaimTerbaru: klaimTerbaru.map(k => ({
        id_klaim: k.id_klaim, patient: k.rekam_medis?.pasien?.nama ?? "—",
        kode_cbgs: k.tarif_cbgs?.kode_cbgs ?? "—", status_klaim: k.status_klaim, tanggal_klaim: k.tanggal_klaim,
      })),
      diagnosisChart: topDiag.map(d => ({ name: nm[d.kode_icd10] ?? d.kode_icd10, count: d._count.kode_icd10 })),
    });
  } catch (error) {
    console.error("[dashboard]", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
