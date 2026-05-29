const platforms = [
  { name: "WhatsApp", color: "#25D366" },
  { name: "Telegram", color: "#0088cc" },
  { name: "Gmail", color: "#EA4335" },
  { name: "Wallbit", color: "#2563EB" },
];

const SocialProof = () => {
  return (
    <section className="relative section-padding overflow-hidden bg-[#0a0a0a]">
      {/* Separador superior */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />

      <div className="container max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        {/* Integraciones */}
        <div className="text-center">
          <p className="text-xs sm:text-sm text-muted-foreground uppercase tracking-widest mb-8 sm:mb-10">
            Integrado con las plataformas que ya usas
          </p>
          <div className="flex items-center justify-center gap-4 sm:gap-6 flex-wrap">
            {platforms.map((platform) => (
              <div
                key={platform.name}
                className="flex items-center gap-2.5 px-5 sm:px-6 py-3 sm:py-3.5 rounded-lg border bg-white/[0.02] transition-transform duration-200 hover:-translate-y-0.5"
                style={{ borderColor: `${platform.color}33` }}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: platform.color }}
                />
                <span className="text-base sm:text-lg font-semibold text-foreground">
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
