import { useEffect, useState } from "react";
import { Check, ShieldCheck, Sparkles, UserRound } from "lucide-react";
import { useCopy } from "@/i18n";
import { landingCopy } from "@/i18n/copy/landing";
import { useInView } from "@/hooks/useInView";
import Reveal from "./Reveal";
import { stagger } from "./stagger";

const WALLBIT = "#0D99FF";
// Momento (ms) en que aparece cada paso de la conversación.
const STEPS = [0, 900, 2100, 3700, 4500];

const principleIcons = [UserRound, Sparkles, ShieldCheck];

const InvestSection = () => {
  const copy = useCopy(landingCopy).invest;
  const t = copy.trace;
  const { ref, isInView } = useInView({ threshold: 0.3 });
  const [step, setStep] = useState(-1);

  useEffect(() => {
    if (!isInView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- sin animación: mostrar todo de una
      setStep(STEPS.length);
      return;
    }
    const timers = STEPS.map((ms, i) => window.setTimeout(() => setStep(i), ms));
    return () => timers.forEach(clearTimeout);
  }, [isInView]);

  return (
    <section id="inviertes" className="lx-section overflow-hidden">
      <div className="container mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
          {/* Conversación */}
          <div ref={ref} className="order-2 lg:order-1 lg:col-span-7 lg:pr-10">
            <div className="relative mx-auto max-w-[540px]">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-16 -z-10 opacity-80"
                style={{ background: "radial-gradient(50% 50% at 50% 50%, rgba(13,153,255,0.14), transparent 70%)" }}
              />
              <div className="lx-surface flex min-h-[500px] flex-col justify-end gap-3 p-5 sm:p-6">
                {step >= 0 && (
                  <p className="lx-bubble self-end max-w-[80%] rounded-2xl rounded-br-md bg-[#00FF7F] px-4 py-2.5 text-[15px] leading-snug text-black">
                    {t.userMsg1}
                  </p>
                )}

                {step >= 1 && (
                  <div className="lx-bubble flex flex-wrap items-center gap-2 text-[12px] text-zinc-500">
                    <span>{t.consulting}</span>
                    {[t.chipAnalyst, t.chipRisk].map((chip, i) => (
                      <span
                        key={chip}
                        className="lx-bubble inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-zinc-300"
                        style={{ animationDelay: `${0.15 + i * 0.2}s` }}
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-[#00FF7F]" />
                        {chip}
                      </span>
                    ))}
                  </div>
                )}

                {step >= 2 && (
                  <p className="lx-bubble max-w-[86%] rounded-2xl rounded-tl-md bg-[#151515] px-4 py-3 text-[15px] leading-relaxed text-zinc-300">
                    {t.reply.pre}
                    <span className="font-medium text-[#ff6b6b]">{t.reply.pct}</span>
                    {t.reply.mid}
                    <span className="font-medium text-white">{t.reply.profile}</span>
                    {t.reply.post}
                  </p>
                )}

                {step >= 3 && (
                  <p className="lx-bubble self-end rounded-2xl rounded-br-md bg-[#00FF7F] px-4 py-2.5 text-[15px] text-black">
                    {t.userMsg2}
                  </p>
                )}

                {step >= 4 && (
                  <div className="lx-bubble w-full max-w-[340px] rounded-2xl rounded-tl-md border border-white/[0.08] bg-[#151515] p-4">
                    <div className="flex items-center justify-between">
                      <img src="/wallbit_logo.png" alt="Wallbit" className="h-4 w-auto" />
                      <span className="text-[11px] text-zinc-500">{t.riskNote}</span>
                    </div>
                    <div className="mt-3 flex items-baseline justify-between">
                      <span className="text-[15px] text-white">{t.orderTitle}</span>
                      <span className="text-[22px] font-semibold tracking-[-0.02em] text-white tabular-nums">
                        {t.orderValue}
                      </span>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-2">
                      <span className="inline-flex items-center justify-center gap-1.5 rounded-full py-2 text-[13px] font-semibold text-black" style={{ background: WALLBIT }}>
                        <Check className="h-3.5 w-3.5" />
                        {t.confirm}
                      </span>
                      <span className="inline-flex items-center justify-center rounded-full border border-white/10 py-2 text-[13px] text-zinc-400">
                        {t.cancel}
                      </span>
                    </div>
                  </div>
                )}
              </div>
              <p className="mt-4 text-center text-[12px] text-zinc-600">{t.footnote}</p>
            </div>
          </div>

          {/* Texto */}
          <Reveal className="order-1 lg:order-2 lg:col-span-5">
            <p className="lx-eyebrow lx-rise" style={stagger(0)}>{copy.eyebrow}</p>
            <h2 className="lx-h2 lx-rise mt-6" style={stagger(1)}>{copy.title}</h2>
            <p className="lx-lead lx-rise mt-6 max-w-md" style={stagger(2)}>{copy.lead}</p>

            <ul className="mt-12 max-w-md space-y-8">
              {copy.principles.map((p, i) => {
                const Icon = principleIcons[i];
                return (
                  <li key={p.title} className="lx-rise flex gap-4" style={stagger(3 + i)}>
                    <Icon className="mt-0.5 h-[18px] w-[18px] flex-shrink-0 text-[#0D99FF]" />
                    <div>
                      <p className="text-[17px] font-medium text-white">{p.title}</p>
                      <p className="mt-1.5 text-[15px] leading-relaxed text-zinc-400">{p.description}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default InvestSection;
