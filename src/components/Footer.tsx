import { Mail, Linkedin, Facebook, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "./Logo";

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

  return (
    <footer className="relative bg-[#050505] border-t border-zinc-900">
      <div className="container max-w-7xl mx-auto px-4 md:px-6">
        {/* Main Footer Content */}
        <div className="py-12 md:py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Brand Column */}
            <div className="lg:col-span-2">
              <Link to="/" className="inline-block mb-4">
                <Logo size="md" />
              </Link>
              <p className="text-zinc-500 text-sm leading-relaxed max-w-sm mb-6">
                Tu agente financiero que vive en WhatsApp y Telegram.
                Registra gastos, analiza tendencias y toma el control de tus
                finanzas.
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
              <h4 className="text-white font-semibold mb-4">Producto</h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/funciones"
                    className="text-zinc-500 text-sm hover:text-[#00FF7F] transition-colors"
                  >
                    Todas las funciones
                  </Link>
                </li>
                {[
                  { label: "Beneficios", href: "#beneficios" },
                  // Oculto hasta tener los pagos configurados (reactivar junto con la sección Pricing)
                  // { label: "Precios", href: "#pricing" },
                  { label: "Roadmap", href: "#futuro" },
                ].map((item, index) => (
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
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/privacy-policy"
                    className="text-zinc-500 text-sm hover:text-[#00FF7F] transition-colors"
                  >
                    Política de privacidad
                  </Link>
                </li>
                <li>
                  <Link
                    to="/legal-notice"
                    className="text-zinc-500 text-sm hover:text-[#00FF7F] transition-colors"
                  >
                    Términos y condiciones
                  </Link>
                </li>
                <li>
                  <a
                    href="#contacto"
                    className="text-zinc-500 text-sm hover:text-[#00FF7F] transition-colors"
                  >
                    Contacto
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-zinc-900 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-zinc-600 text-sm">
            &copy; {currentYear} Tresqu. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-6">
            <Link
              to="/privacy-policy"
              className="text-zinc-600 text-xs hover:text-zinc-400 transition-colors"
            >
              Privacidad
            </Link>
            <Link
              to="/legal-notice"
              className="text-zinc-600 text-xs hover:text-zinc-400 transition-colors"
            >
              Términos
            </Link>
          </div>
        </div>
      </div>

      {/* Decorative Gradient */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-[#00FF7F]/20 to-transparent" />
    </footer>
  );
};

export default Footer;
