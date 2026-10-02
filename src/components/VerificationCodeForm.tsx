import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { verifyTelegramCode } from "@/services/authService";
import { verifyWhatsappCode } from "@/services/whatsappAuthService";
import { AuthResponse } from "@/types/auth";
import { toast } from "sonner";
import { useCopy } from "@/i18n";
import { authCopy } from "@/i18n/copy/auth";

interface VerificationCodeFormProps {
  phoneNumber: string;
  onVerificationSuccess: (response: AuthResponse) => void;
  onCancel: () => void;
  authMethod: "telegram" | "whatsapp";
}

const VerificationCodeForm = ({
  phoneNumber,
  onVerificationSuccess,
  onCancel,
  authMethod,
}: VerificationCodeFormProps) => {
  const copy = useCopy(authCopy);
  const [verificationCode, setVerificationCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const timeoutMessageRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (timeoutMessageRef.current) {
        timeoutMessageRef.current.classList.remove("hidden");
      }
    }, 10000);

    return () => clearTimeout(timeoutId);
  }, []);

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();

    if (verificationCode.length !== 6) {
      toast.error(copy.errInvalidCode6);
      return;
    }

    setIsSubmitting(true);

    try {
      const formattedPhoneNumber = phoneNumber.startsWith("+")
        ? phoneNumber
        : `+${phoneNumber}`;

      console.log(
        `Verificando código para el número (${authMethod}):`,
        formattedPhoneNumber
      );
      console.log("Código ingresado:", verificationCode);

      // Verificar según el método de autenticación seleccionado
      let response: AuthResponse;

      if (authMethod === "telegram") {
        response = await verifyTelegramCode(
          formattedPhoneNumber,
          verificationCode
        );
      } else {
        response = await verifyWhatsappCode(
          formattedPhoneNumber,
          verificationCode
        );
      }

      if (response && response.access) {
        toast.success(copy.verifySuccess);
        onVerificationSuccess(response);
      } else {
        toast.error(copy.errWrongCode);
      }
    } catch (error) {
      console.error("Error al verificar el código:", error);
      toast.error(copy.errVerify);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Determinar el servicio de mensajería
  const messagingService = authMethod === "telegram" ? "Telegram" : "WhatsApp";

  // Determinar la clase de color para el botón según el servicio
  const buttonColorClass =
    authMethod === "telegram"
      ? "tq-btn-tg"
      : "tq-btn-wa";

  return (
    <div className="space-y-4">
      <h3>
        {copy.verifyTitle}
      </h3>
      <p className="text-sm text-[#8a90a6]">
        {copy.verifySentPre}
        {messagingService}
        {copy.verifySentMid}
        <span className="font-medium text-white">{phoneNumber}</span>
      </p>

      <p
        ref={timeoutMessageRef}
        className="text-sm text-amber-500 font-medium hidden animate-fade-in"
      >
        {copy.verifyTimeoutPre}
        {phoneNumber}
        {copy.verifyTimeoutPost}
      </p>

      <form onSubmit={handleVerifyCode} className="space-y-6">
        <div className="flex justify-center py-4">
          <InputOTP
            maxLength={6}
            value={verificationCode}
            onChange={setVerificationCode}
            className="gap-2"
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} className="tq-otp-slot h-12 w-12" />
              <InputOTPSlot index={1} className="tq-otp-slot h-12 w-12" />
              <InputOTPSlot index={2} className="tq-otp-slot h-12 w-12" />
              <InputOTPSlot index={3} className="tq-otp-slot h-12 w-12" />
              <InputOTPSlot index={4} className="tq-otp-slot h-12 w-12" />
              <InputOTPSlot index={5} className="tq-otp-slot h-12 w-12" />
            </InputOTPGroup>
          </InputOTP>
        </div>

        <div className="flex gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="tq-btn tq-btn-sm tq-btn-outline flex-1"
            disabled={isSubmitting}
          >
            {copy.verifyBack}
          </Button>
          <Button
            type="submit"
            className={`tq-btn tq-btn-sm flex-1 ${buttonColorClass}`}
            disabled={isSubmitting || verificationCode.length !== 6}
          >
            {isSubmitting ? copy.verifySubmitBusy : copy.verifySubmitIdle}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default VerificationCodeForm;
