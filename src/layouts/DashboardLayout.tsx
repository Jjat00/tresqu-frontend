
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <a href="/" className="text-xl">
              <Logo />
            </a>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm font-medium hidden sm:inline-block">{userName}</span>
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
      <main className="container py-6 md:py-8">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
