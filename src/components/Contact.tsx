import { Mail, Linkedin, Facebook, MessageCircle } from "lucide-react";

const Contact = () => {
  return (
    <section
      id="contacto"
      className="relative overflow-hidden py-8 md:py-24 lg:py-28"
    >
      <div className="container max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-12">
          <h3 className="text-2xl md:text-3xl font-bold mb-4 font-display high-contrast-text-purple">
            Contáctanos
          </h3>
          <p className="text-foreground/90 max-w-2xl mx-auto">
            Estamos aquí para ayudarte. Elige el canal que prefieras para
            comunicarte con nosotros.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <a
            href="mailto:contacto@tresqu.com"
            className="glass-card p-6 text-center hover:shadow-lg transition-all duration-300 hover:translate-y-[-4px]"
          >
            <Mail className="h-8 w-8 mx-auto mb-4 text-success" />
            <h4 className="font-semibold mb-2">Email</h4>
            <p className="text-sm text-foreground/80">contacto@tresqu.com</p>
          </a>

          <a
            href="https://www.linkedin.com/company/tresqu/"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card p-6 text-center hover:shadow-lg transition-all duration-300 hover:translate-y-[-4px]"
          >
            <Linkedin className="h-8 w-8 mx-auto mb-4 text-blue-500" />
            <h4 className="font-semibold mb-2">LinkedIn</h4>
            <p className="text-sm text-foreground/80">@tresqu</p>
          </a>

          <a
            href="https://www.facebook.com/people/Tresqu/61576223664321/"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card p-6 text-center hover:shadow-lg transition-all duration-300 hover:translate-y-[-4px]"
          >
            <Facebook className="h-8 w-8 mx-auto mb-4 text-blue-600" />
            <h4 className="font-semibold mb-2">Facebook</h4>
            <p className="text-sm text-foreground/80">@Tresqu</p>
          </a>

          <a
            href="https://wa.me/573164277879"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card p-6 text-center hover:shadow-lg transition-all duration-300 hover:translate-y-[-4px]"
          >
            <MessageCircle className="h-8 w-8 mx-auto mb-4 text-green-500" />
            <h4 className="font-semibold mb-2">WhatsApp</h4>
            <p className="text-sm text-foreground/80">+57 316 427 7879</p>
          </a>
        </div>
      </div>

      {/* Background effects */}
      <div
        className="absolute -bottom-40 -right-40 w-80 md:w-96 h-80 md:h-96 rounded-full blur-3xl opacity-20 animate-pulse-glow"
        style={{
          background:
            "radial-gradient(circle at center, var(--color-purple), transparent 70%)",
        }}
      ></div>
      <div
        className="absolute -top-40 -left-40 w-80 md:w-96 h-80 md:h-96 rounded-full blur-3xl opacity-20 animate-pulse-glow"
        style={{
          background:
            "radial-gradient(circle at center, var(--color-highlight), transparent 70%)",
          animationDelay: "1.5s",
        }}
      ></div>
    </section>
  );
};

export default Contact;
