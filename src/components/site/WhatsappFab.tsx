import { MessageCircle } from "lucide-react";
import { buildWhatsappLink } from "./constants";

export const WhatsappFab = () => (
  <a
    href={buildWhatsappLink("Olá! Gostaria de informações sobre empréstimo consignado.")}
    target="_blank"
    rel="noopener"
    aria-label="Falar no WhatsApp"
    className="fixed bottom-5 right-5 z-40 h-14 w-14 rounded-full bg-success hover:scale-105 active:scale-95 transition-transform text-success-foreground shadow-elevated flex items-center justify-center"
  >
    <MessageCircle className="h-6 w-6" />
  </a>
);