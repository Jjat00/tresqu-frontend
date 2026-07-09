import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { logout, isAuthenticated, getUser } from "@/services/authService";
import { toast } from "sonner";
import Logo from "@/components/Logo";
import {
  DesktopSidebar,
  MobileBottomNav,
} from "@/components/dashboard/DashboardSidebar";
import ContextChatDock, {
  sectionChatConfig,
} from "@/components/chatbot/ContextChatDock";

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
  const [chatOpen, setChatOpen] = useState(false);

  // El chat contextual solo aparece en secciones con datos (no en Cuenta,
  // Integraciones ni la página completa de Agentes).
  const chatConfig = sectionChatConfig(activeTab);

  // Recuerda si el usuario dejó el dock abierto (arranca cerrado por espacio).
  useEffect(() => {
    try {
      setChatOpen(localStorage.getItem("tresqu_chat_open") === "1");
    } catch {
      /* localStorage no disponible: queda cerrado */
    }
  }, []);

  const toggleChat = () =>
    setChatOpen((o) => {
      const next = !o;
      try {
        localStorage.setItem("tresqu_chat_open", next ? "1" : "0");
      } catch {
        /* ignore */
      }
      return next;
    });

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
      <header className="border-b border-white/[0.06] sticky top-0 z-30 bg-background/75 backdrop-blur-xl">
        <div className="flex h-14 items-center justify-between px-4 lg:px-6">
          <div className="flex items-center gap-2">
            <a href="/" className="text-xl">
              <Logo />
            </a>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/dashboard/account"
              className="flex items-center gap-2 hover:opacity-80 transition-opacity lg:hidden"
              aria-label="Mi cuenta"
            >
              <span
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold"
                style={{
                  background:
                    "linear-gradient(135deg, hsl(152 100% 50% / 0.25), hsl(152 100% 50% / 0.05))",
                  color: "var(--color-trii-green)",
                  border: "1px solid hsl(152 100% 50% / 0.3)",
                }}
              >
                {(userName.trim()[0] || "U").toUpperCase()}
              </span>
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

      {/* Dashboard content with sidebar offset (y dock de chat a la derecha) */}
      <main
        className={`flex-1 px-3 md:px-6 py-4 md:py-6 lg:pb-6 transition-all duration-200 ${
          chatConfig ? "pb-28" : "pb-20"
        } ${sidebarCollapsed ? "lg:ml-14" : "lg:ml-48"} ${
          chatConfig ? (chatOpen ? "lg:mr-[22rem]" : "lg:mr-12") : ""
        }`}
      >
        {children}
      </main>

      {/* Chat contextual: cambia de agente/sugerencias según la sección */}
      {chatConfig && (
        <ContextChatDock
          section={activeTab}
          config={chatConfig}
          open={chatOpen}
          onToggle={toggleChat}
        />
      )}

      {/* Mobile bottom nav */}
      <MobileBottomNav activeTab={activeTab} />
    </div>
  );
};

export default DashboardLayout;
