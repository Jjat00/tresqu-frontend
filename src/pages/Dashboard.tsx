import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/layouts/DashboardLayout";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ExpensesTab from "@/components/dashboard/ExpensesTab";
import IncomeTab from "@/components/dashboard/IncomeTab";
import DebtTab from "@/components/dashboard/DebtTab";
import SavingsGoalsTab from "@/components/dashboard/SavingsGoalsTab";
import CategoriesTab from "@/components/dashboard/CategoriesTab";
import ChatBot from "@/components/ChatBot";
import { Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { isAuthenticated } from "@/services/authService";
import DateRangePicker, {
  DateRange,
} from "@/components/dashboard/DateRangePicker";
import { getCurrentWeekRange } from "@/components/dashboard/dateRangePicker/dateRangeUtils";
import DashboardSummary from "@/components/dashboard/DashboardSummary";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("expenses");
  const isMobile = useIsMobile();
  const [currentMonth, setCurrentMonth] = useState("");
  const [dateRange, setDateRange] = useState<DateRange>(getCurrentWeekRange());
  const [viewMode, setViewMode] = useState<"day" | "week" | "month" | "year">(
    "week"
  );

  const navigate = useNavigate();

  // Define los meses del año
  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  // Comprobar si el usuario está autenticado
  useEffect(() => {
    // Usando try-catch para evitar errores en producción
    try {
      if (!isAuthenticated()) {
        navigate("/login");
      }
    } catch (error) {
      console.error("Error al verificar autenticación:", error);
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
    // Crea el mensaje para compartir
    const shareTitle = "Tresqu - Tu asistente financiero inteligente";
    const shareText =
      "¡Controla tus finanzas de forma inteligente con Tresqu! Registra gastos por voz o texto y obtén análisis personalizados.";
    const shareUrl = window.location.origin;

    // URL para compartir en Telegram
    const telegramShareUrl = `https://t.me/share/url?url=${encodeURIComponent(
      shareUrl
    )}&text=${encodeURIComponent(`${shareTitle}\n\n${shareText}`)}`;

    // Abre la ventana de compartir de Telegram
    window.open(telegramShareUrl, "_blank");
  };

  // Manejar cambio de rango de fechas
  const handleDateRangeChange = (newRange: DateRange) => {
    setDateRange(newRange);

    // Update view mode based on date range span
    if (newRange.from && newRange.to) {
      const daysDiff = Math.abs(
        Math.ceil(
          (newRange.to.getTime() - newRange.from.getTime()) /
            (1000 * 60 * 60 * 24)
        )
      );

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

  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-6 relative px-0">
        {/* Efectos de fondo */}
        <div className="fixed inset-0 z-[-2] opacity-50 pointer-events-none">
          <div
            className="absolute top-0 left-0 w-full h-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at 25% 25%, rgba(74, 222, 128, 0.1), transparent 40%)",
            }}
          ></div>
          <div
            className="absolute bottom-0 right-0 w-full h-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at 75% 75%, rgba(96, 165, 250, 0.1), transparent 40%)",
            }}
          ></div>
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at center, rgba(167, 139, 250, 0.05), transparent 50%)",
            }}
          ></div>
        </div>

        {/* Patrón sutil de puntos */}
        <div
          className="fixed inset-0 z-[-2] opacity-5 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px)`,
            backgroundSize: "30px 30px",
          }}
        ></div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 animate-fade-up">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
            <h1 className="text-xl sm:text-2xl md:text-4xl font-bold tracking-tight gradient-text">
              Dashboard Financiero
            </h1>
            <Button
              variant="ghost"
              className="flex items-center gap-1 glass w-full sm:w-auto"
              onClick={handleShareApp}
              size="sm"
            >
              <Share2 className="h-3 w-3" />
              <span className="text-xs">Compartir</span>
            </Button>
          </div>
          <div className="w-full sm:w-auto">
            <DateRangePicker
              date={dateRange}
              onDateChange={handleDateRangeChange}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
            />
          </div>
        </div>

        <DashboardSummary dateRange={dateRange} />

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-2"
        >
          <div
            className="pb-2 animate-fade-up"
            style={{ animationDelay: "0.2s" }}
          >
            <TabsList className="w-full grid grid-cols-3 gap-1 sm:gap-2 p-1 glass">
              <TabsTrigger
                value="expenses"
                className="text-xs sm:text-sm py-1.5 px-2 sm:py-1.5 sm:px-3 whitespace-normal h-auto data-[state=active]:bg-success/20 data-[state=active]:text-success"
              >
                Gastos
              </TabsTrigger>
              <TabsTrigger
                value="income"
                className="text-xs sm:text-sm py-1.5 px-2 sm:py-1.5 sm:px-3 whitespace-normal h-auto data-[state=active]:bg-highlight/20 data-[state=active]:text-highlight"
              >
                Ingresos
              </TabsTrigger>
              <TabsTrigger
                value="categories"
                className="text-xs sm:text-sm py-1.5 px-2 sm:py-1.5 sm:px-3 whitespace-normal h-auto data-[state=active]:bg-purple/20 data-[state=active]:text-purple"
              >
                Categorías
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent
            value="expenses"
            className="p-0 min-h-[60vh] animate-fade-up"
            style={{ animationDelay: "0.3s" }}
          >
            <ExpensesTab
              selectedMonth={currentMonth}
              activeTab={activeTab}
              dateRange={dateRange}
              viewMode={viewMode}
            />
          </TabsContent>

          <TabsContent
            value="income"
            className="p-0 min-h-[60vh] animate-fade-up"
            style={{ animationDelay: "0.3s" }}
          >
            <IncomeTab
              selectedMonth={currentMonth}
              activeTab={activeTab}
              dateRange={dateRange}
              viewMode={viewMode}
            />
          </TabsContent>

          <TabsContent
            value="categories"
            className="p-0 min-h-[60vh] animate-fade-up"
            style={{ animationDelay: "0.3s" }}
          >
            <CategoriesTab />
          </TabsContent>

          <TabsContent
            value="debt"
            className="p-0 min-h-[60vh] animate-fade-up"
            style={{ animationDelay: "0.3s" }}
          >
            <DebtTab />
          </TabsContent>

          <TabsContent
            value="savings"
            className="p-0 min-h-[60vh] animate-fade-up"
            style={{ animationDelay: "0.3s" }}
          >
            <SavingsGoalsTab />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
