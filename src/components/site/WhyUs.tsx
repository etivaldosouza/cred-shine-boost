import { HeartHandshake, TrendingDown, Smartphone, MapPin } from "lucide-react";

const items = [
  { icon: HeartHandshake, title: "Atendimento personalizado", desc: "Cada cliente é único. Cuidamos de você do início ao fim." },
  { icon: TrendingDown, title: "Taxas competitivas", desc: "Buscamos as melhores condições do mercado para o seu perfil." },
  { icon: Smartphone, title: "Processo 100% digital", desc: "Faça tudo de onde estiver, sem filas e sem burocracia." },
  { icon: MapPin, title: "Suporte humano local", desc: "Equipe presente em São Luís - MA, pronta para ajudar você." },
];

export const WhyUs = () => (
  <section className="py-20 md:py-28 bg-secondary/40">
    <div className="container-page">
      <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-accent">Sobre nós</span>
          <h2 className="mt-3 text-3xl md:text-5xl font-extrabold text-primary tracking-tight">
            Nossa História
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            Somos uma empresa certificada pela FEBRABAN e há 16 anos atuando com concessão de crédito consignado.
          </p>
        </div>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            A KF Empréstimos se estabeleceu como referência no mercado de crédito consignado. Nossa missão é facilitar o acesso ao crédito consignado de forma segura e transparente, proporcionando as melhores condições para nossos clientes.
          </p>
          <p>
            Com uma equipe altamente qualificada e comprometida, oferecemos soluções personalizadas que atendem às necessidades específicas de cada cliente, sempre prezando pela ética, transparência e excelência no atendimento.
          </p>
        </div>
      </div>

      <div className="max-w-2xl">
        <span className="text-xs font-semibold uppercase tracking-wider text-accent">Por que escolher</span>
        <h2 className="mt-3 text-3xl md:text-5xl font-extrabold text-primary tracking-tight">
          Diferenciais KF Empréstimos
        </h2>
      </div>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((it) => (
          <div key={it.title} className="bg-card rounded-2xl p-6 border border-border hover:border-accent/40 transition-colors">
            <div className="h-12 w-12 rounded-xl bg-accent-soft text-accent flex items-center justify-center">
              <it.icon className="h-6 w-6" />
            </div>
            <h3 className="mt-4 font-bold text-primary text-lg">{it.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{it.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);