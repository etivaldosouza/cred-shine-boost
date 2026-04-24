import { ClipboardList, Send, Search, BadgeDollarSign } from "lucide-react";

const steps = [
  { icon: ClipboardList, title: "Solicite", desc: "Informe modalidade, valor desejado e seus dados no formulário." },
  { icon: Send, title: "Envie seus dados", desc: "Preencha o formulário ou fale conosco no WhatsApp." },
  { icon: Search, title: "Análise rápida", desc: "Nossa equipe avalia sua proposta em poucas horas." },
  { icon: BadgeDollarSign, title: "Dinheiro na conta", desc: "Após aprovação, o valor cai diretamente na sua conta." },
];

export const HowItWorks = () => (
  <section id="como-funciona" className="py-20 md:py-28">
    <div className="container-page">
      <div className="max-w-2xl">
        <span className="text-xs font-semibold uppercase tracking-wider text-accent">Como funciona</span>
        <h2 className="mt-3 text-3xl md:text-5xl font-extrabold text-primary tracking-tight">
          Em 4 passos simples
        </h2>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, i) => (
          <div key={s.title} className="relative rounded-2xl border border-border bg-card p-6 hover:shadow-soft transition-shadow">
            <div className="absolute -top-3 -right-3 h-9 w-9 rounded-full gradient-accent text-accent-foreground font-bold flex items-center justify-center text-sm shadow-glow-accent">
              {i + 1}
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <s.icon className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-lg font-bold text-primary">{s.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);