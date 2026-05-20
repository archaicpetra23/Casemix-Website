# CLAUDE.md

@AGENTS.md

---

## Tambahan untuk Claude

Proyek ini menggunakan **Next.js 16 dengan App Router** dan **MySQL + Prisma 7** sebagai database.

### ⚠️ Perubahan Penting: Migrasi ke MySQL

- **Firebase Firestore sudah DIHAPUS.** `src/lib/firestore.js` tidak ada lagi.
- **Database sekarang MySQL** via Prisma ORM.
- **Jangan** import dari `firebase/firestore` atau `@/lib/firestore`.
- Gunakan `@/lib/api.js` (client-side) atau `@/lib/prisma.js` (server-side / API Routes).

### Prisma 7 Gotchas
- Prisma 7 **tidak ada Rust binary** — sepenuhnya TypeScript.
- Perlu **driver adapter** (`@prisma/adapter-mariadb` + `mariadb`).
- `datasource url` **TIDAK** ada di `schema.prisma` — hanya di `prisma.config.ts`.
- Client singleton di `src/lib/prisma.js` menggunakan `mariadb.createPool()`.

### Pattern yang digunakan:
```js
// ✅ API Route — server-side, akses database
import { prisma } from "@/lib/prisma";
export async function GET() {
  const data = await prisma.patient.findMany({ include: { claims: true } });
  return NextResponse.json(data);
}

// ✅ Page Component — client-side, fetch via API
import { patientsApi } from "@/lib/api";
const data = await patientsApi.list();
```

### Jangan:
- Jangan `new PrismaClient()` di luar `src/lib/prisma.js`
- Jangan import Prisma di client components (hanya di API Routes)
- Jangan `getServerSideProps` / `getStaticProps` (Pages Router only)
