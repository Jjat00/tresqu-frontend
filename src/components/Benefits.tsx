import { CheckCircle } from "lucide-react";

const benefits = [
  {
    title: "Sin descargas adicionales",
    description:
      "Usa las aplicaciones que ya tienes. No necesitas instalar nada nuevo en tu teléfono.",
    color: "success",
  },
  {
    title: "100% conversacional",
    description:
      "Olvídate de formularios tediosos. Escribe como hablas normalmente.",
    color: "highlight",
  },
  {
    title: "Compatible con tus apps favoritas",
    description:
      "Funciona con WhatsApp y Telegram, las apps que ya usas todos los días.",
    color: "purple",
  },
  {
    title: "Estadísticas automáticas",
    description:
      "Visualiza tus gastos y comprende tus hábitos financieros de forma sencilla.",
    color: "cyan",
  },
];

const Benefits = () => {
  return (
    <section
      id="beneficios"
      className="section-padding relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 to-background z-[-1]"></div>

      <div className="container max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 high-contrast-text-success">
            Beneficios clave
          </h2>
          <p className="text-foreground max-w-xl mx-auto text-shadow-sm">
            Gestiona tus finanzas de forma natural, sin cambiar tus hábitos
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="glass-card p-6 animate-fade-up transform transition-all duration-300 hover:translate-y-[-5px] hover:shadow-lg"
              style={{
                animationDelay: `${index * 100}ms`,
                borderLeft: `3px solid var(--color-${benefit.color})`,
              }}
            >
              <div className="flex gap-4">
                <CheckCircle
                  className={`h-6 w-6 text-${benefit.color} shrink-0`}
                />
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-foreground text-shadow-sm">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-foreground/90">
                    {benefit.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Background effects */}
      <div
        className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full blur-3xl opacity-10"
        style={{
          background:
            "radial-gradient(circle at center, var(--color-success), transparent 70%)",
        }}
      ></div>
      <div
        className="absolute -top-20 -right-20 w-80 h-80 rounded-full blur-3xl opacity-10"
        style={{
          background:
            "radial-gradient(circle at center, var(--color-highlight), transparent 70%)",
        }}
      ></div>
    </section>
  );
};

export default Benefits;
