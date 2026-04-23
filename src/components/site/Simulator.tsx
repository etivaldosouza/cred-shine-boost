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

// Limites do simulador (fonte única da verdade)
const AMOUNT_MIN = 1000;
const AMOUNT_MAX = 200000;
const AMOUNT_STEP = 500;
const TERM_MIN = 12;
const TERM_MAX = 120;
const TERM_STEP = 6;

/** Garante número finito dentro de [min, max], arredondando ao step. */
const clampToStep = (value: unknown, min: number, max: number, step: number, fallback: number) => {
  const n = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(n)) return fallback;
  const bounded = Math.min(max, Math.max(min, n));
  return Math.round(bounded / step) * step;
};

/** Cálculo Price seguro: nunca retorna NaN/Infinity. */
const calcInstallment = (pv: number, rate: number, n: number) => {
  if (!Number.isFinite(pv) || !Number.isFinite(rate) || !Number.isFinite(n)) return 0;
  if (pv <= 0 || n <= 0) return 0;
  if (rate <= 0) return pv / n; // sem juros: amortização linear
  const denom = 1 - Math.pow(1 + rate, -n);
  if (denom <= 0) return 0;
  const pmt = (pv * rate) / denom;
  return Number.isFinite(pmt) ? pmt : 0;
};

const formatBRL = (v: number) =>
  (Number.isFinite(v) ? v : 0).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  });

type Props = { onSimulate: (data: { modality: string; amount: number; term: number; installment: number }) => void };

export const Simulator = ({ onSimulate }: Props) => {
  const [amount, setAmount] = useState<number>(15000);
  const [term, setTerm] = useState<number>(60);
  const [modalityId, setModalityId] = useState<typeof modalities[number]["id"]>("inss");

  const modality = modalities.find((m) => m.id === modalityId) ?? modalities[0];

  // Saneamento dos inputs antes do cálculo — defesa contra valores extremos/inválidos.
  const safeAmount = clampToStep(amount, AMOUNT_MIN, AMOUNT_MAX, AMOUNT_STEP, 15000);
  const safeTerm = clampToStep(term, TERM_MIN, TERM_MAX, TERM_STEP, 60);

  const installment = useMemo(
    () => calcInstallment(safeAmount, modality.rate, safeTerm),
    [safeAmount, safeTerm, modality.rate],
  );

  const total = Number.isFinite(installment * safeTerm) ? installment * safeTerm : 0;

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
                  value={[safeAmount]}
                  min={AMOUNT_MIN}
                  max={AMOUNT_MAX}
                  step={AMOUNT_STEP}
                  onValueChange={([v]) =>
                    setAmount(clampToStep(v, AMOUNT_MIN, AMOUNT_MAX, AMOUNT_STEP, safeAmount))
                  }
                  className="mt-4"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <span>R$ 1.000</span><span>R$ 200.000</span>
                </div>
              </div>

              <div>
                <div className="flex items-baseline justify-between">
                  <label className="text-sm font-semibold text-foreground">Prazo</label>
                  <span className="text-2xl font-extrabold text-primary">{safeTerm} meses</span>
                </div>
                <Slider
                  value={[safeTerm]}
                  min={TERM_MIN}
                  max={TERM_MAX}
                  step={TERM_STEP}
                  onValueChange={([v]) =>
                    setTerm(clampToStep(v, TERM_MIN, TERM_MAX, TERM_STEP, safeTerm))
                  }
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