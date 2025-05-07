import React from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { DateRange } from "../DateRangePicker";
import { PredefinedDateRange } from "./predefinedDateRanges";
interface DateRangePickerCalendarProps {
  date: DateRange;
  onDateChange: (date: DateRange) => void;
  predefinedRanges: PredefinedDateRange[];
}
const DateRangePickerCalendar: React.FC<DateRangePickerCalendarProps> = ({
  date,
  onDateChange,
  predefinedRanges
}) => {
  return <>
      <div className="border-b sm:border-b-0 sm:border-r p-2 space-y-2 overflow-y-auto max-h-[200px] sm:max-h-[300px] w-full sm:w-[180px] flex-shrink-0 px-0 mx-0">
        {predefinedRanges.map((range, index) => <Button key={index} variant="ghost" className="justify-start w-full" onClick={range.action}>
            {range.label}
          </Button>)}
      </div>
      <div className="p-0 overflow-x-auto">
        <Calendar initialFocus mode="range" defaultMonth={date.from} selected={{
        from: date.from,
        to: date.to
      }} onSelect={selectedRange => {
        if (selectedRange) {
          onDateChange({
            from: selectedRange.from,
            to: selectedRange.to || selectedRange.from
          });
        } else {
          onDateChange({
            from: undefined,
            to: undefined
          });
        }
      }} numberOfMonths={1} className="pointer-events-auto" locale={es} />
      </div>
    </>;
};
export default DateRangePickerCalendar;