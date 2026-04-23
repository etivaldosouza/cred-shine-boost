import { useState } from "react";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { Stats } from "@/components/site/Stats";
import { Services } from "@/components/site/Services";
import { Simulator } from "@/components/site/Simulator";
import { HowItWorks } from "@/components/site/HowItWorks";
import { WhyUs } from "@/components/site/WhyUs";
import { ContactForm, ContactPrefill } from "@/components/site/ContactForm";
import { Location } from "@/components/site/Location";
import { Footer } from "@/components/site/Footer";
import { WhatsappFab } from "@/components/site/WhatsappFab";

const formatBRL = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });

const Index = () => {
  const [prefill, setPrefill] = useState<ContactPrefill>(null);

  return (
    <div className="min-h-screen bg-background font-sans" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
      <Header />
      <main>
        <Hero />
        <Stats />
        <Services />
        <Simulator
          onSimulate={({ modality, amount, term, installment }) => {
            setPrefill({
              modality,
              amount: formatBRL(amount),
              message: `Simulação: ${formatBRL(amount)} em ${term}x de ${formatBRL(installment)} (${modality}).`,
            });
            document.getElementById("contato")?.scrollIntoView({ behavior: "smooth" });
          }}
        />
        <HowItWorks />
        <WhyUs />
        <ContactForm prefill={prefill} />
        <Location />
      </main>
      <Footer />
      <WhatsappFab />
    </div>
  );
};

export default Index;
