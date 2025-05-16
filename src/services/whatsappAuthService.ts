import { AuthResponse, RequestCodeResponse } from "@/types/auth";
import { apiClient } from "./api";
import { env } from "@/config";
import { saveAuthTokens } from "./authService";

const SEND_CODE_PATH = "/whatsapp/send-code/";
const VERIFY_CODE_PATH = "/whatsapp/verify-code/";

/**
 * Función para solicitar código de verificación vía WhatsApp
 */
export const requestWhatsappCode = async (
  phoneNumber: string
): Promise<RequestCodeResponse> => {
  try {
    console.log("Solicitando código WhatsApp para:", phoneNumber);

    // Verificar que el número tenga el formato correcto (con el código de país)
    if (!phoneNumber.startsWith("+")) {
      phoneNumber = "+" + phoneNumber;
    }

    // Quitar el signo + para el envío, ya que el API espera el número sin el +
    const formattedPhoneNumber = phoneNumber.replace("+", "");

    console.log("Número formateado:", formattedPhoneNumber);

    // Obtener nombre de instancia de WhatsApp desde la configuración
    const instanceName = env.instanceName;

    console.log("Endpoint completo:", `${SEND_CODE_PATH}${instanceName}/`);
    console.log("Instancia de WhatsApp:", instanceName);
    console.log("Datos enviados:", { phone_number: formattedPhoneNumber });

    const response = await apiClient.post(`${SEND_CODE_PATH}${instanceName}/`, {
      phone_number: formattedPhoneNumber,
    });

    console.log("Status de la respuesta:", response.status);
    console.log("Respuesta completa:", response.data);

    // Si la respuesta no tiene la estructura esperada, adaptarla
    if (response.data && !response.data.success) {
      // Si tiene message pero no success, asumir que funcionó
      if (response.data.message) {
        console.log("Adaptando respuesta para incluir success=true");
        return {
          ...response.data,
          success: true,
          has_telegram: false,
          numero_registrado: true,
        };
      }
    }

    return response.data;
  } catch (error) {
    console.error("Error al solicitar código de WhatsApp:", error);
    throw error;
  }
};

/**
 * Función para verificar código de WhatsApp
 */
export const verifyWhatsappCode = async (
  phoneNumber: string,
  code: string
): Promise<AuthResponse> => {
  try {
    // Verificar que el número tenga el formato correcto (con el código de país)
    if (!phoneNumber.startsWith("+")) {
      phoneNumber = "+" + phoneNumber;
    }

    // Quitar el signo + para el envío, ya que el API espera el número sin el +
    const formattedPhoneNumber = phoneNumber.replace("+", "");

    console.log("Verificando código WhatsApp para:", formattedPhoneNumber);
    console.log("Endpoint completo:", VERIFY_CODE_PATH);
    console.log("Datos enviados:", {
      phone_number: formattedPhoneNumber,
      code,
    });

    const response = await apiClient.post(VERIFY_CODE_PATH, {
      phone_number: formattedPhoneNumber,
      code,
    });

    console.log("Status de la verificación:", response.status);
    console.log("Respuesta de verificación completa:", response.data);

    // Guardar los datos de autenticación en el store
    const authData = response.data;
    saveAuthTokens({
      access: authData.access,
      refresh: authData.refresh,
      user: authData.user,
    });

    return authData;
  } catch (error) {
    console.error("Error al verificar código de WhatsApp:", error);
    throw error;
  }
};
