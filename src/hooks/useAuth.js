"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

// ─── RBAC: akses per role ─────────────────────────────────────────────────────
// pages yang bisa diakses tiap role (kosong = tidak bisa akses sama sekali)
export const ROLE_ACCESS = {
  "Admin": ["/dashboard", "/pasien", "/rekam-medis", "/klaim", "/master-icd", "/nakes", "/admin"],
  "Dokter": ["/dashboard", "/pasien", "/rekam-medis"],
  "Perawat": ["/dashboard", "/pasien", "/rekam-medis"],
  "Casemix": ["/dashboard", "/pasien", "/rekam-medis", "/klaim", "/master-icd"],
  "Rekam Medis": ["/dashboard", "/pasien", "/rekam-medis", "/klaim"],
};

export function canAccess(roleName, path) {
  if (!roleName) return false;
  const allowed = ROLE_ACCESS[roleName] ?? [];
  return allowed.some((p) => path === p || path.startsWith(p + "/"));
}

// ─── Context ──────────────────────────────────────────────────────────────────
const AuthContext = createContext(null);

const SESSION_KEY = "casemix_session";

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null);
  const [loading, setLoading] = useState(true);
  const router                = useRouter();

  // Restore session dari localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setUser(parsed);
      }
    } catch (_) {}
    setLoading(false);
  }, []);

  const login = useCallback(async (email, password) => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error ?? "Login gagal");

    const { user: sessionUser } = json;
    localStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser));
    setUser(sessionUser);
    return sessionUser;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
    router.push("/login");
  }, [router]);

  const roleName = user?.role?.nama_role ?? null;

  return (
    <AuthContext.Provider value={{ user, role: roleName, loading, login, logout, canAccess: (path) => canAccess(roleName, path) }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
