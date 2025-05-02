
import { ArrowRight, DollarSign, FileText, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

const futureFeatures = [
  {
    icon: <DollarSign className="h-6 w-6 text-success" />,
    title: "Envío de dinero sin complicaciones",
    description: "Envía dinero a tus contactos solo escribiendo: "Pásale 30 mil a Juan por Nequi"."
  },
  {
    icon: <FileText className="h-6 w-6 text-highlight" />,
    title: "Pago automático de facturas",
    description: "Paga facturas automáticamente, sin complicaciones ni vencimientos."
  },
  {
    icon: <Calendar className="h-6 w-6 text-success" />,
    title: "Análisis y consejos personalizados",
    description: "Recibe análisis y consejos personalizados sobre tus finanzas."
  }
];

const FutureVision = () => {
  return (
    <section id="futuro" className="section-padding bg-gradient-to-b from-background to-secondary">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">¿Qué sigue?</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Esto apenas comienza. Estamos construyendo un verdadero asistente financiero inteligente que te ayudará a:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
          {futureFeatures.map((feature, index) => (
            <div 
              key={index}
              className="glass p-6 h-full flex flex-col animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="italic text-muted-foreground mb-6">Todo, usando lenguaje natural desde tu app de mensajería favorita.</p>
          <Button size="lg" className="bg-success hover:bg-success/90">
            Sé parte del futuro de las finanzas personales <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FutureVision;
