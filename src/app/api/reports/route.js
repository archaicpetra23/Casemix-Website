import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const QUERIES = [
  // Query 0: Pasien dengan Biaya Klaim di Atas Rata-rata Tarif CBGs
  `SELECT 
    p.id_pasien,
    p.nama AS nama_pasien,
    rm.id_rekam,
    tc.kode_cbgs,
    tc.deskripsi,
    tc.tarif AS tarif_cbgs
  FROM pasien p
  JOIN rekam_medis rm ON p.id_pasien = rm.id_pasien
  JOIN klaim k ON rm.id_rekam = k.id_rekam
  JOIN tarif_cbgs tc ON k.kode_cbgs = tc.kode_cbgs
  WHERE tc.tarif > (
    SELECT AVG(tc2.tarif) 
    FROM tarif_cbgs tc2
  )
  ORDER BY tc.tarif DESC`,

  // Query 1: Tenaga Kesehatan dengan Jumlah Penanganan di Atas Rata-rata Kunjungan
  `SELECT 
    nk.id_nakes,
    nk.nama AS nama_nakes,
    u.nama_unit,
    COUNT(rm.id_rekam) AS jumlah_penanganan
  FROM tenaga_kesehatan nk
  JOIN unit u ON nk.id_unit = u.id_unit
  LEFT JOIN rekam_medis rm ON nk.id_nakes = rm.id_nakes
  GROUP BY nk.id_nakes, nk.nama, u.nama_unit
  HAVING COUNT(rm.id_rekam) > (
    SELECT AVG(sub.total)
    FROM (
      SELECT COUNT(id_rekam) AS total
      FROM rekam_medis
      GROUP BY id_nakes
    ) sub
  )
  ORDER BY jumlah_penanganan DESC`,

  // Query 2: Diagnosis Terpopuler dengan Akumulasi Biaya Tindakan di Atas Rata-rata
  `SELECT 
    d.kode_icd10,
    d.nama_diagnosis,
    COUNT(DISTINCT rm.id_rekam) AS frekuensi_kasus,
    SUM(t.tarif * dt.jumlah) AS total_biaya_tindakan
  FROM diagnosis d
  JOIN rekam_diagnosis rd ON d.kode_icd10 = rd.kode_icd10
  JOIN rekam_medis rm ON rd.id_rekam = rm.id_rekam
  JOIN detail_tindakan dt ON rm.id_rekam = dt.id_rekam
  JOIN tindakan t ON dt.kode_tindakan = t.kode_tindakan
  GROUP BY d.kode_icd10, d.nama_diagnosis
  HAVING SUM(t.tarif * dt.jumlah) > (
    SELECT AVG(t2.tarif) FROM tindakan t2
  )
  ORDER BY total_biaya_tindakan DESC`,

  // Query 3: Klaim Pending dengan Estimasi Biaya Tindakan Melebihi Rata-rata Biaya Klaim Disetujui
  `SELECT 
    k.id_klaim,
    k.status_klaim,
    rm.id_rekam,
    SUM(t.tarif * dt.jumlah) AS total_estimasi_tindakan
  FROM klaim k
  JOIN rekam_medis rm ON k.id_rekam = rm.id_rekam
  JOIN detail_tindakan dt ON rm.id_rekam = dt.id_rekam
  JOIN tindakan t ON dt.kode_tindakan = t.kode_tindakan
  WHERE k.status_klaim = 'pending'
  GROUP BY k.id_klaim, k.status_klaim, rm.id_rekam
  HAVING SUM(t.tarif * dt.jumlah) > (
    SELECT AVG(sub.total_tindakan)
    FROM (
      SELECT SUM(t2.tarif * dt2.jumlah) AS total_tindakan
      FROM klaim k2
      JOIN rekam_medis rm2 ON k2.id_rekam = rm2.id_rekam
      JOIN detail_tindakan dt2 ON rm2.id_rekam = dt2.id_rekam
      JOIN tindakan t2 ON dt2.kode_tindakan = t2.kode_tindakan
      WHERE k2.status_klaim = 'disetujui'
      GROUP BY k2.id_klaim
    ) sub
  )
  ORDER BY total_estimasi_tindakan DESC`,

  // Query 4: Pasien dengan Kunjungan Berulang (Multiple Visits) Terdiagnosa Penyakit Terpopuler
  `SELECT 
    p.id_pasien,
    p.nama AS nama_pasien,
    COUNT(rm.id_rekam) AS total_kunjungan,
    GROUP_CONCAT(DISTINCT d.nama_diagnosis SEPARATOR '; ') AS riwayat_diagnosis
  FROM pasien p
  JOIN rekam_medis rm ON p.id_pasien = rm.id_pasien
  JOIN rekam_diagnosis rd ON rm.id_rekam = rd.id_rekam
  JOIN diagnosis d ON rd.kode_icd10 = d.kode_icd10
  WHERE rd.kode_icd10 IN (
    SELECT sub.kode_icd10
    FROM (
      SELECT kode_icd10, COUNT(id) AS cnt
      FROM rekam_diagnosis
      GROUP BY kode_icd10
      ORDER BY cnt DESC
      LIMIT 5
    ) sub
  )
  GROUP BY p.id_pasien, p.nama
  HAVING COUNT(rm.id_rekam) > 1`,

  // Query 5: Log Aktivitas Staf dengan Tingkat Aktivitas di Atas Rata-rata Unitnya
  `SELECT 
    nk.id_nakes,
    nk.nama AS nama_nakes,
    u.nama_unit,
    COUNT(la.id_log) AS jumlah_aktivitas
  FROM tenaga_kesehatan nk
  JOIN unit u ON nk.id_unit = u.id_unit
  JOIN log_aktivitas la ON nk.id_nakes = la.id_nakes
  GROUP BY nk.id_nakes, nk.nama, u.nama_unit
  HAVING COUNT(la.id_log) > (
    SELECT AVG(sub.total_log)
    FROM (
      SELECT nk2.id_unit, nk2.id_nakes, COUNT(la2.id_log) AS total_log
      FROM tenaga_kesehatan nk2
      LEFT JOIN log_aktivitas la2 ON nk2.id_nakes = la2.id_nakes
      GROUP BY nk2.id_unit, nk2.id_nakes
    ) sub
    WHERE sub.id_unit = nk.id_unit
  )
  ORDER BY jumlah_aktivitas DESC`
];

function serializeBigInt(obj) {
  if (obj === null || obj === undefined) return obj;
  if (typeof obj === "bigint") return Number(obj);
  if (Array.isArray(obj)) return obj.map(serializeBigInt);
  if (typeof obj === "object") {
    if (obj instanceof Date) return obj.toISOString();
    return Object.fromEntries(
      Object.entries(obj).map(([k, v]) => [k, serializeBigInt(v)])
    );
  }
  return obj;
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const indexStr = searchParams.get("queryIndex");
    
    if (indexStr === null) {
      return NextResponse.json({ error: "Parameter queryIndex wajib diisi." }, { status: 400 });
    }

    const index = parseInt(indexStr, 10);
    if (isNaN(index) || index < 0 || index >= QUERIES.length) {
      return NextResponse.json({ error: "Indeks query tidak valid." }, { status: 400 });
    }

    const sql = QUERIES[index];
    const startTime = performance.now();
    const rawResult = await prisma.$queryRawUnsafe(sql);
    const endTime = performance.now();
    const executionTimeMs = Math.round(endTime - startTime);

    const serializedResult = serializeBigInt(rawResult);

    // Get column names from the first row of result to help build the dynamic table
    const columns = serializedResult.length > 0 ? Object.keys(serializedResult[0]) : [];

    return NextResponse.json({
      queryIndex: index,
      sql,
      executionTimeMs,
      columns,
      rows: serializedResult
    });
  } catch (error) {
    console.error("[reports_api_error]", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
