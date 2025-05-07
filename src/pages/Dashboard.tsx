
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
import { useIsMobile } from "@/hooks/use-mobile";
import { isAuthenticated } from "@/services/authService";
import DateRangePicker, { DateRange } from "@/components/dashboard/DateRangePicker";
import { getCurrentWeekRange } from "@/components/dashboard/dateRangePicker/dateRangeUtils";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("expenses");
  const isMobile = useIsMobile();
  const [currentMonth, setCurrentMonth] = useState("");
  const [dateRange, setDateRange] = useState<DateRange>(getCurrentWeekRange());
  const [viewMode, setViewMode] = useState<"day" | "week" | "month" | "year">("week");
  
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

  // Manejar cambio de rango de fechas
  const handleDateRangeChange = (newRange: DateRange) => {
    setDateRange(newRange);
    
    // Update view mode based on date range span
    if (newRange.from && newRange.to) {
      const daysDiff = Math.abs(Math.ceil((newRange.to.getTime() - newRange.from.getTime()) / (1000 * 60 * 60 * 24)));
      
      if (daysDiff === 0) {
        setViewMode("day");
      } else if (daysDiff <= 7) {
        setViewMode("week");
      } else if (daysDiff <= 31) {
        setViewMode("month");
      } else {
        setViewMode("year");
      }
    }
    
    // Actualizar el mes seleccionado si estamos en modo mes
    if (viewMode === "month" && newRange.from) {
      const monthIndex = newRange.from.getMonth();
      setCurrentMonth(months[monthIndex]);
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
          <DateRangePicker 
            date={dateRange}
            onDateChange={handleDateRangeChange}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
          />
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          {/* Ajustamos el contenedor de TabsList para evitar el scroll horizontal/vertical en pantallas pequeñas */}
          <div className="pb-2">
            <TabsList className="w-full grid grid-cols-2 sm:grid-cols-4 gap-1 sm:gap-2 p-1 bg-muted/50">
              <TabsTrigger value="expenses" className="text-xs sm:text-sm py-1.5 px-2 sm:py-1.5 sm:px-3 whitespace-normal h-auto">
                Gastos
              </TabsTrigger>
              <TabsTrigger value="income" className="text-xs sm:text-sm py-1.5 px-2 sm:py-1.5 sm:px-3 whitespace-normal h-auto">
                Ingresos
              </TabsTrigger>
              <TabsTrigger value="debt" className="text-xs sm:text-sm py-1.5 px-2 sm:py-1.5 sm:px-3 whitespace-normal h-auto">
                Deudas
              </TabsTrigger>
              <TabsTrigger value="savings" className="text-xs sm:text-sm py-1.5 px-2 sm:py-1.5 sm:px-3 whitespace-normal h-auto">
                Ahorros
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="expenses" className="p-0 min-h-[60vh]">
            <ExpensesTab 
              selectedMonth={currentMonth} 
              activeTab={activeTab}
              dateRange={dateRange}
              viewMode={viewMode}
            />
          </TabsContent>
          
          <TabsContent value="income" className="p-0 min-h-[60vh]">
            <IncomeTab 
              selectedMonth={currentMonth} 
              activeTab={activeTab}
              dateRange={dateRange}
              viewMode={viewMode}
            />
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
