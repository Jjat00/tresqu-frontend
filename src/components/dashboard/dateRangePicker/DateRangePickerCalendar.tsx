import React, { useMemo, useState, useEffect } from "react";
import DatePicker, {
  registerLocale,
  ReactDatePickerCustomHeaderProps,
} from "react-datepicker";
import { es } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { DateRange } from "../DateRangePicker";
import {
  PredefinedDateRange,
  getAllPredefinedRanges,
} from "./predefinedDateRanges";
import { cn } from "@/lib/utils";
import { CalendarIcon, Info } from "lucide-react";

// Importar estilos de react-datepicker
import "react-datepicker/dist/react-datepicker.css";
// Importar arreglo de estilos
import "@/styles/datepicker-fix.css";

// Registrar el idioma español
registerLocale("es", es);

interface DateRangePickerCalendarProps {
  date: DateRange;
  onDateChange: (date: DateRange) => void;
  predefinedRanges: PredefinedDateRange[];
}

const DateRangePickerCalendar: React.FC<DateRangePickerCalendarProps> = ({
  date,
  onDateChange,
  predefinedRanges,
}) => {
  // Estado interno para manejar la selección de rango
  const [internalDateRange, setInternalDateRange] = useState<
    [Date | null, Date | null]
  >([date.from || null, date.to || null]);

  // Estado para rastrear si estamos en modo de selección (ya se seleccionó una fecha inicial)
  const [isSelecting, setIsSelecting] = useState(false);

  // Actualizar el estado interno cuando cambien las props de fecha
  useEffect(() => {
    setInternalDateRange([date.from || null, date.to || null]);
  }, [date.from, date.to]);

  // Actualizar el estado de selección cuando cambie la fecha
  useEffect(() => {
    setIsSelecting(!!date.from && !date.to);
  }, [date.from, date.to]);

  // Usar useMemo para determinar el tipo de rango activo de forma segura
  const activeRangeType = useMemo(() => {
    if (!date.from || !date.to) return null;

    // Convertir a strings de fecha para comparación
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
        return range.type;
      }
    }

    return "custom";
  }, [date.from, date.to]);

  // Calcular el rango de días seleccionados
  const dayCount = useMemo(() => {
    if (!date.from || !date.to) return 0;
    return (
      Math.round(
        (date.to.getTime() - date.from.getTime()) / (1000 * 60 * 60 * 24)
      ) + 1
    );
  }, [date.from, date.to]);

  // Manejar el cambio de fechas
  const handleDateChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;

    // Actualizar el estado interno primero
    setInternalDateRange(dates);

    // Actualizar el estado de selección
    if (start && !end) {
      setIsSelecting(true);
    } else {
      setIsSelecting(false);
    }

    // Propagar el cambio a través de las props
    onDateChange({
      from: start ? start : undefined,
      to: end ? end : undefined,
    });
  };

  // Formatear fecha para mostrarla en español
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // Renderizar encabezado personalizado para el calendario
  const renderHeader = ({
    date,
    decreaseMonth,
    increaseMonth,
    prevMonthButtonDisabled,
    nextMonthButtonDisabled,
  }: ReactDatePickerCustomHeaderProps) => {
    return (
      <div className="flex items-center justify-between px-2 py-1">
        <button
          type="button"
          onClick={decreaseMonth}
          disabled={prevMonthButtonDisabled}
          className="p-1 rounded-full hover:bg-muted disabled:opacity-50"
          aria-label="Mes anterior"
        >
          <CalendarIcon className="h-4 w-4 rotate-90 text-primary" />
        </button>
        <div className="font-medium text-primary">
          {date.toLocaleDateString("es-ES", { month: "long", year: "numeric" })}
        </div>
        <button
          type="button"
          onClick={increaseMonth}
          disabled={nextMonthButtonDisabled}
          className="p-1 rounded-full hover:bg-muted disabled:opacity-50"
          aria-label="Mes siguiente"
        >
          <CalendarIcon className="h-4 w-4 -rotate-90 text-primary" />
        </button>
      </div>
    );
  };

  return (
    <div className="flex flex-col sm:flex-row rounded-lg shadow-sm border border-slate-700 bg-slate-900 text-white">
      <div className="border-b sm:border-b-0 sm:border-r border-slate-700 p-2 space-y-1 overflow-y-auto max-h-[180px] sm:max-h-[280px] xl:max-h-[380px] w-full sm:w-[160px] xl:w-[200px] flex-shrink-0 bg-slate-800/50">
        <h3 className="font-medium text-xs px-2 mb-1 text-slate-400">
          Periodos
        </h3>
        {predefinedRanges.map((range, index) => (
          <Button
            key={index}
            variant={range.type === activeRangeType ? "default" : "ghost"}
            className={cn(
              "justify-start w-full text-xs py-1 h-auto transition-colors",
              range.type === activeRangeType
                ? "bg-primary text-primary-foreground font-medium"
                : "hover:bg-slate-700 text-slate-300"
            )}
            onClick={range.action}
          >
            {range.label}
          </Button>
        ))}
      </div>
      <div className="p-2 flex flex-col overflow-x-auto flex-grow bg-slate-900 ">
        {/* Estado de selección y mensaje de ayuda */}
        <div
          className={cn(
            "mb-2 px-2 py-1.5 text-xs rounded-md text-center transition-all duration-200",
            isSelecting
              ? "bg-primary/20 border-primary border animate-pulse"
              : date.from
              ? "bg-slate-800 border border-slate-700"
              : "bg-slate-800/80 border border-slate-700"
          )}
        >
          {isSelecting ? (
            <div className="flex items-center justify-center gap-2">
              <Info size={16} className="text-primary" />
              <span>
                Ahora selecciona la <strong>fecha final</strong> del rango
              </span>
            </div>
          ) : date.from && date.to ? (
            <>
              <span className="font-medium">{formatDate(date.from)}</span>
              {date.from.getTime() !== date.to.getTime() && (
                <>
                  {" "}
                  <span className="text-muted-foreground mx-1">hasta</span>{" "}
                  <span className="font-medium">{formatDate(date.to)}</span>
                  <div className="text-xs text-muted-foreground mt-1">
                    {dayCount} día{dayCount !== 1 ? "s" : ""} seleccionados
                  </div>
                </>
              )}
            </>
          ) : (
            <span>Selecciona una fecha para comenzar</span>
          )}
        </div>

        <DatePicker
          selected={internalDateRange[0]}
          onChange={handleDateChange}
          startDate={internalDateRange[0]}
          endDate={internalDateRange[1]}
          selectsRange={true}
          inline
          locale="es"
          monthsShown={1}
          dateFormat="dd/MM/yyyy"
          fixedHeight
          showPopperArrow={false}
          renderCustomHeader={renderHeader}
          showMonthDropdown={false}
          showYearDropdown={false}
          formatWeekDay={(day) => day.charAt(0).toUpperCase() + day.slice(1, 2)}
          shouldCloseOnSelect={false}
          forceShowMonthNavigation={true}
        />

        <div className="mt-2 pt-2 border-t border-slate-700 text-[10px] text-center flex items-center justify-center gap-1">
          <Info size={10} className="text-slate-400" />
          <span className="text-slate-400">
            Para seleccionar un rango, haz clic primero en la{" "}
            <strong>fecha inicial</strong> y luego en la{" "}
            <strong>fecha final</strong>
          </span>
        </div>
      </div>
    </div>
  );
};

export default DateRangePickerCalendar;
