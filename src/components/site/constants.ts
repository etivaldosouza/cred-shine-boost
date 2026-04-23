export const WHATSAPP_NUMBER = "5598999999999"; // KF Empréstimos São Luís - MA
export const WHATSAPP_DISPLAY = "(98) 99999-9999";
export const COMPANY_EMAIL = "contato@kfemprestimos.com.br";
export const COMPANY_ADDRESS = "São Luís - MA";
export const COMPANY_HOURS = "Segunda a sexta, 9h às 18h";

export const buildWhatsappLink = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;