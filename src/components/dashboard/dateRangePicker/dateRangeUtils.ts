
import { DateRange } from "../DateRangePicker";

/**
 * Creates a date range for today
 * @returns DateRange for today only
 */
export const getTodayRange = (): DateRange => {
  const today = new Date();
  const startOfDay = new Date(today.setHours(0, 0, 0, 0));
  
  return {
    from: new Date(startOfDay),
    to: new Date(startOfDay)
  };
};

/**
 * Creates a date range for yesterday
 * @returns DateRange for yesterday only
 */
export const getYesterdayRange = (): DateRange => {
  const today = new Date();
  const startOfDay = new Date(today.setHours(0, 0, 0, 0));
  const yesterday = new Date(startOfDay);
  yesterday.setDate(yesterday.getDate() - 1);
  
  return {
    from: yesterday,
    to: new Date(yesterday)
  };
};

/**
 * Creates a date range for the current week (starting Monday)
 * @returns DateRange from the start of the week to today
 */
export const getCurrentWeekRange = (): DateRange => {
  const today = new Date();
  const startOfDay = new Date(today.setHours(0, 0, 0, 0));
  const firstDayOfWeek = new Date(startOfDay);
  
  // Set to the first day of the week (Monday)
  const dayOfWeek = firstDayOfWeek.getDay();
  const diff = firstDayOfWeek.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
  firstDayOfWeek.setDate(diff);
  
  return {
    from: firstDayOfWeek,
    to: new Date(startOfDay)
  };
};

/**
 * Creates a date range for the last week
 * @returns DateRange for the previous week
 */
export const getLastWeekRange = (): DateRange => {
  const today = new Date();
  const startOfDay = new Date(today.setHours(0, 0, 0, 0));
  const firstDayOfLastWeek = new Date(startOfDay);
  
  // Set to the first day of the previous week
  firstDayOfLastWeek.setDate(firstDayOfLastWeek.getDate() - 7 - firstDayOfLastWeek.getDay() + 1);
  const lastDayOfLastWeek = new Date(firstDayOfLastWeek);
  lastDayOfLastWeek.setDate(lastDayOfLastWeek.getDate() + 6);
  
  return {
    from: firstDayOfLastWeek,
    to: lastDayOfLastWeek
  };
};

/**
 * Creates a date range for the past two weeks
 * @returns DateRange from two weeks ago until today
 */
export const getPastTwoWeeksRange = (): DateRange => {
  const today = new Date();
  const startOfDay = new Date(today.setHours(0, 0, 0, 0));
  const twoWeeksAgo = new Date(startOfDay);
  twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
  
  return {
    from: twoWeeksAgo,
    to: new Date(startOfDay)
  };
};

/**
 * Creates a date range for the current month
 * @returns DateRange from the start of the month until today
 */
export const getCurrentMonthRange = (): DateRange => {
  const today = new Date();
  const startOfDay = new Date(today.setHours(0, 0, 0, 0));
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  
  return {
    from: firstDayOfMonth,
    to: new Date(startOfDay)
  };
};

/**
 * Creates a date range for the last month
 * @returns DateRange for the previous month
 */
export const getLastMonthRange = (): DateRange => {
  const today = new Date();
  const firstDayOfLastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
  const lastDayOfLastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
  
  return {
    from: firstDayOfLastMonth,
    to: lastDayOfLastMonth
  };
};

/**
 * Creates a date range for the current year
 * @returns DateRange from the start of the year until today
 */
export const getCurrentYearRange = (): DateRange => {
  const today = new Date();
  const startOfDay = new Date(today.setHours(0, 0, 0, 0));
  const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
  
  return {
    from: firstDayOfYear,
    to: new Date(startOfDay)
  };
};

/**
 * Creates a date range for the last year
 * @returns DateRange for the previous year
 */
export const getLastYearRange = (): DateRange => {
  const today = new Date();
  const firstDayOfLastYear = new Date(today.getFullYear() - 1, 0, 1);
  const lastDayOfLastYear = new Date(today.getFullYear() - 1, 11, 31);
  
  return {
    from: firstDayOfLastYear,
    to: lastDayOfLastYear
  };
};
