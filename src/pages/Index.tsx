import Header from "@/components/Header";
import Hero from "@/components/Hero";
import SocialProof from "@/components/SocialProof";
import AnimateOnScroll from "@/components/AnimateOnScroll";
// Imports estáticos (antes lazy): el SSG necesita renderizar todas las
// secciones en build para que el contenido quede en el HTML estático.
import WhatsAppFeatures from "@/components/WhatsAppFeatures";
import PassiveCapture from "@/components/PassiveCapture";
import WallbitSection from "@/components/WallbitSection";
import AgentTeam from "@/components/AgentTeam";
import AgentCapabilities from "@/components/AgentCapabilities";
import Benefits from "@/components/Benefits";
// Oculto hasta tener los pagos configurados (se mantiene para reactivar después)
// import Pricing from "@/components/Pricing";
import FutureVision from "@/components/FutureVision";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-foreground relative overflow-hidden">
      <Header />
      <Hero />
      <SocialProof />
      <AnimateOnScroll>
        <WhatsAppFeatures />
      </AnimateOnScroll>
      <AnimateOnScroll>
        <PassiveCapture />
      </AnimateOnScroll>
      <AnimateOnScroll>
        <WallbitSection />
      </AnimateOnScroll>
      <AnimateOnScroll>
        <AgentTeam />
      </AnimateOnScroll>
      <AnimateOnScroll>
        <AgentCapabilities />
      </AnimateOnScroll>
      <AnimateOnScroll>
        <Benefits />
      </AnimateOnScroll>
      {/* Sección de precios oculta hasta tener los pagos configurados.
          No eliminar: el componente Pricing se mantiene para reactivarlo después. */}
      {/* <AnimateOnScroll>
        <Pricing />
      </AnimateOnScroll> */}
      <AnimateOnScroll>
        <FutureVision />
      </AnimateOnScroll>
      <AnimateOnScroll>
        <Contact />
      </AnimateOnScroll>
      <Footer />
    </main>
  );
};

export default Index;
