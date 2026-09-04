import { IncomeRow } from "@/types/incomes";

// Categoría vigente de un ingreso: la del usuario manda sobre la global legacy.
export const getIncomeCategoryName = (income: IncomeRow): string =>
  income.current_category?.name ||
  income.user_income_category_detail?.name ||
  income.category_str ||
  "";

// Texto que representa al ingreso en la tabla y en el Excel.
export const getIncomeDescription = (income: IncomeRow): string =>
  income.note || income.description || "Sin descripción";

export const getIncomeCategoryColor = (income: IncomeRow): string | undefined =>
  income.current_category?.color ||
  income.user_income_category_detail?.color ||
  undefined;

// ¿La categoría es personalizada por el usuario (no una predefinida)?
export const isCustomIncomeCategory = (income: IncomeRow): boolean => {
  const category = income.current_category || income.user_income_category_detail;
  return category ? category.is_default === false : false;
};
