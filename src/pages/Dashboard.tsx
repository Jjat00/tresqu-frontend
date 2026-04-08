import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/layouts/DashboardLayout";
import ExpensesTab from "@/components/dashboard/ExpensesTab";
import IncomeTab from "@/components/dashboard/IncomeTab";
import DebtTab from "@/components/dashboard/DebtTab";
import SavingsGoalsTab from "@/components/dashboard/SavingsGoalsTab";
import CategoriesTab from "@/components/dashboard/CategoriesTab";
import { Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { isAuthenticated } from "@/services/authService";
import DateRangePicker, {
  DateRange,
} from "@/components/dashboard/DateRangePicker";
import { getCurrentWeekRange } from "@/components/dashboard/dateRangePicker/dateRangeUtils";
import DashboardSummary from "@/components/dashboard/DashboardSummary";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("expenses");
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

  const renderActiveSection = () => {
    switch (activeTab) {
      case "expenses":
        return (
          <ExpensesTab
            selectedMonth={currentMonth}
            activeTab={activeTab}
            dateRange={dateRange}
            viewMode={viewMode}
          />
        );
      case "income":
        return (
          <IncomeTab
            selectedMonth={currentMonth}
            activeTab={activeTab}
            dateRange={dateRange}
            viewMode={viewMode}
          />
        );
      case "categories":
        return <CategoriesTab />;
      case "debt":
        return <DebtTab />;
      case "savings":
        return <SavingsGoalsTab />;
      case "integrations":
        return <div className="text-center py-20 text-muted-foreground">Próximamente</div>;
      default:
        return null;
    }
  };

  return (
    <DashboardLayout
      activeTab={activeTab}
      onTabChange={setActiveTab}
    >
      <div className="space-y-4 sm:space-y-6 relative">
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
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 animate-fade-up">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight gradient-text">
            Dashboard Financiero
          </h1>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <DateRangePicker
              date={dateRange}
              onDateChange={handleDateRangeChange}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
            />
            <Button
              variant="ghost"
              className="flex items-center gap-1 glass"
              onClick={handleShareApp}
              size="sm"
              aria-label="Compartir app"
            >
              <Share2 className="h-3 w-3" />
            </Button>
          </div>
        </div>

        <DashboardSummary dateRange={dateRange} />

        <div className="min-h-[60vh] animate-fade-up">
          {renderActiveSection()}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
