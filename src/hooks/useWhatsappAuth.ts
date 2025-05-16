import { useState } from "react";
import {
  requestWhatsappCode,
  verifyWhatsappCode,
} from "@/services/whatsappAuthService";
import { AuthResponse, RequestCodeResponse } from "@/types/auth";
import { useAuthStore } from "@/store/authStore";
import { AxiosError } from "axios";

export const useWhatsappAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isCodeSent, setIsCodeSent] = useState(false);

  // Acceso al estado de autenticación
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated());
  const user = useAuthStore((state) => state.user);

  // Solicitar código de verificación
  const sendVerificationCode = async (
    phoneNumber: string
  ): Promise<RequestCodeResponse | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await requestWhatsappCode(phoneNumber);
      console.log("Respuesta del hook WhatsApp:", response);

      // Siempre establecer que el código fue enviado si llegamos a este punto
      setIsCodeSent(true);
      return response;
    } catch (err: unknown) {
      console.error("Error completo:", err);

      const axiosError = err as AxiosError<{
        detail?: string;
        message?: string;
      }>;

      // Si hay respuesta pero con error (posiblemente el código se envió igual)
      if (axiosError.response) {
        console.log("Respuesta de error:", axiosError.response);

        // Si es un mensaje/error no crítico o si el servidor responde con éxito
        // pero la respuesta tiene un formato diferente al esperado
        if (
          axiosError.response.status >= 200 &&
          axiosError.response.status < 300
        ) {
          console.log(
            "El código probablemente fue enviado pero con formato de respuesta diferente"
          );

          setIsCodeSent(true);
          // Crear una respuesta simulada para continuar el flujo
          return {
            message: "Código enviado a tu WhatsApp",
            success: true,
            has_telegram: false,
            numero_registrado: true,
          };
        }
      }

      const errorMsg =
        axiosError.response?.data?.detail ||
        axiosError.response?.data?.message ||
        "Error al enviar el código de verificación";
      setError(errorMsg);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Verificar código
  const verifyCode = async (
    phoneNumber: string,
    code: string
  ): Promise<AuthResponse | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await verifyWhatsappCode(phoneNumber, code);
      setIsCodeSent(false);
      return response;
    } catch (err: unknown) {
      const axiosError = err as AxiosError<{
        detail?: string;
        message?: string;
      }>;
      const errorMsg =
        axiosError.response?.data?.detail ||
        axiosError.response?.data?.message ||
        "Código incorrecto o expirado";
      setError(errorMsg);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Resetear el estado
  const resetState = () => {
    setIsCodeSent(false);
    setError(null);
  };

  return {
    isLoading,
    error,
    isCodeSent,
    isAuthenticated,
    user,
    sendVerificationCode,
    verifyCode,
    resetState,
  };
};
