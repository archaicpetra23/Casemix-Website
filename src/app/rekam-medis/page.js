// src/app/rekam-medis/page.js
"use client";
import { useState, useEffect, useCallback } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import DataTable from "@/components/ui/DataTable";
import Modal, { ConfirmDialog } from "@/components/ui/Modal";
import { Plus, Pencil, Trash2, FileText } from "lucide-react";
import { recordsApi, diagnosesApi, proceduresApi, patientsApi, healthWorkersApi } from "@/lib/api";

const EMPTY = { id_pasien:"", id_nakes:"", keluhan:"", tanggal_kunjungan:"", catatan:"", diagnoses:[], procedures:[] };

const COLUMNS = [
  { key:"formatted_id_rekam", label:"ID RM", sortable:true,
    render:(v) => <code style={{ fontSize:12, background:"var(--surface-hover)", padding:"2px 6px", borderRadius:4 }}>{v}</code> },
  { key:"formatted_id_pasien", label:"ID Pasien", sortable:true,
    render:(v) => <code style={{ fontSize:12, background:"var(--surface-hover)", padding:"2px 6px", borderRadius:4 }}>{v}</code> },
  { key:"pasien", label:"Pasien", sortable:true, render:(_,row) => row.pasien?.nama ?? "—" },
  { key:"tanggal_kunjungan", label:"Tgl. Kunjungan", sortable:true, render:(v) => v ? new Date(v).toLocaleDateString("id-ID") : "—" },
  { key:"keluhan", label:"Keluhan", sortable:false,
    render:(v) => <span style={{ maxWidth:200, display:"block", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{v||"—"}</span> },
  { key:"rekam_diagnosis", label:"Diagnosis (ICD-10)", sortable:false,
    render:(_,row) => (row.rekam_diagnosis?.length)
      ? row.rekam_diagnosis.map(rd => <span key={rd.diagnosis?.kode_icd10} title={`${rd.diagnosis?.nama_diagnosis} (${rd.jenis})`} className="badge badge-info" style={{ fontSize:11, marginRight:4 }}>{rd.diagnosis?.kode_icd10}</span>)
      : "—" },
  { key:"detail_tindakan", label:"Tindakan (ICD-9)", sortable:false,
    render:(_,row) => (row.detail_tindakan?.length)
      ? row.detail_tindakan.map(dt => <span key={dt.tindakan?.kode_tindakan} title={dt.tindakan?.nama_tindakan} className="badge badge-default" style={{ fontSize:11, marginRight:4 }}>{dt.tindakan?.kode_tindakan}</span>)
      : "—" },
  { key:"nakes", label:"Dokter", sortable:false, render:(_,row) => row.nakes?.nama ?? "—" },
];

export default function RekamMedisPage() {
  const [data, setData] = useState([]);
  const [patients, setPatients] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [diagnoses, setDiagnoses] = useState([]);
  const [procedures, setProcs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(EMPTY);
  const [editId, setEditId] = useState(null);
  const [showModal, setShow] = useState(false);
  const [delId, setDelId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saveErr, setSaveErr] = useState("");

  const load = useCallback(async () => {
    try {
      const [recs, pats, docs, diags, procs] = await Promise.all([
        recordsApi.list(), patientsApi.list(), healthWorkersApi.list(), diagnosesApi.list(), proceduresApi.list(),
      ]);
      setData(recs.map(r => ({
        ...r,
        formatted_id_rekam: String(r.id_rekam).padStart(6, '0'),
        formatted_id_pasien: String(r.id_pasien).padStart(6, '0')
      })));
      setPatients(pats); setWorkers(docs); setDiagnoses(diags); setProcs(procs);
    } catch (e) { console.error(e); } finally { setLoading(false); }
  }, []);
  useEffect(() => { load(); }, [load]);

  const openAdd = () => { setForm(EMPTY); setEditId(null); setSaveErr(""); setShow(true); };
  const openEdit = (row) => {
    setForm({ id_pasien:String(row.id_pasien), id_nakes:String(row.id_nakes), keluhan:row.keluhan||"", catatan:row.catatan||"",
      tanggal_kunjungan:row.tanggal_kunjungan ? row.tanggal_kunjungan.slice(0,10) : "",
      diagnoses:row.rekam_diagnosis?.map(rd => ({ kode_icd10:rd.kode_icd10, jenis:rd.jenis })) || [],
      procedures:row.detail_tindakan?.map(dt => ({ kode_tindakan:dt.kode_tindakan, jumlah:dt.jumlah })) || [],
    });
    setEditId(row.id_rekam); setSaveErr(""); setShow(true);
  };
  const close = () => { setShow(false); setForm(EMPTY); setEditId(null); setSaveErr(""); };

  const handleSave = async () => {
    if (!form.id_pasien || !form.id_nakes) return;
    setSaving(true); setSaveErr("");
    try {
      if (editId) await recordsApi.update(editId, { id_nakes:Number(form.id_nakes), keluhan:form.keluhan, tanggal_kunjungan:form.tanggal_kunjungan, catatan:form.catatan });
      else await recordsApi.create(form);
      close(); load();
    } catch (e) { setSaveErr(e.message); } finally { setSaving(false); }
  };
  const handleDelete = async () => { await recordsApi.remove(delId); setDelId(null); load(); };

  const toggleDiag = (code) => setForm(f => {
    const ex = f.diagnoses.find(d => d.kode_icd10 === code);
    return { ...f, diagnoses: ex ? f.diagnoses.filter(d => d.kode_icd10 !== code) : [...f.diagnoses, { kode_icd10: code, jenis: f.diagnoses.length === 0 ? "utama" : "sekunder" }] };
  });
  const toggleProc = (code) => setForm(f => {
    const ex = f.procedures.find(p => p.kode_tindakan === code);
    return { ...f, procedures: ex ? f.procedures.filter(p => p.kode_tindakan !== code) : [...f.procedures, { kode_tindakan: code, jumlah: 1 }] };
  });

  return (
    <DashboardLayout title="Rekam Medis" subtitle="Riwayat kunjungan dan diagnosa pasien">
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <div style={{ display:"flex", alignItems:"center", gap:12 }}>
          <div style={{ width:42, height:42, borderRadius:12, background:"var(--accent-light)", display:"flex", alignItems:"center", justifyContent:"center" }}>
            <FileText size={22} color="var(--accent)" />
          </div>
          <div>
            <h2 style={{ fontSize:15, fontWeight:700 }}>Daftar Rekam Medis</h2>
            <p style={{ fontSize:12, color:"var(--text-muted)" }}>{data.length} rekam medis</p>
          </div>
        </div>
        <button className="btn btn-primary" onClick={openAdd}><Plus size={16} /> Tambah Rekam Medis</button>
      </div>

      <DataTable columns={COLUMNS} data={data} loading={loading} emptyMessage="Belum ada rekam medis."
        actions={(row) => (
          <div style={{ display:"flex", gap:6 }}>
            <button className="btn btn-secondary btn-sm" onClick={() => openEdit(row)}><Pencil size={13} /></button>
            <button className="btn btn-danger btn-sm" onClick={() => setDelId(row.id_rekam)}><Trash2 size={13} /></button>
          </div>
        )} />

      <Modal isOpen={showModal} onClose={close} title={editId ? "Edit Rekam Medis" : "Tambah Rekam Medis"}
        footer={<><button className="btn btn-ghost" onClick={close}>Batal</button>
          <button className="btn btn-primary" onClick={handleSave} disabled={saving || !form.id_pasien || !form.id_nakes}>{saving ? "Menyimpan..." : editId ? "Simpan" : "Tambah"}</button></>}>
        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
          {saveErr && <div style={{ background:"var(--danger-light)", borderRadius:"var(--radius-md)", padding:"8px 12px", fontSize:13, color:"var(--danger)" }}>{saveErr}</div>}
          <div className="input-group"><label className="input-label">Pasien *</label>
            <select value={form.id_pasien} onChange={e => setForm(f=>({...f,id_pasien:e.target.value}))} className="input">
              <option value="">-- Pilih Pasien --</option>
              {patients.map(p => <option key={p.id_pasien} value={p.id_pasien}>{p.nama} ({p.nik})</option>)}
            </select></div>
          <div className="input-group"><label className="input-label">Tenaga Kesehatan *</label>
            <select value={form.id_nakes} onChange={e => setForm(f=>({...f,id_nakes:e.target.value}))} className="input">
              <option value="">-- Pilih Dokter/Nakes --</option>
              {workers.map(w => <option key={w.id_nakes} value={w.id_nakes}>{w.nama}{w.spesialisasi ? ` (${w.spesialisasi})` : ""}</option>)}
            </select></div>
          <div className="input-group"><label className="input-label">Tanggal Kunjungan</label>
            <input type="date" value={form.tanggal_kunjungan} onChange={e => setForm(f=>({...f,tanggal_kunjungan:e.target.value}))} className="input" /></div>
          <div className="input-group"><label className="input-label">Keluhan</label>
            <textarea value={form.keluhan} onChange={e => setForm(f=>({...f,keluhan:e.target.value}))} className="input" rows={3} style={{ resize:"vertical" }} placeholder="Pasien mengeluhkan..." /></div>
          {!editId && (<>
            <div className="input-group"><label className="input-label">Diagnosis ICD-10 <span style={{fontSize:11,color:"var(--text-muted)"}}>(klik untuk pilih)</span></label>
              <div style={{ display:"flex", flexWrap:"wrap", gap:6, padding:8, border:"1px solid var(--border)", borderRadius:"var(--radius-md)", maxHeight:120, overflowY:"auto" }}>
                {diagnoses.map(d => { const sel = form.diagnoses.find(fd => fd.kode_icd10 === d.kode_icd10); return (
                  <button key={d.kode_icd10} type="button" onClick={() => toggleDiag(d.kode_icd10)} style={{ padding:"4px 10px", fontSize:12, borderRadius:99, border:"1px solid", cursor:"pointer",
                    background: sel ? "var(--primary)" : "white", color: sel ? "white" : "var(--text-secondary)", borderColor: sel ? "var(--primary)" : "var(--border)" }}>
                    {d.kode_icd10} {sel && <span style={{fontSize:10}}>({sel.jenis})</span>}</button>); })}
              </div></div>
            <div className="input-group"><label className="input-label">Tindakan ICD-9 CM <span style={{fontSize:11,color:"var(--text-muted)"}}>(klik untuk pilih)</span></label>
              <div style={{ display:"flex", flexWrap:"wrap", gap:6, padding:8, border:"1px solid var(--border)", borderRadius:"var(--radius-md)", maxHeight:120, overflowY:"auto" }}>
                {procedures.map(p => { const sel = form.procedures.find(fp => fp.kode_tindakan === p.kode_tindakan); return (
                  <button key={p.kode_tindakan} type="button" onClick={() => toggleProc(p.kode_tindakan)} style={{ padding:"4px 10px", fontSize:12, borderRadius:99, border:"1px solid", cursor:"pointer",
                    background: sel ? "var(--accent)" : "white", color: sel ? "white" : "var(--text-secondary)", borderColor: sel ? "var(--accent)" : "var(--border)" }}>
                    {p.kode_tindakan}</button>); })}
              </div></div>
          </>)}
          <div className="input-group"><label className="input-label">Catatan Medis</label>
            <textarea value={form.catatan} onChange={e => setForm(f=>({...f,catatan:e.target.value}))} className="input" rows={2} style={{ resize:"vertical" }} placeholder="TD: 120/80mmHg..." /></div>
        </div>
      </Modal>
      <ConfirmDialog isOpen={!!delId} onClose={() => setDelId(null)} onConfirm={handleDelete}
        title="Hapus Rekam Medis" message="Hapus rekam medis ini? Data rekam_diagnosis dan detail_tindakan terkait juga akan terhapus."
        confirmLabel="Ya, Hapus" confirmClass="btn btn-danger" />
    </DashboardLayout>
  );
}
