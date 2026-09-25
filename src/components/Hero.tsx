import { lazy, Suspense, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "@/services/authService";
import { pathFor, useCopy, useLocale } from "@/i18n";
import { heroCopy } from "@/i18n/copy/hero";
import { TelegramIcon, WhatsAppIcon } from "./landing/BrandIcons";

const HeroScene = lazy(() => import("./HeroScene"));

const Hero = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const locale = useLocale();
  const copy = useCopy(heroCopy);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- estado de sesión leído al montar
    setIsLoggedIn(isAuthenticated());
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#0a0a0a]">
      {/* Escena 3D holográfica (lazy — Three.js carga en su propio chunk) */}
      <Suspense fallback={null}>
        <HeroScene />
      </Suspense>

      {/* Viñeta de legibilidad + fade superior a negro */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 58% 48% at 50% 44%, rgba(10,10,10,0.82) 0%, rgba(10,10,10,0.4) 45%, transparent 75%), radial-gradient(ellipse 55% 32% at 50% 86%, rgba(10,10,10,0.75) 0%, transparent 70%), linear-gradient(to bottom, #0a0a0a 0%, transparent 22%)",
        }}
      />

      <div className="container max-w-7xl mx-auto px-5 md:px-8 relative z-10 pt-32 pb-40 sm:pt-36">
        <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
          <h1
            className="trii-title text-[clamp(2.1rem,4.5vw,4.1rem)] text-white !leading-[1.02] !tracking-[-0.04em] animate-fade-up"
            style={{ animationDelay: "0.1s" }}
          >
            <span className="sm:whitespace-nowrap">
              {copy.title.line1Pre}{" "}
              <span className="holo-text italic pr-[0.06em]">{copy.title.line1Holo}</span>.
            </span>
            <br />
            <span className="sm:whitespace-nowrap">
            {copy.title.line2Pre}{" "}
            <span className="relative inline-block">
              {copy.title.line2Underline}
              <span
                className="absolute -bottom-[0.06em] left-0 right-0 h-[3px] rounded-full"
                style={{ background: "linear-gradient(90deg, #00FF7F, #22d3ee, #0D99FF)" }}
              />
            </span>
            .
            </span>
          </h1>

          <p
            className="lx-lead mt-8 max-w-xl text-zinc-300/80 animate-fade-up"
            style={{ animationDelay: "0.25s" }}
          >
            {copy.subtitle.pre}
            <a
              href={copy.wallbitUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white underline decoration-[#0D99FF]/60 decoration-1 underline-offset-4 hover:decoration-[#0D99FF] transition-colors"
            >
              {copy.subtitle.wallbitLabel}
            </a>
            {copy.subtitle.post}
          </p>

          <div
            className="mt-10 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row animate-fade-up"
            style={{ animationDelay: "0.4s" }}
          >
            <a href={copy.whatsappUrl} target="_blank" rel="noopener noreferrer" className="lx-btn-primary w-full sm:w-auto">
              <WhatsAppIcon />
              {copy.ctaWhatsApp}
            </a>
            <a href="https://t.me/tresqu_bot" target="_blank" rel="noopener noreferrer" className="lx-btn-ghost w-full sm:w-auto">
              <TelegramIcon className="h-5 w-5 text-[#2AABEE]" />
              {copy.ctaTelegram}
            </a>
          </div>

          <p
            className="mt-6 text-[14px] text-zinc-500 animate-fade-up"
            style={{ animationDelay: "0.5s" }}
          >
            {isLoggedIn ? (
              <Link to="/dashboard/home" className="text-zinc-300 hover:text-white transition-colors">
                {copy.dashboardLink}
              </Link>
            ) : (
              <>
                {copy.loginPrompt}
                <Link to={pathFor("login", locale)} className="text-zinc-300 hover:text-white transition-colors">
                  {copy.loginLink}
                </Link>
              </>
            )}
          </p>
        </div>
      </div>

      {/* Funciona con: reemplaza al antiguo marquee de plataformas */}
      <div
        className="absolute bottom-10 left-0 right-0 z-10 animate-fade-in"
        style={{ animationDelay: "0.8s" }}
      >
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 px-5 text-[13px] sm:gap-x-8 text-zinc-500">
          <span className="hidden font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-600 sm:inline">{copy.worksWith}</span>
          {["WhatsApp", "Telegram", "Gmail", "Wallbit"].map((name) => (
            <span key={name} className="font-medium tracking-tight text-zinc-400">
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
