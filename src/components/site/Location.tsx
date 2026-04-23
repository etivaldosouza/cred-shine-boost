import { MapPin, Clock, Phone, Mail } from "lucide-react";
import { COMPANY_ADDRESS, COMPANY_EMAIL, COMPANY_HOURS, WHATSAPP_DISPLAY } from "./constants";

export const Location = () => (
  <section className="py-20 md:py-28 bg-secondary/40">
    <div className="container-page grid lg:grid-cols-2 gap-10 items-stretch">
      <div>
        <span className="text-xs font-semibold uppercase tracking-wider text-accent">Localização</span>
        <h2 className="mt-3 text-3xl md:text-5xl font-extrabold text-primary tracking-tight">
          Estamos em São Luís - MA
        </h2>
        <p className="mt-4 text-muted-foreground text-lg">
          Atendimento humano e presencial, com toda a confiança que você merece.
        </p>

        <ul className="mt-8 space-y-5">
          {[
            { icon: MapPin, label: "Endereço", value: COMPANY_ADDRESS },
            { icon: Clock, label: "Horário", value: COMPANY_HOURS },
            { icon: Phone, label: "WhatsApp", value: WHATSAPP_DISPLAY },
            { icon: Mail, label: "E-mail", value: COMPANY_EMAIL },
          ].map((it) => (
            <li key={it.label} className="flex gap-4">
              <div className="h-11 w-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <it.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide font-semibold">{it.label}</p>
                <p className="text-foreground font-medium">{it.value}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-3xl overflow-hidden border border-border shadow-soft min-h-[360px]">
        <iframe
          title="Mapa KF Empréstimos São Luís"
          src="https://www.google.com/maps?q=S%C3%A3o+Lu%C3%ADs+-+MA&output=embed"
          width="100%"
          height="100%"
          loading="lazy"
          className="w-full h-full min-h-[360px] border-0"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  </section>
);