// src/components/ui/Modal.js
"use client";

import { useEffect } from "react";
import { X } from "lucide-react";

export default function Modal({ isOpen, onClose, title, children, footer, size = "md" }) {
  // Close on ESC
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!isOpen) return null;

  const maxWidths = { sm: 440, md: 560, lg: 720, xl: 900 };

  return (
    <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-content animate-scale-in" style={{ maxWidth: maxWidths[size] ?? 560 }}>
        <div className="modal-header">
          <h3 style={{ fontSize: 17, fontWeight: 700, color: "var(--text-primary)" }}>{title}</h3>
          <button
            onClick={onClose}
            className="btn btn-ghost btn-sm"
            style={{ padding: "6px", borderRadius: "8px", minWidth: "auto" }}
          >
            <X size={18} />
          </button>
        </div>
        <div className="modal-body">{children}</div>
        {footer && <div className="modal-footer">{footer}</div>}
      </div>
    </div>
  );
}

// ConfirmDialog — lightweight confirm modal
export function ConfirmDialog({ isOpen, onClose, onConfirm, title, message, confirmLabel = "Hapus", confirmClass = "btn btn-danger" }) {
  if (!isOpen) return null;
  return (
    <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-content animate-scale-in" style={{ maxWidth: 420 }}>
        <div className="modal-header">
          <h3 style={{ fontSize: 17, fontWeight: 700, color: "var(--text-primary)" }}>{title}</h3>
        </div>
        <div className="modal-body">
          <p style={{ color: "var(--text-secondary)", fontSize: 14, lineHeight: 1.6 }}>{message}</p>
        </div>
        <div className="modal-footer">
          <button className="btn btn-ghost" onClick={onClose}>Batal</button>
          <button className={confirmClass} onClick={onConfirm}>{confirmLabel}</button>
        </div>
      </div>
    </div>
  );
}
