import {
  TrendingUp,
  ArrowLeftRight,
  PiggyBank,
  CreditCard,
  Wallet,
  Search,
  ChevronDown,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "@/services/authService";
import { pathFor, useCopy, useLocale } from "@/i18n";
import { wallbitSectionCopy } from "@/i18n/copy/wallbit";

// Mismo orden que copy.capabilities en el diccionario
const capabilityIcons = [
  TrendingUp,
  PiggyBank,
  ArrowLeftRight,
  CreditCard,
  Wallet,
  Search,
];

const WallbitSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const locale = useLocale();
  const copy = useCopy(wallbitSectionCopy);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- estado de sesión leído al montar
    setIsLoggedIn(isAuthenticated());
  }, []);

  // Logueado: directo a conectar en Integraciones. Anónimo: a login primero.
  const connectHref = isLoggedIn
    ? "/dashboard/account?tab=integraciones"
    : pathFor("login", locale);

  return (
    <section
      id="wallbit"
      className="relative section-padding bg-[#0a0a0a] scroll-mt-24 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none section-aura-blue">
        <div className="absolute top-0 left-0 right-0 h-px bg-white/5" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-white/5" />
      </div>

      <div className="container max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start mb-16">
          <div>
            <span className="section-label mb-6">{copy.sectionLabel}</span>
            <div className="flex items-center gap-3 mb-6 flex-wrap">
              <img
                src="/wallbit_logo.png"
                alt="Wallbit"
                className="h-6 sm:h-7 w-auto"
              />
              <span className="text-zinc-600 text-lg">×</span>
              <span className="trii-title text-lg sm:text-xl text-[#00FF7F]">
                Tresqu
              </span>
              <span className="inline-flex items-center gap-1.5 px-2 py-1 border border-[#0D99FF]/40 rounded-sm">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0D99FF] opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#0D99FF]" />
                </span>
                <span className="text-[10px] uppercase tracking-wider text-[#0D99FF] font-semibold">
                  {copy.liveBadge}
                </span>
              </span>
            </div>

            <h2 className="trii-title text-3xl sm:text-4xl md:text-5xl text-white mb-6">
              {copy.title.line1}
              <br />
              {copy.title.line2Pre}{" "}
              <span className="holo-text italic">{copy.title.line2Holo}</span>.
            </h2>
            <p className="text-zinc-400 text-base sm:text-lg leading-relaxed">
              {copy.intro}
            </p>
          </div>

          {/* Right — capabilities */}
          <div className="grid sm:grid-cols-2 gap-3 md:gap-4">
            {copy.capabilities.map(({ title, description }, index) => {
              const Icon = capabilityIcons[index];
              return (
              <div
                key={title}
                className="group holo-card holo-sheen p-5"
              >
                <div className="w-10 h-10 rounded-md bg-white/[0.04] border border-white/10 flex items-center justify-center text-[#0D99FF] mb-4 transition-all duration-300 group-hover:border-[#0D99FF]/40 group-hover:shadow-[0_0_20px_-6px_rgba(13,153,255,0.6)]">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-white font-bold text-base mb-2 font-display tracking-tight">
                  {title}
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  {description}
                </p>
              </div>
              );
            })}
          </div>
        </div>

        {/* CTA strip */}
        <div className="holo-card holo-sheen flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-5 sm:p-6 mb-16">
          <div>
            <p className="text-white text-sm sm:text-base font-semibold mb-1">
              {copy.ctaTitle}
            </p>
            <p className="text-zinc-500 text-xs sm:text-sm">
              {copy.ctaSubtitle}
            </p>
          </div>
          <Link
            to={connectHref}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#0D99FF] text-black font-semibold rounded-md hover:bg-[#0D99FF]/90 transition-all text-sm whitespace-nowrap shadow-[0_0_24px_-6px_rgba(13,153,255,0.5)] hover:shadow-[0_0_32px_-4px_rgba(13,153,255,0.7)]"
          >
            {isLoggedIn ? copy.ctaConnected : copy.ctaAnonymous}
          </Link>
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto">
          <h3 className="text-white text-xl font-bold font-display tracking-tight mb-6 text-center">
            {copy.faqTitle}
          </h3>
          <div className="space-y-2">
            {copy.faqs.map((faq, index) => {
              const open = openIndex === index;
              return (
                <div
                  key={faq.q}
                  className="holo-card overflow-hidden"
                >
                  <button
                    onClick={() => setOpenIndex(open ? null : index)}
                    className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left cursor-pointer"
                  >
                    <span className="text-white text-sm sm:text-base font-medium">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-zinc-500 transition-transform ${
                        open ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {open && (
                    <div className="px-5 pb-4 text-zinc-400 text-sm leading-relaxed">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WallbitSection;
