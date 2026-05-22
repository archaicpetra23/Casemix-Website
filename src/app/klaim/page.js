// src/app/klaim/page.js — sesuai ERD (klaim → rekam_medis → pasien)
"use client";
import { useState, useEffect, useCallback } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import DataTable from "@/components/ui/DataTable";
import StatusBadge from "@/components/ui/StatusBadge";
import Modal, { ConfirmDialog } from "@/components/ui/Modal";
import { Plus, Pencil, Trash2, CreditCard, CheckCircle, Clock, XCircle } from "lucide-react";
import { claimsApi, recordsApi, inaCbgsApi } from "@/lib/api";

const EMPTY = { id_rekam:"", kode_cbgs:"", status_klaim:"pending", tanggal_klaim:"" };
const STATUS_OPTIONS = ["pending","disetujui","ditolak"];

const COLUMNS = [
  { key:"id_klaim", label:"ID", sortable:true, render:(v) => <code style={{ fontSize:12, background:"var(--surface-hover)", padding:"2px 6px", borderRadius:4 }}>{String(v).padStart(6, '0')}</code> },
  { key:"nama_pasien", label:"Pasien", sortable:true },
  { key:"kode_cbg", label:"Kode CBGs", sortable:true, filterable:true,
    render:(v) => v !== "—" ? <span className="badge badge-default" style={{ fontSize:11 }}>{v}</span> : "—" },
  { key:"status_klaim", label:"Status", sortable:true, filterable:true, render:(v) => <StatusBadge status={v} /> },
  { key:"tarif_cbg", label:"INA-CBG's (Tarif)", sortable:true, render:(v) => <span style={{fontWeight:600}}>{rupiahFormat(v)}</span> },
];

function rupiahFormat(n) { return new Intl.NumberFormat("id-ID", { style:"currency", currency:"IDR", minimumFractionDigits:0 }).format(Number(n)||0); }

export default function KlaimPage() {
  const [data, setData] = useState([]);
  const [records, setRecords] = useState([]);
  const [cbgs, setCbgs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("semua");
  const [form, setForm] = useState(EMPTY);
  const [editId, setEditId] = useState(null);
  const [showModal, setShow] = useState(false);
  const [delId, setDelId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saveErr, setSaveErr] = useState("");

  const load = useCallback(async () => {
    try {
      const [claims, recs, cbgsList] = await Promise.all([claimsApi.list(), recordsApi.list(), inaCbgsApi.list()]);
      setData(claims.map(c => ({
        ...c,
        nama_pasien: c.rekam_medis?.pasien?.nama ?? "—",
        tarif_cbg: c.tarif_cbgs?.tarif ?? 0,
        kode_cbg: c.tarif_cbgs?.kode_cbgs ?? "—"
      })));
      setRecords(recs); setCbgs(cbgsList);
    } catch (e) { console.error(e); } finally { setLoading(false); }
  }, []);
  useEffect(() => { load(); }, [load]);

  const filtered = filter === "semua" ? data : data.filter(d => d.status_klaim === filter);
  const counts = { pending: data.filter(d => d.status_klaim === "pending").length, disetujui: data.filter(d => d.status_klaim === "disetujui").length, ditolak: data.filter(d => d.status_klaim === "ditolak").length };

  const openAdd = () => { setForm(EMPTY); setEditId(null); setSaveErr(""); setShow(true); };
  const openEdit = (row) => {
    setForm({ id_rekam:String(row.id_rekam), kode_cbgs:row.kode_cbgs||"", status_klaim:row.status_klaim, tanggal_klaim:row.tanggal_klaim ? row.tanggal_klaim.slice(0,10) : "" });
    setEditId(row.id_klaim); setSaveErr(""); setShow(true);
  };
  const close = () => { setShow(false); setForm(EMPTY); setEditId(null); setSaveErr(""); };

  const handleSave = async () => {
    if (!form.id_rekam) return;
    setSaving(true); setSaveErr("");
    try {
      if (editId) await claimsApi.update(editId, form);
      else await claimsApi.create(form);
      close(); load();
    } catch (e) { setSaveErr(e.message); } finally { setSaving(false); }
  };
  const handleDelete = async () => { await claimsApi.remove(delId); setDelId(null); load(); };

  return (
    <DashboardLayout title="Klaim BPJS" subtitle="Monitoring klaim pasien">
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:14 }}>
        {[{ label:"Pending", key:"pending", color:"amber", icon:Clock }, { label:"Disetujui", key:"disetujui", color:"green", icon:CheckCircle }, { label:"Ditolak", key:"ditolak", color:"red", icon:XCircle }].map(({ label, key, color, icon:Icon }, i) => {
          const c = { amber:{bg:"var(--warning-light)",text:"var(--warning)",border:"#FDE68A"}, green:{bg:"var(--success-light)",text:"var(--success)",border:"#A7F3D0"}, red:{bg:"var(--danger-light)",text:"var(--danger)",border:"#FECACA"} }[color];
          return (<div key={key} className="card animate-fade-in-up" style={{ padding:"16px 20px", animationDelay:`${i*80}ms`, animationFillMode:"both", background:c.bg, borderColor:c.border, display:"flex", alignItems:"center", gap:12, cursor:"pointer", outline:filter===key?`2px solid ${c.text}`:"none" }} onClick={() => setFilter(filter===key?"semua":key)}>
            <Icon size={22} color={c.text} /><div><p style={{ fontSize:24, fontWeight:800, lineHeight:1 }}>{counts[key]}</p><p style={{ fontSize:12, color:c.text, fontWeight:600 }}>{label}</p></div></div>);
        })}
      </div>

      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <div style={{ display:"flex", alignItems:"center", gap:12 }}>
          <div style={{ width:42, height:42, borderRadius:12, background:"var(--primary-light)", display:"flex", alignItems:"center", justifyContent:"center" }}><CreditCard size={22} color="var(--primary)" /></div>
          <div><h2 style={{ fontSize:15, fontWeight:700 }}>Daftar Klaim</h2><p style={{ fontSize:12, color:"var(--text-muted)" }}>{filtered.length} klaim</p></div>
        </div>
        <div style={{ display:"flex", gap:8 }}>
          {filter!=="semua" && <button className="btn btn-ghost btn-sm" onClick={() => setFilter("semua")}>× Hapus Filter</button>}
          <button className="btn btn-primary" onClick={openAdd}><Plus size={16} /> Tambah Klaim</button>
        </div>
      </div>

      <DataTable columns={COLUMNS} data={filtered} loading={loading} emptyMessage="Tidak ada klaim."
        actions={(row) => (<div style={{ display:"flex", gap:6 }}>
          <button className="btn btn-secondary btn-sm" onClick={() => openEdit(row)}><Pencil size={13} /></button>
          <button className="btn btn-danger btn-sm" onClick={() => setDelId(row.id_klaim)}><Trash2 size={13} /></button>
        </div>)} />

      <Modal isOpen={showModal} onClose={close} title={editId ? "Edit Klaim" : "Tambah Klaim"}
        footer={<><button className="btn btn-ghost" onClick={close}>Batal</button>
          <button className="btn btn-primary" onClick={handleSave} disabled={saving || !form.id_rekam}>{saving ? "Menyimpan..." : editId ? "Simpan" : "Tambah Klaim"}</button></>}>
        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
          {saveErr && <div style={{ background:"var(--danger-light)", borderRadius:"var(--radius-md)", padding:"8px 12px", fontSize:13, color:"var(--danger)" }}>{saveErr}</div>}
          <div className="input-group"><label className="input-label">Rekam Medis *</label>
            <select value={form.id_rekam} onChange={e => setForm(f=>({...f,id_rekam:e.target.value}))} className="input">
              <option value="">-- Pilih Rekam Medis --</option>
              {records.map(r => <option key={r.id_rekam} value={r.id_rekam}>#{r.id_rekam} — {r.pasien?.nama} ({r.tanggal_kunjungan ? new Date(r.tanggal_kunjungan).toLocaleDateString("id-ID") : "—"})</option>)}
            </select></div>
          <div className="input-group"><label className="input-label">Kode CBGs</label>
            <select value={form.kode_cbgs} onChange={e => setForm(f=>({...f,kode_cbgs:e.target.value}))} className="input">
              <option value="">-- Pilih Tarif CBGs --</option>
              {cbgs.map(c => <option key={c.kode_cbgs} value={c.kode_cbgs}>{c.kode_cbgs} — {c.deskripsi} ({rupiahFormat(c.tarif)})</option>)}
            </select></div>
          <div className="input-group"><label className="input-label">Status Klaim</label>
            <select value={form.status_klaim} onChange={e => setForm(f=>({...f,status_klaim:e.target.value}))} className="input" disabled={!editId}>
              {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase()+s.slice(1)}</option>)}
            </select></div>
          <div className="input-group"><label className="input-label">Tanggal Klaim</label>
            <input type="date" value={form.tanggal_klaim} onChange={e => setForm(f=>({...f,tanggal_klaim:e.target.value}))} className="input" /></div>
        </div>
      </Modal>
      <ConfirmDialog isOpen={!!delId} onClose={() => setDelId(null)} onConfirm={handleDelete}
        title="Hapus Klaim" message="Hapus klaim ini?" confirmLabel="Ya, Hapus" confirmClass="btn btn-danger" />
    </DashboardLayout>
  );
}
