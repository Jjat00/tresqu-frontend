
import React, { useState } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export type DateRange = {
  from: Date | undefined;
  to: Date | undefined;
};

export type DateRangePickerProps = {
  date: DateRange;
  onDateChange: (date: DateRange) => void;
  viewMode: "day" | "week" | "month" | "year";
  onViewModeChange: (viewMode: "day" | "week" | "month" | "year") => void;
};

export function DateRangePicker({
  date,
  onDateChange,
  viewMode,
  onViewModeChange,
}: DateRangePickerProps) {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  // Predefined date ranges
  const dateRanges = [
    { label: "Hoy", action: () => selectPredefinedRange("today") },
    { label: "Ayer", action: () => selectPredefinedRange("yesterday") },
    { label: "Esta semana", action: () => selectPredefinedRange("this_week") },
    { label: "Última semana", action: () => selectPredefinedRange("last_week") },
    { label: "Últimas dos semanas", action: () => selectPredefinedRange("past_two_weeks") },
    { label: "Este mes", action: () => selectPredefinedRange("this_month") },
    { label: "Último mes", action: () => selectPredefinedRange("last_month") },
    { label: "Este año", action: () => selectPredefinedRange("this_year") },
    { label: "Último año", action: () => selectPredefinedRange("last_year") },
  ];

  const selectPredefinedRange = (rangeType: string) => {
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    let from: Date | undefined = undefined;
    let to: Date | undefined = undefined;

    switch (rangeType) {
      case "today":
        from = new Date(startOfDay);
        to = new Date(startOfDay);
        onViewModeChange("day");
        break;
      case "yesterday":
        from = new Date(startOfDay);
        from.setDate(from.getDate() - 1);
        to = new Date(from);
        onViewModeChange("day");
        break;
      case "this_week":
        from = new Date(startOfDay);
        // Set to the first day of the week (Monday)
        const dayOfWeek = from.getDay();
        const diff = from.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
        from.setDate(diff);
        to = new Date(startOfDay);
        onViewModeChange("week");
        break;
      case "last_week":
        from = new Date(startOfDay);
        // Set to the first day of the previous week
        from.setDate(from.getDate() - 7 - from.getDay() + 1);
        to = new Date(from);
        to.setDate(to.getDate() + 6);
        onViewModeChange("week");
        break;
      case "past_two_weeks":
        from = new Date(startOfDay);
        from.setDate(from.getDate() - 14);
        to = new Date(startOfDay);
        onViewModeChange("week");
        break;
      case "this_month":
        from = new Date(today.getFullYear(), today.getMonth(), 1);
        to = new Date(startOfDay);
        onViewModeChange("month");
        break;
      case "last_month":
        from = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        to = new Date(today.getFullYear(), today.getMonth(), 0);
        onViewModeChange("month");
        break;
      case "this_year":
        from = new Date(today.getFullYear(), 0, 1);
        to = new Date(startOfDay);
        onViewModeChange("year");
        break;
      case "last_year":
        from = new Date(today.getFullYear() - 1, 0, 1);
        to = new Date(today.getFullYear() - 1, 11, 31);
        onViewModeChange("year");
        break;
      default:
        from = undefined;
        to = undefined;
    }

    onDateChange({ from, to });
    setIsCalendarOpen(false);
  };

  // Format the date for display
  const formatDateRange = () => {
    if (!date.from) {
      return "Seleccionar fechas";
    }

    if (!date.to) {
      return format(date.from, "PPP", { locale: es });
    }

    return `${format(date.from, "P", { locale: es })} - ${format(date.to, "P", { locale: es })}`;
  };

  return (
    <div className="grid gap-2">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
        <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "justify-start text-left font-normal sm:min-w-[240px] w-full sm:w-auto",
                !date.from && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {formatDateRange()}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 flex" align="center">
            <div className="border-r p-2 space-y-2 overflow-y-auto max-h-[350px]">
              {dateRanges.map((range, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className="justify-start w-full"
                  onClick={range.action}
                >
                  {range.label}
                </Button>
              ))}
            </div>
            <div className="p-0">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date.from}
                selected={{ from: date.from, to: date.to }}
                onSelect={(selectedRange) => {
                  if (selectedRange) {
                    onDateChange({
                      from: selectedRange.from,
                      to: selectedRange.to || selectedRange.from
                    });
                  } else {
                    onDateChange({ from: undefined, to: undefined });
                  }
                }}
                numberOfMonths={2}
                className="pointer-events-auto"
                locale={es}
              />
            </div>
          </PopoverContent>
        </Popover>

        <Select value={viewMode} onValueChange={(value: "day" | "week" | "month" | "year") => onViewModeChange(value)}>
          <SelectTrigger className="w-full sm:w-[140px]">
            <SelectValue placeholder="Vista" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="day">Día</SelectItem>
            <SelectItem value="week">Semana</SelectItem>
            <SelectItem value="month">Mes</SelectItem>
            <SelectItem value="year">Año</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

export default DateRangePicker;
