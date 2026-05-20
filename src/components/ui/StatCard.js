// src/components/ui/StatCard.js
"use client";

import { useEffect, useRef, useState } from "react";

function useCountUp(target, duration = 1200) {
  const [count, setCount] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (startedRef.current || target === 0) return;
    startedRef.current = true;
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration]);

  return count;
}

export default function StatCard({ title, value, icon: Icon, color = "blue", suffix = "", trend, delay = 0 }) {
  const displayValue = useCountUp(typeof value === "number" ? value : 0);

  const colorMap = {
    blue:   { gradient: "gradient-card-blue",   iconBg: "var(--info-light)",    iconColor: "var(--info)",    border: "#BFDBFE" },
    green:  { gradient: "gradient-card-green",  iconBg: "var(--success-light)", iconColor: "var(--success)", border: "#A7F3D0" },
    amber:  { gradient: "gradient-card-amber",  iconBg: "var(--warning-light)", iconColor: "var(--warning)", border: "#FDE68A" },
    red:    { gradient: "gradient-card-red",    iconBg: "var(--danger-light)",  iconColor: "var(--danger)",  border: "#FECACA" },
    cyan:   { gradient: "gradient-card-cyan",   iconBg: "#CFFAFE",              iconColor: "var(--secondary)",border: "#A5F3FC" },
    purple: { gradient: "",                      iconBg: "#EDE9FE",              iconColor: "#7C3AED",        border: "#DDD6FE" },
  };

  const c = colorMap[color] ?? colorMap.blue;

  return (
    <div
      className={`card card-lift animate-fade-in-up ${c.gradient}`}
      style={{
        padding: "22px 24px",
        animationDelay: `${delay}ms`,
        animationFillMode: "both",
        borderColor: c.border,
        borderWidth: 1,
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: 12, fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>
            {title}
          </p>
          <p style={{ fontSize: 32, fontWeight: 800, color: "var(--text-primary)", lineHeight: 1.1 }}>
            {typeof value === "number" ? displayValue.toLocaleString("id-ID") : value}
            {suffix && <span style={{ fontSize: 16, fontWeight: 500, color: "var(--text-muted)", marginLeft: 4 }}>{suffix}</span>}
          </p>
          {trend !== undefined && (
            <p style={{
              marginTop: 8, fontSize: 12, fontWeight: 500,
              color: trend >= 0 ? "var(--success)" : "var(--danger)",
              display: "flex", alignItems: "center", gap: 3,
            }}>
              {trend >= 0 ? "▲" : "▼"} {Math.abs(trend)}% bulan ini
            </p>
          )}
        </div>
        {Icon && (
          <div
            style={{
              width: 48, height: 48,
              borderRadius: "14px",
              background: c.iconBg,
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Icon size={22} color={c.iconColor} strokeWidth={2} />
          </div>
        )}
      </div>
    </div>
  );
}
