export interface LoginCredentials {
  phone_number: string;
  code: string;
}

export interface SubscriptionPlanDetails {
  id: number;
  name: string;
  description: string;
  price_monthly: string;
  price_yearly: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  allows_income_expense_tracking: boolean;
  allows_basic_statistics: boolean;
  allows_debt_savings_tracking: boolean;
  allows_detailed_statistics: boolean;
  allows_reports: boolean;
  unlimited_records: boolean;
  allows_debt_planning: boolean;
  allows_savings_goals: boolean;
  allows_export: boolean;
  allows_voice_interaction: boolean;
  priority_support: boolean;
  allows_multi_user: boolean;
  allows_custom_reports: boolean;
}

export interface User {
  id: number;
  subscription_plan_details: SubscriptionPlanDetails;
  external_id: string;
  platform: string;
  first_name: string;
  username: string;
  phone_number: string;
  default_currency: string;
  subscription_active: boolean;
  subscription_start_date: string;
  subscription_end_date: string;
  is_yearly_billing: boolean;
  created_at: string;
  updated_at: string;
  subscription_plan: number;
}

export interface AuthResponse {
  refresh: string;
  access: string;
  user: User;
  user_action: string;
  message: string;
}

// Interfaz para la respuesta de solicitud de código
export interface RequestCodeResponse {
  message: string;
  success: boolean;
  has_telegram: boolean;
  numero_registrado: boolean;
}
