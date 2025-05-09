import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react";
import { logout, isAuthenticated, getUser } from "@/services/authService";
import { toast } from "sonner";
import Logo from "@/components/Logo";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState<string>("");
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    // Verificar si el usuario está autenticado
    if (!isAuthenticated()) {
      navigate("/login");
      return;
    }

    // Obtener información del usuario
    const user = getUser();
    if (user) {
      setUserName(user.first_name || "Usuario");
    }
  }, [navigate]);

  const handleLogout = () => {
    logout();
    toast.success("Has cerrado sesión correctamente");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Dashboard header */}
      <header className="border-b sticky top-0 z-30 bg-background">
        <div className="container max-w-7xl mx-auto flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <a href="/" className="text-xl">
              <Logo />
            </a>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm font-medium hidden sm:inline-block">
                {userName}
              </span>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline-block">Cerrar sesión</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Dashboard content */}
      <main className="container max-w-7xl mx-auto px-3 md:px-4 py-6 md:py-8">
        {children}
      </main>

      {/* Fixed footer */}
      <footer className="fixed bottom-0 left-0 right-0 bg-card border-t border-border py-3 z-40">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm">
            <div className="mb-2 md:mb-0 text-muted-foreground">
              © {currentYear} Tresqu. Todos los derechos reservados
            </div>

            <div className="flex space-x-4 md:space-x-6">
              <Link
                to="/cookie-policy"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Política de cookies
              </Link>
              <Link
                to="/legal-notice"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Términos y condiciones
              </Link>
              <Link
                to="/privacy-policy"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Política de privacidad
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Add padding to prevent content from being hidden behind the fixed footer */}
      <div className="pb-16"></div>
    </div>
  );
};

export default DashboardLayout;
