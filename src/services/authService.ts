// Interfaz para la respuesta de solicitud de código
interface RequestCodeResponse {
  message: string;
  success: boolean;
  has_telegram: boolean;
  numero_registrado: boolean;
}

// Interfaz para la respuesta de verificación de código
export interface VerifyCodeResponse {
  refresh: string;
  access: string;
  user: User;
  user_action: string;
  message: string;
}

// Interfaz para la información del usuario
export interface User {
  id: number;
  subscription_plan_details: SubscriptionPlanDetails;
  external_id: string;
  platform: string;
  first_name: string;
  username: string;
  phone_number: string;
  default_currency: string;
  embedding: null;
  subscription_active: boolean;
  subscription_start_date: string;
  subscription_end_date: string;
  is_yearly_billing: boolean;
  created_at: string;
  updated_at: string;
  subscription_plan: number;
}

// Interfaz para los detalles del plan de suscripción
interface SubscriptionPlanDetails {
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

import { env } from "@/config";
// URLs de la API
const API_BASE_URL = env.apiUrl;
const REQUEST_CODE_URL = `${API_BASE_URL}/auth/telegram/request-code/`;
const VERIFY_CODE_URL = `${API_BASE_URL}/auth/telegram/verify-code/`;

// Función para solicitar código de verificación
export const requestTelegramCode = async (
  phoneNumber: string
): Promise<RequestCodeResponse> => {
  try {
    console.log("Solicitando código para:", phoneNumber);

    // Verificar que el número tenga el formato correcto (con el código de país)
    if (!phoneNumber.startsWith("+")) {
      phoneNumber = "+" + phoneNumber;
    }

    // Quitar el signo + para el envío, ya que el API espera el número sin el +
    const formattedPhoneNumber = phoneNumber.replace("+", "");

    console.log("Número formateado:", formattedPhoneNumber);

    const response = await fetch(REQUEST_CODE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phone_number: formattedPhoneNumber }),
    });

    console.log("Status de la respuesta:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error de API:", errorText);
      throw new Error(
        `Error ${response.status}: ${errorText || response.statusText}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Error al solicitar código de Telegram:", error);
    throw error;
  }
};

// Función para verificar código
export const verifyTelegramCode = async (
  phoneNumber: string,
  code: string
): Promise<VerifyCodeResponse> => {
  try {
    // Verificar que el número tenga el formato correcto (con el código de país)
    if (!phoneNumber.startsWith("+")) {
      phoneNumber = "+" + phoneNumber;
    }

    // Quitar el signo + para el envío, ya que el API espera el número sin el +
    const formattedPhoneNumber = phoneNumber.replace("+", "");

    console.log("Verificando código para:", formattedPhoneNumber);

    const response = await fetch(VERIFY_CODE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phone_number: formattedPhoneNumber, code }),
    });

    console.log("Status de la verificación:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error al verificar código:", errorText);
      throw new Error(
        `Error ${response.status}: ${errorText || response.statusText}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Error al verificar código de Telegram:", error);
    throw error;
  }
};

// Funciones para manejar el token en localStorage
export const saveAuthTokens = (tokens: {
  access: string;
  refresh: string;
  user: User;
}) => {
  localStorage.setItem("access_token", tokens.access);
  localStorage.setItem("refresh_token", tokens.refresh);
  localStorage.setItem("user", JSON.stringify(tokens.user));
};

export const getAccessToken = (): string | null => {
  return localStorage.getItem("access_token");
};

export const getUser = (): User | null => {
  const userJson = localStorage.getItem("user");
  return userJson ? JSON.parse(userJson) : null;
};

export const isAuthenticated = (): boolean => {
  return !!getAccessToken();
};

export const logout = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("user");
};
