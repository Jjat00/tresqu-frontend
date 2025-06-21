/**
 * Tipos para las categorías de usuario - Sistema migrado
 * Basado en la nueva API del backend con categorías por usuario
 */

// ===== TIPOS BASE =====

/**
 * Categoría base por usuario
 */
export interface UserCategory {
  id: number;
  name: string;
  description?: string;
  color: string;
  is_default: boolean;
  created_at: string;
  updated_at: string;
}

/**
 * Categoría de gastos por usuario
 */
export interface UserExpenseCategory extends UserCategory {
  examples?: string; // Ejemplos específicos para gastos
}

/**
 * Categoría de ingresos por usuario
 */
export interface UserIncomeCategory extends UserCategory {
  example?: string; // Ejemplo específico para ingresos
}

// ===== ESTADÍSTICAS DE USO =====

/**
 * Estadísticas de uso de una categoría
 */
export interface CategoryUsageStats {
  usage_count: number;
  total_amount: number;
  avg_amount: number;
  last_used: string | null;
  days_since_last_use: number | null;
}

/**
 * Categoría con estadísticas de uso
 */
export interface UserExpenseCategoryWithUsage extends UserExpenseCategory {
  usage_stats?: CategoryUsageStats;
}

export interface UserIncomeCategoryWithUsage extends UserIncomeCategory {
  usage_stats?: CategoryUsageStats;
}

// ===== REQUESTS Y FORMS =====

/**
 * Datos para crear una nueva categoría de gastos
 */
export interface CreateExpenseCategoryRequest {
  name: string;
  description?: string;
  examples?: string;
  color?: string;
}

/**
 * Datos para crear una nueva categoría de ingresos
 */
export interface CreateIncomeCategoryRequest {
  name: string;
  description?: string;
  example?: string;
  color?: string;
}

/**
 * Datos para actualizar una categoría existente
 */
export interface UpdateCategoryRequest {
  name?: string;
  description?: string;
  examples?: string; // Para gastos
  example?: string; // Para ingresos
  color?: string;
}

// ===== OPERACIONES BULK =====

/**
 * Datos para crear múltiples categorías
 */
export interface BulkCreateCategoriesRequest {
  categories: CreateExpenseCategoryRequest[] | CreateIncomeCategoryRequest[];
}

/**
 * Datos para actualizar múltiples categorías
 */
export interface BulkUpdateCategoriesRequest {
  categories: (UpdateCategoryRequest & { id: number })[];
}

/**
 * Datos para eliminar múltiples categorías
 */
export interface BulkDeleteCategoriesRequest {
  ids: number[];
}

// ===== RESPUESTAS DE LA API =====

/**
 * Respuesta de búsqueda de categorías
 */
export interface CategorySearchResult {
  id: number;
  name: string;
  type: "expense" | "income";
  match_score: number;
  color: string;
  usage_count: number;
}

export interface CategorySearchResponse {
  results: CategorySearchResult[];
  total_results: number;
  search_query: string;
  suggestion?: string;
}

/**
 * Respuesta de importación de categorías
 */
export interface CategoryImportResponse {
  status: "success" | "error";
  imported: {
    expense_categories: number;
    income_categories: number;
  };
  skipped: {
    duplicates: number;
    invalid: number;
  };
  errors: string[];
  details: {
    name: string;
    status: "created" | "skipped" | "error";
    id?: number;
    reason?: string;
  }[];
}

/**
 * Respuesta del mapa de colores
 */
export interface CategoryColorsMapResponse {
  [categoryName: string]: string;
}

/**
 * Respuesta del resumen de categorías
 */
export interface CategoriesSummaryResponse {
  categories: UserExpenseCategoryWithUsage[] | UserIncomeCategoryWithUsage[];
  totals: {
    categories: number;
    predefined: number;
    custom: number;
    total_usage: number;
  };
}

/**
 * Respuesta de búsqueda combinada
 */
export interface CombinedSearchRequest {
  query: string;
  type?: "expense" | "income";
  include_usage?: boolean;
}

// ===== VALIDACIONES Y ERRORES =====

/**
 * Errores de validación de categorías
 */
export interface CategoryValidationError {
  name?: string[];
  color?: string[];
  description?: string[];
  examples?: string[];
  example?: string[];
  general?: string;
}

// ===== PARÁMETROS DE CONSULTA =====

/**
 * Parámetros para obtener categorías con estadísticas
 */
export interface CategoriesWithUsageParams {
  days?: number; // Default: 30
}

/**
 * Parámetros para búsqueda de categorías
 */
export interface CategorySearchParams {
  q: string; // Query requerido
}

/**
 * Parámetros para categorías populares/recientes
 */
export interface CategoryListParams {
  limit?: number; // Default: 10
}

/**
 * Parámetros para exportación
 */
export interface CategoryExportParams {
  format: "json" | "csv";
}

// ===== TIPOS HÍBRIDOS PARA COMPATIBILIDAD =====

/**
 * Gasto con categorías duales (nueva y legacy)
 */
export interface ExpenseWithCategories {
  id: number;
  amount: string;
  currency: string;
  description: string;
  spent_at: string;
  timestamp: string;

  // ✅ Campo nuevo (recomendado)
  user_expense_category?: {
    id: number;
    name: string;
    color: string;
    is_default: boolean;
  };

  // 📱 Campo legacy (compatible)
  category?: {
    id: number;
    name: string;
    color: string;
  };

  // 🎯 Campo calculado (prioriza usuario)
  category_name: string;
  category_str: string; // Compatibilidad con código existente
}

/**
 * Ingreso con categorías duales (nueva y legacy)
 */
export interface IncomeWithCategories {
  id: number;
  amount: string;
  currency: string;
  description: string;
  earned_at: string;
  timestamp: string;

  // ✅ Campo nuevo (recomendado)
  user_income_category?: {
    id: number;
    name: string;
    color: string;
    is_default: boolean;
  };

  // 📱 Campo legacy (compatible)
  category?: {
    id: number;
    name: string;
    color: string;
  };

  // 🎯 Campo calculado (prioriza usuario)
  category_name: string;
}

// ===== DATOS MEJORADOS PARA GRÁFICOS =====

/**
 * Información de categoría para gráficos mejorados
 */
export interface CategoryInfo {
  name: string;
  color: string;
  is_default: boolean;
  usage_count: number;
  total_amount: number;
}

/**
 * Respuesta mejorada de gastos por categoría
 */
export interface ExpensesByCategoryResponse {
  categories: string[];
  totals: number[];
  colors: string[];
  descriptions: string[];
  examples: string[];
  categories_info: CategoryInfo[];
}
