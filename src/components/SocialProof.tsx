import { useCopy } from "@/i18n";
import { socialProofCopy } from "@/i18n/copy/socialProof";

const platforms = [
  { name: "WhatsApp", color: "#25D366" },
  { name: "Telegram", color: "#0088cc" },
  { name: "Gmail", color: "#EA4335" },
  { name: "Wallbit", color: "#2563EB" },
];

// Cada mitad del marquee repite la lista para que el loop sea continuo
const half = [...platforms, ...platforms, ...platforms];

const PlatformChip = ({ name, color }: { name: string; color: string }) => (
  <div
    className="flex items-center gap-2.5 px-6 py-3 rounded-full border bg-white/[0.02] whitespace-nowrap"
    style={{ borderColor: `${color}33` }}
  >
    <span
      className="w-2 h-2 rounded-full"
      style={{ backgroundColor: color, boxShadow: `0 0 10px ${color}` }}
    />
    <span className="text-base font-semibold text-foreground">{name}</span>
  </div>
);

const SocialProof = () => {
  const copy = useCopy(socialProofCopy);
  return (
    <section className="relative py-14 md:py-16 overflow-hidden bg-[#0a0a0a]">
      {/* Separador superior */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00FF7F]/20 to-transparent" />

      <div className="relative z-10">
        <p className="section-label justify-center flex mb-8">
          {copy.label}
        </p>

        {/* Marquee infinito */}
        <div className="marquee-mask overflow-hidden">
          <div className="marquee gap-5">
            {[0, 1].map((dup) => (
              <div
                key={dup}
                aria-hidden={dup === 1}
                className="flex items-center gap-5 pr-5"
              >
                {half.map(({ name, color }, i) => (
                  <PlatformChip key={`${name}-${i}`} name={name} color={color} />
                ))}
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
