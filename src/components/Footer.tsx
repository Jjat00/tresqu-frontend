import { Mail, Linkedin, Facebook, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import LanguageSwitcher from "./LanguageSwitcher";
import { pathFor, useCopy, useLocale } from "@/i18n";
import { footerCopy } from "@/i18n/copy/footer";
import solutionLinks from "@/lib/solutionLinks.json";

const socialLinks = [
  {
    icon: <Linkedin className="w-[18px] h-[18px]" />,
    href: "https://www.linkedin.com/company/tresqu/",
    label: "LinkedIn",
  },
  {
    icon: <Facebook className="w-[18px] h-[18px]" />,
    href: "https://www.facebook.com/people/Tresqu/61576223664321/",
    label: "Facebook",
  },
  {
    icon: <Mail className="w-[18px] h-[18px]" />,
    href: "mailto:contacto@tresqu.com",
    label: "Email",
  },
  {
    icon: <MessageCircle className="w-[18px] h-[18px]" />,
    href: "https://wa.me/573164277879",
    label: "WhatsApp",
  },
];

const linkClass =
  "text-[#8a90a6] text-sm hover:text-[#00FF7F] transition-colors focus-visible:outline-2 focus-visible:outline-[#00FF7F] focus-visible:outline-offset-4 rounded-sm";
const headingClass =
  "mb-4 font-jakarta text-[11px] font-semibold uppercase tracking-[0.16em] text-[#6f7489]";

/**
 * Pie compartido por todas las páginas públicas (landing, Funciones,
 * legales, login…). Estilo «Noche de puntos»: azul noche, Plus Jakarta,
 * acentos verdes.
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();
  const locale = useLocale();
  const copy = useCopy(footerCopy);
  const homePath = pathFor("home", locale);

  return (
    <footer className="relative overflow-hidden border-t border-[rgba(160,170,220,0.09)] bg-[#05060c] font-jakarta text-[#c9cee0]">
      {/* Resplandor tenue arriba, como el hero */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-px w-[min(600px,80%)] -translate-x-1/2 bg-gradient-to-r from-transparent via-[#00FF7F]/30 to-transparent"
        aria-hidden="true"
      />
      <div className="mx-auto w-[min(1100px,calc(100%-32px))]">
        {/* Main Footer Content */}
        <div className="py-14 md:py-16">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            {/* Brand Column */}
            <div className="lg:col-span-2">
              <Link
                to={homePath}
                className="mb-4 inline-flex items-center gap-2 rounded-md font-semibold tracking-[-0.01em] text-white text-lg focus-visible:outline-2 focus-visible:outline-[#00FF7F] focus-visible:outline-offset-4"
              >
                <img src="/3q.png" alt="" width={28} height={28} className="h-7 w-7 rounded-md" />
                <span>Tresqu</span>
              </Link>
              <p className="mb-6 max-w-sm text-sm leading-relaxed text-[#8a90a6]">
                {copy.tagline}
              </p>
              {/* Social Links */}
              <div className="flex items-center gap-2.5">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    aria-label={link.label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="grid h-10 w-10 place-items-center rounded-full border border-white/[0.09] bg-white/[0.03] text-[#b8bdd0] transition-colors duration-200 hover:border-[#00FF7F]/40 hover:text-[#00FF7F] focus-visible:outline-2 focus-visible:outline-[#00FF7F] focus-visible:outline-offset-2"
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Links Column */}
            <div>
              <h2 className={headingClass}>{copy.productTitle}</h2>
              <ul className="space-y-3">
                <li>
                  <Link to={pathFor("features", locale)} className={linkClass}>
                    {copy.allFeatures}
                  </Link>
                </li>
                <li>
                  {/* <a> nativo, no <Link>: /blog/ es una página estática fuera del SPA (solo ES) */}
                  <a href="/blog/" className={linkClass}>
                    {copy.blog}
                  </a>
                </li>
                {copy.anchorLinks.map((item) => (
                  <li key={item.href}>
                    {/* ancla de la landing: funciona igual desde cualquier página */}
                    <a href={`${homePath}${item.href}`} className={linkClass}>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Column */}
            <div>
              <h2 className={headingClass}>{copy.legalTitle}</h2>
              <ul className="space-y-3">
                <li>
                  {/* Las páginas legales solo existen en español */}
                  <Link to="/privacy-policy" className={linkClass}>
                    {copy.privacyPolicy}
                  </Link>
                </li>
                <li>
                  <Link to="/legal-notice" className={linkClass}>
                    {copy.terms}
                  </Link>
                </li>
                <li>
                  <a href="mailto:contacto@tresqu.com" className={linkClass}>
                    {copy.contact}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <nav
          aria-label={locale === "es" ? "Explora Tresqu" : "Explore Tresqu (Spanish)"}
          className="flex flex-wrap gap-x-6 gap-y-3 border-t border-[rgba(160,170,220,0.09)] py-7"
          lang="es"
        >
          <a href="/sobre-tresqu/" hrefLang="es" className={linkClass}>
            Sobre Tresqu
          </a>
          {solutionLinks.map(({ path, label }) => (
            <a key={path} href={path} hrefLang="es" className={linkClass}>
              {label}
            </a>
          ))}
        </nav>

        {/* Wordmark gigante en outline */}
        <div
          className="pointer-events-none select-none overflow-hidden"
          aria-hidden="true"
        >
          <p className="tq-wordmark translate-y-[0.06em] text-center font-bold leading-none tracking-[-0.045em] text-[clamp(3.5rem,13vw,11rem)]">
            TRESQU
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="relative flex flex-col items-center justify-between gap-4 border-t border-[rgba(160,170,220,0.09)] py-6 sm:flex-row">
          <p className="text-sm text-[#6f7489]">
            &copy; {currentYear} Tresqu. {copy.rights}
          </p>
          <div className="flex items-center gap-6">
            <Link
              to="/privacy-policy"
              className="text-xs text-[#6f7489] transition-colors hover:text-[#c9cee0]"
            >
              {copy.privacyShort}
            </Link>
            <Link
              to="/legal-notice"
              className="text-xs text-[#6f7489] transition-colors hover:text-[#c9cee0]"
            >
              {copy.termsShort}
            </Link>
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
