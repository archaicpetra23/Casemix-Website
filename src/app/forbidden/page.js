"use client";

import Link from "next/link";
import { ShieldOff } from "lucide-react";

export default function ForbiddenPage() {
  return (
    <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", background:"var(--background)", flexDirection:"column", gap:16, textAlign:"center", padding:24 }}>
      <div style={{ width:80, height:80, borderRadius:24, background:"var(--danger-light)", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:8 }}>
        <ShieldOff size={36} color="var(--danger)" />
      </div>
      <h1 style={{ fontSize:28, fontWeight:900, color:"var(--text-primary)" }}>Akses Ditolak</h1>
      <p style={{ fontSize:15, color:"var(--text-secondary)", maxWidth:380 }}>
        Anda tidak memiliki izin untuk mengakses halaman ini. Silakan hubungi administrator atau kembali ke halaman yang sesuai dengan role Anda.
      </p>
      <Link href="/dashboard" className="btn btn-primary" style={{ marginTop:8 }}>
        ← Kembali ke Dashboard
      </Link>
    </div>
  );
}
