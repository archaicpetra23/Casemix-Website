"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth, ROLE_ACCESS } from "@/hooks/useAuth";
import { Stethoscope, Mail, Lock, Eye, EyeOff, ArrowRight, Shield } from "lucide-react";

const DEMO_ACCOUNTS = [
  { role: "Admin",       email: "puja@rs.com",  pass: "puja",  color: "#EF4444", bg: "#FEE2E2" },
  { role: "Dokter",      email: "ahmad@rs.com", pass: "ahmad", color: "#3B82F6", bg: "#DBEAFE" },
  { role: "Perawat",     email: "rina@rs.com",  pass: "rina",  color: "#10B981", bg: "#D1FAE5" },
  { role: "Casemix",     email: "bima@rs.com",  pass: "bima",  color: "#F59E0B", bg: "#FEF3C7" },
  { role: "Rekam Medis", email: "dian@rs.com",  pass: "dian",  color: "#8B5CF6", bg: "#EDE9FE" },
];

export default function LoginPage() {
  const { login } = useAuth();
  const router    = useRouter();

  const [email,      setEmail]      = useState("");
  const [password,   setPassword]   = useState("");
  const [showPw,     setShowPw]     = useState(false);
  const [error,      setError]      = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); setSubmitting(true);
    try {
      const user = await login(email.trim(), password);
      const roleName = user?.role?.nama_role;
      const pages = ROLE_ACCESS[roleName] ?? [];
      router.push(pages[0] ?? "/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const fillDemo = (acc) => { setEmail(acc.email); setPassword(acc.pass); setError(""); };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--background)" }}>

      {/* ── Left brand panel ── */}
      <div
        id="login-brand"
        className="gradient-primary"
        style={{
          display: "none", flex: "0 0 440px", flexDirection: "column",
          justifyContent: "space-between", padding: "48px 44px",
          position: "relative", overflow: "hidden",
        }}
      >
        {/* decorative blobs */}
        <div style={{ position:"absolute", top:-80, right:-80, width:300, height:300, borderRadius:"50%", background:"rgba(255,255,255,.08)" }} />
        <div style={{ position:"absolute", bottom:-80, left:-40, width:320, height:320, borderRadius:"50%", background:"rgba(255,255,255,.08)" }} />

        <div className="animate-float" style={{ textAlign:"center", position:"relative", zIndex:1 }}>
          <div style={{ width:96, height:96, borderRadius:28, background:"rgba(255,255,255,.25)", backdropFilter:"blur(12px)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 28px", boxShadow:"0 8px 32px rgba(0,0,0,.15)" }}>
            <Stethoscope size={48} color="white" />
          </div>
          <h1 style={{ fontSize:32, fontWeight:900, color:"white", marginBottom:12 }}>Casemix RS</h1>
          <p style={{ fontSize:15, color:"rgba(255,255,255,.85)", lineHeight:1.6 }}>
            Sistem Informasi Pengelolaan<br/>Data Casemix Rumah Sakit
          </p>
        </div>

        <div style={{ display:"flex", flexDirection:"column", gap:10, position:"relative", zIndex:1 }}>
          {[
            { icon:"🏥", label:"Manajemen Data Pasien" },
            { icon:"📋", label:"Rekam Medis Terintegrasi" },
            { icon:"💼", label:"Monitoring Klaim BPJS" },
            { icon:"🔐", label:"Akses berbasis Role (RBAC)" },
          ].map((f,i) => (
            <div key={i} className="animate-fade-in-left" style={{ animationDelay:`${i*100+200}ms`, animationFillMode:"both", display:"flex", alignItems:"center", gap:12, background:"rgba(255,255,255,.18)", borderRadius:12, padding:"10px 16px", backdropFilter:"blur(8px)" }}>
              <span style={{ fontSize:18 }}>{f.icon}</span>
              <span style={{ color:"white", fontSize:14, fontWeight:500 }}>{f.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Right form panel ── */}
      <div style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", padding:"32px 20px" }}>
        <div style={{ width:"100%", maxWidth:460 }}>
          <div className="card animate-scale-in" style={{ padding:"40px 36px", borderRadius:"var(--radius-xl)" }}>

            {/* Header */}
            <div style={{ textAlign:"center", marginBottom:28 }}>
              <div className="gradient-primary" style={{ width:56, height:56, borderRadius:16, display:"inline-flex", alignItems:"center", justifyContent:"center", marginBottom:14, boxShadow:"0 8px 24px rgba(14,165,233,.4)" }}>
                <Stethoscope size={26} color="white" />
              </div>
              <h2 style={{ fontSize:22, fontWeight:800, color:"var(--text-primary)", marginBottom:4 }}>Selamat Datang</h2>
              <p style={{ color:"var(--text-muted)", fontSize:13 }}>Masuk ke Sistem Informasi Casemix RS</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} style={{ display:"flex", flexDirection:"column", gap:16 }}>
              <div className="input-group">
                <label className="input-label" htmlFor="email">Email</label>
                <div style={{ position:"relative" }}>
                  <Mail size={15} style={{ position:"absolute", left:13, top:"50%", transform:"translateY(-50%)", color:"var(--text-muted)", pointerEvents:"none" }} />
                  <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="dokter@rs.com" className="input" style={{ paddingLeft:38 }} required autoComplete="email" />
                </div>
              </div>

              <div className="input-group">
                <label className="input-label" htmlFor="password">Password</label>
                <div style={{ position:"relative" }}>
                  <Lock size={15} style={{ position:"absolute", left:13, top:"50%", transform:"translateY(-50%)", color:"var(--text-muted)", pointerEvents:"none" }} />
                  <input id="password" type={showPw ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" className="input" style={{ paddingLeft:38, paddingRight:42 }} required autoComplete="current-password" />
                  <button type="button" onClick={() => setShowPw(p => !p)} style={{ position:"absolute", right:12, top:"50%", transform:"translateY(-50%)", background:"none", border:"none", cursor:"pointer", color:"var(--text-muted)", padding:2 }} tabIndex={-1}>
                    {showPw ? <EyeOff size={15}/> : <Eye size={15}/>}
                  </button>
                </div>
              </div>

              {error && (
                <div className="animate-fade-in" style={{ background:"var(--danger-light)", border:"1px solid #FECACA", borderRadius:"var(--radius-md)", padding:"10px 14px", fontSize:13, color:"var(--danger)", display:"flex", alignItems:"center", gap:8 }}>
                  <span>⚠️</span> {error}
                </div>
              )}

              <button type="submit" id="login-submit" className="btn btn-primary btn-lg" disabled={submitting} style={{ width:"100%", justifyContent:"center", marginTop:4 }}>
                {submitting ? (
                  <><div style={{ width:16, height:16, border:"2px solid rgba(255,255,255,.4)", borderTop:"2px solid white", borderRadius:"50%", animation:"spin 0.8s linear infinite" }} /> Memverifikasi...</>
                ) : (
                  <>Masuk ke Sistem <ArrowRight size={16}/></>
                )}
              </button>
            </form>

            {/* Demo accounts */}
            <div style={{ marginTop:24, paddingTop:20, borderTop:"1px solid var(--border)" }}>
              <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:12 }}>
                <Shield size={13} color="var(--text-muted)" />
                <p style={{ fontSize:11, fontWeight:700, color:"var(--text-muted)", textTransform:"uppercase", letterSpacing:"0.05em" }}>Demo Akun per Role</p>
              </div>
              <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                {DEMO_ACCOUNTS.map(acc => (
                  <button key={acc.role} onClick={() => fillDemo(acc)} type="button"
                    style={{ fontSize:11, fontWeight:600, padding:"4px 10px", borderRadius:99, border:`1px solid ${acc.color}30`, background:acc.bg, color:acc.color, cursor:"pointer", transition:"all 0.15s" }}
                    onMouseEnter={e => e.target.style.transform="scale(1.05)"}
                    onMouseLeave={e => e.target.style.transform="scale(1)"}
                  >
                    {acc.role}
                  </button>
                ))}
              </div>
              <p style={{ fontSize:11, color:"var(--text-muted)", marginTop:8 }}>Klik role lalu tekan Masuk. Password = nama sebelum @.</p>
            </div>
          </div>
        </div>
      </div>

      <style>{`@media(min-width:860px){#login-brand{display:flex!important}}`}</style>
    </div>
  );
}
