"use client";

import { useState, useEffect, useCallback } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import DataTable from "@/components/ui/DataTable";
import Modal, { ConfirmDialog } from "@/components/ui/Modal";
import { Plus, Pencil, Trash2, UserCog, Stethoscope } from "lucide-react";
import { healthWorkersApi, rolesApi, unitsApi } from "@/lib/api";

const EMPTY = { nama:"", profesi:"", spesialisasi:"", no_str:"", email:"", password_hash:"", id_role:"", id_unit:"" };

const COLUMNS = [
  { key:"nama", label:"Nama", sortable:true,
    render:(v) => (
      <div style={{display:"flex",alignItems:"center",gap:10}}>
        <div style={{width:32,height:32,borderRadius:"50%",background:"var(--primary-light)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:700,color:"var(--primary-dark)",flexShrink:0}}>
          {(v||"?")[0].toUpperCase()}
        </div>
        <span style={{fontWeight:500}}>{v||"—"}</span>
      </div>
    ) },
  { key:"profesi", label:"Profesi", sortable:true, render: (v, row) => v + (row.spesialisasi ? ` (${row.spesialisasi})` : "") },
  { key:"no_str",  label:"No. STR", sortable:true, render:(v) => <code style={{fontSize:12, padding:"2px 6px", background:"var(--surface-hover)", borderRadius:4}}>{v}</code> },
  { key:"email",label:"Email",sortable:true },
  { key:"nama_role", label:"Role", sortable:true, filterable:true, render:(v) => <span className="badge badge-info">{v}</span> },
  { key:"nama_unit", label:"Unit", sortable:true, filterable:true, render:(v) => <span className="badge badge-default">{v}</span> },
];

export default function NakesPage() {
  const [data, setData]       = useState([]);
  const [roles, setRoles]     = useState([]);
  const [units, setUnits]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm]       = useState(EMPTY);
  const [editId, setEditId]   = useState(null);
  const [showModal, setShow]  = useState(false);
  const [delId, setDelId]     = useState(null);
  const [saving, setSaving]   = useState(false);
  const [saveErr, setSaveErr] = useState("");

  const load = useCallback(async () => {
    try {
      const [workers, r, u] = await Promise.all([healthWorkersApi.list(), rolesApi.list(), unitsApi.list()]);
      setData(workers.map(w => ({
        ...w,
        nama_role: w.role?.nama_role ?? "—",
        nama_unit: w.unit?.nama_unit ?? "—"
      })));
      setRoles(r); setUnits(u);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { load(); }, [load]);

  const openAdd  = () => { setForm(EMPTY); setEditId(null); setSaveErr(""); setShow(true); };
  const openEdit = (row) => { setForm({...row, id_role:String(row.id_role), id_unit:String(row.id_unit), password_hash:""}); setEditId(row.id_nakes); setSaveErr(""); setShow(true); };
  const close    = () => { setShow(false); setSaveErr(""); };

  const handleSave = async () => {
    if (!form.nama || !form.no_str || !form.email || !form.id_role || !form.id_unit) return;
    setSaving(true); setSaveErr("");
    
    // Prepare payload
    const payload = {
      nama: form.nama, profesi: form.profesi, spesialisasi: form.spesialisasi, no_str: form.no_str,
      email: form.email, id_role: Number(form.id_role), id_unit: Number(form.id_unit)
    };
    if (form.password_hash) payload.password_hash = form.password_hash;
    else if (!editId) payload.password_hash = "default_password"; // Dummy for demo

    try {
      if (editId) await healthWorkersApi.update(editId, payload);
      else        await healthWorkersApi.create(payload);
      close(); load();
    } catch (e) { setSaveErr(e.message); }
    finally { setSaving(false); }
  };

  const handleDelete = async () => {
    await healthWorkersApi.remove(delId); setDelId(null); load();
  };

  return (
    <DashboardLayout title="Manajemen Tenaga Kesehatan" subtitle="Kelola data tenaga kesehatan & akun sistem">
      
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <div style={{width:42,height:42,borderRadius:12,background:"#EDE9FE",display:"flex",alignItems:"center",justifyContent:"center"}}>
            <Stethoscope size={22} color="#7C3AED" />
          </div>
          <div>
            <h2 style={{fontSize:15,fontWeight:700}}>Daftar Tenaga Kesehatan</h2>
            <p style={{fontSize:12,color:"var(--text-muted)"}}>{data.length} tenaga kesehatan · data dari MySQL</p>
          </div>
        </div>
        <button className="btn btn-primary" onClick={openAdd}><Plus size={16}/> Tambah Nakes</button>
      </div>

      <DataTable columns={COLUMNS} data={data} loading={loading}
        emptyMessage="Belum ada tenaga kesehatan. Jalankan 'npx prisma db seed'."
        actions={(row) => (
          <div style={{display:"flex",gap:6}}>
            <button className="btn btn-secondary btn-sm" onClick={() => openEdit(row)}><Pencil size={13}/></button>
            <button className="btn btn-danger btn-sm"    onClick={() => setDelId(row.id_nakes)}><Trash2 size={13}/></button>
          </div>
        )}
      />

      <Modal isOpen={showModal} onClose={close} title={editId ? "Edit Tenaga Kesehatan" : "Tambah Tenaga Kesehatan"}
        footer={<>
          <button className="btn btn-ghost" onClick={close}>Batal</button>
          <button className="btn btn-primary" onClick={handleSave} disabled={saving || !form.nama || !form.no_str || !form.email || !form.id_role || !form.id_unit}>
            {saving ? "Menyimpan..." : editId ? "Simpan" : "Tambah"}
          </button>
        </>}>
        <div style={{display:"flex",flexDirection:"column",gap:14}}>
          {saveErr && <div style={{background:"var(--danger-light)",borderRadius:"var(--radius-md)",padding:"8px 12px",fontSize:13,color:"var(--danger)"}}>{saveErr}</div>}
          
          <div className="input-group"><label className="input-label">Nama Lengkap *</label>
            <input type="text" value={form.nama} onChange={e=>setForm(f=>({...f,nama:e.target.value}))} className="input" placeholder="dr. Susi Susanti" /></div>
          
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
            <div className="input-group"><label className="input-label">Profesi</label>
              <input type="text" value={form.profesi||""} onChange={e=>setForm(f=>({...f,profesi:e.target.value}))} className="input" placeholder="Dokter / Perawat" /></div>
            <div className="input-group"><label className="input-label">Spesialisasi</label>
              <input type="text" value={form.spesialisasi||""} onChange={e=>setForm(f=>({...f,spesialisasi:e.target.value}))} className="input" placeholder="Penyakit Dalam" /></div>
          </div>

          <div className="input-group"><label className="input-label">No. STR *</label>
            <input type="text" value={form.no_str} onChange={e=>setForm(f=>({...f,no_str:e.target.value}))} className="input" placeholder="STR-123-456" /></div>

          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
            <div className="input-group"><label className="input-label">Role Akses *</label>
              <select value={form.id_role} onChange={e=>setForm(f=>({...f,id_role:e.target.value}))} className="input">
                <option value="">-- Pilih Role --</option>
                {roles.map(r => <option key={r.id_role} value={r.id_role}>{r.nama_role}</option>)}
              </select></div>
            <div className="input-group"><label className="input-label">Unit Kerja *</label>
              <select value={form.id_unit} onChange={e=>setForm(f=>({...f,id_unit:e.target.value}))} className="input">
                <option value="">-- Pilih Unit --</option>
                {units.map(u => <option key={u.id_unit} value={u.id_unit}>{u.nama_unit}</option>)}
              </select></div>
          </div>

          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginTop:8,paddingTop:14,borderTop:"1px solid var(--border)"}}>
            <div className="input-group">
              <label className="label text-sm font-semibold text-gray-700">Email <span className="text-red-500">*</span></label>
              <input type="text" value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))} className="input" placeholder="susi@rs.com" /></div>
            <div className="input-group"><label className="input-label">Password {editId && "(Kosongkan jika tidak diubah)"}</label>
              <input type="password" value={form.password_hash} onChange={e=>setForm(f=>({...f,password_hash:e.target.value}))} className="input" placeholder="***" /></div>
          </div>
        </div>
      </Modal>

      <ConfirmDialog isOpen={!!delId} onClose={() => setDelId(null)} onConfirm={handleDelete}
        title="Hapus Tenaga Kesehatan" message="Hapus data tenaga kesehatan ini? Semua log aktivitas dan rekam medisnya mungkin akan terpengaruh jika tidak CASCADE."
        confirmLabel="Ya, Hapus" confirmClass="btn btn-danger" />
    </DashboardLayout>
  );
}
