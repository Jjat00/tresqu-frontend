import { lazy, Suspense } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import SocialProof from "@/components/SocialProof";
import AnimateOnScroll from "@/components/AnimateOnScroll";

// Lazy load secciones below-the-fold
const WhatsAppFeatures = lazy(() => import("@/components/WhatsAppFeatures"));
const PassiveCapture = lazy(() => import("@/components/PassiveCapture"));
const WallbitSection = lazy(() => import("@/components/WallbitSection"));
const AgentTeam = lazy(() => import("@/components/AgentTeam"));
const AgentCapabilities = lazy(() => import("@/components/AgentCapabilities"));
const Benefits = lazy(() => import("@/components/Benefits"));
// Oculto hasta tener los pagos configurados (se mantiene para reactivar después)
// const Pricing = lazy(() => import("@/components/Pricing"));
const FutureVision = lazy(() => import("@/components/FutureVision"));
const Contact = lazy(() => import("@/components/Contact"));
const Footer = lazy(() => import("@/components/Footer"));

const SectionFallback = () => (
  <div className="section-padding flex items-center justify-center">
    <div className="animate-pulse h-40 w-full max-w-4xl rounded-md bg-muted/20" />
  </div>
);

const Index = () => {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-foreground relative overflow-hidden">
      {/* Grano de película global (fijo, no interactivo) */}
      <div className="bg-grain" aria-hidden="true" />
      <Header />
      <Hero />
      <SocialProof />
      <Suspense fallback={<SectionFallback />}>
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
      </Suspense>
    </main>
  );
};

export default Index;
