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
      className="relative section-padding overflow-hidden bg-[#0a0a0a]"
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

        {/* Contact Grid - Modern Bento Style */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto">
          {contactMethods.map((method, index) => (
            <a
              key={index}
              href={method.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden bg-zinc-900/40 backdrop-blur-xl border border-white/5 p-8 rounded-[2rem] text-center transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,255,127,0.1)]"
            >
              {/* Subtle glass reflection */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Glow effect behind icon */}
              <div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full blur-[40px] opacity-0 group-hover:opacity-30 transition-all duration-700"
                style={{ backgroundColor: method.color }}
              />

              <div className="relative z-10 flex flex-col items-center">
                {/* Icon Container */}
                <div
                  className="w-16 h-16 rounded-2xl mb-6 flex items-center justify-center transition-all duration-500 group-hover:scale-110 shadow-lg border border-white/10 backdrop-blur-md"
                  style={{
                    backgroundColor: `${method.color}15`,
                    color: method.color,
                  }}
                >
                  {method.icon}
                </div>

                {/* Content */}
                <h3 className="text-xl text-white font-bold mb-2 flex items-center justify-center gap-1.5 font-display tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-zinc-500 transition-all">
                  {method.title}
                  <ArrowUpRight className="w-5 h-5 text-zinc-600 group-hover:text-[#00FF7F] transition-colors" />
                </h3>
                <p className="text-zinc-400 text-sm font-medium tracking-wide group-hover:text-zinc-300 transition-colors">
                  {method.value}
                </p>
              </div>
            </a>
          ))}
        </div>

        {/* Bottom CTA - Modern Floating Style */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-6 p-2 pr-2 sm:pr-2 bg-zinc-900/50 backdrop-blur-2xl border border-white/5 rounded-full shadow-2xl relative overflow-hidden group">
            {/* Animated background glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#25D366]/10 to-transparent -translate-x-[100%] group-hover:animate-[pulse_2s_ease-in-out_infinite] pointer-events-none" />
            
            <div className="text-left pl-6 py-2">
              <p className="text-white font-semibold text-[15px]">
                ¿Prefieres una respuesta rápida?
              </p>
              <p className="text-zinc-400 text-[13px] mt-0.5">
                Escríbenos por WhatsApp y te respondemos en minutos
              </p>
            </div>
            
            <a
              href="https://wa.me/573164277879"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-8 py-3.5 bg-[#25D366] text-black font-bold rounded-full hover:bg-white transition-all duration-300 shadow-[0_0_20px_-5px_rgba(37,211,102,0.5)] hover:shadow-[0_0_25px_-5px_rgba(255,255,255,0.8)] flex-shrink-0 z-10 m-1"
            >
              Chatear ahora
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
