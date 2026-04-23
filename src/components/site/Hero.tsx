import { ArrowRight, MessageCircle, ShieldCheck, HeartHandshake, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { buildWhatsappLink } from "./constants";
import heroImg from "@/assets/hero-couple.jpg";

export const Hero = () => {
  return (
    <section id="inicio" className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_left,hsl(var(--primary)/0.08),transparent_55%),radial-gradient(ellipse_at_bottom_right,hsl(var(--accent)/0.08),transparent_55%)]" />
      <div className="container-page grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
        <div className="animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full bg-accent-soft text-accent px-4 py-1.5 text-xs font-semibold uppercase tracking-wide">
            <Zap className="h-3.5 w-3.5" /> Liberação em até 24h
          </span>
          <h1 className="mt-5 text-4xl md:text-6xl font-extrabold tracking-tight text-primary leading-[1.05]">
            Empréstimo consignado com as <span className="text-accent">melhores taxas</span> do mercado.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-xl">
            Soluções financeiras inteligentes para aposentados, pensionistas do INSS e servidores públicos.
            Atendimento humano e personalizado em São Luís - MA.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-full font-semibold shadow-glow-accent">
              <a href="#simulador">Simular agora <ArrowRight /></a>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full border-primary/20 hover:bg-primary/5">
              <a href={buildWhatsappLink("Olá! Gostaria de informações sobre empréstimo consignado.")} target="_blank" rel="noopener">
                <MessageCircle /> Falar no WhatsApp
              </a>
            </Button>
          </div>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { icon: HeartHandshake, label: "Atendimento humano" },
              { icon: ShieldCheck, label: "Taxas competitivas" },
              { icon: Zap, label: "Sem burocracia" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-sm text-foreground/80">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Icon className="h-4 w-4" />
                </span>
                <span className="font-medium">{label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative animate-fade-up" style={{ animationDelay: "120ms" }}>
          <div className="absolute -inset-4 bg-gradient-to-tr from-primary/15 to-accent/15 rounded-[2rem] blur-2xl" />
          <img
            src={heroImg}
            alt="Casal sorrindo simulando empréstimo no celular"
            width={1280}
            height={1280}
            className="relative rounded-[2rem] shadow-elevated object-cover w-full aspect-square"
          />
          <div className="hidden md:flex absolute -bottom-6 -left-6 bg-card border border-border rounded-2xl shadow-soft p-4 gap-3 items-center">
            <div className="h-10 w-10 rounded-full bg-success/15 text-success flex items-center justify-center">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Taxa a partir de</p>
              <p className="text-lg font-bold text-primary">1,55% a.m.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};