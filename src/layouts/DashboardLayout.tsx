import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react";
import { logout, isAuthenticated, getUser } from "@/services/authService";
import { toast } from "sonner";
import Logo from "@/components/Logo";
import {
  DesktopSidebar,
  MobileBottomNav,
} from "@/components/dashboard/DashboardSidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
  activeTab?: string;
}

const DashboardLayout = ({
  children,
  activeTab = "expenses",
}: DashboardLayoutProps) => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState<string>("");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    try {
      if (!isAuthenticated()) {
        navigate("/login");
        return;
      }
      const user = getUser();
      if (user) {
        // eslint-disable-next-line react-hooks/set-state-in-effect -- bootstrap del nombre tras validar la sesión
        setUserName(user.first_name || "Usuario");
      }
    } catch (error) {
      console.error("Error al verificar autenticación:", error);
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    logout();
    toast.success("Has cerrado sesión correctamente");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Dashboard header */}
      <header className="border-b sticky top-0 z-30 bg-background">
        <div className="flex h-14 items-center justify-between px-4 lg:px-6">
          <div className="flex items-center gap-2">
            <a href="/" className="text-xl">
              <Logo />
            </a>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/dashboard/profile"
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium hidden sm:inline-block">
                {userName}
              </span>
            </Link>
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-1"
              onClick={handleLogout}
              aria-label="Cerrar sesión"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline-block text-xs">Salir</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Desktop sidebar (fixed) */}
      <DesktopSidebar
        activeTab={activeTab}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Dashboard content with sidebar offset */}
      <main
        className={`flex-1 px-3 md:px-6 py-4 md:py-6 pb-20 lg:pb-6 transition-all duration-200 ${
          sidebarCollapsed ? "lg:ml-14" : "lg:ml-48"
        }`}
      >
        {children}
      </main>

      {/* Mobile bottom nav */}
      <MobileBottomNav activeTab={activeTab} />
    </div>
  );
};

export default DashboardLayout;
