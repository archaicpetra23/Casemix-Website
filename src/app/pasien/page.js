// src/app/pasien/page.js
"use client";

import { useState, useEffect, useCallback } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import DataTable from "@/components/ui/DataTable";
import Modal, { ConfirmDialog } from "@/components/ui/Modal";
import { Plus, Pencil, Trash2, UserCircle } from "lucide-react";
import { patientsApi } from "@/lib/api";

const EMPTY = { nik:"", nama:"", tanggal_lahir:"", jenis_kelamin:"L", alamat:"", no_hp:"" };

const COLUMNS = [
  { key:"formatted_id_pasien", label:"ID Pasien", sortable:true,
    render:(v) => <code style={{ fontSize:12, background:"var(--surface-hover)", padding:"2px 6px", borderRadius:4 }}>{v}</code> },
  { key:"nik",            label:"NIK",           sortable:true  },
  { key:"nama",           label:"Nama Pasien",   sortable:true  },
  { key:"tanggal_lahir",  label:"Tgl. Lahir",    sortable:false,
    render:(v) => v ? new Date(v).toLocaleDateString("id-ID") : "—" },
  { key:"jenis_kelamin",  label:"Jenis Kelamin", sortable:false,
    render:(v) => v === "L" ? "Laki-laki" : "Perempuan" },
  { key:"no_hp",          label:"No. HP",        sortable:false },
  { key:"alamat",         label:"Alamat",         sortable:false,
    render:(v) => <span style={{ maxWidth:180, display:"block", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{v||"—"}</span> },
  { key:"_count",         label:"Rekam Medis",   sortable:false,
    render:(v) => v ? <span style={{ fontSize:12, color:"var(--text-muted)" }}>{v.rekam_medis} RM</span> : "—" },
];

export default function PasienPage() {
  const [data, setData]       = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);
  const [form, setForm]       = useState(EMPTY);
  const [editId, setEditId]   = useState(null);
  const [showModal, setShow]  = useState(false);
  const [delId, setDelId]     = useState(null);
  const [saving, setSaving]   = useState(false);
  const [saveErr, setSaveErr] = useState("");

  const load = useCallback(async () => {
    try {
      const res = await patientsApi.list();
      setData(res.map(r => ({ ...r, formatted_id_pasien: String(r.id_pasien).padStart(6, '0') })));
      setError(null);
    } catch (e) { setError(e.message); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { load(); }, [load]);

  const openAdd  = ()    => { setForm(EMPTY); setEditId(null); setSaveErr(""); setShow(true); };
  const openEdit = (row) => { setForm({ ...row, tanggal_lahir: row.tanggal_lahir ? row.tanggal_lahir.slice(0,10) : "" }); setEditId(row.id_pasien); setSaveErr(""); setShow(true); };
  const close    = ()    => { setShow(false); setForm(EMPTY); setEditId(null); setSaveErr(""); };

  const handleSave = async () => {
    if (!form.nik || !form.nama) return;
    setSaving(true); setSaveErr("");
    try {
      if (editId) await patientsApi.update(editId, form);
      else        await patientsApi.create(form);
      close(); load();
    } catch (e) { setSaveErr(e.message); }
    finally { setSaving(false); }
  };

  const handleDelete = async () => {
    if (!delId) return;
    await patientsApi.remove(delId);
    setDelId(null); load();
  };

  return (
    <DashboardLayout title="Data Pasien" subtitle="Manajemen data pasien rumah sakit">
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <div style={{ display:"flex", alignItems:"center", gap:12 }}>
          <div style={{ width:42, height:42, borderRadius:12, background:"var(--info-light)", display:"flex", alignItems:"center", justifyContent:"center" }}>
            <UserCircle size={22} color="var(--info)" />
          </div>
          <div>
            <h2 style={{ fontSize:15, fontWeight:700 }}>Daftar Pasien</h2>
            <p style={{ fontSize:12, color:"var(--text-muted)" }}>{data.length} pasien terdaftar · dari MySQL</p>
          </div>
        </div>
        <button id="btn-tambah-pasien" className="btn btn-primary" onClick={openAdd}>
          <Plus size={16} /> Tambah Pasien
        </button>
      </div>

      {error && (
        <div style={{ background:"var(--danger-light)", border:"1px solid #FECACA", borderRadius:"var(--radius-md)", padding:"10px 16px", fontSize:13, color:"var(--danger)" }}>
          ⚠️ Error: {error}
        </div>
      )}

      <DataTable
        columns={COLUMNS} data={data} loading={loading}
        emptyMessage="Belum ada data pasien. Klik 'Tambah Pasien' atau jalankan 'npx prisma db seed'."
        actions={(row) => (
          <div style={{ display:"flex", gap:6 }}>
            <button className="btn btn-secondary btn-sm" onClick={() => openEdit(row)} title="Edit"><Pencil size={13} /></button>
            <button className="btn btn-danger btn-sm"    onClick={() => setDelId(row.id_pasien)} title="Hapus"><Trash2 size={13} /></button>
          </div>
        )}
      />

      <Modal
        isOpen={showModal} onClose={close}
        title={editId ? "Edit Data Pasien" : "Tambah Pasien Baru"}
        footer={
          <>
            <button className="btn btn-ghost" onClick={close}>Batal</button>
            <button id="btn-simpan-pasien" className="btn btn-primary" onClick={handleSave} disabled={saving || !form.nik || !form.nama}>
              {saving ? "Menyimpan..." : editId ? "Simpan Perubahan" : "Tambah Pasien"}
            </button>
          </>
        }
      >
        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
          {saveErr && <div style={{ background:"var(--danger-light)", borderRadius:"var(--radius-md)", padding:"8px 12px", fontSize:13, color:"var(--danger)" }}>{saveErr}</div>}
          {[
            { key:"nik",          label:"NIK *",          type:"text", ph:"3271234567890001" },
            { key:"nama",         label:"Nama Lengkap *", type:"text", ph:"Budi Santoso" },
            { key:"tanggal_lahir", label:"Tanggal Lahir",  type:"date", ph:"" },
            { key:"no_hp",         label:"No. HP",         type:"text", ph:"081234567890" },
            { key:"alamat",        label:"Alamat",          type:"text", ph:"Jl. Merdeka No. 1" },
          ].map(({ key, label, type, ph }) => (
            <div key={key} className="input-group">
              <label className="input-label">{label}</label>
              <input type={type} value={form[key]||""} onChange={e => setForm(f=>({...f,[key]:e.target.value}))} placeholder={ph} className="input" />
            </div>
          ))}
          <div className="input-group">
            <label className="input-label">Jenis Kelamin</label>
            <select value={form.jenis_kelamin} onChange={e => setForm(f=>({...f,jenis_kelamin:e.target.value}))} className="input">
              <option value="L">Laki-laki</option>
              <option value="P">Perempuan</option>
            </select>
          </div>
        </div>
      </Modal>

      <ConfirmDialog
        isOpen={!!delId} onClose={() => setDelId(null)} onConfirm={handleDelete}
        title="Hapus Data Pasien"
        message="Hapus pasien ini? Semua rekam medis dan klaim terkait juga akan dihapus (CASCADE)."
        confirmLabel="Ya, Hapus" confirmClass="btn btn-danger"
      />
    </DashboardLayout>
  );
}
