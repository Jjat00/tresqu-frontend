import { lazy, Suspense } from "react";
import { useInView } from "@/hooks/useInView";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Seo from "@/components/Seo";

// Lazy load secciones below-the-fold. La historia sigue el lema:
// «Sabe cómo vives» → «Invierte como eres» → producto → confianza → empezar.
const LiveSection = lazy(() => import("@/components/landing/LiveSection"));
const InvestSection = lazy(() => import("@/components/landing/InvestSection"));
const DashboardShowcase = lazy(() => import("@/components/DashboardShowcase"));
// Oculto hasta tener los pagos configurados (se mantiene para reactivar después)
// const Pricing = lazy(() => import("@/components/Pricing"));
const TrustSection = lazy(() => import("@/components/landing/TrustSection"));
const FinalCta = lazy(() => import("@/components/landing/FinalCta"));
const Footer = lazy(() => import("@/components/Footer"));

const SectionFallback = () => <div className="min-h-[60vh]" />;

/**
 * La vitrina monta los tabs reales del dashboard (Recharts incluido): se
 * carga solo al acercarse al viewport y con su propio Suspense, para que no
 * retenga al resto de la página mientras se resuelve.
 */
const DeferredShowcase = () => {
  const { ref, isInView } = useInView({ rootMargin: "600px 0px" });
  return (
    <div ref={ref} className="min-h-[60vh]">
      {isInView && (
        <Suspense fallback={<SectionFallback />}>
          <DashboardShowcase />
        </Suspense>
      )}
    </div>
  );
};

const Index = () => {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-foreground relative overflow-hidden">
      <Seo page="home" />
      {/* Grano de película global (fijo, no interactivo) */}
      <div className="bg-grain" aria-hidden="true" />
      <Header />
      <Hero />
      <Suspense fallback={<SectionFallback />}>
        <LiveSection />
        <div className="lx-hairline mx-auto max-w-5xl" />
        <InvestSection />
      </Suspense>
      <DeferredShowcase />
      <Suspense fallback={<SectionFallback />}>
        {/* Sección de precios oculta hasta tener los pagos configurados.
            No eliminar: el componente Pricing se mantiene para reactivarlo después. */}
        <div className="lx-hairline mx-auto max-w-5xl" />
        <TrustSection />
        <FinalCta />
        <Footer />
      </Suspense>
    </main>
  );
};

export default Index;
