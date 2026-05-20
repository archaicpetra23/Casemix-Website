"use client";

import { useState, useEffect, useCallback } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import {
  Shield, Activity, Users, BarChart3, Trash2, RefreshCw,
  Search, ChevronLeft, ChevronRight, AlertTriangle, CheckCircle,
  Clock, XCircle, Database, FileText, CreditCard, BookOpen,
  Stethoscope, UserCog,
} from "lucide-react";

/* ─── helpers ─── */
const fmt = (n) => Number(n ?? 0).toLocaleString("id-ID");
const fmtDate = (d) =>
  d ? new Date(d).toLocaleString("id-ID", { dateStyle: "medium", timeStyle: "short" }) : "—";

const BADGE_ROLE = { Admin: "badge-danger", Dokter: "badge-info", Perawat: "badge-success", Casemix: "badge-warning", "Rekam Medis": "badge-default" };
const BADGE_STATUS = { pending: "badge-warning", disetujui: "badge-success", ditolak: "badge-danger" };

/* ─── StatCard ─── */
function StatCard({ icon: Icon, label, value, color, sub }) {
  return (
    <div className="card" style={{ padding: "20px 22px", display: "flex", alignItems: "center", gap: 16 }}>
      <div style={{ width: 48, height: 48, borderRadius: 14, background: color + "20", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <Icon size={22} color={color} />
      </div>
      <div>
        <p style={{ fontSize: 24, fontWeight: 800, color: "var(--text-primary)", lineHeight: 1.1 }}>{fmt(value)}</p>
        <p style={{ fontSize: 13, color: "var(--text-secondary)", fontWeight: 500, marginTop: 2 }}>{label}</p>
        {sub && <p style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 2 }}>{sub}</p>}
      </div>
    </div>
  );
}

/* ─── TAB: Overview ─── */
function OverviewTab({ stats }) {
  if (!stats) return <div style={{ textAlign: "center", padding: 60, color: "var(--text-muted)" }}>Memuat statistik…</div>;
  const { overview, klaim, recentLogs } = stats;

  const cards = [
    { icon: Users,       label: "Total Pasien",      value: overview.totalPasien,      color: "#0EA5E9" },
    { icon: Stethoscope, label: "Tenaga Kesehatan",   value: overview.totalNakes,       color: "#8B5CF6" },
    { icon: FileText,    label: "Rekam Medis",        value: overview.totalRekamMedis,  color: "#10B981" },
    { icon: CreditCard,  label: "Total Klaim",        value: overview.totalKlaim,       color: "#F59E0B" },
    { icon: BookOpen,    label: "Data Diagnosis",     value: overview.totalDiagnosis,   color: "#06B6D4" },
    { icon: Database,    label: "Tarif CBGs",         value: overview.totalCbgs,        color: "#EF4444" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* stat grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 14 }}>
        {cards.map((c) => <StatCard key={c.label} {...c} />)}
      </div>

      {/* klaim status */}
      <div className="card" style={{ padding: 24 }}>
        <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>Status Klaim BPJS</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
          {[
            { label: "Pending",   val: klaim.pending,    icon: Clock,         color: "#F59E0B", bg: "#FEF3C7" },
            { label: "Disetujui", val: klaim.disetujui,  icon: CheckCircle,   color: "#10B981", bg: "#D1FAE5" },
            { label: "Ditolak",   val: klaim.ditolak,    icon: XCircle,       color: "#EF4444", bg: "#FEE2E2" },
          ].map(({ label, val, icon: Icon, color, bg }) => (
            <div key={label} style={{ background: bg, borderRadius: 12, padding: "18px 20px", display: "flex", alignItems: "center", gap: 14 }}>
              <Icon size={24} color={color} />
              <div>
                <p style={{ fontSize: 22, fontWeight: 800, color }}>{fmt(val)}</p>
                <p style={{ fontSize: 12, color, fontWeight: 600, opacity: 0.8 }}>{label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* recent activity */}
      <div className="card" style={{ padding: 24 }}>
        <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 14 }}>Aktivitas Terbaru</h3>
        {recentLogs.length === 0 ? (
          <p style={{ color: "var(--text-muted)", fontSize: 13 }}>Belum ada log aktivitas.</p>
        ) : (
          <ul style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {recentLogs.map((log) => (
              <li key={log.id_log} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: "1px solid var(--border)" }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: "var(--primary-light)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "var(--primary-dark)", flexShrink: 0 }}>
                  {(log.nakes?.nama || "?")[0].toUpperCase()}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)" }}>{log.nakes?.nama || "—"}</p>
                  <p style={{ fontSize: 12, color: "var(--text-muted)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{log.aktivitas}</p>
                </div>
                <p style={{ fontSize: 11, color: "var(--text-muted)", flexShrink: 0 }}>{fmtDate(log.waktu)}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

/* ─── TAB: Audit Log ─── */
function AuditLogTab() {
  const [logs, setLogs]       = useState([]);
  const [total, setTotal]     = useState(0);
  const [page, setPage]       = useState(1);
  const [pages, setPages]     = useState(1);
  const [q, setQ]             = useState("");
  const [search, setSearch]   = useState("");
  const [loading, setLoading] = useState(true);
  const [clearing, setClearing] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/logs?page=${page}&limit=20${search ? `&q=${encodeURIComponent(search)}` : ""}`);
      const data = await res.json();
      setLogs(data.logs || []);
      setTotal(data.total || 0);
      setPages(data.totalPages || 1);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  }, [page, search]);

  useEffect(() => { load(); }, [load]);

  const handleSearch = (e) => { e.preventDefault(); setPage(1); setSearch(q); };

  const clearAll = async () => {
    if (!confirm("Hapus SEMUA log aktivitas? Tindakan ini tidak bisa dibatalkan.")) return;
    setClearing(true);
    await fetch("/api/admin/logs", { method: "DELETE" });
    setClearing(false);
    load();
  };

  const deleteOne = async (id) => {
    await fetch(`/api/admin/logs?id=${id}`, { method: "DELETE" });
    load();
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* toolbar */}
      <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
        <form onSubmit={handleSearch} style={{ display: "flex", gap: 8, flex: 1 }}>
          <div style={{ position: "relative", flex: 1 }}>
            <Search size={14} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
            <input value={q} onChange={e => setQ(e.target.value)} className="input" style={{ paddingLeft: 36 }} placeholder="Cari aktivitas atau nama nakes…" />
          </div>
          <button type="submit" className="btn btn-primary btn-sm">Cari</button>
        </form>
        <button className="btn btn-ghost btn-sm" onClick={load}><RefreshCw size={14} /> Refresh</button>
        <button className="btn btn-danger btn-sm" onClick={clearAll} disabled={clearing}>
          <Trash2 size={14} /> {clearing ? "Menghapus…" : "Hapus Semua"}
        </button>
      </div>

      <div style={{ fontSize: 13, color: "var(--text-muted)" }}>{fmt(total)} entri log ditemukan</div>

      {/* table */}
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Waktu</th>
              <th>Tenaga Kesehatan</th>
              <th>Role</th>
              <th>Aktivitas</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={6} style={{ textAlign: "center", padding: 40, color: "var(--text-muted)" }}>Memuat…</td></tr>
            ) : logs.length === 0 ? (
              <tr><td colSpan={6} style={{ textAlign: "center", padding: 40, color: "var(--text-muted)" }}>Tidak ada log.</td></tr>
            ) : logs.map((log, i) => (
              <tr key={log.id_log}>
                <td style={{ color: "var(--text-muted)", fontSize: 12 }}>{(page - 1) * 20 + i + 1}</td>
                <td style={{ whiteSpace: "nowrap", fontSize: 12 }}>{fmtDate(log.waktu)}</td>
                <td>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 28, height: 28, borderRadius: "50%", background: "var(--primary-light)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "var(--primary-dark)", flexShrink: 0 }}>
                      {(log.nakes?.nama || "?")[0].toUpperCase()}
                    </div>
                    <div>
                      <p style={{ fontSize: 13, fontWeight: 600 }}>{log.nakes?.nama || "—"}</p>
                      <p style={{ fontSize: 11, color: "var(--text-muted)" }}>{log.nakes?.email || ""}</p>
                    </div>
                  </div>
                </td>
                <td>
                  <span className={`badge ${BADGE_ROLE[log.nakes?.role?.nama_role] || "badge-default"}`}>
                    {log.nakes?.role?.nama_role || "—"}
                  </span>
                </td>
                <td style={{ maxWidth: 320, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{log.aktivitas}</td>
                <td>
                  <button className="btn btn-danger btn-sm" onClick={() => deleteOne(log.id_log)}>
                    <Trash2 size={12} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* pagination */}
      {pages > 1 && (
        <div style={{ display: "flex", alignItems: "center", gap: 10, justifyContent: "center" }}>
          <button className="btn btn-ghost btn-sm" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>
            <ChevronLeft size={14} />
          </button>
          <span style={{ fontSize: 13, color: "var(--text-secondary)" }}>Halaman {page} / {pages}</span>
          <button className="btn btn-ghost btn-sm" onClick={() => setPage(p => Math.min(pages, p + 1))} disabled={page === pages}>
            <ChevronRight size={14} />
          </button>
        </div>
      )}
    </div>
  );
}

/* ─── TAB: User Management ─── */
function UsersTab() {
  const [users, setUsers]     = useState([]);
  const [roles, setRoles]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ]             = useState("");
  const [search, setSearch]   = useState("");
  const [roleFilter, setRoleFilter] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [uRes, rRes] = await Promise.all([
        fetch(`/api/admin/users?${search ? `q=${encodeURIComponent(search)}&` : ""}${roleFilter ? `role_id=${roleFilter}` : ""}`),
        fetch("/api/roles"),
      ]);
      setUsers(await uRes.json());
      setRoles(await rRes.json());
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  }, [search, roleFilter]);

  useEffect(() => { load(); }, [load]);

  const handleSearch = (e) => { e.preventDefault(); setSearch(q); };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
        <form onSubmit={handleSearch} style={{ display: "flex", gap: 8, flex: 1 }}>
          <div style={{ position: "relative", flex: 1 }}>
            <Search size={14} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
            <input value={q} onChange={e => setQ(e.target.value)} className="input" style={{ paddingLeft: 36 }} placeholder="Cari nama, email, atau No. STR…" />
          </div>
          <button type="submit" className="btn btn-primary btn-sm">Cari</button>
        </form>
        <select value={roleFilter} onChange={e => { setRoleFilter(e.target.value); }} className="input" style={{ width: 160 }}>
          <option value="">Semua Role</option>
          {roles.map(r => <option key={r.id_role} value={r.id_role}>{r.nama_role}</option>)}
        </select>
        <button className="btn btn-ghost btn-sm" onClick={load}><RefreshCw size={14} /></button>
      </div>

      <div style={{ fontSize: 13, color: "var(--text-muted)" }}>{fmt(users.length)} pengguna</div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Nama</th>
              <th>Email</th>
              <th>No. STR</th>
              <th>Role</th>
              <th>Unit</th>
              <th>Rekam Medis</th>
              <th>Log Aktivitas</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={7} style={{ textAlign: "center", padding: 40, color: "var(--text-muted)" }}>Memuat…</td></tr>
            ) : users.length === 0 ? (
              <tr><td colSpan={7} style={{ textAlign: "center", padding: 40, color: "var(--text-muted)" }}>Tidak ada pengguna.</td></tr>
            ) : users.map((u) => (
              <tr key={u.id_nakes}>
                <td>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 32, height: 32, borderRadius: "50%", background: "var(--primary-light)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "var(--primary-dark)", flexShrink: 0 }}>
                      {(u.nama || "?")[0].toUpperCase()}
                    </div>
                    <div>
                      <p style={{ fontWeight: 600, fontSize: 13 }}>{u.nama}</p>
                      <p style={{ fontSize: 11, color: "var(--text-muted)" }}>{u.profesi}{u.spesialisasi ? ` · ${u.spesialisasi}` : ""}</p>
                    </div>
                  </div>
                </td>
                <td style={{ fontSize: 13 }}>{u.email || "—"}</td>
                <td><code style={{ fontSize: 11, padding: "2px 6px", background: "var(--surface-hover)", borderRadius: 4 }}>{u.no_str}</code></td>
                <td><span className={`badge ${BADGE_ROLE[u.role?.nama_role] || "badge-default"}`}>{u.role?.nama_role || "—"}</span></td>
                <td><span className="badge badge-default">{u.unit?.nama_unit || "—"}</span></td>
                <td style={{ textAlign: "center" }}>
                  <span className="badge badge-info">{u._count?.rekam_medis ?? 0}</span>
                </td>
                <td style={{ textAlign: "center" }}>
                  <span className="badge badge-default">{u._count?.log_aktivitas ?? 0}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ─── TAB: Database Info ─── */
function DatabaseTab({ stats }) {
  if (!stats) return <div style={{ textAlign: "center", padding: 60, color: "var(--text-muted)" }}>Memuat…</div>;
  const { overview } = stats;

  const tables = [
    { name: "pasien",           label: "Pasien",           count: overview.totalPasien,      color: "#0EA5E9" },
    { name: "tenaga_kesehatan", label: "Tenaga Kesehatan", count: overview.totalNakes,       color: "#8B5CF6" },
    { name: "rekam_medis",      label: "Rekam Medis",      count: overview.totalRekamMedis,  color: "#10B981" },
    { name: "klaim",            label: "Klaim",            count: overview.totalKlaim,       color: "#F59E0B" },
    { name: "diagnosis",        label: "Diagnosis (ICD-10)",count: overview.totalDiagnosis,  color: "#06B6D4" },
    { name: "tindakan",         label: "Tindakan (ICD-9)", count: overview.totalTindakan,    color: "#EC4899" },
    { name: "tarif_cbgs",       label: "Tarif CBGs",       count: overview.totalCbgs,        color: "#EF4444" },
  ];

  const maxCount = Math.max(...tables.map(t => t.count));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div className="card" style={{ padding: 24 }}>
        <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 20 }}>Ringkasan Tabel Database (MySQL)</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {tables.map(t => (
            <div key={t.name}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <div>
                  <span style={{ fontSize: 13, fontWeight: 600 }}>{t.label}</span>
                  <code style={{ fontSize: 11, color: "var(--text-muted)", marginLeft: 8 }}>{t.name}</code>
                </div>
                <span style={{ fontSize: 13, fontWeight: 700, color: t.color }}>{fmt(t.count)} records</span>
              </div>
              <div style={{ height: 8, background: "var(--border)", borderRadius: 99, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${(t.count / maxCount) * 100}%`, background: t.color, borderRadius: 99, transition: "width 0.6s ease" }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card" style={{ padding: 24, background: "linear-gradient(135deg,#0F172A,#1E293B)", color: "white" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
          <Database size={20} color="#38BDF8" />
          <h3 style={{ fontSize: 15, fontWeight: 700 }}>Koneksi Database</h3>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {[
            ["Engine",    "MySQL via Prisma ORM"],
            ["Database",  "casemix_db"],
            ["Host",      "localhost:3306"],
            ["Adapter",   "@prisma/adapter-mariadb"],
            ["ORM",       "Prisma v7.x"],
            ["Status",    "🟢 Terhubung"],
          ].map(([k, v]) => (
            <div key={k} style={{ background: "rgba(255,255,255,.06)", borderRadius: 10, padding: "10px 14px" }}>
              <p style={{ fontSize: 11, color: "#94A3B8", marginBottom: 2 }}>{k}</p>
              <p style={{ fontSize: 13, fontWeight: 600, color: "white" }}>{v}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── MAIN PAGE ─── */
const TABS = [
  { id: "overview",  label: "Overview",         icon: BarChart3  },
  { id: "logs",      label: "Audit Log",        icon: Activity   },
  { id: "users",     label: "Manajemen User",   icon: Users      },
  { id: "database",  label: "Info Database",    icon: Database   },
];

export default function AdminPage() {
  const [tab, setTab]     = useState("overview");
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetch("/api/admin/stats").then(r => r.json()).then(setStats).catch(console.error);
  }, []);

  return (
    <DashboardLayout title="Admin Panel" subtitle="Kelola sistem, audit log, dan pengguna">
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 8 }}>
        <div style={{ width: 46, height: 46, borderRadius: 14, background: "linear-gradient(135deg,#EF4444,#DC2626)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Shield size={22} color="white" />
        </div>
        <div>
          <h2 style={{ fontSize: 16, fontWeight: 800 }}>Admin Panel</h2>
          <p style={{ fontSize: 12, color: "var(--text-muted)" }}>Akses penuh ke log, pengguna, dan statistik sistem</p>
        </div>
        <div style={{ marginLeft: "auto" }}>
          <span className="badge badge-danger" style={{ fontSize: 12 }}>
            <AlertTriangle size={12} /> Admin Only
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 4, background: "var(--surface-hover)", padding: 4, borderRadius: 12, marginBottom: 24, width: "fit-content" }}>
        {TABS.map(({ id, label, icon: Icon }) => (
          <button key={id} onClick={() => setTab(id)}
            className="btn btn-sm"
            style={{
              background: tab === id ? "var(--surface)" : "transparent",
              color: tab === id ? "var(--text-primary)" : "var(--text-muted)",
              boxShadow: tab === id ? "var(--shadow-sm)" : "none",
              fontWeight: tab === id ? 600 : 400,
              border: "none",
              transition: "all 0.2s",
            }}>
            <Icon size={14} /> {label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="animate-fade-in-up">
        {tab === "overview"  && <OverviewTab stats={stats} />}
        {tab === "logs"      && <AuditLogTab />}
        {tab === "users"     && <UsersTab />}
        {tab === "database"  && <DatabaseTab stats={stats} />}
      </div>
    </DashboardLayout>
  );
}
