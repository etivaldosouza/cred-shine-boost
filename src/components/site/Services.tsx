import { Users, Briefcase, Repeat, Wallet, Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const services = [
  {
    icon: Users,
    title: "Aposentados e Pensionistas do INSS",
    bullets: [
      "Crédito facilitado com as menores taxas",
      "Parcelas que cabem no seu orçamento",
      "Liberação rápida e desconto direto no benefício",
    ],
  },
  {
    icon: Briefcase,
    title: "Servidores Públicos",
    bullets: [
      "Condições especiais para servidores federais, estaduais e municipais",
      "Margem consignável otimizada",
      "Atendimento personalizado para sua categoria",
    ],
  },
  {
    icon: Repeat,
    title: "Portabilidade Bancária",
    badge: "Novo",
    bullets: [
      "Reduza a taxa do seu empréstimo atual",
      "Diminua o valor das parcelas",
      "Quite mais rápido com as melhores condições",
    ],
  },
  {
    icon: Wallet,
    title: "FGTS — Antecipação",
    bullets: [
      "Antecipe até 5 parcelas do seu saque-aniversário",
      "Disponível mesmo para negativados",
      "Dinheiro na conta em poucas horas",
    ],
  },
];

export const Services = () => (
  <section id="servicos" className="py-20 md:py-28">
    <div className="container-page">
      <div className="max-w-2xl">
        <span className="text-xs font-semibold uppercase tracking-wider text-accent">Nossos serviços</span>
        <h2 className="mt-3 text-3xl md:text-5xl font-extrabold text-primary tracking-tight">
          Soluções de crédito feitas para você
        </h2>
        <p className="mt-4 text-muted-foreground text-lg">
          Trabalhamos com as principais modalidades de empréstimo consignado, sempre com transparência e as melhores condições.
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {services.map(({ icon: Icon, title, bullets, badge }) => (
          <Card
            key={title}
            className="group border-border/70 hover:border-primary/30 hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-soft"
          >
            <CardContent className="p-7">
              <div className="flex items-start justify-between">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                  <Icon className="h-6 w-6" />
                </div>
                {badge && (
                  <span className="rounded-full bg-accent text-accent-foreground text-xs font-semibold px-3 py-1">
                    {badge}
                  </span>
                )}
              </div>
              <h3 className="mt-5 text-xl font-bold text-primary">{title}</h3>
              <ul className="mt-4 space-y-2.5">
                {bullets.map((b) => (
                  <li key={b} className="flex gap-2.5 text-sm text-foreground/80">
                    <Check className="h-5 w-5 text-success shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </section>
);