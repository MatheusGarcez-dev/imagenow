export function createWhatsAppUrl(message: string, phone = siteWhatsApp()) {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

function siteWhatsApp() {
  return import.meta.env.VITE_WHATSAPP ?? "5511999999999";
}
