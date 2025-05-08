import { useState, useCallback } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import DateRangePickerCalendar from "./dateRangePicker/DateRangePickerCalendar";
import {
  usePredefinedDateRanges,
  ViewMode,
  getAllPredefinedRanges,
} from "./dateRangePicker/predefinedDateRanges";
import { Badge } from "@/components/ui/badge";

export type DateRange = {
  from: Date | undefined;
  to: Date | undefined;
};

export type DateRangePickerProps = {
  date: DateRange;
  onDateChange: (date: DateRange) => void;
  viewMode: ViewMode;
  onViewModeChange?: (viewMode: ViewMode) => void; // Made optional
};

export function DateRangePicker({
  date,
  onDateChange,
  viewMode,
  onViewModeChange,
}: DateRangePickerProps) {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  // Format the date for display
  const formatDateRange = () => {
    if (!date.from) {
      return "Seleccionar fechas";
    }

    if (!date.to) {
      return format(date.from, "PPP", { locale: es });
    }

    return `${format(date.from, "P", { locale: es })} - ${format(date.to, "P", {
      locale: es,
    })}`;
  };

  // Get predefined date ranges to determine current selection type
  const predefinedRanges = usePredefinedDateRanges(
    onDateChange,
    onViewModeChange || (() => {}),
    () => setIsCalendarOpen(false)
  );

  // Return a badge color based on the view mode
  const getBadgeVariant = () => {
    switch (viewMode) {
      case "day":
        return "default"; // Azul por defecto
      case "week":
        return "secondary"; // Gris
      case "month":
        return "destructive"; // Rojo
      case "year":
        return "outline"; // Borde
      default:
        return "default";
    }
  };

  // Determinar cuál de los rangos predefinidos está activo actualmente - versión segura
  const getActiveRangeLabel = useCallback(() => {
    if (!date.from || !date.to) return null;

    // Comparar el rango actual con rangos predefinidos conocidos
    const fromStr = date.from.toISOString().split("T")[0];
    const toStr = date.to.toISOString().split("T")[0];

    // Obtener todos los rangos predefinidos posibles de manera segura
    const allRanges = getAllPredefinedRanges();

    // Buscar un rango coincidente
    for (const range of allRanges) {
      if (
        range.from.toISOString().split("T")[0] === fromStr &&
        range.to.toISOString().split("T")[0] === toStr
      ) {
        return range.label;
      }
    }

    return "Personalizado";
  }, [date.from, date.to]);

  // Evitamos calcular esto en cada renderizado
  const activeRangeLabel = date.from
    ? getActiveRangeLabel()
    : "Filtro de fechas";

  return (
    <div className="grid gap-2">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
        <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "justify-start text-left font-normal sm:min-w-[240px] w-full sm:w-auto relative",
                !date.from && "text-muted-foreground",
                date.from && "border-primary/40 bg-primary/5 shadow-sm" // Highlight selected state
              )}
            >
              <div className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4 text-primary" />
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span>{formatDateRange()}</span>
                    {date.from && (
                      <Badge
                        variant={getBadgeVariant()}
                        className="ml-1 text-[10px] py-0 px-1.5"
                      >
                        {viewMode === "day"
                          ? "Día"
                          : viewMode === "week"
                          ? "Semana"
                          : viewMode === "month"
                          ? "Mes"
                          : "Año"}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="p-0 max-w-[95vw] w-auto flex flex-col sm:flex-row overflow-hidden bg-slate-900 border-slate-700 shadow-lg"
            align="center"
            sideOffset={4}
          >
            <DateRangePickerCalendar
              date={date}
              onDateChange={onDateChange}
              predefinedRanges={predefinedRanges}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}

export default DateRangePicker;
