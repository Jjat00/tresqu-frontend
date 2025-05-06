
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/layouts/DashboardLayout";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ExpensesTab from "@/components/dashboard/ExpensesTab";
import IncomeTab from "@/components/dashboard/IncomeTab";
import DebtTab from "@/components/dashboard/DebtTab";
import SavingsGoalsTab from "@/components/dashboard/SavingsGoalsTab";
import ChatBot from "@/components/ChatBot";
import { Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { isAuthenticated } from "@/services/authService";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("expenses");
  const [isMobile, setIsMobile] = useState(false);
  const [currentMonth, setCurrentMonth] = useState("");
  const {
    toast
  } = useToast();
  const navigate = useNavigate();

  // Define los meses del año
  const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

  // Comprobar si el usuario está autenticado
  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login");
    }
  }, [navigate]);

  // Check if the device is mobile based on window size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Detecta el mes actual al cargar el componente
  useEffect(() => {
    const date = new Date();
    const monthIndex = date.getMonth();
    setCurrentMonth(months[monthIndex]);
  }, []);
  
  const handleShareApp = () => {
    if (navigator.share) {
      navigator.share({
        title: 'CashBot - Tu asistente financiero inteligente',
        text: '¡Controla tus finanzas de forma inteligente con CashBot! Registra gastos por voz o texto y obtén análisis personalizados.',
        url: window.location.origin
      }).then(() => console.log('Shared successfully')).catch(error => console.log('Share failed:', error));
    } else {
      // Fallback for browsers that don't support navigator.share
      navigator.clipboard.writeText(window.location.origin).then(() => {
        toast({
          title: "Enlace copiado",
          description: "La URL de CashBot ha sido copiada al portapapeles para compartir."
        });
      }).catch(() => {
        toast({
          title: "Error",
          description: "No se pudo copiar el enlace. Intenta manualmente.",
          variant: "destructive"
        });
      });
    }
  };
  
  return <DashboardLayout>
      <div className="space-y-4 sm:space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-4">
          <div className="w-full sm:w-auto">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Dashboard Financiero</h1>
            <p className="text-sm text-muted-foreground">
              Administra tus finanzas y mantén todo bajo control.
            </p>
          </div>
          
          <Button variant="outline" className="flex items-center gap-2 w-full sm:w-auto mt-2 sm:mt-0" onClick={handleShareApp} size={isMobile ? "sm" : "default"}>
            <Share2 className="h-4 w-4" />
            <span className="text-sm">Compartir CashBot</span>
          </Button>
        </div>
        
        <div className="flex justify-between items-center">
          <Select value={currentMonth} onValueChange={setCurrentMonth}>
            <SelectTrigger className="w-[140px] sm:w-[180px] text-sm">
              <SelectValue placeholder="Seleccionar mes" />
            </SelectTrigger>
            <SelectContent>
              {months.map(month => <SelectItem key={month} value={month} className="text-sm">
                  {month}
                </SelectItem>)}
              <SelectItem value="year" className="text-sm">Ver todo el año</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="bg-muted/50 w-full grid grid-cols-2 sm:grid-cols-4 gap-1 sm:gap-2 p-1 py-0 px-0 my-0">
            <TabsTrigger value="expenses" className="text-xs sm:text-sm my-0">
              Gastos
            </TabsTrigger>
            <TabsTrigger value="income" className="text-xs sm:text-sm">
              Ingresos
            </TabsTrigger>
            <TabsTrigger value="debt" className="text-xs sm:text-sm py-0 px-0 mx-0 my-[28px]">
              Deudas
            </TabsTrigger>
            <TabsTrigger value="savings" className="text-xs sm:text-sm">
              Ahorros
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="expenses" className="p-0 min-h-[60vh]">
            <ExpensesTab selectedMonth={currentMonth} activeTab={activeTab} />
          </TabsContent>
          
          <TabsContent value="income" className="p-0 min-h-[60vh]">
            <IncomeTab selectedMonth={currentMonth} activeTab={activeTab} />
          </TabsContent>
          
          <TabsContent value="debt" className="p-0 min-h-[60vh]">
            <DebtTab />
          </TabsContent>
          
          <TabsContent value="savings" className="p-0 min-h-[60vh]">
            <SavingsGoalsTab />
          </TabsContent>
        </Tabs>
      </div>
      
      {/* ChatBot component - outside the DashboardLayout to be accessible from everywhere */}
      <ChatBot />
    </DashboardLayout>;
};

export default Dashboard;
