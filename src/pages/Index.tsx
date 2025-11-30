import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Benefits from "@/components/Benefits";
import FutureVision from "@/components/FutureVision";
import Pricing from "@/components/Pricing";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-foreground relative overflow-hidden">
      <Header />
      <Hero />
      <HowItWorks />
      <Benefits />
      <Pricing />
      <FutureVision />
      <Contact />
      <Footer />
    </main>
  );
};

export default Index;
