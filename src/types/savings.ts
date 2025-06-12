// Tipos base para el módulo de ahorros
export interface SavingsCategory {
  id: string;
  user?: string;
  name: string;
  description: string;
  color: string; // Formato hexadecimal #RRGGBB
  icon: string; // Nombre del ícono
  is_default: boolean;
  created_at: string;
  updated_at: string;
}

export interface SavingsGoal {
  id: string;
  user?: string;
  category: SavingsCategory | string;
  name: string;
  description: string;
  target_amount: string;
  current_amount: string;
  currency: string;
  target_date: string;
  status: SavingsGoalStatus;
  priority: SavingsGoalPriority;
  auto_save_enabled: boolean;
  auto_save_amount: string;
  auto_save_frequency: AutoSaveFrequency;
  progress_percentage: string;
  remaining_amount: string;
  daily_savings_needed: string;
  created_at: string;
  updated_at: string;
}

export interface SavingsDeposit {
  id: string;
  savings_goal: SavingsGoal | string;
  amount: string;
  currency: string;
  transaction_type: TransactionType;
  description: string;
  date: string;
  is_automatic: boolean;
  created_at: string;
  updated_at: string;
}

export interface SavingsTemplate {
  id: string;
  name: string;
  description: string;
  category: SavingsCategory | string;
  suggested_amount: string;
  suggested_timeframe_months: number;
  priority: SavingsGoalPriority;
  financial_advice: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// Enums y tipos de estado
export type SavingsGoalStatus = "active" | "completed" | "paused" | "cancelled";

export type SavingsGoalPriority = "urgent" | "high" | "medium" | "low";

export type AutoSaveFrequency = "daily" | "weekly" | "monthly";

export type TransactionType =
  | "deposit"
  | "withdrawal"
  | "adjustment"
  | "interest";

// Tipos para análisis y estadísticas
export interface SavingsAnalytics {
  total_goals: number;
  active_goals: number;
  completed_goals: number;
  total_saved: string;
  total_target: string;
  overall_progress: string;
  goals_by_priority: {
    urgent: number;
    high: number;
    medium: number;
    low: number;
  };
  goals_by_status: {
    active: number;
    completed: number;
    paused: number;
    cancelled: number;
  };
  monthly_deposits: string;
  goals_completion_prediction: {
    this_month: number;
    next_3_months: number;
    next_6_months: number;
    next_12_months: number;
  };
}

export interface CategoryDistribution {
  categories: string[];
  goal_counts: number[];
  total_amounts: string[];
  colors: string[];
}

export interface ProgressOverTime {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
  }[];
}

export interface CompletionForecast {
  forecast: {
    goal_id: string;
    goal_name: string;
    estimated_completion: string;
    days_remaining: number;
    confidence: "high" | "medium" | "low";
  }[];
}

export interface SavingsRecommendation {
  type: string;
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  potential_benefit: string;
}

export interface SavingsRecommendations {
  recommendations: SavingsRecommendation[];
}

// Tipos para formularios y creación
export interface CreateSavingsCategoryRequest {
  name: string;
  description: string;
  color: string;
  icon: string;
}

export interface CreateSavingsGoalRequest {
  category: string;
  name: string;
  description: string;
  target_amount: string;
  target_date: string;
  priority: SavingsGoalPriority;
  auto_save_enabled?: boolean;
  auto_save_amount?: string;
  auto_save_frequency?: AutoSaveFrequency;
}

export interface CreateSavingsDepositRequest {
  savings_goal: string;
  amount: string;
  transaction_type: TransactionType;
  description: string;
  date: string;
}

export interface CreateGoalFromTemplateRequest {
  name?: string;
  target_amount?: string;
  target_date?: string;
  auto_save_enabled?: boolean;
  auto_save_amount?: string;
  auto_save_frequency?: AutoSaveFrequency;
}

// Tipos para filtros y consultas
export interface SavingsGoalFilters {
  status?: SavingsGoalStatus;
  category?: string;
  priority?: SavingsGoalPriority;
}

export interface SavingsDepositFilters {
  savings_goal?: string;
  transaction_type?: TransactionType;
  start_date?: string;
  end_date?: string;
}

// Tipos para parámetros de consulta
export interface ProgressOverTimeParams {
  period?: "week" | "month" | "quarter" | "year";
}

// Categorías predefinidas constantes
export const DEFAULT_CATEGORIES = [
  { name: "Emergencia", icon: "emergency", color: "#FF5722" },
  { name: "Vacaciones", icon: "vacation", color: "#00BCD4" },
  { name: "Casa", icon: "home", color: "#4CAF50" },
  { name: "Vehículo", icon: "car", color: "#9C27B0" },
  { name: "Educación", icon: "education", color: "#3F51B5" },
  { name: "Boda", icon: "wedding", color: "#E91E63" },
  { name: "Tecnología", icon: "tech", color: "#607D8B" },
  { name: "Meta Personal", icon: "personal", color: "#FF9800" },
  { name: "Futuro", icon: "future", color: "#673AB7" },
  { name: "Inversión", icon: "investment", color: "#795548" },
] as const;

// Utilidades de tipos
export type SavingsGoalWithCategory = Omit<SavingsGoal, "category"> & {
  category: SavingsCategory;
};

export type SavingsDepositWithGoal = Omit<SavingsDeposit, "savings_goal"> & {
  savings_goal: SavingsGoal;
};

export type SavingsTemplateWithCategory = Omit<SavingsTemplate, "category"> & {
  category: SavingsCategory;
};
