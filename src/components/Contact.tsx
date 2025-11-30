import { Mail, Linkedin, Facebook, MessageCircle, ArrowUpRight } from "lucide-react";

const contactMethods = [
  {
    icon: <Mail className="w-6 h-6" />,
    title: "Email",
    value: "contacto@tresqu.com",
    href: "mailto:contacto@tresqu.com",
    color: "#00FF7F",
  },
  {
    icon: <Linkedin className="w-6 h-6" />,
    title: "LinkedIn",
    value: "@tresqu",
    href: "https://www.linkedin.com/company/tresqu/",
    color: "#0A66C2",
  },
  {
    icon: <Facebook className="w-6 h-6" />,
    title: "Facebook",
    value: "@Tresqu",
    href: "https://www.facebook.com/people/Tresqu/61576223664321/",
    color: "#1877F2",
  },
  {
    icon: <MessageCircle className="w-6 h-6" />,
    title: "WhatsApp",
    value: "+57 316 427 7879",
    href: "https://wa.me/573164277879",
    color: "#25D366",
  },
];

const Contact = () => {
  return (
    <section
      id="contacto"
      className="relative py-20 md:py-32 overflow-hidden bg-[#0a0a0a]"
    >
      {/* Background */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
      <div className="absolute bottom-1/3 right-0 w-[400px] h-[400px] bg-[#00FF7F]/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="container max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-[#00FF7F]/10 border border-[#00FF7F]/20 rounded-full text-[#00FF7F] text-sm font-medium mb-6">
            Contacto
          </span>
          <h2 className="trii-title text-3xl sm:text-4xl md:text-5xl text-white mb-6">
            ¿TIENES
            <br />
            <span className="text-[#00FF7F] italic">PREGUNTAS?</span>
          </h2>
          <p className="text-zinc-400 text-lg">
            Estamos aquí para ayudarte. Elige el canal que prefieras.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {contactMethods.map((method, index) => (
            <a
              key={index}
              href={method.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group trii-card p-6 text-center hover:border-zinc-700 transition-all duration-300"
            >
              {/* Icon */}
              <div
                className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                style={{
                  backgroundColor: `${method.color}15`,
                  color: method.color,
                }}
              >
                {method.icon}
              </div>

              {/* Content */}
              <h3 className="text-white font-semibold mb-1 flex items-center justify-center gap-1">
                {method.title}
                <ArrowUpRight className="w-4 h-4 text-zinc-600 group-hover:text-[#00FF7F] transition-colors" />
              </h3>
              <p className="text-zinc-500 text-sm">{method.value}</p>
            </a>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 bg-zinc-900/50 border border-zinc-800 rounded-2xl">
            <div className="text-left">
              <p className="text-white font-semibold">
                ¿Prefieres una respuesta rápida?
              </p>
              <p className="text-zinc-500 text-sm">
                Escríbenos por WhatsApp y te respondemos en minutos
              </p>
            </div>
            <a
              href="https://wa.me/573164277879"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-[#25D366] text-white font-semibold rounded-full hover:bg-[#1fa855] transition-colors flex-shrink-0"
            >
              Chatear ahora
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
