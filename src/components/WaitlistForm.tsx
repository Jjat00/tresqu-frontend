import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { MessageSquare } from "lucide-react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import VerificationCodeForm from "./VerificationCodeForm";
import { requestTelegramCode, saveAuthTokens } from "@/services/authService";
import { AuthResponse } from "@/types/auth";
import { useWhatsappAuth } from "@/hooks/useWhatsappAuth";

// Array of common country codes with flag emojis
const countryCodes = [
  {
    code: "+1",
    country: "🇺🇸",
  },
  // Estados Unidos/Canadá
  {
    code: "+52",
    country: "🇲🇽",
  },
  // México
  {
    code: "+54",
    country: "🇦🇷",
  },
  // Argentina
  {
    code: "+55",
    country: "🇧🇷",
  },
  // Brasil
  {
    code: "+56",
    country: "🇨🇱",
  },
  // Chile
  {
    code: "+57",
    country: "🇨🇴",
  },
  // Colombia
  {
    code: "+58",
    country: "🇻🇪",
  },
  // Venezuela
  {
    code: "+34",
    country: "🇪🇸",
  },
  // España
  {
    code: "+502",
    country: "🇬🇹",
  },
  // Guatemala
  {
    code: "+503",
    country: "🇸🇻",
  },
  // El Salvador
  {
    code: "+504",
    country: "🇭🇳",
  },
  // Honduras
  {
    code: "+505",
    country: "🇳🇮",
  },
  // Nicaragua
  {
    code: "+506",
    country: "🇨🇷",
  },
  // Costa Rica
  {
    code: "+507",
    country: "🇵🇦",
  },
  // Panamá
  {
    code: "+51",
    country: "🇵🇪",
  },
  // Perú
  {
    code: "+591",
    country: "🇧🇴",
  },
  // Bolivia
  {
    code: "+593",
    country: "🇪🇨",
  },
  // Ecuador
  {
    code: "+595",
    country: "🇵🇾",
  },
  // Paraguay
  {
    code: "+598",
    country: "🇺🇾",
  },
  // Uruguay
  {
    code: "+1787",
    country: "🇵🇷",
  },
  // Puerto Rico
  {
    code: "+53",
    country: "🇨🇺",
  },
  // Cuba
  {
    code: "+809",
    country: "🇩🇴",
  }, // República Dominicana
];
const WaitlistForm = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("whatsapp");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [telegramPhone, setTelegramPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+57"); // Default to Colombia
  const [telegramCountryCode, setTelegramCountryCode] = useState("+57"); // Default to Colombia
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [verificationStep, setVerificationStep] = useState(false);
  const [fullPhoneNumber, setFullPhoneNumber] = useState("");
  const [authMethod, setAuthMethod] = useState<"telegram" | "whatsapp">(
    "telegram"
  );

  // Hook para la autenticación con WhatsApp
  const {
    sendVerificationCode: sendWhatsappCode,
    isLoading: isWhatsappLoading,
  } = useWhatsappAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (activeTab === "telegram") {
      // Verificar que el número de teléfono no esté vacío
      if (!telegramPhone) {
        toast.error("Por favor ingresa un número de teléfono válido");
        setIsSubmitting(false);
        return;
      }
      try {
        // Formatear el número de teléfono con el código de país
        const formattedPhoneNumber = telegramCountryCode.startsWith("+")
          ? `${telegramCountryCode}${telegramPhone}`
          : `+${telegramCountryCode}${telegramPhone}`;
        setFullPhoneNumber(formattedPhoneNumber);
        setAuthMethod("telegram");
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
        toast.error(
          "Error al solicitar el código de verificación. Por favor, inténtalo de nuevo."
        );
      } finally {
        setIsSubmitting(false);
      }
    } else if (activeTab === "whatsapp") {
      // Verificar que el número de teléfono no esté vacío
      if (!phoneNumber) {
        toast.error("Por favor ingresa un número de teléfono válido");
        setIsSubmitting(false);
        return;
      }
      try {
        // Formatear el número de teléfono con el código de país
        const formattedPhoneNumber = countryCode.startsWith("+")
          ? `${countryCode}${phoneNumber}`
          : `+${countryCode}${phoneNumber}`;
        setFullPhoneNumber(formattedPhoneNumber);
        setAuthMethod("whatsapp");
        console.log("Enviando solicitud WhatsApp para:", formattedPhoneNumber);

        // Solicitar código de verificación por WhatsApp
        const response = await sendWhatsappCode(formattedPhoneNumber);

        console.log("Respuesta WhatsApp:", response);

        // Si tenemos una respuesta (incluso si no tiene success=true) y el código fue enviado
        // avanzamos al paso de verificación
        if (response) {
          // Mostrar el mensaje de la respuesta si existe
          if (response.message) {
            toast.success(response.message);
          } else {
            toast.success("Código enviado a tu WhatsApp");
          }

          // Avanzar al paso de verificación
          setVerificationStep(true);
        } else {
          toast.error("Error al solicitar el código de verificación");
        }
      } catch (error) {
        console.error("Error al solicitar código WhatsApp:", error);
        toast.error(
          "Error al solicitar el código de verificación. Por favor, inténtalo de nuevo."
        );
      } finally {
        setIsSubmitting(false);
      }
    }
  };
  const handleVerificationSuccess = (response: AuthResponse) => {
    // Guardar tokens en localStorage
    saveAuthTokens({
      access: response.access,
      refresh: response.refresh,
      user: response.user,
    });

    // Redirigir al dashboard
    navigate("/dashboard");
  };
  const handleCancelVerification = () => {
    setVerificationStep(false);
    setIsSubmitting(false);
  };
  return (
    <section className="py-4 sm:py-6 md:py-10 relative overflow-hidden min-h-screen flex items-center justify-center px-2 sm:px-4">
      {/* Fondo con gradientes */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/30 to-background/90 backdrop-blur-sm z-[-1]"></div>

      {/* Overlay para mejorar contraste */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 to-background/80 pointer-events-none z-[1]"></div>

      {/* Efectos de fondo */}
      <div
        className="absolute top-0 -left-20 w-32 sm:w-64 h-32 sm:h-64 rounded-full blur-3xl opacity-10 animate-pulse-glow"
        style={{
          background:
            "radial-gradient(circle at center, var(--color-success), transparent 70%)",
        }}
      ></div>
      <div
        className="absolute bottom-0 -right-20 w-32 sm:w-64 h-32 sm:h-64 rounded-full blur-3xl opacity-10 animate-pulse-glow"
        style={{
          background:
            "radial-gradient(circle at center, var(--color-highlight), transparent 70%)",
          animationDelay: "1.5s",
        }}
      ></div>

      <div className="container mx-auto max-w-6xl relative z-10 py-20 sm:py-6 md:py-10">
        <div className="text-center mb-3 sm:mb-4 md:mb-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2 md:mb-4 high-contrast-text">
            Inicia sesión
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-foreground max-w-2xl mx-auto text-shadow-sm px-2">
            Conecta tu número de WhatsApp o Telegram para comenzar a usar
            Tresqu.
          </p>
        </div>

        {/* Información sobre registro con Telegram */}
        <div className="max-w-xs sm:max-w-sm md:max-w-md mx-auto mb-4 sm:mb-6">
          <Card className="glass-card backdrop-blur-sm shadow-lg border-0 animate-fade-up">
            <CardContent className="pt-3 sm:pt-4 pb-4 sm:pb-6 px-3 sm:px-4 md:px-6">
              <div className="text-center mb-3 sm:mb-4">
                <h3 className="text-base sm:text-lg font-bold gradient-text">
                  ¿Aún no tienes una cuenta?
                </h3>
                <p className="mt-1 sm:mt-2 mb-3 sm:mb-4 text-sm sm:text-base">
                  Para utilizar Tresqu, primero necesitas registrarte mediante
                  nuestro bot de Telegram o WhatsApp.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    className="text-sm sm:text-base px-2 sm:px-4 py-2 sm:py-4 text-white font-medium group relative overflow-hidden hover:cursor-pointer rounded-lg"
                    style={{
                      background: "linear-gradient(135deg, #25D366, #128C7E)",
                      borderColor: "#25D366",
                      position: "relative",
                    }}
                    onClick={() => {
                      window.open(
                        "https://wa.me/573116331308?text=Hola%20Tresqu",
                        "_blank"
                      );
                    }}
                  >
                    <div className="relative z-10 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2"
                      >
                        <path d="M14.05 4C18.37 4.07 21.93 7.63 22 11.95"></path>
                        <path d="M14.05 8C16.15 8.07 17.93 9.85 18 11.95"></path>
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                      </svg>
                      <span>Inicia con WhatsApp</span>
                    </div>
                    <span className="absolute inset-0 bg-black/10 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                  </Button>

                  <Button
                    variant="outline"
                    className="text-sm sm:text-base px-2 sm:px-4 py-2 sm:py-4 text-white font-medium group relative overflow-hidden hover:cursor-pointer rounded-lg"
                    style={{
                      background: "linear-gradient(135deg, #0088cc, #00a2ff)",
                      borderColor: "#0088cc",
                      position: "relative",
                    }}
                    onClick={() => {
                      window.open("https://t.me/tresqu_bot", "_blank");
                    }}
                  >
                    <div className="relative z-10 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2"
                      >
                        <path d="m22 2-7 20-4-9-9-4Z" />
                        <path d="M22 2 11 13" />
                      </svg>
                      <span>Inicia con Telegram</span>
                    </div>
                    <span className="absolute inset-0 bg-black/10 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                  </Button>
                </div>

                <p className="text-xs mt-2 sm:mt-3 text-foreground/80">
                  Una vez registrado, podrás iniciar sesión aquí para acceder a
                  tu dashboard.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="max-w-xs sm:max-w-sm md:max-w-md mx-auto">
          <Card className="glass-card backdrop-blur-sm shadow-lg border-0 animate-fade-up">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base sm:text-lg font-bold gradient-text text-center">
                ¿Ya tienes una cuenta? Pulsa en 'Ver mi dashboard' para acceder.
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-3 sm:pt-4 pb-4 sm:pb-6 px-3 sm:px-4 md:px-6">
              {verificationStep ? (
                <VerificationCodeForm
                  phoneNumber={fullPhoneNumber}
                  onVerificationSuccess={handleVerificationSuccess}
                  onCancel={handleCancelVerification}
                  authMethod={authMethod}
                />
              ) : (
                <Tabs
                  value={activeTab}
                  onValueChange={setActiveTab}
                  className="w-full"
                >
                  <TabsList className="grid grid-cols-2 mb-4 sm:mb-6 bg-background/50 backdrop-blur-sm">
                    <TabsTrigger
                      value="whatsapp"
                      className="flex gap-1 sm:gap-2 items-center data-[state=active]:bg-success/20 data-[state=active]:text-foreground font-medium text-xs sm:text-sm py-1.5"
                    >
                      <MessageSquare className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span>WhatsApp</span>
                    </TabsTrigger>
                    <TabsTrigger
                      value="telegram"
                      className="flex gap-1 sm:gap-2 items-center data-[state=active]:bg-[#0088cc]/20 data-[state=active]:text-foreground font-medium text-xs sm:text-sm py-1.5"
                    >
                      <MessageSquare className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span>Telegram</span>
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="whatsapp">
                    <form
                      onSubmit={handleSubmit}
                      className="space-y-2 sm:space-y-3"
                    >
                      <div className="space-y-1">
                        <Label
                          htmlFor="whatsapp-number"
                          className="text-foreground font-medium text-xs sm:text-sm"
                        >
                          Número de WhatsApp
                        </Label>
                        <div className="flex gap-2">
                          <div className="w-1/3">
                            <Select
                              value={countryCode}
                              onValueChange={setCountryCode}
                            >
                              <SelectTrigger className="bg-background/60 backdrop-blur-sm border-white/10 h-8 sm:h-9 text-xs sm:text-sm">
                                <SelectValue placeholder="Código" />
                              </SelectTrigger>
                              <SelectContent className="bg-background/90 backdrop-blur-md border-white/10 text-xs sm:text-sm">
                                {countryCodes.map((country) => (
                                  <SelectItem
                                    key={country.code}
                                    value={country.code}
                                  >
                                    <span className="flex items-center gap-1 sm:gap-2">
                                      <span className="text-base sm:text-lg">
                                        {country.country}
                                      </span>
                                      <span>{country.code}</span>
                                    </span>
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="w-2/3">
                            <Input
                              id="whatsapp-number"
                              type="tel"
                              placeholder="Número sin código"
                              value={phoneNumber}
                              onChange={(e) => setPhoneNumber(e.target.value)}
                              required
                              className="bg-background/60 backdrop-blur-sm border-white/10 text-foreground placeholder:text-foreground/60 h-8 sm:h-9 text-xs sm:text-sm"
                            />
                          </div>
                        </div>
                        <p className="text-xs text-foreground/80">
                          Ingresa tu número sin el código de país
                        </p>
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-success-dark hover:bg-success/90 text-white font-medium transform transition-all duration-300 mt-3 sm:mt-4 py-1.5 sm:py-2 h-8 sm:h-9 text-xs sm:text-sm"
                        disabled={isSubmitting || isWhatsappLoading}
                      >
                        {isSubmitting || isWhatsappLoading
                          ? "Procesando..."
                          : "Ver mi dashboard"}
                      </Button>

                      <p className="text-xs text-center text-foreground/80 mt-2 sm:mt-3">
                        Al continuar, aceptas nuestros términos de servicio
                      </p>
                    </form>
                  </TabsContent>

                  <TabsContent value="telegram">
                    <form
                      onSubmit={handleSubmit}
                      className="space-y-2 sm:space-y-3"
                    >
                      <div className="space-y-1">
                        <Label
                          htmlFor="telegram-phone"
                          className="text-foreground font-medium text-xs sm:text-sm"
                        >
                          Número de teléfono
                        </Label>
                        <div className="flex gap-2">
                          <div className="w-1/3">
                            <Select
                              value={telegramCountryCode}
                              onValueChange={setTelegramCountryCode}
                            >
                              <SelectTrigger className="bg-background/60 backdrop-blur-sm border-white/10 h-8 sm:h-9 text-xs sm:text-sm">
                                <SelectValue placeholder="Código" />
                              </SelectTrigger>
                              <SelectContent className="bg-background/90 backdrop-blur-md border-white/10 text-xs sm:text-sm">
                                {countryCodes.map((country) => (
                                  <SelectItem
                                    key={country.code}
                                    value={country.code}
                                  >
                                    <span className="flex items-center gap-1 sm:gap-2">
                                      <span className="text-base sm:text-lg">
                                        {country.country}
                                      </span>
                                      <span>{country.code}</span>
                                    </span>
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="w-2/3">
                            <Input
                              id="telegram-phone"
                              type="tel"
                              placeholder="Número sin código"
                              value={telegramPhone}
                              onChange={(e) => setTelegramPhone(e.target.value)}
                              required
                              className="bg-background/60 backdrop-blur-sm border-white/10 text-foreground placeholder:text-foreground/60 h-8 sm:h-9 text-xs sm:text-sm"
                            />
                          </div>
                        </div>
                        <p className="text-xs text-foreground/80">
                          Ingresa tu número sin el código de país
                        </p>
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-[#008ecc] hover:bg-[#0088cc]/90 text-white hover:cursor-pointer font-medium relative overflow-hidden group transform transition-all duration-300 mt-3 sm:mt-4 py-1.5 sm:py-2 h-8 sm:h-9 text-xs sm:text-sm"
                        disabled={isSubmitting}
                      >
                        <span className="relative z-10">
                          {isSubmitting ? "Procesando..." : "Ver mi dashboard"}
                        </span>
                        <span className="absolute inset-0 bg-black/10 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                      </Button>

                      <p className="text-xs text-center text-foreground/80 mt-2 sm:mt-3">
                        Al continuar, aceptas nuestros términos de servicio
                      </p>
                    </form>
                  </TabsContent>
                </Tabs>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
export default WaitlistForm;
