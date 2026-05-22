// src/components/ui/DataTable.js
"use client";

import { useState, useMemo } from "react";
import { Search, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

export default function DataTable({
  columns,       // [{ key, label, render, sortable, width, filterable }]
  data,          // array of objects
  loading = false,
  emptyMessage = "Tidak ada data ditemukan.",
  searchable = true,
  searchKeys,    // which keys to search — defaults to all string fields
  pageSize = 10,
  actions,       // (row) => JSX
  className = "",
}) {
  const [search, setSearch]   = useState("");
  const [page, setPage]       = useState(1);
  const [sortKey, setSortKey] = useState(null);
  const [sortDir, setSortDir] = useState("asc");
  const [filters, setFilters] = useState({}); // { [colKey]: selectedValue }

  // ── Compute filterable columns and unique values ───────────
  const filterableCols = useMemo(() => {
    return columns.filter(c => c.filterable);
  }, [columns]);

  const uniqueFilterValues = useMemo(() => {
    const vals = {};
    filterableCols.forEach(col => {
      const set = new Set();
      data.forEach(row => {
        const val = row[col.key];
        if (val !== undefined && val !== null && val !== "") {
          set.add(val);
        }
      });
      vals[col.key] = Array.from(set).sort();
    });
    return vals;
  }, [data, filterableCols]);

  // ── Search & Filter ──────────────────────────────────────────
  const filtered = useMemo(() => {
    let result = data;

    // Apply column filters
    Object.entries(filters).forEach(([colKey, filterVal]) => {
      if (filterVal) {
        result = result.filter(row => String(row[colKey]) === String(filterVal));
      }
    });

    // Apply search filter
    if (!search.trim()) return result;
    const q = search.toLowerCase();
    const keys = searchKeys ?? columns.map((c) => c.key);
    return result.filter((row) =>
      keys.some((k) => String(row[k] ?? "").toLowerCase().includes(q))
    );
  }, [data, search, columns, searchKeys, filters]);

  // ── Sort ───────────────────────────────────────────────────
  const sorted = useMemo(() => {
    if (!sortKey) return filtered;
    return [...filtered].sort((a, b) => {
      const av = a[sortKey] ?? "";
      const bv = b[sortKey] ?? "";
      const cmp = typeof av === "number"
        ? av - bv
        : String(av).localeCompare(String(bv), "id");
      return sortDir === "asc" ? cmp : -cmp;
    });
  }, [filtered, sortKey, sortDir]);

  // ── Pagination ─────────────────────────────────────────────
  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const pageData = sorted.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleSort = (key) => {
    if (sortKey === key) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortKey(key); setSortDir("asc"); }
  };

  const handleSearch = (v) => { setSearch(v); setPage(1); };

  return (
    <div className={`card ${className}`} style={{ overflow: "hidden" }}>
      {/* Search & Filter & Sort Bar */}
      {(searchable || filterableCols.length > 0 || columns.some(c => c.sortable)) && (
        <div style={{ 
          padding: "16px", 
          borderBottom: "1px solid var(--border)",
          display: "flex",
          gap: 12,
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          background: "var(--surface)"
        }}>
          {/* Search Input */}
          {searchable && (
            <div style={{ position: "relative", minWidth: 260, flex: 1 }}>
              <Search
                size={15}
                style={{
                  position: "absolute", left: 12, top: "50%",
                  transform: "translateY(-50%)",
                  color: "var(--text-muted)",
                }}
              />
              <input
                type="text"
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Cari data..."
                className="input"
                style={{ paddingLeft: 36, fontSize: 13, height: 38 }}
              />
            </div>
          )}

          {/* Filtering and Sorting Controls */}
          <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
            {/* Filter Dropdowns */}
            {filterableCols.map(col => (
              <div key={col.key} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: "var(--text-muted)", whiteSpace: "nowrap" }}>
                  {col.label}:
                </span>
                <select
                  value={filters[col.key] ?? ""}
                  onChange={(e) => {
                    setFilters(prev => ({ ...prev, [col.key]: e.target.value }));
                    setPage(1);
                  }}
                  className="input"
                  style={{ fontSize: 13, height: 38, minWidth: 120, padding: "0 10px", borderRadius: "var(--radius-md)" }}
                >
                  <option value="">Semua</option>
                  {uniqueFilterValues[col.key]?.map(val => (
                    <option key={String(val)} value={String(val)}>
                      {col.render ? col.render(val) : String(val)}
                    </option>
                  ))}
                </select>
              </div>
            ))}

            {/* Explicit Sort Controls */}
            {columns.some(c => c.sortable) && (
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: "var(--text-muted)", whiteSpace: "nowrap" }}>
                  Urutkan:
                </span>
                <select
                  value={sortKey ?? ""}
                  onChange={(e) => {
                    const key = e.target.value;
                    setSortKey(key || null);
                    if (key && !sortKey) setSortDir("asc");
                  }}
                  className="input"
                  style={{ fontSize: 13, height: 38, minWidth: 140, padding: "0 10px", borderRadius: "var(--radius-md)" }}
                >
                  <option value="">Default</option>
                  {columns.filter(c => c.sortable).map(c => (
                    <option key={c.key} value={c.key}>{c.label}</option>
                  ))}
                </select>

                {sortKey && (
                  <button
                    onClick={() => setSortDir(d => d === "asc" ? "desc" : "asc")}
                    className="btn btn-secondary"
                    style={{ height: 38, width: 38, padding: 0, display: "flex", alignItems: "center", justifyContent: "center", minWidth: "auto", borderRadius: "var(--radius-md)" }}
                    title={sortDir === "asc" ? "Urutkan Z-A (Descending)" : "Urutkan A-Z (Ascending)"}
                  >
                    {sortDir === "asc" ? "▲" : "▼"}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Table */}
      <div style={{ overflowX: "auto" }}>
        <table className="data-table">
          <thead>
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  style={{ width: col.width, cursor: col.sortable ? "pointer" : "default", userSelect: "none" }}
                  onClick={() => col.sortable && handleSort(col.key)}
                >
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                    {col.label}
                    {col.sortable && (
                      <span style={{ opacity: sortKey === col.key ? 1 : 0.3, fontSize: 10 }}>
                        {sortKey === col.key ? (sortDir === "asc" ? " ▲" : " ▼") : " ↕"}
                      </span>
                    )}
                  </span>
                </th>
              ))}
              {actions && <th style={{ width: 120 }}>Aksi</th>}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: pageSize }).map((_, i) => (
                <tr key={i}>
                  {columns.map((col) => (
                    <td key={col.key}>
                      <div className="skeleton" style={{ height: 14, width: "75%" }} />
                    </td>
                  ))}
                  {actions && <td><div className="skeleton" style={{ height: 28, width: 80 }} /></td>}
                </tr>
              ))
            ) : pageData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (actions ? 1 : 0)}
                  style={{ textAlign: "center", padding: "48px 16px", color: "var(--text-muted)", fontSize: 14 }}
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              pageData.map((row, idx) => (
                <tr key={row.id ?? idx} className="animate-fade-in" style={{ animationDelay: `${idx * 30}ms`, animationFillMode: "both" }}>
                  {columns.map((col) => (
                    <td key={col.key}>
                      {col.render ? col.render(row[col.key], row) : (row[col.key] ?? "—")}
                    </td>
                  ))}
                  {actions && <td>{actions(row)}</td>}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {!loading && sorted.length > pageSize && (
        <div style={{
          padding: "12px 16px",
          borderTop: "1px solid var(--border)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontSize: 13,
          color: "var(--text-secondary)",
        }}>
          <span>
            {(currentPage - 1) * pageSize + 1}–{Math.min(currentPage * pageSize, sorted.length)} dari {sorted.length} data
          </span>
          <div style={{ display: "flex", gap: 4 }}>
            {[
              [ChevronsLeft, () => setPage(1)],
              [ChevronLeft,  () => setPage(p => Math.max(1, p - 1))],
              [ChevronRight, () => setPage(p => Math.min(totalPages, p + 1))],
              [ChevronsRight,() => setPage(totalPages)],
            ].map(([Icon, handler], i) => (
              <button
                key={i}
                onClick={handler}
                className="btn btn-ghost btn-sm"
                style={{ padding: "4px 8px", minWidth: "auto" }}
                disabled={
                  (i < 2 && currentPage === 1) ||
                  (i >= 2 && currentPage === totalPages)
                }
              >
                <Icon size={14} />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
