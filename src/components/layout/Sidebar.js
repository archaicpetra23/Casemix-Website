"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Users, FileText, CreditCard,
  BookOpen, UserCog, ChevronLeft, ChevronRight,
  LogOut, Stethoscope, Shield,
} from "lucide-react";
import { useAuth, ROLE_ACCESS } from "@/hooks/useAuth";

const ALL_NAV = [
  { href: "/dashboard",   icon: LayoutDashboard, label: "Dashboard"   },
  { href: "/pasien",      icon: Users,           label: "Data Pasien" },
  { href: "/rekam-medis", icon: FileText,        label: "Rekam Medis" },
  { href: "/klaim",       icon: CreditCard,      label: "Klaim BPJS"  },
  { href: "/master-icd",  icon: BookOpen,        label: "Master ICD"  },
  { href: "/nakes",       icon: UserCog,         label: "Nakes"       },
];

const ADMIN_NAV = { href: "/admin", icon: Shield, label: "Admin Panel" };

// Role badge colors
const ROLE_COLOR = {
  "Admin":       { bg: "#FEE2E2", text: "#DC2626" },
  "Dokter":      { bg: "#DBEAFE", text: "#2563EB" },
  "Perawat":     { bg: "#D1FAE5", text: "#059669" },
  "Casemix":     { bg: "#FEF3C7", text: "#D97706" },
  "Rekam Medis": { bg: "#EDE9FE", text: "#7C3AED" },
};

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname  = usePathname();
  const { user, role, logout } = useAuth();

  const allowed   = ROLE_ACCESS[role] ?? [];
  const mainItems = ALL_NAV.filter(item => allowed.includes(item.href));
  const showAdmin = allowed.includes("/admin");
  const roleColor = ROLE_COLOR[role] ?? { bg: "#F1F5F9", text: "#64748B" };

  const width = collapsed ? "var(--sidebar-collapsed)" : "var(--sidebar-width)";

  return (
    <aside style={{ width, minWidth: width, height:"100vh", position:"sticky", top:0, background:"var(--sidebar-bg)", borderRight:"1px solid var(--border)", display:"flex", flexDirection:"column", transition:"width var(--transition-base), min-width var(--transition-base)", overflow:"hidden", zIndex:200, boxShadow:"2px 0 8px rgba(0,0,0,.04)" }}>

      {/* Logo */}
      <div style={{ padding: collapsed ? "20px 0" : "20px 20px", borderBottom:"1px solid var(--border)", display:"flex", alignItems:"center", justifyContent: collapsed ? "center" : "space-between", gap:10, minHeight:72 }}>
        <div style={{ display:"flex", alignItems:"center", gap:10, overflow:"hidden" }}>
          <div className="gradient-primary" style={{ width:36, height:36, borderRadius:10, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
            <Stethoscope size={18} color="white" />
          </div>
          {!collapsed && (
            <div className="animate-fade-in" style={{ overflow:"hidden" }}>
              <p style={{ fontSize:14, fontWeight:800, color:"var(--text-primary)", lineHeight:1.2, whiteSpace:"nowrap" }}>Casemix RS</p>
              <p style={{ fontSize:11, color:"var(--text-muted)", whiteSpace:"nowrap" }}>Sistem Informasi</p>
            </div>
          )}
        </div>
        {!collapsed && (
          <button onClick={() => setCollapsed(true)} className="btn btn-ghost btn-sm" style={{ padding:6, minWidth:"auto", flexShrink:0 }}>
            <ChevronLeft size={16}/>
          </button>
        )}
      </div>

      {collapsed && (
        <button onClick={() => setCollapsed(false)} className="btn btn-ghost btn-sm" style={{ margin:"8px auto", padding:6, minWidth:"auto" }} data-tooltip="Perluas menu">
          <ChevronRight size={16}/>
        </button>
      )}

      {/* Nav */}
      <nav style={{ flex:1, overflowY:"auto", padding:"12px 10px" }}>
        {!collapsed && (
          <p style={{ fontSize:10, fontWeight:700, color:"var(--text-muted)", textTransform:"uppercase", letterSpacing:"0.1em", padding:"4px 6px 8px" }}>
            Menu Utama
          </p>
        )}
        <ul style={{ listStyle:"none", display:"flex", flexDirection:"column", gap:2 }}>
          {mainItems.map(item => {
            const isActive = pathname.startsWith(item.href);
            const Icon = item.icon;
            return (
              <li key={item.href}>
                <Link href={item.href} className={`nav-link ${isActive ? "active" : ""}`} style={{ justifyContent: collapsed ? "center" : "flex-start" }} data-tooltip={collapsed ? item.label : undefined}>
                  <Icon size={18} className="nav-icon"/>
                  {!collapsed && <span className="animate-fade-in" style={{ whiteSpace:"nowrap" }}>{item.label}</span>}
                </Link>
              </li>
            );
          })}

          {showAdmin && (
            <>
              {!collapsed && (
                <li style={{ padding:"10px 6px 4px" }}>
                  <p style={{ fontSize:10, fontWeight:700, color:"var(--text-muted)", textTransform:"uppercase", letterSpacing:"0.1em" }}>Administrasi</p>
                </li>
              )}
              <li>
                <Link href={ADMIN_NAV.href} className={`nav-link ${pathname.startsWith(ADMIN_NAV.href) ? "active" : ""}`}
                  style={{ justifyContent: collapsed ? "center" : "flex-start", color: pathname.startsWith(ADMIN_NAV.href) ? "#DC2626" : "#EF4444", background: pathname.startsWith(ADMIN_NAV.href) ? "#FEE2E2" : "transparent" }}
                  data-tooltip={collapsed ? ADMIN_NAV.label : undefined}
                >
                  <Shield size={18} className="nav-icon"/>
                  {!collapsed && <span className="animate-fade-in" style={{ whiteSpace:"nowrap", fontWeight:600 }}>{ADMIN_NAV.label}</span>}
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>

      {/* User + Logout */}
      <div style={{ padding: collapsed ? "12px 0" : "12px 10px", borderTop:"1px solid var(--border)", display:"flex", flexDirection:"column", gap:4, alignItems: collapsed ? "center" : "stretch" }}>
        {!collapsed && user && (
          <div className="animate-fade-in" style={{ display:"flex", alignItems:"center", gap:10, padding:"8px 10px", background:"var(--surface-hover)", borderRadius:"var(--radius-md)", marginBottom:4 }}>
            <div style={{ width:32, height:32, borderRadius:"50%", background:"var(--primary-light)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, fontSize:13, fontWeight:700, color:"var(--primary-dark)" }}>
              {(user.nama || "?")[0].toUpperCase()}
            </div>
            <div style={{ overflow:"hidden", flex:1 }}>
              <p style={{ fontSize:12, fontWeight:600, color:"var(--text-primary)", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{user.nama}</p>
              <span style={{ fontSize:10, fontWeight:700, padding:"1px 7px", borderRadius:99, background:roleColor.bg, color:roleColor.text }}>
                {role}
              </span>
            </div>
          </div>
        )}
        <button onClick={logout} className="nav-link" style={{ justifyContent: collapsed ? "center" : "flex-start", color:"var(--danger)", background:"transparent", border:"none", cursor:"pointer", width:"100%" }} data-tooltip={collapsed ? "Keluar" : undefined}>
          <LogOut size={18}/>
          {!collapsed && <span>Keluar</span>}
        </button>
      </div>
    </aside>
  );
}
