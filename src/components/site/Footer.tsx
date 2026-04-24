import { Facebook, Instagram, Linkedin } from "lucide-react";
import logo from "@/assets/kf-logo.png";
import { useSiteConfig } from "@/config/site-config";

export const Footer = () => {
  const config = useSiteConfig();
  return (
  <footer className="bg-primary text-primary-foreground pt-16 pb-8">
    <div className="container-page grid gap-10 md:grid-cols-4">
      <div className="md:col-span-2">
        <div className="flex items-center gap-2">
          <img src={logo} alt="KF Empréstimos" width={40} height={40} className="h-10 w-10 bg-white rounded-lg p-1" />
          <span className="font-bold text-lg">KF Empréstimos</span>
        </div>
        <p className="mt-4 text-sm text-primary-foreground/70 max-w-md">
          Soluções de crédito consignado para aposentados, pensionistas e servidores públicos em São Luís - MA.
        </p>
        <div className="mt-5 flex gap-3">
          <a href={config.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="h-9 w-9 rounded-full bg-gradient-to-br from-[#833AB4] via-[#E1306C] to-[#FCAF45] flex items-center justify-center transition-opacity hover:opacity-90">
            <Instagram className="h-4 w-4 text-white" />
          </a>
          <a href="#" aria-label="Facebook" className="h-9 w-9 rounded-full bg-white/10 hover:bg-accent flex items-center justify-center transition-colors">
            <Facebook className="h-4 w-4" />
          </a>
          <a href="#" aria-label="LinkedIn" className="h-9 w-9 rounded-full bg-white/10 hover:bg-accent flex items-center justify-center transition-colors">
            <Linkedin className="h-4 w-4" />
          </a>
        </div>
      </div>

      <div>
        <h4 className="font-semibold mb-4">Links rápidos</h4>
        <ul className="space-y-2 text-sm text-primary-foreground/70">
          <li><a href="#servicos" className="hover:text-accent">Serviços</a></li>
          <li><a href="#contato" className="hover:text-accent">Simular agora</a></li>
          <li><a href="#como-funciona" className="hover:text-accent">Como funciona</a></li>
          <li><a href="#contato" className="hover:text-accent">Contato</a></li>
        </ul>
      </div>

      <div>
        <h4 className="font-semibold mb-4">Contato</h4>
        <ul className="space-y-2 text-sm text-primary-foreground/70">
          <li>{config.whatsappDisplay}</li>
          <li>{config.email}</li>
          <li>{config.address}</li>
        </ul>
      </div>
    </div>

    <div className="container-page mt-12 pt-6 border-t border-white/10 text-xs text-primary-foreground/60 space-y-3">
      <p>
        KF Empréstimos atua como correspondente bancário, oferecendo serviços de intermediação de crédito junto a instituições financeiras autorizadas pelo Banco Central do Brasil. As condições apresentadas são indicativas e estão sujeitas à análise e aprovação.
      </p>
      <p>© {new Date().getFullYear()} KF Empréstimos. Todos os direitos reservados.</p>
    </div>
  </footer>
  );
};