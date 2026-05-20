// src/components/ui/LoadingSpinner.js
"use client";

export default function LoadingSpinner({ size = 32, text = "Memuat data..." }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16">
      <div
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          border: "3px solid var(--border)",
          borderTop: "3px solid var(--primary)",
          animation: "spin 0.8s linear infinite",
        }}
      />
      {text && (
        <p style={{ color: "var(--text-muted)", fontSize: 14 }}>{text}</p>
      )}
    </div>
  );
}

export function PageLoader() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "var(--background)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 16,
        zIndex: 9999,
      }}
    >
      {/* Animated logo mark */}
      <div style={{ position: "relative" }}>
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            background: "var(--primary-light)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            animation: "pulse-ring 1.6s ease-in-out infinite",
          }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2v-5h2v5zm0-7h-2V7h2v2z"
              fill="var(--primary)"
            />
          </svg>
        </div>
        <div
          style={{
            position: "absolute",
            inset: -4,
            borderRadius: "50%",
            border: "2px solid var(--primary)",
            opacity: 0.3,
            animation: "pulse-ring 1.6s ease-in-out infinite",
          }}
        />
      </div>
      <div>
        <p style={{ fontWeight: 600, color: "var(--text-primary)", marginBottom: 4 }}>
          Casemix RS
        </p>
        <p style={{ fontSize: 13, color: "var(--text-muted)" }}>Memuat sistem...</p>
      </div>
    </div>
  );
}

export function SkeletonTable({ rows = 5, cols = 5 }) {
  return (
    <div className="table-container">
      <table className="data-table">
        <thead>
          <tr>
            {Array.from({ length: cols }).map((_, i) => (
              <th key={i}>
                <div className="skeleton" style={{ height: 14, width: "80%" }} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }).map((_, r) => (
            <tr key={r}>
              {Array.from({ length: cols }).map((_, c) => (
                <td key={c}>
                  <div
                    className="skeleton"
                    style={{ height: 14, width: c === 0 ? "60%" : "80%" }}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
