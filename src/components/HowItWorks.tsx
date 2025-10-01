import { MessageSquare, Send, Users } from "lucide-react";
const steps = [
  {
    icon: <MessageSquare className="h-8 w-8 text-success" />,
    title: "Escribe tu gasto",
    description:
      "Envía un mensaje a Tresqu por WhatsApp o Telegram como lo harías normalmente.",
    example: "Gasté 15 mil en almuerzo",
  },
  {
    icon: <Send className="h-8 w-8 text-highlight" />,
    title: "La IA lo procesa",
    description:
      "Nuestro asistente interpreta tu mensaje, categoriza y guarda el gasto automáticamente.",
    example: "✅ Gasto registrado: $15,000",
  },
  {
    icon: <Users className="h-8 w-8 text-purple" />,
    title: "Consulta tus estadísticas",
    description:
      "Accede a tu panel web personal para ver todas tus finanzas organizadas.",
    example: "Revisa tus gastos y tendencias",
  },
];
const HowItWorks = () => {
  return (
    <section
      id="como-funciona"
      className="section-padding relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/50 to-background backdrop-blur-sm z-[-1]"></div>

      <div className="container max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 high-contrast-text-highlight">
            ¿Cómo funciona?
          </h2>
          <p className="text-foreground max-w-xl mx-auto text-shadow-sm">
            Registrar tus gastos nunca había sido tan fácil y natural
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
                className="glass-card p-6 h-full flex flex-col items-center text-center animate-fade-up my-0 transform transition-all duration-300 hover:translate-y-[-5px] hover:shadow-lg"
              >
                <div
                  className={`w-14 h-14 rounded-full ${
                    index === 0
                      ? "bg-success/20 glow"
                      : index === 1
                      ? "bg-highlight/20 glow-blue"
                      : "bg-purple/20 glow-purple"
                  } flex items-center justify-center mb-4`}
                >
                  {step.icon}
                </div>
                <h3 className="text-lg font-semibold mb-3 text-foreground text-shadow-sm">
                  {step.title}
                </h3>
                <p className="text-sm text-foreground/90 mb-4">
                  {step.description}
                </p>
                <div className="mt-auto backdrop-blur-sm bg-background/60 p-3 rounded-lg w-full border border-white/5">
                  <p className="text-sm text-foreground">{step.example}</p>
                </div>

                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/3 -right-4 transform translate-x-1/2 z-20">
                    <div
                      className={`w-8 h-8 rounded-full ${
                        index === 0 ? "bg-success/50" : "bg-highlight/50"
                      } flex items-center justify-center animate-pulse-glow`}
                    >
                      <ArrowRight className="h-4 w-4 text-foreground" />
                    </div>
                  </div>
                )}
              </div>
              {index + 1 < steps.length && (
                <div className="md:hidden flex justify-center my-4">
                  <ArrowDown
                    className={`h-6 w-6 ${
                      index === 0 ? "text-success" : "text-highlight"
                    } animate-pulse-glow`}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Overlay para mejorar contraste */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/30 to-background/70 pointer-events-none"></div>

      {/* Background effects */}
      <div
        className="absolute top-1/3 left-0 w-60 h-60 rounded-full blur-3xl opacity-10 animate-pulse-glow"
        style={{
          background:
            "radial-gradient(circle at center, var(--color-success), transparent 70%)",
        }}
      ></div>
      <div
        className="absolute bottom-1/3 right-0 w-60 h-60 rounded-full blur-3xl opacity-10 animate-pulse-glow"
        style={{
          background:
            "radial-gradient(circle at center, var(--color-highlight), transparent 70%)",
          animationDelay: "1s",
        }}
      ></div>
    </section>
  );
};
import { ArrowDown, ArrowRight } from "lucide-react";
export default HowItWorks;
