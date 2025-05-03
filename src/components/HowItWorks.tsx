
import { MessageSquare, Send, Users } from "lucide-react";

const steps = [
  {
    icon: <MessageSquare className="h-8 w-8" />,
    title: "Escribe tu gasto",
    description: "Envía un mensaje a CashBot por WhatsApp o Telegram como lo harías normalmente.",
    example: "Gasté 15 mil en almuerzo"
  },
  {
    icon: <Send className="h-8 w-8" />,
    title: "El bot lo procesa",
    description: "Nuestro asistente interpreta tu mensaje, categoriza y guarda el gasto automáticamente.",
    example: "✅ Gasto registrado: $15,000"
  },
  {
    icon: <Users className="h-8 w-8" />,
    title: "Consulta tus estadísticas",
    description: "Accede a tu panel web personal para ver todas tus finanzas organizadas.",
    example: "Revisa tus gastos y tendencias"
  }
];

const HowItWorks = () => {
  return (
    <section id="como-funciona" className="section-padding bg-secondary">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">¿Cómo funciona?</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Registrar tus gastos nunca había sido tan fácil y natural
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="glass p-6 h-full flex flex-col items-center text-center animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}>
                <div className="w-14 h-14 rounded-full bg-success/20 flex items-center justify-center mb-4">
                  {step.icon}
                </div>
                <h3 className="text-lg font-semibold mb-3">{step.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{step.description}</p>
                <div className="mt-auto bg-background/50 p-3 rounded-lg w-full">
                  <p className="text-sm">{step.example}</p>
                </div>
                
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/3 -right-4 transform translate-x-1/2">
                    <div className="w-8 h-8 rounded-full bg-success/20 flex items-center justify-center">
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                )}
              </div>
              {index + 1 < steps.length && (
                <div className="md:hidden flex justify-center my-4">
                  <ArrowDown className="h-6 w-6 text-success/40" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

import { ArrowDown, ArrowRight } from "lucide-react";

export default HowItWorks;
