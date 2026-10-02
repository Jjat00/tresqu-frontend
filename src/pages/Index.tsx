import { lazy, Suspense } from "react";
import Header from "@/components/Header";
import Seo from "@/components/Seo";
import HomeHero from "@/components/home/HomeHero";
import WhatsAppFab from "@/components/home/WhatsAppFab";
import "@/components/home/home.css";

// Landing «Noche de puntos»: hero → por qué → ejemplos → preguntas.
// Todo lo que va bajo el pliegue llega en un chunk diferido.
// Pricing sigue oculto hasta tener los pagos configurados (src/components/Pricing.tsx).
const HomeBelowFold = lazy(() => import("@/components/home/HomeBelowFold"));
const Footer = lazy(() => import("@/components/Footer"));

const Index = () => {
  return (
    <div className="tq-home">
      <Seo page="home" />
      <Header />
      <main id="top">
        <HomeHero />
        <Suspense fallback={<div className="min-h-[100vh]" />}>
          <HomeBelowFold />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
      <WhatsAppFab />
    </div>
  );
};

export default Index;
