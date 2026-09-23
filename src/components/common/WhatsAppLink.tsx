import type { ReactNode } from "react";
import { createWhatsAppUrl } from "@/lib/whatsapp";

type Props = {
  message: string;
  children: ReactNode;
  className?: string;
  "aria-label"?: string;
};

export function WhatsAppLink({
  message,
  children,
  className = "",
  "aria-label": ariaLabel,
}: Props) {
  return (
    <a
      href={createWhatsAppUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      aria-label={ariaLabel ?? "Abrir conversa no WhatsApp"}
    >
      {children}
    </a>
  );
}
