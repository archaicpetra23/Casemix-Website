"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { useAuth } from "@/hooks/useAuth";

export default function DashboardLayout({ children, title, subtitle }) {
  const { user, loading, canAccess } = useAuth();
  const router   = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (loading) return;
    // Belum login → ke halaman login
    if (!user) {
      router.replace("/login");
      return;
    }
    // Sudah login tapi tidak punya akses ke halaman ini → forbidden
    if (!canAccess(pathname)) {
      router.replace("/forbidden");
    }
  }, [user, loading, pathname, canAccess, router]);

  // Tampilkan loading spinner saat cek session
  if (loading || !user) {
    return (
      <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", background:"var(--background)" }}>
        <div style={{ textAlign:"center" }}>
          <div style={{ width:40, height:40, border:"3px solid var(--border)", borderTop:"3px solid var(--primary)", borderRadius:"50%", animation:"spin 0.8s linear infinite", margin:"0 auto 16px" }} />
          <p style={{ color:"var(--text-muted)", fontSize:14 }}>Memuat sesi...</p>
        </div>
      </div>
    );
  }

  // Cek akses
  if (!canAccess(pathname)) {
    return (
      <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", background:"var(--background)" }}>
        <div style={{ textAlign:"center" }}>
          <p style={{ fontSize:48, marginBottom:12 }}>🚫</p>
          <h2 style={{ fontSize:20, fontWeight:700, marginBottom:8 }}>Akses Ditolak</h2>
          <p style={{ color:"var(--text-muted)", fontSize:14 }}>Anda tidak memiliki izin untuk mengakses halaman ini.</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display:"flex", minHeight:"100vh", background:"var(--background)" }}>
      <Sidebar />
      <div style={{ flex:1, display:"flex", flexDirection:"column", minWidth:0 }}>
        <Topbar title={title} subtitle={subtitle} />
        <main className="page-enter" style={{ flex:1, padding:"24px", display:"flex", flexDirection:"column", gap:24 }}>
          {children}
        </main>
      </div>
    </div>
  );
}
