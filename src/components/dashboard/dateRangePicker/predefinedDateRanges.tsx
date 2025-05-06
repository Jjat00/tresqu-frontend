
import React from 'react';
import { DateRange } from '../DateRangePicker';
import {
  getTodayRange,
  getYesterdayRange,
  getCurrentWeekRange,
  getLastWeekRange,
  getPastTwoWeeksRange,
  getCurrentMonthRange,
  getLastMonthRange,
  getCurrentYearRange,
  getLastYearRange
} from './dateRangeUtils';

export type ViewMode = "day" | "week" | "month" | "year";

export type PredefinedDateRange = {
  label: string;
  action: () => void;
  type: string;
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
