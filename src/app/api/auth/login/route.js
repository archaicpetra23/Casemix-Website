import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request) {
  try {
    const { email, password } = await request.json();
    if (!email || !password) {
      return NextResponse.json({ error: "Email dan password wajib diisi" }, { status: 400 });
    }

    // Cari user berdasarkan email
    const nakes = await prisma.tenagaKesehatan.findUnique({
      where: { email },
      include: {
        role: { select: { id_role: true, nama_role: true } },
        unit: { select: { id_unit: true, nama_unit: true } },
      },
    });

    if (!nakes) {
      return NextResponse.json({ error: "Email atau password salah" }, { status: 401 });
    }

    // Cek password (plain text untuk demo — di produksi gunakan bcrypt)
    // Password seed adalah format "$hash{n}" atau "default_password"
    // Untuk demo: password = nama depan lowercase atau "password"
    const validPasswords = [
      nakes.password_hash,
      "password",
      "password123",
      nakes.email.split("@")[0], // e.g. "puja" untuk puja@rs.com
    ];

    if (!validPasswords.includes(password)) {
      return NextResponse.json({ error: "Email atau password salah" }, { status: 401 });
    }

    // Buat session payload (tanpa password)
    const sessionUser = {
      id_nakes:     nakes.id_nakes,
      nama:         nakes.nama,
      email:        nakes.email,
      profesi:      nakes.profesi,
      spesialisasi: nakes.spesialisasi,
      no_str:       nakes.no_str,
      role:         nakes.role,
      unit:         nakes.unit,
    };

    // Catat log login
    await prisma.logAktivitas.create({
      data: {
        id_nakes: nakes.id_nakes,
        aktivitas: `Login ke sistem (${nakes.role?.nama_role})`,
        waktu: new Date(),
      },
    });

    return NextResponse.json({ user: sessionUser }, { status: 200 });
  } catch (e) {
    console.error("[AUTH LOGIN]", e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
