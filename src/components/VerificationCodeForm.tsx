import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { verifyTelegramCode } from "@/services/authService";
import { AuthResponse } from "@/types/auth";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface VerificationCodeFormProps {
  phoneNumber: string;
  onVerificationSuccess: (response: AuthResponse) => void;
  onCancel: () => void;
}

const VerificationCodeForm = ({
  phoneNumber,
  onVerificationSuccess,
  onCancel,
}: VerificationCodeFormProps) => {
  const [verificationCode, setVerificationCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();

    if (verificationCode.length !== 6) {
      toast.error("Por favor ingresa un código válido de 6 dígitos");
      return;
    }

    setIsSubmitting(true);

    try {
      console.log("Verificando código para el número:", phoneNumber);
      console.log("Código ingresado:", verificationCode);

      const response = await verifyTelegramCode(phoneNumber, verificationCode);

      if (response && response.access) {
        toast.success("¡Verificación exitosa! Redirigiendo al dashboard...");
        onVerificationSuccess(response);
      } else {
        toast.error(
          "Código de verificación inválido. Por favor, inténtalo de nuevo."
        );
      }
    } catch (error) {
      console.error("Error al verificar el código:", error);
      toast.error(
        "Error al verificar el código. Por favor, inténtalo de nuevo."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-medium">Ingresa el código de verificación</h3>
      <p className="text-sm text-muted-foreground">
        Hemos enviado un código de verificación a tu cuenta de Telegram asociada
        al número <span className="font-medium">{phoneNumber}</span>
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
              <InputOTPSlot index={0} className="h-12 w-12" />
              <InputOTPSlot index={1} className="h-12 w-12" />
              <InputOTPSlot index={2} className="h-12 w-12" />
              <InputOTPSlot index={3} className="h-12 w-12" />
              <InputOTPSlot index={4} className="h-12 w-12" />
              <InputOTPSlot index={5} className="h-12 w-12" />
            </InputOTPGroup>
          </InputOTP>
        </div>

        <div className="flex gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="flex-1"
            disabled={isSubmitting}
          >
            Volver
          </Button>
          <Button
            type="submit"
            className="flex-1 bg-[#0088cc] hover:bg-[#0088cc]/90 text-white"
            disabled={isSubmitting || verificationCode.length !== 6}
          >
            {isSubmitting ? "Verificando..." : "Verificar código"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default VerificationCodeForm;
