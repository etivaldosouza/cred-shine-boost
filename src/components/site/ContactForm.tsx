import { useEffect, useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { buildWhatsappLink } from "./constants";

const schema = z.object({
  name: z.string().trim().min(2, "Informe seu nome").max(100),
  phone: z.string().trim().min(10, "Telefone inválido").max(20),
  email: z.string().trim().email("E-mail inválido").max(255),
  modality: z.string().min(1, "Selecione a modalidade"),
  amount: z.string().min(1, "Informe o valor desejado").max(20),
  message: z.string().max(500).optional(),
});

export type ContactPrefill = {
  modality?: string;
  amount?: string;
  message?: string;
} | null;

export const ContactForm = ({ prefill }: { prefill: ContactPrefill }) => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    modality: "",
    amount: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (prefill) {
      setForm((f) => ({
        ...f,
        modality: prefill.modality ?? f.modality,
        amount: prefill.amount ?? f.amount,
        message: prefill.message ?? f.message,
      }));
    }
  }, [prefill]);

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [k]: e.target.value });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse(form);
    if (!result.success) {
      const errs: Record<string, string> = {};
      result.error.issues.forEach((i) => (errs[i.path[0] as string] = i.message));
      setErrors(errs);
      toast.error("Verifique os campos do formulário");
      return;
    }
    setErrors({});
    const msg = `Olá, KF Empréstimos! Gostaria de uma simulação:%0A
*Nome:* ${result.data.name}%0A
*Telefone:* ${result.data.phone}%0A
*E-mail:* ${result.data.email}%0A
*Modalidade:* ${result.data.modality}%0A
*Valor desejado:* ${result.data.amount}%0A
${result.data.message ? `*Mensagem:* ${result.data.message}` : ""}`;
    window.open(buildWhatsappLink(msg.replace(/%0A/g, "\n")), "_blank", "noopener");
    toast.success("Redirecionando para o WhatsApp...");
  };

  const modalities = ["INSS", "Servidor", "FGTS", "Portabilidade"];

  return (
    <section id="contato" className="py-20 md:py-28">
      <div className="container-page grid lg:grid-cols-2 gap-12 items-start">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-accent">Solicite sua simulação</span>
          <h2 className="mt-3 text-3xl md:text-5xl font-extrabold text-primary tracking-tight">
            Fale com um especialista
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            Preencha o formulário e nossa equipe entrará em contato pelo WhatsApp com uma proposta personalizada para o seu perfil.
          </p>
          <ul className="mt-8 space-y-4 text-sm text-foreground/80">
            <li className="flex items-start gap-3">
              <span className="h-2 w-2 mt-2 rounded-full bg-accent shrink-0" />
              Resposta rápida em horário comercial
            </li>
            <li className="flex items-start gap-3">
              <span className="h-2 w-2 mt-2 rounded-full bg-accent shrink-0" />
              Atendimento humano e sem compromisso
            </li>
            <li className="flex items-start gap-3">
              <span className="h-2 w-2 mt-2 rounded-full bg-accent shrink-0" />
              Seus dados são tratados com total sigilo
            </li>
          </ul>
        </div>

        <Card className="border-border/70 shadow-elevated">
          <CardContent className="p-7 md:p-9">
            <form onSubmit={onSubmit} className="space-y-4" noValidate>
              <div>
                <label className="text-sm font-medium text-foreground">Nome completo</label>
                <Input className="mt-1.5" value={form.name} onChange={update("name")} maxLength={100} />
                {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground">Telefone</label>
                  <Input className="mt-1.5" placeholder="(98) 99999-9999" value={form.phone} onChange={update("phone")} maxLength={20} />
                  {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone}</p>}
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">E-mail</label>
                  <Input className="mt-1.5" type="email" value={form.email} onChange={update("email")} maxLength={255} />
                  {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Modalidade</label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {modalities.map((m) => (
                    <button
                      type="button"
                      key={m}
                      onClick={() => setForm({ ...form, modality: m })}
                      className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                        form.modality === m
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-card border-border hover:border-primary/40"
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
                {errors.modality && <p className="text-xs text-destructive mt-1">{errors.modality}</p>}
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Valor desejado</label>
                <Input className="mt-1.5" placeholder="R$ 15.000" value={form.amount} onChange={update("amount")} maxLength={20} />
                {errors.amount && <p className="text-xs text-destructive mt-1">{errors.amount}</p>}
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Mensagem (opcional)</label>
                <Input className="mt-1.5" value={form.message} onChange={update("message")} maxLength={500} />
              </div>
              <Button type="submit" size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground rounded-full font-semibold mt-2">
                <MessageCircle /> Enviar pelo WhatsApp
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};