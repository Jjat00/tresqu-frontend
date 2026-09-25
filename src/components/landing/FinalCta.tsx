import { useCopy } from "@/i18n";
import { landingCopy } from "@/i18n/copy/landing";
import Reveal from "./Reveal";
import { stagger } from "./stagger";
import { TelegramIcon, WhatsAppIcon } from "./BrandIcons";

const FinalCta = () => {
  const copy = useCopy(landingCopy).final;

  return (
    <section id="empezar" className="relative overflow-hidden pb-28 pt-32 lg:pb-40 lg:pt-44">
      {/* Horizonte: el mismo verde del terreno del hero, ahora en calma */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-x-0 bottom-0 h-[70%]"
          style={{ background: "radial-gradient(60% 70% at 50% 100%, rgba(0,255,127,0.16), rgba(13,153,255,0.05) 45%, transparent 75%)" }}
        />
        <div
          className="absolute bottom-[18%] left-1/2 h-px w-[80%] -translate-x-1/2"
          style={{ background: "linear-gradient(90deg, transparent, rgba(0,255,127,0.45), transparent)" }}
        />
      </div>

      <Reveal className="container relative mx-auto max-w-4xl px-5 text-center md:px-8">
        <h2
          className="lx-rise font-display font-bold tracking-[-0.05em] text-white text-[clamp(3rem,9vw,7.5rem)] leading-[0.95] text-balance"
          style={stagger(0)}
        >
          {copy.title}
        </h2>
        <p className="lx-lead lx-rise mx-auto mt-8 max-w-xl" style={stagger(1)}>
          {copy.lead}
        </p>
        <div className="lx-rise mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row" style={stagger(2)}>
          <a href={copy.whatsappUrl} target="_blank" rel="noopener noreferrer" className="lx-btn-primary w-full sm:w-auto">
            <WhatsAppIcon />
            {copy.ctaWhatsApp}
          </a>
          <a href="https://t.me/tresqu_bot" target="_blank" rel="noopener noreferrer" className="lx-btn-ghost w-full sm:w-auto">
            <TelegramIcon className="h-5 w-5 text-[#2AABEE]" />
            {copy.ctaTelegram}
          </a>
        </div>
        <p className="lx-rise mt-6 font-mono text-[12px] tracking-wide text-zinc-500" style={stagger(3)}>
          {copy.micro}
        </p>
      </Reveal>
    </section>
  );
};

export default FinalCta;
