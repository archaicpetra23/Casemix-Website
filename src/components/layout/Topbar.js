// src/components/layout/Topbar.js
"use client";

import { useState } from "react";
import { Bell, Search, Menu } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export default function Topbar({ title, subtitle }) {
  const [showNotif, setShowNotif] = useState(false);
  const { user } = useAuth();

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        background: "rgba(255,255,255,0.85)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--border)",
        padding: "0 24px",
        height: 64,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        zIndex: 100,
        gap: 16,
      }}
    >
      {/* Title */}
      <div>
        <h1 style={{ fontSize: 17, fontWeight: 700, color: "var(--text-primary)", lineHeight: 1.2 }}>
          {title}
        </h1>
        {subtitle && (
          <p style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 1 }}>{subtitle}</p>
        )}
      </div>

      {/* Right actions */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        {/* Notification Bell */}
        <div style={{ position: "relative" }}>
          <button
            className="btn btn-ghost btn-sm"
            style={{ padding: 8, minWidth: "auto", position: "relative" }}
            onClick={() => setShowNotif(!showNotif)}
            title="Notifikasi"
          >
            <Bell size={18} />
            <span
              style={{
                position: "absolute", top: 4, right: 4,
                width: 8, height: 8,
                borderRadius: "50%",
                background: "var(--danger)",
                border: "2px solid white",
                animation: "pulse-ring 1.8s ease-in-out infinite",
              }}
            />
          </button>

          {showNotif && (
            <div
              className="card animate-fade-in-down"
              style={{
                position: "absolute",
                right: 0,
                top: "calc(100% + 8px)",
                width: 300,
                zIndex: 300,
                padding: 0,
                overflow: "hidden",
              }}
            >
              <div style={{ padding: "14px 16px", borderBottom: "1px solid var(--border)" }}>
                <p style={{ fontSize: 14, fontWeight: 700 }}>Notifikasi</p>
              </div>
              {[
                { msg: "3 klaim baru menunggu verifikasi", time: "5 menit lalu", dot: "var(--warning)" },
                { msg: "Klaim CNT-001 telah disetujui", time: "1 jam lalu", dot: "var(--success)" },
                { msg: "Data pasien baru ditambahkan", time: "2 jam lalu", dot: "var(--info)" },
              ].map((n, i) => (
                <div
                  key={i}
                  style={{
                    padding: "12px 16px",
                    borderBottom: i < 2 ? "1px solid var(--border)" : "none",
                    display: "flex",
                    gap: 10,
                    alignItems: "flex-start",
                    cursor: "pointer",
                    transition: "background var(--transition-fast)",
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = "var(--surface-hover)"}
                  onMouseLeave={(e) => e.currentTarget.style.background = ""}
                >
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: n.dot, marginTop: 5, flexShrink: 0 }} />
                  <div>
                    <p style={{ fontSize: 13, color: "var(--text-primary)", lineHeight: 1.4 }}>{n.msg}</p>
                    <p style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 2 }}>{n.time}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Avatar */}
        {user && (
          <div
            style={{
              width: 34, height: 34,
              borderRadius: "50%",
              background: "linear-gradient(135deg, var(--primary), var(--secondary))",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 13, fontWeight: 700, color: "white",
              cursor: "pointer",
              boxShadow: "0 2px 8px rgba(14,165,233,.3)",
            }}
            title={user.email}
          >
            {(user.displayName || user.email || "U")[0].toUpperCase()}
          </div>
        )}
      </div>
    </header>
  );
}
