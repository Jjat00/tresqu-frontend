import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { MessageSquare } from "lucide-react";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import VerificationCodeForm from "./VerificationCodeForm";
import { requestTelegramCode, saveAuthTokens, isAuthenticated, VerifyCodeResponse } from "@/services/authService";

// Array of common country codes with flag emojis
const countryCodes = [{
  code: "+1",
  country: "🇺🇸"
},
// Estados Unidos/Canadá
{
  code: "+52",
  country: "🇲🇽"
},
// México
{
  code: "+54",
  country: "🇦🇷"
},
// Argentina
{
  code: "+55",
  country: "🇧🇷"
},
// Brasil
{
  code: "+56",
  country: "🇨🇱"
},
// Chile
{
  code: "+57",
  country: "🇨🇴"
},
// Colombia
{
  code: "+58",
  country: "🇻🇪"
},
// Venezuela
{
  code: "+34",
  country: "🇪🇸"
},
// España
{
  code: "+502",
  country: "🇬🇹"
},
// Guatemala
{
  code: "+503",
  country: "🇸🇻"
},
// El Salvador
{
  code: "+504",
  country: "🇭🇳"
},
// Honduras
{
  code: "+505",
  country: "🇳🇮"
},
// Nicaragua
{
  code: "+506",
  country: "🇨🇷"
},
// Costa Rica
{
  code: "+507",
  country: "🇵🇦"
},
// Panamá
{
  code: "+51",
  country: "🇵🇪"
},
// Perú
{
  code: "+591",
  country: "🇧🇴"
},
// Bolivia
{
  code: "+593",
  country: "🇪🇨"
},
// Ecuador
{
  code: "+595",
  country: "🇵🇾"
},
// Paraguay
{
  code: "+598",
  country: "🇺🇾"
},
// Uruguay
{
  code: "+1787",
  country: "🇵🇷"
},
// Puerto Rico
{
  code: "+53",
  country: "🇨🇺"
},
// Cuba
{
  code: "+809",
  country: "🇩🇴"
} // República Dominicana
];
const WaitlistForm = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("telegram");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [telegramPhone, setTelegramPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+57"); // Default to Colombia
  const [telegramCountryCode, setTelegramCountryCode] = useState("+57"); // Default to Colombia
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [verificationStep, setVerificationStep] = useState(false);
  const [fullPhoneNumber, setFullPhoneNumber] = useState("");
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Verificar que el número de teléfono no esté vacío
    if (!telegramPhone) {
      toast.error("Por favor ingresa un número de teléfono válido");
      setIsSubmitting(false);
      return;
    }
    try {
      // Formatear el número de teléfono con el código de país
      const formattedPhoneNumber = `${telegramCountryCode}${telegramPhone}`;
      setFullPhoneNumber(formattedPhoneNumber);
      console.log("Enviando solicitud para:", formattedPhoneNumber);

      // Solicitar código de verificación
      const response = await requestTelegramCode(formattedPhoneNumber);
      if (response.success) {
        toast.success(response.message);
        setVerificationStep(true);
      } else {
        toast.error("Error al solicitar el código de verificación");
      }
    } catch (error) {
      console.error("Error al solicitar código:", error);
      toast.error("Error al solicitar el código de verificación. Por favor, inténtalo de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleVerificationSuccess = (response: VerifyCodeResponse) => {
    // Guardar tokens en localStorage
    saveAuthTokens(response);

    // Redirigir al dashboard
    navigate("/dashboard");
  };
  const handleCancelVerification = () => {
    setVerificationStep(false);
    setIsSubmitting(false);
  };
  return <section id="login" className="section-padding bg-card rounded-none mx-0 my-[30px] px-0 py-[36px]">
      
    </section>;
};
export default WaitlistForm;