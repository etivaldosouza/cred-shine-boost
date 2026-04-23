const stats = [
  { value: "+10", label: "Anos de mercado" },
  { value: "+5.000", label: "Clientes atendidos" },
  { value: "1,55%", label: "Taxa a partir de a.m." },
  { value: "24h", label: "Liberação em até" },
];

export const Stats = () => (
  <section className="py-12 bg-primary text-primary-foreground">
    <div className="container-page grid grid-cols-2 md:grid-cols-4 gap-6">
      {stats.map((s) => (
        <div key={s.label} className="text-center">
          <p className="text-3xl md:text-4xl font-extrabold tracking-tight">{s.value}</p>
          <p className="mt-1 text-sm text-primary-foreground/70">{s.label}</p>
        </div>
      ))}
    </div>
  </section>
);