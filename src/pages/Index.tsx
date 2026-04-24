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

const Index = () => {
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
