# AGENTS.md — Panduan Multi-Agent: Casemix RS

> File ini adalah sumber kebenaran tunggal untuk semua AI agent yang bekerja pada proyek ini.  
> Claude, Gemini, Copilot, dan agent lain harus membaca file ini **sebelum** menulis kode apapun.

---

## 🏥 Tentang Proyek

**Nama**: Sistem Informasi Pengelolaan Data Casemix Rumah Sakit  
**Alias**: Casemix RS  
**Tujuan**: Mengelola data pasien, rekam medis, klaim BPJS, kode ICD-10/ICD-9 CM/INA-CBGs secara terintegrasi dengan relasi data penuh.

---

## ⚙️ Stack Teknologi

| Layer      | Teknologi              | Versi     | Keterangan |
|------------|------------------------|-----------|------------|
| Framework  | Next.js (App Router)   | 16.2.6    | |
| UI Library | React                  | 19.2.4    | |
| Styling    | Tailwind CSS v4        | ^4        | Light mode only |
| **Database** | **MySQL**            | —         | **Ganti Firestore** |
| **ORM**    | **Prisma**             | ^7.8.0    | Schema di `prisma/schema.prisma` |
| **API**    | **Next.js API Routes** | —         | Server-side, di `src/app/api/` |
| Auth       | Firebase Authentication| latest    | Hanya auth, bukan database |
| Icons      | Lucide React           | latest    | |
| Charts     | Recharts               | latest    | |
| Font       | Inter (Google Fonts)   | via next/font | |

> ⚠️ **PENTING**: Firebase Firestore **SUDAH DIHAPUS**. Database sekarang **MySQL + Prisma**.  
> File `src/lib/firestore.js` sudah **dihapus**. Jangan import dari sana.

---

## 📁 Struktur Direktori

```
tmp_app/
├── prisma/
│   ├── schema.prisma          ← Definisi semua model + relasi + enum
│   ├── seed.js                ← Data contoh untuk development
│   └── migrations/            ← Riwayat migrasi (auto-generated)
├── src/
│   ├── app/
│   │   ├── layout.js            ← Root layout + AuthProvider + Inter font
│   │   ├── globals.css          ← Design tokens, animations, base styles
│   │   ├── page.js              ← Redirect ke /dashboard atau /login
│   │   ├── api/                 ← ⭐ API Routes (server-side, akses Prisma)
│   │   │   ├── dashboard/route.js
│   │   │   ├── patients/route.js + [id]/route.js
│   │   │   ├── medical-records/route.js + [id]/route.js
│   │   │   ├── claims/route.js + [id]/route.js
│   │   │   ├── diagnoses/route.js + [code]/route.js
│   │   │   ├── procedures/route.js + [code]/route.js
│   │   │   ├── ina-cbgs/route.js + [code]/route.js
│   │   │   └── users/route.js + [id]/route.js
│   │   ├── login/page.js
│   │   ├── dashboard/page.js
│   │   ├── pasien/page.js
│   │   ├── rekam-medis/page.js
│   │   ├── klaim/page.js
│   │   ├── master-icd/page.js
│   │   └── pengguna/page.js
│   ├── components/
│   │   ├── layout/ (Sidebar, Topbar, DashboardLayout)
│   │   └── ui/ (StatCard, DataTable, Modal, StatusBadge, LoadingSpinner)
│   ├── hooks/
│   │   └── useAuth.js           ← Firebase Auth + role dari MySQL API
│   └── lib/
│       ├── firebase.js          ← Firebase Auth ONLY (Firestore dihapus)
│       ├── prisma.js            ← Prisma Client singleton
│       └── api.js               ← Client-side fetch helpers (pengganti firestore.js)
├── .env                         ← DATABASE_URL untuk MySQL
├── AGENTS.md                    ← File ini
├── CLAUDE.md
└── GEMINI.md
```

---

## 🗃️ Schema Database (MySQL + Prisma)

### Model & Relasi

```
Patient ──< MedicalRecord >── Diagnosis (ICD-10)
Patient ──< Claim         >── InaCbg
                MedicalRecord >── Procedure (ICD-9 CM)
```

### Tabel

| Model         | Tabel MySQL      | Primary Key | Foreign Keys |
|---------------|------------------|-------------|--------------|
| User          | `users`          | uuid        | — |
| Patient       | `patients`       | uuid        | — |
| Diagnosis     | `diagnoses`      | code (ICD-10) | — |
| Procedure     | `procedures`     | code (ICD-9) | — |
| InaCbg        | `ina_cbgs`       | code        | — |
| MedicalRecord | `medical_records`| uuid        | patientId→patients, diagnosisCode→diagnoses, procedureCode→procedures |
| Claim         | `claims`         | uuid        | patientId→patients, inaCbgsCode→ina_cbgs |

### Enum

```prisma
enum Role       { ADMIN CASEMIX DOKTER PERAWAT REKAM_MEDIS KEUANGAN MANAJEMEN }
enum StatusKlaim{ PENDING DISETUJUI DITOLAK }
enum JenisKelamin { L P }
```

---

## 🔌 API Routes

### Pattern

```
GET    /api/[resource]          ← List semua, support ?q= untuk search
POST   /api/[resource]          ← Create baru
GET    /api/[resource]/[id]     ← Detail satu record
PUT    /api/[resource]/[id]     ← Update (partial update didukung)
DELETE /api/[resource]/[id]     ← Hapus
```

### Client-side Helper (src/lib/api.js)

```js
import { patientsApi, recordsApi, claimsApi, diagnosesApi, proceduresApi, inaCbgsApi, usersApi, dashboardApi } from "@/lib/api";

// Contoh penggunaan
const patients = await patientsApi.list();
const newP     = await patientsApi.create({ nik:"...", nama:"..." });
await patientsApi.update(id, { nama:"baru" });
await patientsApi.remove(id);
```

**JANGAN** gunakan Firestore SDK. **JANGAN** import dari `@/lib/firestore` (file sudah dihapus).

---

## 🗄️ Koneksi Database

```env
# .env
DATABASE_URL="mysql://root@localhost:3306/casemix_db"
# Jika ada password: mysql://root:password@localhost:3306/casemix_db
```

### Setup Database (Jalankan sekali)

```bash
# 1. Install MySQL (CachyOS)
sudo pacman -S mysql
sudo mysql_install_db --user=mysql --basedir=/usr --datadir=/var/lib/mysql
sudo systemctl enable --now mysqld
sudo mysql -e "CREATE DATABASE IF NOT EXISTS casemix_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

# 2. Migrate + Seed
npm run db:setup   # = prisma migrate dev && node prisma/seed.js

# 3. Jalankan app
npm run dev
```

---

## 🔑 Firebase Auth

Firebase **hanya digunakan untuk autentikasi** (login/logout). Role user diambil dari MySQL.

```js
// src/lib/firebase.js — hanya auth
import { getAuth } from "firebase/auth";
export const auth = getAuth(app);
// TIDAK ADA getFirestore() lagi
```

Role lookup flow:
1. Firebase `onAuthStateChanged` → dapat user.email
2. Fetch `/api/users/me?uid=user.email` → MySQL lookup by email
3. Set role di AuthContext

---

## 👥 Role & Access Control

| Role       | Konstanta ROLES  | Hak Akses |
|------------|------------------|-----------|
| Admin      | `ROLES.ADMIN`    | Full access |
| Casemix    | `ROLES.CASEMIX`  | Klaim, RM, Master ICD |
| Dokter     | `ROLES.DOCTOR`   | RM, Pasien |
| Perawat    | `ROLES.NURSE`    | Pasien, RM (baca) |
| Rekam Medis| `ROLES.REKAM`    | RM, Pasien |
| Keuangan   | `ROLES.KEUANGAN` | Klaim (baca) |
| Manajemen  | `ROLES.MANAJEMEN`| Dashboard (baca) |

---

## 🎨 Design System

**Light Mode Only** — jangan gunakan `dark:` Tailwind classes.

### Warna (CSS Custom Properties)
```css
--primary:       #0EA5E9
--accent:        #10B981
--background:    #F0F4F8
--surface:       #FFFFFF
--text-primary:  #0F172A
```

### Animasi
- `.animate-fade-in-up`, `.animate-fade-in`, `.animate-scale-in`
- `.stagger-children` — stagger otomatis anak elemen
- `.skeleton` — shimmer loading

---

## 📏 Konvensi Kode

### Wajib:
1. `"use client"` di semua komponen yang pakai hooks/state
2. Import alias `@/` bukan path relatif panjang
3. Gunakan `api.js` helpers untuk semua data fetching di halaman
4. Gunakan `prisma.js` singleton di API Routes (jangan `new PrismaClient()` langsung)
5. Try/catch di semua API Routes + feedback error ke user
6. Animasi di setiap elemen baru

### Dilarang:
- ❌ Import dari `@/lib/firestore` (file dihapus)
- ❌ `getFirestore()` dari Firebase
- ❌ Hardcode warna hex (gunakan `var(--primary)` dll.)
- ❌ `dark:` Tailwind classes
- ❌ `new PrismaClient()` di luar `src/lib/prisma.js`

---

## 🧪 Cara Menjalankan

```bash
# Setup database (sekali saja)
npm run db:setup

# Development
npm run dev          # http://localhost:3000

# Database tools
npm run db:studio    # Prisma Studio GUI
npm run db:migrate   # Jalankan migrasi baru
npm run db:seed      # Isi ulang data contoh
```

---

*Terakhir diperbarui: 2026-05-20 — Migrasi dari Firebase Firestore ke MySQL + Prisma*
