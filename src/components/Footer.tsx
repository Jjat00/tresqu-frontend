import { Mail, Linkedin, Facebook, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import LanguageSwitcher from "./LanguageSwitcher";
import { pathFor, useCopy, useLocale } from "@/i18n";
import { footerCopy } from "@/i18n/copy/footer";

const socialLinks = [
  {
    icon: <Linkedin className="w-5 h-5" />,
    href: "https://www.linkedin.com/company/tresqu/",
    label: "LinkedIn",
  },
  {
    icon: <Facebook className="w-5 h-5" />,
    href: "https://www.facebook.com/people/Tresqu/61576223664321/",
    label: "Facebook",
  },
  {
    icon: <Mail className="w-5 h-5" />,
    href: "mailto:contacto@tresqu.com",
    label: "Email",
  },
  {
    icon: <MessageCircle className="w-5 h-5" />,
    href: "https://wa.me/573164277879",
    label: "WhatsApp",
  },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const locale = useLocale();
  const copy = useCopy(footerCopy);

  return (
    <footer className="relative bg-[#050505] border-t border-zinc-900">
      <div className="container max-w-7xl mx-auto px-4 md:px-6">
        {/* Main Footer Content */}
        <div className="py-12 md:py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Brand Column */}
            <div className="lg:col-span-2">
              <Link to={pathFor("home", locale)} className="inline-block mb-4">
                <Logo size="md" />
              </Link>
              <p className="text-zinc-500 text-sm leading-relaxed max-w-sm mb-6">
                {copy.tagline}
              </p>
              {/* Social Links */}
              <div className="flex items-center gap-3">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    aria-label={link.label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-md bg-white/[0.02] border border-white/[0.06] flex items-center justify-center text-zinc-400 hover:text-[#00FF7F] hover:border-[#00FF7F]/30 transition-colors duration-200"
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Links Column */}
            <div>
              <h4 className="text-white font-semibold mb-4">{copy.productTitle}</h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    to={pathFor("features", locale)}
                    className="text-zinc-500 text-sm hover:text-[#00FF7F] transition-colors"
                  >
                    {copy.allFeatures}
                  </Link>
                </li>
                <li>
                  {/* <a> nativo, no <Link>: /blog/ es una página estática fuera del SPA (solo ES) */}
                  <a
                    href="/blog/"
                    className="text-zinc-500 text-sm hover:text-[#00FF7F] transition-colors"
                  >
                    {copy.blog}
                  </a>
                </li>
                {copy.anchorLinks.map((item, index) => (
                  <li key={index}>
                    <a
                      href={item.href}
                      className="text-zinc-500 text-sm hover:text-[#00FF7F] transition-colors"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Column */}
            <div>
              <h4 className="text-white font-semibold mb-4">{copy.legalTitle}</h4>
              <ul className="space-y-3">
                <li>
                  {/* Las páginas legales solo existen en español */}
                  <Link
                    to="/privacy-policy"
                    className="text-zinc-500 text-sm hover:text-[#00FF7F] transition-colors"
                  >
                    {copy.privacyPolicy}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/legal-notice"
                    className="text-zinc-500 text-sm hover:text-[#00FF7F] transition-colors"
                  >
                    {copy.terms}
                  </Link>
                </li>
                <li>
                  <a
                    href="#contacto"
                    className="text-zinc-500 text-sm hover:text-[#00FF7F] transition-colors"
                  >
                    {copy.contact}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Wordmark gigante en outline */}
        <div
          className="overflow-hidden pointer-events-none select-none"
          aria-hidden="true"
        >
          <p className="text-outline-ghost font-display font-extrabold text-center leading-none tracking-tight text-[clamp(3.5rem,12vw,10.5rem)] translate-y-[0.04em]">
            TRESQU
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-zinc-900 flex flex-col sm:flex-row justify-between items-center gap-4 relative bg-[#050505]">
          <p className="text-zinc-600 text-sm">
            &copy; {currentYear} Tresqu. {copy.rights}
          </p>
          <div className="flex items-center gap-6">
            <Link
              to="/privacy-policy"
              className="text-zinc-600 text-xs hover:text-zinc-400 transition-colors"
            >
              {copy.privacyShort}
            </Link>
            <Link
              to="/legal-notice"
              className="text-zinc-600 text-xs hover:text-zinc-400 transition-colors"
            >
              {copy.termsShort}
            </Link>
            <LanguageSwitcher />
          </div>
        </div>
      </div>

      {/* Decorative Gradient */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-[#00FF7F]/20 to-transparent" />
    </footer>
  );
};

export default Footer;
