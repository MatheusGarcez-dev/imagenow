import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { photoFormats } from "@/data/services";
import "./PhotoFormatsModal.css";

type PhotoFormatsModalProps = {
  open: boolean;
  serviceName: string;
  onClose: () => void;
};

export function PhotoFormatsModal({ open, serviceName, onClose }: PhotoFormatsModalProps) {
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      previous?.focus();
    };
  }, [open, onClose]);

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div className="formats-modal" role="presentation">
      <button
        type="button"
        className="formats-modal__backdrop"
        aria-label="Fechar formatos de foto"
        onClick={onClose}
      />
      <div
        className="formats-modal__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <header className="formats-modal__header">
          <div>
            <h2 id={titleId} className="font-display formats-modal__title">
              {serviceName}
            </h2>
            <p className="formats-modal__lead">
              O cliente pode definir o formato de impressão junto com a Imagenow.
            </p>
          </div>
          <button
            ref={closeRef}
            type="button"
            className="formats-modal__close"
            aria-label="Fechar"
            onClick={onClose}
          >
            <X size={20} strokeWidth={2} aria-hidden />
          </button>
        </header>

        <ul className="formats-modal__grid">
          {photoFormats.map((format) => (
            <li key={format.id} className="formats-modal__item">
              <p className="formats-modal__label">{format.name}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>,
    document.body,
  );
}
