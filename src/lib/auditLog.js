// src/lib/auditLog.js — Server-side helper untuk mencatat aktivitas ke DB
import { prisma } from "@/lib/prisma";

/**
 * Catat aktivitas ke tabel log_aktivitas
 * @param {Request} request - Next.js Request object (untuk baca header X-User-Id)
 * @param {string}  aktivitas - Deskripsi aksi yang dilakukan
 */
export async function writeLog(request, aktivitas) {
  try {
    const nakesId = request.headers.get("X-User-Id");
    if (!nakesId) return; // Tidak ada user (misal akses publik), skip
    await prisma.logAktivitas.create({
      data: {
        id_nakes: parseInt(nakesId),
        aktivitas,
        waktu: new Date(),
      },
    });
  } catch (e) {
    // Jangan crash request utama karena gagal log
    console.warn("[auditLog] Gagal menulis log:", e.message);
  }
}
