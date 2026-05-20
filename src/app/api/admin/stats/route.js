import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const [
      totalPasien,
      totalNakes,
      totalRekamMedis,
      totalKlaim,
      totalDiagnosis,
      totalTindakan,
      totalCbgs,
      klaimPending,
      klaimDisetujui,
      klaimDitolak,
      recentLogs,
      nakesPerRole,
      klaimPerBulan,
    ] = await Promise.all([
      prisma.pasien.count(),
      prisma.tenagaKesehatan.count(),
      prisma.rekamMedis.count(),
      prisma.klaim.count(),
      prisma.diagnosis.count(),
      prisma.tindakan.count(),
      prisma.tarifCbgs.count(),
      prisma.klaim.count({ where: { status_klaim: "pending" } }),
      prisma.klaim.count({ where: { status_klaim: "disetujui" } }),
      prisma.klaim.count({ where: { status_klaim: "ditolak" } }),
      prisma.logAktivitas.findMany({
        take: 5,
        orderBy: { waktu: "desc" },
        include: { nakes: { select: { nama: true, role: { select: { nama_role: true } } } } },
      }),
      prisma.tenagaKesehatan.groupBy({
        by: ["id_role"],
        _count: { id_nakes: true },
      }),
      // Klaim per-month (last 6 months using raw approach)
      prisma.klaim.findMany({
        where: {
          tanggal_klaim: {
            gte: new Date(new Date().setMonth(new Date().getMonth() - 6)),
          },
        },
        select: { tanggal_klaim: true, status_klaim: true },
      }),
    ]);

    // Process klaim per bulan
    const monthMap = {};
    klaimPerBulan.forEach((k) => {
      if (!k.tanggal_klaim) return;
      const d = new Date(k.tanggal_klaim);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      if (!monthMap[key]) monthMap[key] = { bulan: key, total: 0, disetujui: 0, ditolak: 0, pending: 0 };
      monthMap[key].total++;
      monthMap[key][k.status_klaim]++;
    });
    const klaimChart = Object.values(monthMap).sort((a, b) => a.bulan.localeCompare(b.bulan));

    return NextResponse.json({
      overview: {
        totalPasien, totalNakes, totalRekamMedis, totalKlaim,
        totalDiagnosis, totalTindakan, totalCbgs,
      },
      klaim: { pending: klaimPending, disetujui: klaimDisetujui, ditolak: klaimDitolak },
      recentLogs,
      nakesPerRole,
      klaimChart,
    });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
