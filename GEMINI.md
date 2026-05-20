# GEMINI.md — Panduan untuk Gemini / Antigravity Agent

@AGENTS.md

---

## Tambahan untuk Gemini / Antigravity

### ⚠️ PERUBAHAN BESAR: MySQL + Prisma (bukan Firebase Firestore)

Database telah dimigrasi dari Firebase Firestore ke **MySQL + Prisma 7**.

| Sebelum | Sesudah |
|---------|---------|
| `@/lib/firestore.js` | **DIHAPUS** — tidak ada lagi |
| `subscribeToCollection()` | `fetch("/api/...")` via `@/lib/api.js` |
| `addDocument()` | `patientsApi.create()` dll. |
| `onSnapshot()` (real-time) | Polling / manual `load()` |
| Firestore SDK (client-side) | Prisma + API Routes (server-side) |

### Pola Import yang Benar

```js
// Client-side (page components) — via API fetch
import { patientsApi, recordsApi, claimsApi } from "@/lib/api";
import { diagnosesApi, proceduresApi, inaCbgsApi } from "@/lib/api";
import { usersApi, dashboardApi } from "@/lib/api";

// Server-side (API Routes) — via Prisma
import { prisma } from "@/lib/prisma";

// Auth (tetap Firebase)
import { useAuth, ROLES } from "@/hooks/useAuth";
```

### ❌ JANGAN Import Ini:
```js
// ❌ File ini sudah DIHAPUS
import { subscribeToCollection } from "@/lib/firestore";
import { addDocument, updateDocument } from "@/lib/firestore";
import { getFirestore } from "firebase/firestore";
```

### Cara Fetch Data di Halaman

```jsx
"use client";
import { useCallback, useEffect, useState } from "react";
import { patientsApi } from "@/lib/api";

const [data, setData] = useState([]);
const [loading, setLoading] = useState(true);

const load = useCallback(async () => {
  try { setData(await patientsApi.list()); }
  catch (e) { console.error(e); }
  finally { setLoading(false); }
}, []);

useEffect(() => { load(); }, [load]);
```

### Database Setup

```bash
cd tmp_app
npm run db:setup    # prisma migrate dev + seed
npm run db:studio   # GUI untuk lihat data MySQL
npm run dev         # Start app
```

### Checklist Sebelum Submit

- [ ] Tidak import dari `@/lib/firestore` (file dihapus)
- [ ] Data fetching via `@/lib/api.js` di halaman
- [ ] Prisma akses hanya di `src/app/api/` routes
- [ ] Enum Prisma uppercase: `ADMIN`, `PENDING`, `DISETUJUI`
- [ ] Try/catch + error state di semua data loading
