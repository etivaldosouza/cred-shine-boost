import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/kf-logo.png";

const links = [
  { href: "#inicio", label: "Início" },
  { href: "#sobre-nos", label: "Sobre nós" },
  { href: "#servicos", label: "Serviços" },
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#contato", label: "Contato" },
];

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/85 backdrop-blur-md border-b border-border shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between md:h-20">
        <a href="#inicio" className="flex items-center gap-2" aria-label="KF Empréstimos">
          <img src={logo} alt="KF Empréstimos" width={40} height={40} className="h-10 w-10" />
          <span className="font-bold text-primary tracking-tight text-lg uppercase">
            KF <span className="text-accent">Empréstimos</span>
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold rounded-full px-6">
            <a href="#contato">Simular agora</a>
          </Button>
        </div>

        <button
          className="md:hidden p-2 text-primary"
          onClick={() => setOpen((o) => !o)}
          aria-label="Abrir menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-background border-t border-border animate-fade-up">
          <div className="container-page py-4 flex flex-col gap-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-3 text-sm font-medium text-foreground hover:text-primary"
              >
                {l.label}
              </a>
            ))}
            <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground mt-2 rounded-full">
              <a href="#contato" onClick={() => setOpen(false)}>Simular agora</a>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};