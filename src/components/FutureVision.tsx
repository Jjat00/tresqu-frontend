import { ArrowRight, DollarSign, FileText, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
const futureFeatures = [
  {
    icon: <DollarSign className="h-5 w-5 sm:h-6 sm:w-6 text-success" />,
    title: "Envío de dinero sin complicaciones",
    description:
      'Envía dinero a tus contactos solo escribiendo: "Pásale 30 mil a Juan por Nequi".',
  },
  {
    icon: <FileText className="h-5 w-5 sm:h-6 sm:w-6 text-highlight" />,
    title: "Pago automático de facturas",
    description:
      "Paga facturas automáticamente, sin complicaciones ni vencimientos.",
  },
  {
    icon: <Calendar className="h-5 w-5 sm:h-6 sm:w-6 text-success" />,
    title: "Análisis y consejos personalizados",
    description:
      "Recibe análisis y consejos personalizados sobre tus finanzas.",
  },
];
const FutureVision = () => {
  const isMobile = useIsMobile();
  return (
    <section
      id="futuro"
      className="section-padding bg-gradient-to-b from-background to-secondary px-4 sm:px-6"
    >
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">
            ¿Qué sigue?
          </h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-xl mx-auto">
            Esto apenas comienza. Estamos construyendo un verdadero asistente
            financiero inteligente que te ayudará a:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 max-w-5xl mx-auto mb-10 md:mb-16">
          {futureFeatures.map((feature, index) => (
            <div
              key={index}
              className="glass p-4 md:p-6 h-full flex flex-col animate-fade-up rounded-xl"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              <div className="mb-3 md:mb-4">{feature.icon}</div>
              <h3 className="text-base md:text-lg font-semibold mb-2">
                {feature.title}
              </h3>
              <p className="text-xs md:text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="italic text-xs md:text-sm text-muted-foreground mb-4 md:mb-6">
            Todo, usando lenguaje natural desde tu app de mensajería favorita.
          </p>
        </div>
      </div>
    </section>
  );
};
export default FutureVision;
