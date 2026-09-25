import { useState } from "react";
import { Plus } from "lucide-react";
import { useCopy } from "@/i18n";
import { landingCopy } from "@/i18n/copy/landing";
import Reveal from "./Reveal";
import { stagger } from "./stagger";

const TrustSection = () => {
  const copy = useCopy(landingCopy).trust;
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="lx-section">
      <div className="container mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-5">
            <p className="lx-eyebrow lx-rise" style={stagger(0)}>{copy.eyebrow}</p>
            <h2 className="lx-h2 lx-rise mt-6" style={stagger(1)}>{copy.title}</h2>
            <p className="lx-lead lx-rise mt-6 max-w-md" style={stagger(2)}>{copy.lead}</p>

            <dl className="mt-12 grid max-w-md grid-cols-3 gap-6">
              {copy.facts.map((f, i) => (
                <div key={f.label} className="lx-rise border-t border-white/[0.08] pt-4" style={stagger(3 + i)}>
                  <dt className="text-[clamp(1.5rem,2.4vw,2rem)] font-semibold tracking-[-0.03em] text-white tabular-nums">
                    {f.value}
                  </dt>
                  <dd className="mt-1 text-[13px] leading-snug text-zinc-500">{f.label}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal className="lg:col-span-6 lg:col-start-7">
            <h3 className="lx-rise text-[13px] font-medium uppercase tracking-[0.12em] text-zinc-500" style={stagger(0)}>
              {copy.faqTitle}
            </h3>
            <div className="mt-6 border-b border-white/[0.07]">
              {copy.faqs.map((faq, i) => {
                const isOpen = open === i;
                return (
                  <div key={faq.q} className="lx-rise border-t border-white/[0.07]" style={stagger(1 + i)}>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      className="flex w-full cursor-pointer items-center justify-between gap-6 py-6 text-left"
                    >
                      <span className="text-[17px] font-medium text-white sm:text-lg">{faq.q}</span>
                      <Plus
                        className={`h-5 w-5 flex-shrink-0 text-zinc-500 transition-transform duration-300 ${isOpen ? "rotate-45 text-white" : ""}`}
                      />
                    </button>
                    <div
                      className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                    >
                      <p className="overflow-hidden pr-10 text-[15px] leading-relaxed text-zinc-400">
                        <span className="block pb-6">{faq.a}</span>
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
