
import Header from "@/components/Header";
import RealExamples from "@/components/RealExamples";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Benefits from "@/components/Benefits";
import FutureVision from "@/components/FutureVision";
import WaitlistForm from "@/components/WaitlistForm";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      <Hero />
      <RealExamples />
      <HowItWorks />
      <Benefits />
      <FutureVision />
      <WaitlistForm />
      <Footer />
    </main>
  );
};

export default Index;
