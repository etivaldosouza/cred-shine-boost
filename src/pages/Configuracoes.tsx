import { useState } from "react";
import { Link } from "react-router-dom";
import { z } from "zod";
import { ArrowLeft, RotateCcw, Save } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  DEFAULT_SITE_CONFIG,
  resetSiteConfig,
  saveSiteConfig,
  useSiteConfig,
  type SiteConfig,
} from "@/config/site-config";

const schema = z.object({
  whatsappNumber: z
    .string()
    .trim()
    .min(10, "Mínimo 10 dígitos (com DDI e DDD)")
    .max(20)
    .regex(/^[0-9+\s()-]+$/, "Apenas números, espaço, +, ( ) e -"),
  whatsappDisplay: z.string().trim().min(4, "Informe o telefone formatado").max(30),
  email: z.string().trim().email("E-mail inválido").max(255),
  address: z.string().trim().min(3, "Informe o endereço").max(200),
  hours: z.string().trim().min(3, "Informe o horário").max(120),
  instagramUrl: z.string().trim().url("URL inválida").max(500).optional(),
});

const fields: { key: keyof typeof DEFAULT_SITE_CONFIG; label: string; hint?: string; placeholder?: string }[] = [
  {
    key: "whatsappNumber",
    label: "WhatsApp (número técnico)",
    hint: "Somente dígitos com DDI + DDD. Ex.: 5598999999999",
    placeholder: "5598999999999",
  },
  {
    key: "whatsappDisplay",
    label: "WhatsApp (exibição)",
    hint: "Como aparece no site. Ex.: (98) 99999-9999",
    placeholder: "(98) 99999-9999",
  },
  { key: "email", label: "E-mail de contato", placeholder: "kfemprestimos@gmail.com" },
  { key: "address", label: "Endereço", placeholder: "Av. Leste-Oeste, Cohatrac I, São Luís - MA" },
  { key: "hours", label: "Horário de atendimento", placeholder: "Segunda a sexta, 8h às 18h" },
  { key: "instagramUrl", label: "Instagram", hint: "Link completo do perfil", placeholder: "https://www.instagram.com/kfemprestimos" },
];

const Configuracoes = () => {
  const current = useSiteConfig();
  const [form, setForm] = useState(current);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse(form);
    if (!result.success) {
      const errs: Record<string, string> = {};
      result.error.issues.forEach((i) => (errs[i.path[0] as string] = i.message));
      setErrors(errs);
      toast.error("Verifique os campos");
      return;
    }
    setErrors({});
    saveSiteConfig(result.data as SiteConfig);
    toast.success("Configurações salvas com sucesso");
  };

  const onReset = () => {
    resetSiteConfig();
    setForm(DEFAULT_SITE_CONFIG);
    setErrors({});
    toast.success("Configurações restauradas para os valores padrão");
  };

  return (
    <div className="min-h-screen bg-secondary/30 py-12 px-4" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
      <div className="max-w-2xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6">
          <ArrowLeft className="h-4 w-4" /> Voltar para o site
        </Link>

        <h1 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight">Configurações de contato</h1>
        <p className="mt-2 text-muted-foreground">
          Atualize WhatsApp, e-mail, endereço e horário. As alterações refletem em todo o site imediatamente.
        </p>

        <Card className="mt-8 shadow-soft border-border/70">
          <CardContent className="p-6 md:p-8">
            <form onSubmit={onSubmit} className="space-y-5" noValidate>
              {fields.map((f) => (
                <div key={f.key}>
                  <label className="text-sm font-medium text-foreground" htmlFor={f.key}>
                    {f.label}
                  </label>
                  <Input
                    id={f.key}
                    className="mt-1.5"
                    value={form[f.key]}
                    placeholder={f.placeholder}
                    onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                  />
                  {f.hint && !errors[f.key] && (
                    <p className="text-xs text-muted-foreground mt-1">{f.hint}</p>
                  )}
                  {errors[f.key] && <p className="text-xs text-destructive mt-1">{errors[f.key]}</p>}
                </div>
              ))}

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button type="submit" className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-full font-semibold">
                  <Save /> Salvar alterações
                </Button>
                <Button type="button" variant="outline" onClick={onReset} className="rounded-full">
                  <RotateCcw /> Restaurar padrão
                </Button>
              </div>

              <p className="text-xs text-muted-foreground pt-2 border-t border-border mt-2">
                As configurações são salvas localmente neste navegador. Para tornar globais para todos os visitantes,
                conecte um backend (Lovable Cloud).
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Configuracoes;