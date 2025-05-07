
import { Instagram, Twitter, Facebook, Mail } from "lucide-react";

const socialLinks = [
  { icon: <Twitter className="h-5 w-5" />, href: "#", label: "Twitter" },
  { icon: <Instagram className="h-5 w-5" />, href: "#", label: "Instagram" },
  { icon: <Facebook className="h-5 w-5" />, href: "#", label: "Facebook" },
  { icon: <Mail className="h-5 w-5" />, href: "mailto:contacto@tresqu.com", label: "Email" },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-12 bg-background border-t border-border relative">
      {/* Decorative tech accent */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-tech-purple via-tech-pink to-success opacity-60"></div>
      
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold font-display text-success">Tres<span className="text-tech-purple">qu</span></span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 mb-6 md:mb-0">
            {socialLinks.map((link, index) => (
              <a 
                key={index}
                href={link.href}
                aria-label={link.label} 
                className="p-2 text-muted-foreground hover:text-tech-pink transition-colors duration-300"
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground mb-4 md:mb-0">
            &copy; {currentYear} Tresqu. Todos los derechos reservados.
          </p>
          
          <div className="flex space-x-6">
            <a href="#" className="text-xs text-muted-foreground hover:text-tech-purple transition-colors duration-300">
              Términos y condiciones
            </a>
            <a href="#" className="text-xs text-muted-foreground hover:text-tech-pink transition-colors duration-300">
              Política de privacidad
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
