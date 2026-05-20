// src/app/master-icd/page.js
"use client";

import { useState, useEffect, useCallback } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import DataTable from "@/components/ui/DataTable";
import Modal, { ConfirmDialog } from "@/components/ui/Modal";
import { Plus, Pencil, Trash2, BookOpen } from "lucide-react";
import { diagnosesApi, proceduresApi, inaCbgsApi } from "@/lib/api";

const TABS = ["ICD-10 (Diagnosis)", "ICD-9 CM (Tindakan)", "INA-CBGs"];

function rupiahFormat(n) {
  return new Intl.NumberFormat("id-ID",{style:"currency",currency:"IDR",minimumFractionDigits:0}).format(Number(n)||0);
}

function MasterTab({ api, columns, formFields, title, badge, keyField = "code" }) {
  const [data, setData]       = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm]       = useState({});
  const [editKey, setEditKey] = useState(null);
  const [showModal, setShow]  = useState(false);
  const [delKey, setDelKey]   = useState(null);
  const [saving, setSaving]   = useState(false);
  const [saveErr, setSaveErr] = useState("");

  const load = useCallback(async () => {
    try { setData(await api.list()); }
    catch (e) { console.error(e); }
    finally { setLoading(false); }
  }, [api]);

  useEffect(() => { load(); }, [load]);

  const empty = Object.fromEntries(formFields.map(f => [f.key, ""]));
  const openAdd  = ()    => { setForm(empty); setEditKey(null); setSaveErr(""); setShow(true); };
  const openEdit = (row) => { setForm({...row}); setEditKey(row[keyField]); setSaveErr(""); setShow(true); };
  const close    = ()    => { setShow(false); setSaveErr(""); };

  const handleSave = async () => {
    if (!form[keyField]) return;
    setSaving(true); setSaveErr("");
    try {
      if (editKey) await api.update(editKey, form);
      else         await api.create(form);
      close(); load();
    } catch (e) { setSaveErr(e.message); }
    finally { setSaving(false); }
  };

  const handleDelete = async () => {
    await api.remove(delKey); setDelKey(null); load();
  };

  return (
    <div className="animate-fade-in" style={{ display:"flex", flexDirection:"column", gap:16 }}>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <p style={{ fontSize:13, color:"var(--text-muted)" }}>
          <span className={`badge ${badge}`}>{data.length}</span>&nbsp;kode {title} terdaftar di MySQL
        </p>
        <button className="btn btn-primary btn-sm" onClick={openAdd}><Plus size={14}/> Tambah Kode</button>
      </div>

      <DataTable columns={columns} data={data} loading={loading}
        emptyMessage={`Belum ada kode ${title}. Jalankan 'npx prisma db seed'.`}
        actions={(row) => (
          <div style={{display:"flex",gap:6}}>
            <button className="btn btn-secondary btn-sm" onClick={() => openEdit(row)}><Pencil size={13}/></button>
            <button className="btn btn-danger btn-sm"    onClick={() => setDelKey(row[keyField])}><Trash2 size={13}/></button>
          </div>
        )}
      />

      <Modal isOpen={showModal} onClose={close} title={editKey ? `Edit ${title}` : `Tambah Kode ${title}`}
        footer={<>
          <button className="btn btn-ghost" onClick={close}>Batal</button>
          <button className="btn btn-primary" onClick={handleSave} disabled={saving || !form[keyField]}>
            {saving ? "Menyimpan..." : editKey ? "Simpan" : "Tambah"}
          </button>
        </>}>
        <div style={{display:"flex",flexDirection:"column",gap:14}}>
          {saveErr && <div style={{background:"var(--danger-light)",borderRadius:"var(--radius-md)",padding:"8px 12px",fontSize:13,color:"var(--danger)"}}>{saveErr}</div>}
          {formFields.map(({key,label,type,ph}) => (
            <div key={key} className="input-group">
              <label className="input-label">{label}</label>
              <input type={type||"text"} value={form[key]||""} onChange={e => setForm(f=>({...f,[key]:e.target.value}))} placeholder={ph} className="input"
                readOnly={editKey && key===keyField} />
            </div>
          ))}
        </div>
      </Modal>

      <ConfirmDialog isOpen={!!delKey} onClose={() => setDelKey(null)} onConfirm={handleDelete}
        title={`Hapus Kode ${title}`}
        message={`Hapus kode ${delKey}? Rekam medis/klaim yang menggunakan kode ini akan di-set NULL.`}
        confirmLabel="Ya, Hapus" confirmClass="btn btn-danger" />
    </div>
  );
}

const TAB_CONFIGS = [
  {
    api: diagnosesApi,
    title: "ICD-10", badge: "badge-info", keyField: "kode_icd10",
    columns: [
      { key:"kode_icd10", label:"Kode ICD-10", sortable:true, render:v=><span className="badge badge-info" style={{fontSize:11}}>{v}</span> },
      { key:"nama_diagnosis", label:"Nama Diagnosis", sortable:true },
    ],
    fields: [{ key:"kode_icd10", label:"Kode ICD-10 *", ph:"I10" }, { key:"nama_diagnosis", label:"Nama Diagnosis *", ph:"Hipertensi" }],
  },
  {
    api: proceduresApi,
    title: "ICD-9 CM", badge: "badge-default", keyField: "kode_tindakan",
    columns: [
      { key:"kode_tindakan", label:"Kode ICD-9 CM", sortable:true, render:v=><span className="badge badge-default" style={{fontSize:11}}>{v}</span> },
      { key:"nama_tindakan", label:"Nama Tindakan", sortable:true },
    ],
    fields: [{ key:"kode_tindakan", label:"Kode ICD-9 CM *", ph:"96.04" }, { key:"nama_tindakan", label:"Nama Tindakan *", ph:"Pemasangan Infus" }],
  },
  {
    api: inaCbgsApi,
    title: "INA-CBGs", badge: "badge-success", keyField: "kode_cbgs",
    columns: [
      { key:"kode_cbgs",  label:"Kode INA-CBGs", sortable:true, render:v=><span className="badge badge-success" style={{fontSize:11}}>{v}</span> },
      { key:"deskripsi",  label:"Deskripsi", sortable:true },
      { key:"tarif", label:"Tarif Referensi", sortable:true, render:v=><span style={{fontWeight:600}}>{rupiahFormat(v)}</span> },
    ],
    fields: [
      { key:"kode_cbgs",  label:"Kode INA-CBGs *", ph:"A-4-10-I" },
      { key:"deskripsi",  label:"Deskripsi *", ph:"Kasus Infeksi Ringan" },
      { key:"tarif", label:"Tarif (Rp)", ph:"850000", type:"number" },
    ],
  },
];

export default function MasterICDPage() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <DashboardLayout title="Master Data ICD" subtitle="Kode diagnosis ICD-10, tindakan ICD-9 CM, dan INA-CBGs">
      <div className="card" style={{ overflow:"hidden" }}>
        <div style={{ display:"flex", borderBottom:"1px solid var(--border)", background:"var(--surface-hover)" }}>
          <div style={{ padding:"0 20px", display:"flex", alignItems:"center", gap:8, borderRight:"1px solid var(--border)" }}>
            <BookOpen size={18} color="var(--primary)" />
            <span style={{ fontSize:14, fontWeight:700, whiteSpace:"nowrap" }}>Master ICD · MySQL</span>
          </div>
          {TABS.map((tab,i) => (
            <button key={tab} onClick={() => setActiveTab(i)}
              style={{ padding:"14px 22px", fontSize:13, fontWeight:activeTab===i?700:500,
                color:activeTab===i?"var(--primary)":"var(--text-secondary)",
                background:"none", border:"none",
                borderBottom:activeTab===i?"2px solid var(--primary)":"2px solid transparent",
                cursor:"pointer", transition:"all var(--transition-fast)", whiteSpace:"nowrap" }}>
              {tab}
            </button>
          ))}
        </div>
        <div style={{ padding:20 }}>
          {TAB_CONFIGS.map((cfg,i) => activeTab===i ? (
            <MasterTab key={cfg.title} api={cfg.api} columns={cfg.columns} formFields={cfg.fields}
              title={cfg.title} badge={cfg.badge} keyField={cfg.keyField} />
          ) : null)}
        </div>
      </div>
    </DashboardLayout>
  );
}
