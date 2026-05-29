import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DashboardLayout from "@/layouts/DashboardLayout";
import ExpensesTab from "@/components/dashboard/ExpensesTab";
import IncomeTab from "@/components/dashboard/IncomeTab";
import CategoriesTab from "@/components/dashboard/CategoriesTab";
import IntegrationsTab from "@/components/dashboard/IntegrationsTab";
import InvestmentsTab from "@/components/dashboard/investments/InvestmentsTab";
import HomeTab from "@/components/dashboard/home/HomeTab";
import { Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { isAuthenticated } from "@/services/authService";
import DateRangePicker, {
  DateRange,
} from "@/components/dashboard/DateRangePicker";
import { getCurrentMonthRange } from "@/components/dashboard/dateRangePicker/dateRangeUtils";

const MONTHS = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
] as const;

const Dashboard = () => {
  const { section = "home" } = useParams<{ section: string }>();
  const [dateRange, setDateRange] = useState<DateRange>(getCurrentMonthRange());
  const [viewMode, setViewMode] = useState<"day" | "week" | "month" | "year">(
    "month"
  );

  const navigate = useNavigate();

  const referenceDate =
    viewMode === "month" && dateRange.from ? dateRange.from : new Date();
  const currentMonth = MONTHS[referenceDate.getMonth()];

  useEffect(() => {
    try {
      if (!isAuthenticated()) {
        navigate("/login");
      }
    } catch (error) {
      console.error("Error al verificar autenticación:", error);
      navigate("/login");
    }
  }, [navigate]);

  const handleShareApp = () => {
    const shareTitle = "Tresqu - Tu asistente financiero inteligente";
    const shareText =
      "¡Controla tus finanzas de forma inteligente con Tresqu! Registra gastos por voz o texto y obtén análisis personalizados.";
    const shareUrl = window.location.origin;
    const telegramShareUrl = `https://t.me/share/url?url=${encodeURIComponent(
      shareUrl
    )}&text=${encodeURIComponent(`${shareTitle}\n\n${shareText}`)}`;
    window.open(telegramShareUrl, "_blank");
  };

  const handleDateRangeChange = (newRange: DateRange) => {
    setDateRange(newRange);

    if (newRange.from && newRange.to) {
      const daysDiff = Math.abs(
        Math.ceil(
          (newRange.to.getTime() - newRange.from.getTime()) /
            (1000 * 60 * 60 * 24)
        )
      );

      if (daysDiff === 0) setViewMode("day");
      else if (daysDiff <= 7) setViewMode("week");
      else if (daysDiff <= 31) setViewMode("month");
      else setViewMode("year");
    }
  };

  const renderSection = () => {
    switch (section) {
      case "home":
        return <HomeTab dateRange={dateRange} />;
      case "expenses":
        return (
          <ExpensesTab
            selectedMonth={currentMonth}
            activeTab={section}
            dateRange={dateRange}
            viewMode={viewMode}
          />
        );
      case "income":
        return (
          <IncomeTab
            selectedMonth={currentMonth}
            activeTab={section}
            dateRange={dateRange}
            viewMode={viewMode}
          />
        );
      case "categories":
        return <CategoriesTab />;
      case "investments":
        return <InvestmentsTab />;
      case "integrations":
        return <IntegrationsTab />;
      default:
        return null;
    }
  };

  return (
    <DashboardLayout activeTab={section}>
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
            {section !== "investments" && (
              <DateRangePicker
                date={dateRange}
                onDateChange={handleDateRangeChange}
                viewMode={viewMode}
                onViewModeChange={setViewMode}
              />
            )}
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

        <div className="min-h-[60vh] animate-fade-up">
          {renderSection()}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
