import React from "react";
import { DateRange } from "../DateRangePicker";
import {
  getTodayRange,
  getYesterdayRange,
  getCurrentWeekRange,
  getLastWeekRange,
  getPastTwoWeeksRange,
  getCurrentMonthRange,
  getLastMonthRange,
  getCurrentYearRange,
  getLastYearRange,
} from "./dateRangeUtils";

export type ViewMode = "day" | "week" | "month" | "year";

export type PredefinedDateRange = {
  label: string;
  action: () => void;
  type: string;
};

// Tipo para rangos serializados en formato simple
export type SimpleDateRange = {
  label: string;
  type: string;
  from: Date;
  to: Date;
};

// Función segura para obtener todos los rangos posibles predefinidos sin ejecutar acciones
export const getAllPredefinedRanges = (): SimpleDateRange[] => {
  return [
    {
      label: "Hoy",
      type: "today",
      ...getTodayRange(),
    },
    {
      label: "Ayer",
      type: "yesterday",
      ...getYesterdayRange(),
    },
    {
      label: "Esta semana",
      type: "this_week",
      ...getCurrentWeekRange(),
    },
    {
      label: "Última semana",
      type: "last_week",
      ...getLastWeekRange(),
    },
    {
      label: "Últimas dos semanas",
      type: "past_two_weeks",
      ...getPastTwoWeeksRange(),
    },
    {
      label: "Este mes",
      type: "this_month",
      ...getCurrentMonthRange(),
    },
    {
      label: "Último mes",
      type: "last_month",
      ...getLastMonthRange(),
    },
    {
      label: "Este año",
      type: "this_year",
      ...getCurrentYearRange(),
    },
    {
      label: "Último año",
      type: "last_year",
      ...getLastYearRange(),
    },
  ].map((range) => ({
    ...range,
    // Garantizar que from y to sean siempre objetos Date válidos
    from: range.from || new Date(),
    to: range.to || new Date(),
  }));
};

export const usePredefinedDateRanges = (
  onDateChange: (date: DateRange) => void,
  onViewModeChange: (viewMode: ViewMode) => void,
  onClose: () => void
): PredefinedDateRange[] => {
  return [
    {
      label: "Hoy",
      action: () => {
        onDateChange(getTodayRange());
        onViewModeChange("day");
        onClose();
      },
      type: "today",
    },
    {
      label: "Ayer",
      action: () => {
        onDateChange(getYesterdayRange());
        onViewModeChange("day");
        onClose();
      },
      type: "yesterday",
    },
    {
      label: "Esta semana",
      action: () => {
        onDateChange(getCurrentWeekRange());
        onViewModeChange("week");
        onClose();
      },
      type: "this_week",
    },
    {
      label: "Última semana",
      action: () => {
        onDateChange(getLastWeekRange());
        onViewModeChange("week");
        onClose();
      },
      type: "last_week",
    },
    {
      label: "Últimas dos semanas",
      action: () => {
        onDateChange(getPastTwoWeeksRange());
        onViewModeChange("week");
        onClose();
      },
      type: "past_two_weeks",
    },
    {
      label: "Este mes",
      action: () => {
        onDateChange(getCurrentMonthRange());
        onViewModeChange("month");
        onClose();
      },
      type: "this_month",
    },
    {
      label: "Último mes",
      action: () => {
        onDateChange(getLastMonthRange());
        onViewModeChange("month");
        onClose();
      },
      type: "last_month",
    },
    {
      label: "Este año",
      action: () => {
        onDateChange(getCurrentYearRange());
        onViewModeChange("year");
        onClose();
      },
      type: "this_year",
    },
    {
      label: "Último año",
      action: () => {
        onDateChange(getLastYearRange());
        onViewModeChange("year");
        onClose();
      },
      type: "last_year",
    },
  ];
};
