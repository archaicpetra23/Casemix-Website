// src/app/dashboard/page.js
"use client";

import { useState, useEffect, useCallback } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import StatCard from "@/components/ui/StatCard";
import StatusBadge from "@/components/ui/StatusBadge";
import { Users, CreditCard, CheckCircle, XCircle, Clock, Activity } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from "recharts";
import { dashboardApi } from "@/lib/api";

const PIE_COLORS = ["#10B981", "#F59E0B", "#EF4444"];

const FALLBACK = {
  stats: { totalPasien: 0, totalKlaim: 0, klaimPending: 0, klaimDisetujui: 0, klaimDitolak: 0 },
  klaimTerbaru: [],
  diagnosisChart: [],
};

function rupiahFormat(n) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(n);
}

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="card" style={{ padding: "10px 14px", fontSize: 13 }}>
      <p style={{ fontWeight: 600, marginBottom: 4 }}>{label}</p>
      <p style={{ color: "var(--primary)" }}>{payload[0].value} kasus</p>
    </div>
  );
};

export default function DashboardPage() {
  const [data, setData]       = useState(FALLBACK);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  const fetchData = useCallback(async () => {
    try {
      const res = await dashboardApi.stats();
      setData(res);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    // Polling setiap 30 detik
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, [fetchData]);

  const { stats, klaimTerbaru, diagnosisChart } = data;

  const pieData = [
    { name: "Disetujui", value: stats.klaimDisetujui },
    { name: "Pending",   value: stats.klaimPending   },
    { name: "Ditolak",   value: stats.klaimDitolak   },
  ];

  const today = new Date().toLocaleDateString("id-ID", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  });

  return (
    <DashboardLayout title="Dashboard" subtitle={today}>
      {error && (
        <div style={{ background:"var(--warning-light)", border:"1px solid #FDE68A", borderRadius:"var(--radius-md)", padding:"10px 16px", fontSize:13, color:"#92400E" }}>
          ⚠️ Tidak dapat terhubung ke database: {error}. Pastikan MySQL berjalan dan jalankan <code>npx prisma migrate dev</code>.
        </div>
      )}

      {/* Stat Cards */}
      <div className="stagger-children" style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(200px, 1fr))", gap:16 }}>
        <StatCard title="Total Pasien"    value={loading ? 0 : stats.totalPasien}    icon={Users}       color="blue"  delay={0}   trend={12} />
        <StatCard title="Total Klaim"     value={loading ? 0 : stats.totalKlaim}     icon={CreditCard}  color="cyan"  delay={80}  trend={8}  />
        <StatCard title="Klaim Pending"   value={loading ? 0 : stats.klaimPending}   icon={Clock}       color="amber" delay={160} />
        <StatCard title="Klaim Disetujui" value={loading ? 0 : stats.klaimDisetujui} icon={CheckCircle} color="green" delay={240} trend={5}  />
        <StatCard title="Klaim Ditolak"   value={loading ? 0 : stats.klaimDitolak}   icon={XCircle}     color="red"   delay={320} />
      </div>

      {/* Charts */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 340px", gap:20 }}>
        <div className="card animate-fade-in-up" style={{ padding:"22px 20px", animationDelay:"200ms", animationFillMode:"both" }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20 }}>
            <div>
              <h3 style={{ fontSize:15, fontWeight:700 }}>Penyakit Terbanyak</h3>
              <p style={{ fontSize:12, color:"var(--text-muted)", marginTop:2 }}>Berdasarkan kode ICD-10</p>
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:6, background:"var(--primary-light)", padding:"4px 10px", borderRadius:99 }}>
              <Activity size={12} color="var(--primary-dark)" />
              <span style={{ fontSize:12, fontWeight:600, color:"var(--primary-dark)" }}>Bulan Ini</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={diagnosisChart.length ? diagnosisChart : [{ name:"Belum ada data", count:0 }]} barSize={28}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="name" tick={{ fontSize:12, fill:"var(--text-muted)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize:12, fill:"var(--text-muted)" }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="count" fill="url(#barGradient)" radius={[6,6,0,0]} />
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0EA5E9" stopOpacity={0.9} />
                  <stop offset="100%" stopColor="#06B6D4" stopOpacity={0.7} />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card animate-fade-in-up" style={{ padding:"22px 20px", animationDelay:"280ms", animationFillMode:"both" }}>
          <h3 style={{ fontSize:15, fontWeight:700, marginBottom:4 }}>Status Klaim</h3>
          <p style={{ fontSize:12, color:"var(--text-muted)", marginBottom:16 }}>Distribusi status klaim BPJS</p>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={4} dataKey="value">
                {pieData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i]} />)}
              </Pie>
              <Tooltip formatter={(v) => `${v} klaim`} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize:12, color:"var(--text-secondary)" }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Claims */}
      <div className="card animate-fade-in-up" style={{ overflow:"hidden", animationDelay:"360ms", animationFillMode:"both" }}>
        <div style={{ padding:"18px 20px", borderBottom:"1px solid var(--border)", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div>
            <h3 style={{ fontSize:15, fontWeight:700 }}>Klaim Terbaru</h3>
            <p style={{ fontSize:12, color:"var(--text-muted)", marginTop:2 }}>5 klaim terakhir dari MySQL</p>
          </div>
          <a href="/klaim" className="btn btn-secondary btn-sm" style={{ fontSize:12 }}>Lihat Semua →</a>
        </div>
        <div style={{ overflowX:"auto" }}>
          <table className="data-table">
            <thead>
              <tr><th>ID Klaim</th><th>Pasien</th><th>Kode CBGs</th><th>Status</th></tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({length:5}).map((_,i) => (
                  <tr key={i}>{Array.from({length:4}).map((_,j) => <td key={j}><div className="skeleton" style={{height:14,width:"70%"}} /></td>)}</tr>
                ))
              ) : klaimTerbaru.length === 0 ? (
                <tr><td colSpan={4} style={{ textAlign:"center", padding:"32px", color:"var(--text-muted)", fontSize:14 }}>
                  Belum ada klaim. Jalankan <code>npx prisma db seed</code> untuk mengisi data contoh.
                </td></tr>
              ) : klaimTerbaru.map((row, i) => (
                <tr key={row.id_klaim} className="animate-fade-in" style={{ animationDelay:`${i*50}ms`, animationFillMode:"both" }}>
                  <td><code style={{ fontSize:12, background:"var(--surface-hover)", padding:"2px 6px", borderRadius:4 }}>{row.id_klaim}</code></td>
                  <td style={{ fontWeight:500 }}>{row.patient}</td>
                  <td><span className="badge badge-info" style={{ fontSize:11 }}>{row.kode_cbgs}</span></td>
                  <td><StatusBadge status={row.status_klaim} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
