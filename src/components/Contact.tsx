import { Mail, Linkedin, Facebook, MessageCircle, ArrowUpRight } from "lucide-react";
import { useCopy } from "@/i18n";
import { contactCopy } from "@/i18n/copy/contact";

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
  const copy = useCopy(contactCopy);
  return (
    <section
      id="contacto"
      className="relative section-padding overflow-hidden bg-[#0a0a0a]"
    >
      {/* Background */}
      <div className="absolute top-0 left-0 right-0 h-px bg-white/5" />

      <div className="container max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <span className="section-label mb-6">{copy.sectionLabel}</span>
          <h2 className="trii-title text-4xl sm:text-5xl md:text-6xl text-white mb-6">
            {copy.title.line1}
            <br />
            <span className="holo-text italic">{copy.title.holo}</span>
          </h2>
          <p className="text-zinc-400 text-lg">
            {copy.intro}
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
              className="group holo-card holo-sheen hud-corners p-8 text-center cursor-pointer"
            >
              <div className="relative z-10 flex flex-col items-center">
                {/* Icon Container */}
                <div
                  className="w-14 h-14 rounded-md mb-6 flex items-center justify-center border border-white/10 transition-all duration-300 group-hover:border-white/25"
                  style={{
                    backgroundColor: `${method.color}10`,
                    color: method.color,
                  }}
                >
                  {method.icon}
                </div>

                {/* Content */}
                <h3 className="text-xl text-white font-bold mb-2 flex items-center justify-center gap-1.5 font-display tracking-tight">
                  {method.title}
                  <ArrowUpRight className="w-5 h-5 text-zinc-600 group-hover:text-[#00FF7F] transition-colors" />
                </h3>
                <p className="text-zinc-400 text-sm font-medium tracking-wide">
                  {method.value}
                </p>
              </div>
            </a>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="holo-card holo-sheen inline-flex flex-col sm:flex-row items-center gap-6 p-3">
            <div className="text-left pl-3 py-2">
              <p className="text-white font-semibold text-[15px]">
                {copy.fastTitle}
              </p>
              <p className="text-zinc-400 text-[13px] mt-0.5">
                {copy.fastSubtitle}
              </p>
            </div>

            <a
              href="https://wa.me/573164277879"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-[#25D366] text-black font-semibold rounded-md hover:bg-white transition-colors duration-200 flex-shrink-0"
            >
              {copy.fastCta}
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
