
import React, { useState } from "react";
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
import { usePredefinedDateRanges, ViewMode } from "./dateRangePicker/predefinedDateRanges";

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

    return `${format(date.from, "P", { locale: es })} - ${format(date.to, "P", { locale: es })}`;
  };

  // Get predefined date ranges
  const predefinedRanges = usePredefinedDateRanges(
    onDateChange,
    onViewModeChange || (() => {}), // Provide a default empty function if not provided
    () => setIsCalendarOpen(false)
  );

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
          <PopoverContent 
            className="p-0 max-w-[95vw] w-auto flex flex-col sm:flex-row overflow-hidden" 
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
