import { lazy, Suspense } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import SocialProof from "@/components/SocialProof";
import AnimateOnScroll from "@/components/AnimateOnScroll";

// Lazy load secciones below-the-fold
const WhatsAppFeatures = lazy(() => import("@/components/WhatsAppFeatures"));
const PassiveCapture = lazy(() => import("@/components/PassiveCapture"));
const Investments = lazy(() => import("@/components/Investments"));
const AgentCapabilities = lazy(() => import("@/components/AgentCapabilities"));
const Benefits = lazy(() => import("@/components/Benefits"));
const Pricing = lazy(() => import("@/components/Pricing"));
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
          <Investments />
        </AnimateOnScroll>
        <AnimateOnScroll>
          <AgentCapabilities />
        </AnimateOnScroll>
        <AnimateOnScroll>
          <Benefits />
        </AnimateOnScroll>
        <AnimateOnScroll>
          <Pricing />
        </AnimateOnScroll>
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
