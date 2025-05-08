
import { Instagram, Twitter, Facebook, Mail } from "lucide-react";
import Logo from "./Logo";
import { Link } from "react-router-dom";

const socialLinks = [
  {
    icon: <Twitter className="h-5 w-5" />,
    href: "#",
    label: "Twitter"
  }, 
  {
    icon: <Instagram className="h-5 w-5" />,
    href: "#",
    label: "Instagram"
  }, 
  {
    icon: <Facebook className="h-5 w-5" />,
    href: "#",
    label: "Facebook"
  }, 
  {
    icon: <Mail className="h-5 w-5" />,
    href: "mailto:contacto@tresqu.com",
    label: "Email"
  }
];

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return <>
      {/* Main footer */}
      <footer className="py-12 bg-background border-t border-border">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <Logo />
            </div>
            
            <div className="flex items-center space-x-4 mb-6 md:mb-0">
              {socialLinks.map((link, index) => <a key={index} href={link.href} aria-label={link.label} className="p-2 text-muted-foreground hover:text-foreground transition-colors">
                  {link.icon}
                </a>)}
            </div>
          </div>
          
          <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground mb-4 md:mb-0">
              &copy; {currentYear} Tresqu. Todos los derechos reservados.
            </p>
            
            <div className="flex space-x-6">
              <Link to="/privacy-policy" className="text-xs text-muted-foreground hover:text-foreground">
                Política de privacidad
              </Link>
              <Link to="/legal-notice" className="text-xs text-muted-foreground hover:text-foreground">
                Aviso legal
              </Link>
              <Link to="/cookie-policy" className="text-xs text-muted-foreground hover:text-foreground">
                Política de cookies
              </Link>
            </div>
          </div>
        </div>
      </footer>
      
      {/* Fixed footer */}
      
      
      {/* Add padding to prevent content from being hidden behind the fixed footer */}
      
    </>;
};
export default Footer;
