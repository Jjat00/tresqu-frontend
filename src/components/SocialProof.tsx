import { useEffect, useRef, useState } from "react";
import { MessageSquare, Users, Zap, Shield } from "lucide-react";

// Hook para animar contadores cuando son visibles
const useCountUp = (target: number, duration = 2000) => {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;

    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const interval = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(interval);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(interval);
  }, [started, target, duration]);

  return { count, ref };
};

const stats = [
  {
    icon: Users,
    value: 500,
    suffix: "+",
    label: "Usuarios activos",
  },
  {
    icon: MessageSquare,
    value: 15000,
    suffix: "+",
    label: "Transacciones registradas",
  },
  {
    icon: Zap,
    value: 30,
    suffix: "seg",
    label: "Tiempo promedio de respuesta",
    prefix: "<",
  },
  {
    icon: Shield,
    value: 99,
    suffix: "%",
    label: "Uptime del servicio",
  },
];

const testimonials = [
  {
    quote:
      "Antes perdía el control de mis gastos. Ahora solo mando un mensaje y Tresqu organiza todo automáticamente.",
    name: "María G.",
    role: "Freelancer",
  },
  {
    quote:
      "La integración con WhatsApp es genial. No necesito abrir otra app, registro mis gastos desde la conversación.",
    name: "Carlos R.",
    role: "Emprendedor",
  },
  {
    quote:
      "Los reportes me ayudaron a identificar que gastaba demasiado en suscripciones. Ahorré un 20% el primer mes.",
    name: "Ana P.",
    role: "Diseñadora",
  },
];

const SocialProof = () => {
  const counters = stats.map((stat) => useCountUp(stat.value));

  return (
    <section className="relative section-padding overflow-hidden bg-[#0a0a0a]">
      {/* Separador superior */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />

      <div className="container max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        {/* Contadores */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-16 sm:mb-20">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              ref={counters[i].ref}
              className="text-center glass-card p-4 sm:p-6"
            >
              <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-success/10 mb-3">
                <stat.icon className="h-5 w-5 sm:h-6 sm:w-6 text-success" />
              </div>
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground tracking-tight font-display">
                {stat.prefix || ""}
                {counters[i].count.toLocaleString("es-ES")}
                {stat.suffix}
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Testimonios */}
        <div className="max-w-3xl mx-auto text-center mb-10">
          <h2 className="trii-title text-2xl sm:text-3xl md:text-4xl mb-3">
            Lo que dicen nuestros{" "}
            <span className="trii-title-accent">usuarios</span>
          </h2>
          <p className="trii-subtitle text-sm sm:text-base">
            Historias reales de personas que transformaron su relación con el
            dinero
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {testimonials.map((testimonial, i) => (
            <div
              key={testimonial.name}
              className="glass-card p-5 sm:p-6 flex flex-col"
            >
              {/* Comillas decorativas */}
              <span className="text-success/30 text-4xl font-display leading-none mb-2">
                &ldquo;
              </span>
              <p className="text-sm sm:text-base text-foreground/80 leading-relaxed flex-1">
                {testimonial.quote}
              </p>
              <div className="mt-4 pt-4 border-t border-border/50">
                <p className="font-medium text-sm text-foreground">
                  {testimonial.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {testimonial.role}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Integraciones */}
        <div className="mt-16 sm:mt-20 text-center">
          <p className="text-xs sm:text-sm text-muted-foreground uppercase tracking-widest mb-6">
            Integrado con las plataformas que ya usas
          </p>
          <div className="flex items-center justify-center gap-8 sm:gap-12 flex-wrap">
            {[
              { name: "WhatsApp", color: "#25D366" },
              { name: "Telegram", color: "#0088cc" },
              { name: "Gmail", color: "#EA4335" },
            ].map((platform) => (
              <div
                key={platform.name}
                className="flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity"
              >
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: platform.color }}
                />
                <span className="text-sm sm:text-base font-medium text-foreground/70">
                  {platform.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Separador inferior */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
    </section>
  );
};

export default SocialProof;
