// src/components/ui/StatusBadge.js
"use client";

import { CheckCircle, Clock, XCircle, Info, AlertCircle } from "lucide-react";

const configs = {
  disetujui:  { cls: "badge-success", icon: CheckCircle, label: "Disetujui" },
  approved:   { cls: "badge-success", icon: CheckCircle, label: "Disetujui" },
  pending:    { cls: "badge-warning", icon: Clock,        label: "Pending" },
  ditolak:    { cls: "badge-danger",  icon: XCircle,      label: "Ditolak" },
  rejected:   { cls: "badge-danger",  icon: XCircle,      label: "Ditolak" },
  aktif:      { cls: "badge-info",    icon: Info,         label: "Aktif" },
  nonaktif:   { cls: "badge-default", icon: AlertCircle,  label: "Nonaktif" },
};

export default function StatusBadge({ status }) {
  const key    = (status ?? "").toLowerCase();
  const config = configs[key] ?? { cls: "badge-default", icon: Info, label: status ?? "-" };
  const Icon   = config.icon;

  return (
    <span className={`badge ${config.cls}`}>
      <Icon size={11} />
      {config.label}
    </span>
  );
}
