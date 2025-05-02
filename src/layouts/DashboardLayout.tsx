
import { ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  MessageSquare, 
  User, 
  LogOut, 
  BarChart3, 
  DollarSign, 
  CreditCard 
} from "lucide-react";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const navigate = useNavigate();
  const [showBotChat, setShowBotChat] = useState(false);

  const handleLogout = () => {
    // Implement logout functionality here
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Navigation Bar */}
      <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold font-display text-success">Cash<span className="text-foreground">Bot</span></span>
          </div>
          
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-muted-foreground hover:text-foreground"
              onClick={() => navigate("/dashboard/profile")}
            >
              <User className="h-5 w-5 mr-1" />
              <span className="hidden sm:inline">Mi Perfil</span>
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-muted-foreground hover:text-foreground"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5 mr-1" />
              <span className="hidden sm:inline">Cerrar Sesión</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 container py-6">
        {children}
      </main>
      
      {/* Bot Chat Floating Button */}
      <div className="fixed bottom-6 right-6">
        {showBotChat && (
          <div className="absolute bottom-16 right-0 w-80 h-96 bg-card rounded-lg shadow-lg border border-border p-4 mb-4 flex flex-col">
            <div className="flex justify-between items-center border-b pb-2 mb-2">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-success/20 flex items-center justify-center">
                  <MessageSquare className="h-4 w-4 text-success" />
                </div>
                <span className="font-medium text-sm ml-2">CashBot</span>
              </div>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => setShowBotChat(false)}>
                <span className="sr-only">Close</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </Button>
            </div>
            <div className="flex-1 overflow-auto mb-2 bg-muted/30 rounded-md p-2">
              <div className="mb-2">
                <div className="bg-card p-2 rounded-lg inline-block max-w-[80%] text-sm">
                  ¡Hola! Soy CashBot, tu asistente financiero. ¿En qué puedo ayudarte hoy?
                </div>
              </div>
              <div className="flex justify-end mb-2">
                <div className="bg-success text-success-foreground p-2 rounded-lg inline-block max-w-[80%] text-sm">
                  Gasté 15 mil en restaurante
                </div>
              </div>
              <div className="mb-2">
                <div className="bg-card p-2 rounded-lg inline-block max-w-[80%] text-sm">
                  ¡Registrado! He añadido un gasto de $15,000 en la categoría "Restaurante". 
                  <br/><br/>Tu presupuesto en esta categoría para este mes está ahora al 75%.
                </div>
              </div>
            </div>
            <div className="flex">
              <input 
                type="text" 
                placeholder="Escribe un mensaje..." 
                className="flex-1 bg-background border border-input rounded-l-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-success"
              />
              <Button size="sm" className="bg-success hover:bg-success/90 rounded-l-none">
                <MessageSquare className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
        <Button 
          className="h-14 w-14 rounded-full bg-success hover:bg-success/90 shadow-lg"
          onClick={() => setShowBotChat(prev => !prev)}
        >
          <MessageSquare className="h-6 w-6" />
          <span className="sr-only">Chat con CashBot</span>
        </Button>
      </div>
    </div>
  );
};

export default DashboardLayout;
