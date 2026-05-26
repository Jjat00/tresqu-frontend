import {
  Brain,
  Languages,
  MessageSquareText,
  Eye,
  Mic,
  Globe,
  Tag,
  BarChart3,
} from "lucide-react";

const capabilities = [
  {
    Icon: Brain,
    title: "Entiende lo que quieres decir",
    description: "Le escribes como a un amigo. El agente interpreta y actúa.",
  },
  {
    Icon: MessageSquareText,
    title: "Búsqueda por significado",
    description: "Pregunta como hablas. Sin filtros ni categorías exactas.",
  },
  {
    Icon: Globe,
    title: "Multi-canal",
    description: "WhatsApp, Telegram, Gmail y web. El mismo agente en todos lados.",
  },
  {
    Icon: Languages,
    title: "Multi-moneda",
    description: "10+ monedas principales con conversiones automáticas.",
  },
  {
    Icon: Eye,
    title: "Lee tus recibos",
    description: "Le mandas una foto y Tresqu extrae monto, comercio y categoría.",
  },
  {
    Icon: Mic,
    title: "Te escucha",
    description: "Mándale un audio y el agente entiende el contexto al instante.",
  },
  {
    Icon: Tag,
    title: "Categoriza solo",
    description: "Clasifica gastos e ingresos sin que definas reglas manuales.",
  },
  {
    Icon: BarChart3,
    title: "Detecta tus patrones",
    description: "Identifica picos, categorías dominantes y hábitos en tu historial.",
  },
];

const AgentCapabilities = () => {
  return (
    <section className="relative section-padding bg-[#0a0a0a]">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-white/5" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-white/5" />
      </div>

      <div className="container max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16 md:mb-20">
          <span className="inline-block px-3 py-1 border border-[#00FF7F]/25 rounded-sm text-[#00FF7F] text-xs uppercase tracking-wider font-medium mb-6">
            El agente
          </span>
          <h2 className="trii-title text-3xl sm:text-4xl md:text-5xl text-white mb-6">
            30+ HERRAMIENTAS
            <br />
            EN UN <span className="text-[#00FF7F] italic">CHAT</span>.
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg max-w-xl mx-auto">
            Detrás de cada mensaje hay un agente AI que entiende lo que quieres,
            ejecuta acciones y aprende de tu historial.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 max-w-6xl mx-auto">
          {capabilities.map(({ Icon, title, description }) => (
            <div
              key={title}
              className="bg-white/[0.02] border border-white/[0.06] p-5 rounded-md transition-colors duration-200 hover:border-white/10"
            >
              <div className="w-9 h-9 rounded-md bg-white/[0.04] border border-white/10 flex items-center justify-center text-[#00FF7F] mb-4">
                <Icon className="w-4 h-4" />
              </div>
              <h3 className="text-white font-semibold text-sm mb-1.5 font-display tracking-tight">
                {title}
              </h3>
              <p className="text-zinc-500 text-[13px] leading-relaxed">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AgentCapabilities;
