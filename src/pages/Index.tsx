import { useEffect } from "react";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { Stats } from "@/components/site/Stats";
import { Services } from "@/components/site/Services";
import { HowItWorks } from "@/components/site/HowItWorks";
import { WhyUs } from "@/components/site/WhyUs";
import { ContactForm } from "@/components/site/ContactForm";
import { Location } from "@/components/site/Location";
import { Footer } from "@/components/site/Footer";
import { WhatsappFab } from "@/components/site/WhatsappFab";

const seoByHash = {
  "": {
    title: "KF Empréstimos | Consignado em São Luís MA",
    description: "Solicite empréstimo consignado para INSS, servidores e FGTS com atendimento humano em São Luís - MA. Fale com a KF pelo WhatsApp.",
    url: "https://kfemprestimos.com.br/",
  },
  "#contato": {
    title: "Simular agora | KF Empréstimos",
    description: "Preencha a solicitação de simulação e fale com um especialista da KF Empréstimos pelo WhatsApp.",
    url: "https://kfemprestimos.com.br/#contato",
  },
  "#servicos": {
    title: "Serviços de crédito | KF Empréstimos",
    description: "Conheça opções de consignado INSS, servidor público, portabilidade e antecipação FGTS da KF Empréstimos.",
    url: "https://kfemprestimos.com.br/#servicos",
  },
};

const setMeta = (selector: string, value: string) => {
  const meta = document.head.querySelector<HTMLMetaElement>(selector);
  if (meta) meta.content = value;
};

const updateSeoForHash = () => {
  const seo = seoByHash[window.location.hash as keyof typeof seoByHash] ?? seoByHash[""];
  document.title = seo.title;
  setMeta('meta[name="description"]', seo.description);
  setMeta('meta[property="og:title"]', seo.title);
  setMeta('meta[property="og:description"]', seo.description);
  setMeta('meta[property="og:url"]', seo.url);
  setMeta('meta[name="twitter:title"]', seo.title);
  setMeta('meta[name="twitter:description"]', seo.description);
};

const Index = () => {
  useEffect(() => {
    updateSeoForHash();
    window.addEventListener("hashchange", updateSeoForHash);
    return () => window.removeEventListener("hashchange", updateSeoForHash);
  }, []);

  return (
    <div className="min-h-screen bg-background font-sans" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
      <Header />
      <main>
        <Hero />
        <Stats />
        <Services />
        <HowItWorks />
        <WhyUs />
        <ContactForm prefill={null} />
        <Location />
      </main>
      <Footer />
      <WhatsappFab />
    </div>
  );
};

export default Index;
