// src/lib/api.js — Client-side fetch helpers (sesuai ERD)
const BASE = "/api";

function getSession() {
  if (typeof window === "undefined") return null;
  try { return JSON.parse(localStorage.getItem("casemix_session")); } catch { return null; }
}

async function request(url, options = {}) {
  const session = getSession();
  const headers = { "Content-Type": "application/json", ...options.headers };
  if (session?.id_nakes) headers["X-User-Id"] = String(session.id_nakes);
  const res = await fetch(url, { ...options, headers });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json.error ?? `HTTP ${res.status}`);
  return json;
}


// ── Pasien ────────────────────────────────────────────────────────
export const patientsApi = {
  list:   (q = "")    => request(`${BASE}/patients${q ? `?q=${encodeURIComponent(q)}` : ""}`),
  create: (data)      => request(`${BASE}/patients`, { method: "POST", body: JSON.stringify(data) }),
  update: (id, data)  => request(`${BASE}/patients?id=${id}`, { method: "PUT",  body: JSON.stringify(data) }),
  remove: (id)        => request(`${BASE}/patients?id=${id}`, { method: "DELETE" }),
};

// ── Tenaga Kesehatan ──────────────────────────────────────────────
export const healthWorkersApi = {
  list:   (q = "")    => request(`${BASE}/health-workers${q ? `?q=${encodeURIComponent(q)}` : ""}`),
  create: (data)      => request(`${BASE}/health-workers`, { method: "POST", body: JSON.stringify(data) }),
  update: (id, data)  => request(`${BASE}/health-workers?id=${id}`, { method: "PUT",  body: JSON.stringify(data) }),
  remove: (id)        => request(`${BASE}/health-workers?id=${id}`, { method: "DELETE" }),
};

// ── Rekam Medis ───────────────────────────────────────────────────
export const recordsApi = {
  list:   (q = "")    => request(`${BASE}/medical-records${q ? `?q=${encodeURIComponent(q)}` : ""}`),
  create: (data)      => request(`${BASE}/medical-records`, { method: "POST", body: JSON.stringify(data) }),
  update: (id, data)  => request(`${BASE}/medical-records?id=${id}`, { method: "PUT",  body: JSON.stringify(data) }),
  remove: (id)        => request(`${BASE}/medical-records?id=${id}`, { method: "DELETE" }),
};

// ── Diagnosis (ICD-10) ────────────────────────────────────────────
export const diagnosesApi = {
  list:   (q = "")     => request(`${BASE}/diagnoses${q ? `?q=${encodeURIComponent(q)}` : ""}`),
  create: (data)       => request(`${BASE}/diagnoses`, { method: "POST", body: JSON.stringify(data) }),
  update: (code, data) => request(`${BASE}/diagnoses?code=${encodeURIComponent(code)}`, { method: "PUT",  body: JSON.stringify(data) }),
  remove: (code)       => request(`${BASE}/diagnoses?code=${encodeURIComponent(code)}`, { method: "DELETE" }),
};

// ── Tindakan (ICD-9 CM) ──────────────────────────────────────────
export const proceduresApi = {
  list:   (q = "")     => request(`${BASE}/procedures${q ? `?q=${encodeURIComponent(q)}` : ""}`),
  create: (data)       => request(`${BASE}/procedures`, { method: "POST", body: JSON.stringify(data) }),
  update: (code, data) => request(`${BASE}/procedures?code=${encodeURIComponent(code)}`, { method: "PUT",  body: JSON.stringify(data) }),
  remove: (code)       => request(`${BASE}/procedures?code=${encodeURIComponent(code)}`, { method: "DELETE" }),
};

// ── Tarif CBGs ────────────────────────────────────────────────────
export const inaCbgsApi = {
  list:   (q = "")     => request(`${BASE}/ina-cbgs${q ? `?q=${encodeURIComponent(q)}` : ""}`),
  create: (data)       => request(`${BASE}/ina-cbgs`, { method: "POST", body: JSON.stringify(data) }),
  update: (code, data) => request(`${BASE}/ina-cbgs?code=${encodeURIComponent(code)}`, { method: "PUT",  body: JSON.stringify(data) }),
  remove: (code)       => request(`${BASE}/ina-cbgs?code=${encodeURIComponent(code)}`, { method: "DELETE" }),
};

// ── Klaim ─────────────────────────────────────────────────────────
export const claimsApi = {
  list:   (status="") => request(`${BASE}/claims${status ? `?status=${status}` : ""}`),
  create: (data)      => request(`${BASE}/claims`, { method: "POST", body: JSON.stringify(data) }),
  update: (id, data)  => request(`${BASE}/claims?id=${id}`, { method: "PUT",  body: JSON.stringify(data) }),
  remove: (id)        => request(`${BASE}/claims?id=${id}`, { method: "DELETE" }),
};

// ── Dashboard ─────────────────────────────────────────────────────
export const dashboardApi = {
  stats: () => request(`${BASE}/dashboard`),
};

// ── Master Role & Unit ────────────────────────────────────────────
export const rolesApi = {
  list: () => request(`${BASE}/roles`),
};
export const unitsApi = {
  list: () => request(`${BASE}/units`),
};

// ── Admin ─────────────────────────────────────────────────────────
export const adminApi = {
  stats:     ()          => request(`${BASE}/admin/stats`),
  logs:      (p, q)      => request(`${BASE}/admin/logs?page=${p||1}&limit=20${q ? `&q=${encodeURIComponent(q)}` : ""}`),
  deleteLog: (id)        => request(`${BASE}/admin/logs?id=${id}`, { method: "DELETE" }),
  clearLogs: ()          => request(`${BASE}/admin/logs`, { method: "DELETE" }),
  users:     (q, roleId) => request(`${BASE}/admin/users${q||roleId ? `?${q?`q=${encodeURIComponent(q)}`:""}${roleId?`&role_id=${roleId}`:""}` : ""}`),
};
