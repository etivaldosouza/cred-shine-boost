import { useEffect, useState } from "react";

/** Configurações de contato/empresa — fonte única da verdade. */
export type SiteConfig = {
  whatsappNumber: string; // somente dígitos com DDI, ex.: 5598999999999
  whatsappDisplay: string; // formato amigável, ex.: (98) 99999-9999
  email: string;
  address: string;
  hours: string;
  instagramUrl: string;
};

export const DEFAULT_SITE_CONFIG: SiteConfig = {
  whatsappNumber: "5598999999999",
  whatsappDisplay: "(98) 99999-9999",
  email: "kfemprestimos@gmail.com",
  address: "Av. Leste-Oeste, Cohatrac I, São Luís - MA",
  hours: "Segunda a sexta, 8h às 18h",
  instagramUrl: "https://www.instagram.com/kfemprestimos",
};

const STORAGE_KEY = "kf:site-config";
const EVENT = "kf:site-config-changed";

const readStorage = (): SiteConfig => {
  if (typeof window === "undefined") return DEFAULT_SITE_CONFIG;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_SITE_CONFIG;
    const parsed = JSON.parse(raw) as Partial<SiteConfig>;
    return { ...DEFAULT_SITE_CONFIG, ...parsed };
  } catch {
    return DEFAULT_SITE_CONFIG;
  }
};

export const getSiteConfig = (): SiteConfig => readStorage();

export const saveSiteConfig = (config: SiteConfig) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  window.dispatchEvent(new CustomEvent(EVENT));
};

export const resetSiteConfig = () => {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new CustomEvent(EVENT));
};

/** Hook reativo: re-renderiza ao salvar configurações em qualquer aba. */
export const useSiteConfig = (): SiteConfig => {
  const [config, setConfig] = useState<SiteConfig>(() => readStorage());

  useEffect(() => {
    const refresh = () => setConfig(readStorage());
    window.addEventListener(EVENT, refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener(EVENT, refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  return config;
};

/** Constrói link wa.me a partir de um número (mantém só dígitos). */
export const buildWhatsappLink = (number: string, message: string) => {
  const clean = (number || "").replace(/\D/g, "");
  return `https://wa.me/${clean}?text=${encodeURIComponent(message)}`;
};