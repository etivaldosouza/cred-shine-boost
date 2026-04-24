import febrabanLogo from "@/assets/febraban-logo.svg";

const stats = [
  { value: "16", label: "Anos de atuação" },
  { value: "+5.000", label: "Clientes atendidos" },
  { value: "FEBRABAN", label: "Empresa certificada" },
  { value: "24h", label: "Liberação em até" },
];

export const Stats = () => (
  <section className="py-12 bg-primary text-primary-foreground">
    <div className="container-page grid grid-cols-2 md:grid-cols-4 gap-6">
      {stats.map((s) => (
        <div key={s.label} className="text-center">
          <p className="flex items-center justify-center gap-2 text-2xl md:text-4xl font-extrabold tracking-tight">
            {s.value === "FEBRABAN" && (
              <img src={febrabanLogo} alt="FEBRABAN" width={28} height={34} className="h-8 md:h-10 w-auto" />
            )}
            {s.value}
          </p>
          <p className="mt-1 text-sm text-primary-foreground/70">{s.label}</p>
        </div>
      ))}
    </div>
  </section>
);