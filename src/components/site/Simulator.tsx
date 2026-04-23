import { useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calculator } from "lucide-react";

const modalities = [
  { id: "inss", label: "INSS", rate: 0.0155 },
  { id: "servidor", label: "Servidor", rate: 0.0165 },
  { id: "fgts", label: "FGTS", rate: 0.0199 },
  { id: "portabilidade", label: "Portabilidade", rate: 0.0145 },
] as const;

const formatBRL = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });

type Props = { onSimulate: (data: { modality: string; amount: number; term: number; installment: number }) => void };

export const Simulator = ({ onSimulate }: Props) => {
  const [amount, setAmount] = useState(15000);
  const [term, setTerm] = useState(60);
  const [modalityId, setModalityId] = useState<typeof modalities[number]["id"]>("inss");

  const modality = modalities.find((m) => m.id === modalityId)!;

  const installment = useMemo(() => {
    // Price formula: PMT = PV * i / (1 - (1+i)^-n)
    const i = modality.rate;
    const n = term;
    return (amount * i) / (1 - Math.pow(1 + i, -n));
  }, [amount, term, modality]);

  return (
    <section id="simulador" className="py-20 md:py-28 bg-gradient-to-b from-secondary/40 to-background">
      <div className="container-page">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-wider text-accent">Simulador</span>
          <h2 className="mt-3 text-3xl md:text-5xl font-extrabold text-primary tracking-tight">
            Simule seu empréstimo em segundos
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            Ajuste o valor e o prazo para visualizar a parcela estimada. Sem cadastro, sem compromisso.
          </p>
        </div>

        <Card className="mt-10 border-border/70 shadow-elevated overflow-hidden">
          <CardContent className="p-0 grid lg:grid-cols-5">
            <div className="lg:col-span-3 p-7 md:p-10 space-y-8">
              <div>
                <label className="text-sm font-semibold text-foreground">Modalidade</label>
                <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {modalities.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setModalityId(m.id)}
                      className={`px-3 py-2.5 text-sm font-medium rounded-xl border transition-all ${
                        modalityId === m.id
                          ? "bg-primary text-primary-foreground border-primary shadow-sm"
                          : "bg-card border-border hover:border-primary/40 text-foreground"
                      }`}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-baseline justify-between">
                  <label className="text-sm font-semibold text-foreground">Valor desejado</label>
                  <span className="text-2xl font-extrabold text-primary">{formatBRL(amount)}</span>
                </div>
                <Slider
                  value={[amount]}
                  min={1000}
                  max={200000}
                  step={500}
                  onValueChange={([v]) => setAmount(v)}
                  className="mt-4"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <span>R$ 1.000</span><span>R$ 200.000</span>
                </div>
              </div>

              <div>
                <div className="flex items-baseline justify-between">
                  <label className="text-sm font-semibold text-foreground">Prazo</label>
                  <span className="text-2xl font-extrabold text-primary">{term} meses</span>
                </div>
                <Slider
                  value={[term]}
                  min={12}
                  max={120}
                  step={6}
                  onValueChange={([v]) => setTerm(v)}
                  className="mt-4"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <span>12 meses</span><span>120 meses</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 bg-primary text-primary-foreground p-7 md:p-10 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-primary-foreground/80 text-sm">
                  <Calculator className="h-4 w-4" /> Parcela estimada
                </div>
                <p className="mt-3 text-5xl font-extrabold tracking-tight">{formatBRL(installment)}</p>
                <p className="mt-1 text-sm text-primary-foreground/70">por mês durante {term} meses</p>

                <div className="mt-8 space-y-3 text-sm">
                  <div className="flex justify-between border-b border-primary-foreground/15 pb-2">
                    <span className="text-primary-foreground/70">Modalidade</span>
                    <span className="font-semibold">{modality.label}</span>
                  </div>
                  <div className="flex justify-between border-b border-primary-foreground/15 pb-2">
                    <span className="text-primary-foreground/70">Taxa indicativa</span>
                    <span className="font-semibold">{(modality.rate * 100).toFixed(2)}% a.m.</span>
                  </div>
                  <div className="flex justify-between border-b border-primary-foreground/15 pb-2">
                    <span className="text-primary-foreground/70">Total estimado</span>
                    <span className="font-semibold">{formatBRL(installment * term)}</span>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <Button
                  onClick={() =>
                    onSimulate({ modality: modality.label, amount, term, installment })
                  }
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground rounded-full font-semibold"
                  size="lg"
                >
                  Solicitar essa simulação <ArrowRight />
                </Button>
                <p className="mt-3 text-xs text-primary-foreground/60 text-center">
                  *Valores estimados, sujeitos a análise e aprovação de crédito.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};