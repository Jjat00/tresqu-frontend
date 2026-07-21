import {
  Brain,
  Languages,
  MessageSquareText,
  Eye,
  Mic,
  Globe,
  Tag,
  BarChart3,
  Gauge,
  LineChart,
} from "lucide-react";

import { useCopy } from "@/i18n";
import { agentCapabilitiesCopy } from "@/i18n/copy/agentCapabilities";

// Mismo orden que copy.capabilities en el diccionario
const capabilityIcons = [
  Brain,
  MessageSquareText,
  Globe,
  Languages,
  Eye,
  Mic,
  Tag,
  BarChart3,
  Gauge,
  LineChart,
];

const AgentCapabilities = () => {
  const copy = useCopy(agentCapabilitiesCopy);
  return (
    <section id="agente" className="relative section-padding bg-[#0a0a0a] scroll-mt-24 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-blueprint" />
        <div className="absolute top-0 left-0 right-0 h-px bg-white/5" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-white/5" />
      </div>

      <div className="container max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16 md:mb-20">
          <span className="section-label mb-6">{copy.sectionLabel}</span>
          <h2 className="trii-title text-4xl sm:text-5xl md:text-6xl text-white mb-6">
            {copy.title.line1}
            <br />
            {copy.title.line2Pre}{" "}
            <span className="holo-text italic">{copy.title.line2Holo}</span>.
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg max-w-xl mx-auto">
            {copy.intro}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 max-w-6xl mx-auto">
          {copy.capabilities.map(({ title, description }, index) => {
            const Icon = capabilityIcons[index];
            return (
            <div
              key={title}
              className="group holo-card holo-sheen p-5"
            >
              <div className="w-9 h-9 rounded-md bg-white/[0.04] border border-white/10 flex items-center justify-center text-[#00FF7F] mb-4 transition-all duration-300 group-hover:border-[#00FF7F]/40 group-hover:shadow-[0_0_20px_-6px_rgba(0,255,127,0.6)]">
                <Icon className="w-4 h-4" />
              </div>
              <h3 className="text-white font-semibold text-sm mb-1.5 font-display tracking-tight">
                {title}
              </h3>
              <p className="text-zinc-500 text-[13px] leading-relaxed">
                {description}
              </p>
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AgentCapabilities;
