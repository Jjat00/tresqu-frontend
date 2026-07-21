import type { Dict } from "../types";

/**
 * Copy del acceso web (WaitlistForm + VerificationCodeForm).
 * Los mensajes libres del backend (response.message) quedan fuera de
 * alcance: se muestran tal cual llegan.
 */
export interface AuthCopy {
  signupWhatsappText: string;
  accessLabel: string;
  /** "{pre} {holo}." — estilos en el componente */
  title: { pre: string; holo: string };
  intro: string;
  cardTitle: string;
  cardSubtitle: string;
  notFoundPre: string;
  notFoundHelp: string;
  notFoundCta: string;
  notFoundOther: string;
  whatsappNumberLabel: string;
  phoneNumberLabel: string;
  codePlaceholder: string;
  numberPlaceholder: string;
  numberHelp: string;
  submitIdle: string;
  submitBusy: string;
  termsNote: string;
  firstTime: string;
  createIntroStrong: string;
  createIntroRest: string;
  createWhatsApp: string;
  createTelegram: string;
  errInvalidPhone: string;
  errRequestCode: string;
  errRequestCodeRetry: string;
  codeSentWhatsapp: string;
  verifyTitle: string;
  verifySentPre: string;
  verifySentMid: string;
  verifyTimeoutPre: string;
  verifyTimeoutPost: string;
  errInvalidCode6: string;
  verifySuccess: string;
  errWrongCode: string;
  errVerify: string;
  verifyBack: string;
  verifySubmitIdle: string;
  verifySubmitBusy: string;
}

export const authCopy: Dict<AuthCopy> = {
  es: {
    signupWhatsappText:
      "Hola Tresqu quiero crear mi cuenta y tener control de mis finanzas e inversiones",
    accessLabel: "Acceso",
    title: { pre: "INICIA", holo: "SESIÓN" },
    intro:
      "Entra con el número con el que usas Tresqu. ¿Aún no tienes cuenta? Créala en un minuto por WhatsApp o Telegram.",
    cardTitle: "Inicia sesión con tu número",
    cardSubtitle: "Te enviamos un código de verificación a tu chat.",
    notFoundPre: "No encontramos una cuenta asociada a ",
    notFoundHelp:
      "Para crear tu cuenta, escríbenos por WhatsApp y empezamos de inmediato.",
    notFoundCta: "Crear cuenta por WhatsApp",
    notFoundOther: "Usar otro número",
    whatsappNumberLabel: "Número de WhatsApp",
    phoneNumberLabel: "Número de teléfono",
    codePlaceholder: "Código",
    numberPlaceholder: "Número sin código",
    numberHelp: "Ingresa tu número sin el código de país",
    submitIdle: "Ver mi dashboard",
    submitBusy: "Procesando...",
    termsNote: "Al continuar, aceptas nuestros términos de servicio",
    firstTime: "¿Primera vez?",
    createIntroStrong: "¿Aún no tienes cuenta?",
    createIntroRest:
      " Créala hablando con Tresqu por WhatsApp o Telegram y luego vuelve aquí a iniciar sesión.",
    createWhatsApp: "Crear por WhatsApp",
    createTelegram: "Crear por Telegram",
    errInvalidPhone: "Por favor ingresa un número de teléfono válido",
    errRequestCode: "Error al solicitar el código de verificación",
    errRequestCodeRetry:
      "Error al solicitar el código de verificación. Por favor, inténtalo de nuevo.",
    codeSentWhatsapp: "Código enviado a tu WhatsApp",
    verifyTitle: "Ingresa el código de verificación",
    verifySentPre: "Hemos enviado un código de verificación a tu cuenta de ",
    verifySentMid: " asociada al número ",
    verifyTimeoutPre: "¿No has recibido el código? Verifica que el número ",
    verifyTimeoutPost:
      " sea correcto o intenta solicitar un nuevo código.",
    errInvalidCode6: "Por favor ingresa un código válido de 6 dígitos",
    verifySuccess: "¡Verificación exitosa! Redirigiendo al dashboard...",
    errWrongCode:
      "Código de verificación inválido. Por favor, inténtalo de nuevo.",
    errVerify: "Error al verificar el código. Por favor, inténtalo de nuevo.",
    verifyBack: "Volver",
    verifySubmitIdle: "Verificar código",
    verifySubmitBusy: "Verificando...",
  },
  en: {
    signupWhatsappText:
      "Hi Tresqu, I want to create my account and take control of my finances and investments",
    accessLabel: "Access",
    title: { pre: "SIGN", holo: "IN" },
    intro:
      "Sign in with the number you use Tresqu with. Don't have an account yet? Create one in a minute via WhatsApp or Telegram.",
    cardTitle: "Sign in with your number",
    cardSubtitle: "We'll send a verification code to your chat.",
    notFoundPre: "We couldn't find an account linked to ",
    notFoundHelp:
      "To create your account, message us on WhatsApp and we'll get started right away.",
    notFoundCta: "Create account via WhatsApp",
    notFoundOther: "Use another number",
    whatsappNumberLabel: "WhatsApp number",
    phoneNumberLabel: "Phone number",
    codePlaceholder: "Code",
    numberPlaceholder: "Number without code",
    numberHelp: "Enter your number without the country code",
    submitIdle: "See my dashboard",
    submitBusy: "Processing...",
    termsNote: "By continuing, you accept our terms of service",
    firstTime: "First time?",
    createIntroStrong: "Don't have an account yet?",
    createIntroRest:
      " Create it by talking to Tresqu on WhatsApp or Telegram, then come back here to sign in.",
    createWhatsApp: "Create via WhatsApp",
    createTelegram: "Create via Telegram",
    errInvalidPhone: "Please enter a valid phone number",
    errRequestCode: "There was a problem requesting the verification code",
    errRequestCodeRetry:
      "There was a problem requesting the verification code. Please try again.",
    codeSentWhatsapp: "Code sent to your WhatsApp",
    verifyTitle: "Enter the verification code",
    verifySentPre: "We sent a verification code to your ",
    verifySentMid: " account linked to the number ",
    verifyTimeoutPre: "Haven't received the code? Check that the number ",
    verifyTimeoutPost: " is correct or try requesting a new one.",
    errInvalidCode6: "Please enter a valid 6-digit code",
    verifySuccess: "Verified! Redirecting to your dashboard...",
    errWrongCode: "Invalid verification code. Please try again.",
    errVerify: "There was a problem verifying the code. Please try again.",
    verifyBack: "Back",
    verifySubmitIdle: "Verify code",
    verifySubmitBusy: "Verifying...",
  },
};
