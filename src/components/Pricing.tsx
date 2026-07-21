import { useState } from "react";
import { Check, X, Sparkles, Building2, Rocket, ArrowRight, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { pathFor, useCopy, useLocale } from "@/i18n";
import { pricingCopy } from "@/i18n/copy/pricing";

const Pricing = () => {
  const navigate = useNavigate();
  const locale = useLocale();
  const copy = useCopy(pricingCopy);
  const [isAnnual, setIsAnnual] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Estructura (iconos/acciones); el copy vive en i18n/copy, mismo orden
  const planStructure = [
    {
      icon: <Rocket className="w-5 h-5" />,
      free: true,
      onClick: () => navigate(pathFor("login", locale)),
    },
    {
      icon: <Sparkles className="w-5 h-5" />,
      highlighted: true,
      onClick: () => navigate(pathFor("login", locale)),
    },
    {
      icon: <Building2 className="w-5 h-5" />,
      onClick: () =>
        document
          .getElementById("contacto")
          ?.scrollIntoView({ behavior: "smooth" }),
    },
  ];

  return (
    <section
      id="pricing"
      className="relative section-padding overflow-hidden bg-[#0a0a0a]"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-white/5" />
      </div>

      <div className="container max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block px-3 py-1 border border-[#00FF7F]/25 rounded-sm text-[#00FF7F] text-xs uppercase tracking-wider font-medium mb-6">
            {copy.label}
          </span>
          <h2 className="trii-title text-3xl sm:text-4xl md:text-5xl text-white mb-6">
            {copy.titleLine1}
            <br />
            <span className="text-[#00FF7F] italic">{copy.titleAccent}</span>
          </h2>
          <p className="text-zinc-400 text-lg">
            {copy.intro}
          </p>

          {/* Toggle mensual/anual */}
          <div className="flex items-center justify-center gap-3 mt-8">
            <span className={`text-sm font-medium transition-colors ${!isAnnual ? "text-white" : "text-zinc-500"}`}>
              {copy.monthly}
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative w-14 h-7 rounded-full transition-colors ${
                isAnnual ? "bg-success" : "bg-zinc-700"
              }`}
            >
              <div
                className={`absolute top-0.5 w-6 h-6 rounded-full bg-white shadow-md transition-transform ${
                  isAnnual ? "translate-x-7" : "translate-x-0.5"
                }`}
              />
            </button>
            <span className={`text-sm font-medium transition-colors ${isAnnual ? "text-white" : "text-zinc-500"}`}>
              {copy.annual}
            </span>
            {isAnnual && (
              <span className="text-xs font-bold text-success bg-success/10 border border-success/20 px-2 py-0.5 rounded-sm">
                -17%
              </span>
            )}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {copy.plans.map((plan, index) => {
            const structure = planStructure[index];
            const isFeatured = structure.highlighted;
            const price = isAnnual ? plan.price.annual : plan.price.monthly;
            const period = isAnnual ? plan.period.annual : plan.period.monthly;

            return (
              <div
                key={index}
                className={`relative flex flex-col rounded-md transition-colors duration-200 group ${
                  isFeatured
                    ? "bg-white/[0.03] border border-[#00FF7F]/40 z-20"
                    : "bg-white/[0.02] border border-white/[0.06] hover:border-white/10 z-10"
                }`}
              >
                {/* Popular Badge (Floating) */}
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-30">
                    <span className="flex items-center gap-1.5 px-3 py-1 bg-[#00FF7F] text-black text-[10px] sm:text-xs font-bold uppercase tracking-widest rounded-sm">
                      <Sparkles className="w-3.5 h-3.5" />
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div className="p-8 lg:p-10 flex flex-col h-full relative z-10">
                  {/* Plan Header */}
                  <div className="mb-8 relative">
                    <div className="flex items-center gap-4 mb-4">
                      <div
                        className={`w-11 h-11 rounded-md flex items-center justify-center ${
                          isFeatured
                            ? "bg-[#00FF7F] text-black"
                            : "bg-white/[0.04] border border-white/10 text-white"
                        }`}
                      >
                        {structure.icon}
                      </div>
                      <h3 className="text-2xl font-bold text-white font-display tracking-tight">
                        {plan.name}
                      </h3>
                    </div>
                    <p className="text-zinc-400 text-[15px] leading-relaxed pr-4">
                      {plan.description}
                    </p>
                  </div>

                  {/* Price Block */}
                  <div className="mb-8 pb-8 border-b border-white/10 relative">
                    <div className="flex items-baseline gap-1.5 relative z-10">
                      <span className="text-5xl lg:text-6xl font-bold font-display tracking-tighter text-white">
                        {price}
                      </span>
                      <span className="text-zinc-500 font-medium tracking-wide">
                        {period}
                      </span>
                    </div>
                    {isAnnual && !structure.free && (
                      <div className="mt-3 inline-flex items-center gap-2 border border-[#00FF7F]/25 px-2.5 py-1 rounded-sm">
                        <span className="text-[11px] font-semibold text-[#00FF7F] uppercase tracking-wider">
                          {copy.saveBadge}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Features List */}
                  <div className="flex-grow space-y-4 mb-10">
                    {plan.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-3.5 group/feature">
                        {feature.included ? (
                          <div className={`w-5 h-5 rounded-sm flex items-center justify-center flex-shrink-0 mt-0.5 ${
                            isFeatured ? "bg-[#00FF7F]/15" : "bg-white/[0.04] border border-white/10"
                          }`}>
                            <Check className={`w-3 h-3 ${isFeatured ? "text-[#00FF7F]" : "text-zinc-300"}`} />
                          </div>
                        ) : (
                          <div className="w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <X className="w-3.5 h-3.5 text-zinc-700" />
                          </div>
                        )}
                        <span
                          className={`text-[14px] leading-snug ${
                            feature.included ? "text-zinc-300" : "text-zinc-600"
                          }`}
                        >
                          {feature.text}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <button
                    onClick={structure.onClick}
                    className={`w-full py-3.5 rounded-md font-semibold text-[15px] tracking-wide transition-colors duration-200 relative overflow-hidden ${
                      isFeatured
                        ? "bg-[#00FF7F] text-black hover:bg-white"
                        : "bg-white/[0.04] text-white hover:bg-white/[0.08] border border-white/10"
                    }`}
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {plan.cta}
                      <ArrowRight className={`w-4 h-4 transition-transform duration-500 group-hover:translate-x-1 ${isFeatured ? "opacity-100" : "opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0"}`} />
                    </span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* FAQ Section */}
        <div className="mt-20 max-w-2xl mx-auto">
          <h3 className="trii-title text-2xl sm:text-3xl text-center text-white mb-8">
            {copy.faqTitlePre}{" "}
            <span className="trii-title-accent">{copy.faqTitleAccent}</span>
          </h3>
          <div className="space-y-3">
            {copy.faqs.map((faq, i) => (
              <div
                key={i}
                className="glass-card overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-4 sm:p-5 text-left"
                >
                  <span className="text-sm sm:text-base font-medium text-foreground pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 text-muted-foreground flex-shrink-0 transition-transform ${
                      openFaq === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all ${
                    openFaq === i ? "max-h-40 pb-4 px-4 sm:px-5" : "max-h-0"
                  }`}
                >
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-8 text-zinc-500 text-sm text-center">
            {copy.morePrompt}
            <a
              href="#contacto"
              className="text-[#00FF7F] hover:underline font-medium"
            >
              {copy.moreLink}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
