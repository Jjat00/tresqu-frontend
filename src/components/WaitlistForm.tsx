import { useEffect, useMemo, useState } from "react";
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
import { AxiosError } from "axios";

const SIGNUP_WHATSAPP_URL =
  "https://wa.me/573116534337?text=" +
  encodeURIComponent(
    "Hola Tresqu quiero crear mi cuenta y tener control de mis finanzas e inversiones"
  );

const isAccountNotFoundError = (err: unknown): boolean => {
  const axiosError = err as AxiosError<{ code?: string }> | undefined;
  return (
    axiosError?.response?.status === 404 &&
    axiosError?.response?.data?.code === "account_not_found"
  );
};

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

type AuthChannel = "whatsapp" | "telegram";
type PhoneEntry = { countryCode: string; phone: string };
type PhoneHistory = Record<AuthChannel, PhoneEntry[]>;

const PHONE_HISTORY_KEY = "tresqu.phoneHistory";
const PHONE_HISTORY_LIMIT = 5;

const emptyHistory: PhoneHistory = { whatsapp: [], telegram: [] };

const loadPhoneHistory = (): PhoneHistory => {
  if (typeof window === "undefined") return emptyHistory;
  try {
    const raw = window.localStorage.getItem(PHONE_HISTORY_KEY);
    if (!raw) return emptyHistory;
    const parsed = JSON.parse(raw) as Partial<PhoneHistory>;
    return {
      whatsapp: Array.isArray(parsed.whatsapp) ? parsed.whatsapp : [],
      telegram: Array.isArray(parsed.telegram) ? parsed.telegram : [],
    };
  } catch {
    return emptyHistory;
  }
};

const savePhoneEntry = (channel: AuthChannel, entry: PhoneEntry) => {
  if (typeof window === "undefined") return;
  const current = loadPhoneHistory();
  const filtered = current[channel].filter(
    (e) => !(e.countryCode === entry.countryCode && e.phone === entry.phone)
  );
  const next: PhoneHistory = {
    ...current,
    [channel]: [entry, ...filtered].slice(0, PHONE_HISTORY_LIMIT),
  };
  try {
    window.localStorage.setItem(PHONE_HISTORY_KEY, JSON.stringify(next));
  } catch {
    /* ignore quota errors */
  }
};

const onlyDigits = (value: string) => value.replace(/\D/g, "");

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
    "whatsapp"
  );

  const [phoneHistory, setPhoneHistory] = useState<PhoneHistory>(emptyHistory);
  const [accountNotFound, setAccountNotFound] = useState<string | null>(null);

  useEffect(() => {
    const history = loadPhoneHistory();
    setPhoneHistory(history);
    const lastWhatsapp = history.whatsapp[0];
    if (lastWhatsapp) {
      setPhoneNumber(lastWhatsapp.phone);
      setCountryCode(lastWhatsapp.countryCode);
    }
    const lastTelegram = history.telegram[0];
    if (lastTelegram) {
      setTelegramPhone(lastTelegram.phone);
      setTelegramCountryCode(lastTelegram.countryCode);
    }
  }, []);

  const whatsappSuggestions = useMemo(
    () => phoneHistory.whatsapp.map((e) => e.phone),
    [phoneHistory.whatsapp]
  );
  const telegramSuggestions = useMemo(
    () => phoneHistory.telegram.map((e) => e.phone),
    [phoneHistory.telegram]
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
      const formattedPhoneNumber = telegramCountryCode.startsWith("+")
        ? `${telegramCountryCode}${telegramPhone}`
        : `+${telegramCountryCode}${telegramPhone}`;
      try {
        setFullPhoneNumber(formattedPhoneNumber);
        setAuthMethod("telegram");
        console.log("Enviando solicitud para:", formattedPhoneNumber);

        // Solicitar código de verificación
        const response = await requestTelegramCode(formattedPhoneNumber);
        if (response.success) {
          toast.success(response.message);
          savePhoneEntry("telegram", {
            countryCode: telegramCountryCode,
            phone: telegramPhone,
          });
          setPhoneHistory(loadPhoneHistory());
          setVerificationStep(true);
        } else {
          toast.error("Error al solicitar el código de verificación");
        }
      } catch (error) {
        console.error("Error al solicitar código:", error);
        if (isAccountNotFoundError(error)) {
          setAccountNotFound(formattedPhoneNumber);
        } else {
          toast.error(
            "Error al solicitar el código de verificación. Por favor, inténtalo de nuevo."
          );
        }
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
      const formattedPhoneNumber = countryCode.startsWith("+")
        ? `${countryCode}${phoneNumber}`
        : `+${countryCode}${phoneNumber}`;
      try {
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

          savePhoneEntry("whatsapp", {
            countryCode,
            phone: phoneNumber,
          });
          setPhoneHistory(loadPhoneHistory());
          // Avanzar al paso de verificación
          setVerificationStep(true);
        } else {
          toast.error("Error al solicitar el código de verificación");
        }
      } catch (error) {
        console.error("Error al solicitar código WhatsApp:", error);
        if (isAccountNotFoundError(error)) {
          setAccountNotFound(formattedPhoneNumber);
        } else {
          toast.error(
            "Error al solicitar el código de verificación. Por favor, inténtalo de nuevo."
          );
        }
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
    <section className="relative overflow-hidden min-h-screen flex items-center justify-center px-4 py-28 sm:py-32 bg-[#0a0a0a]">
      {/* Atmósfera estilo landing: grid blueprint + auras de color */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-blueprint" />
        <div className="absolute inset-0 section-aura-green" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 55% 45% at 50% 30%, rgba(0,255,127,0.05) 0%, transparent 70%)",
          }}
        />
      </div>
      <div className="absolute top-0 left-0 right-0 h-px bg-white/5"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/5"></div>

      <div className="container mx-auto max-w-md relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <span className="section-label mb-5">Acceso</span>
          <h1 className="trii-title text-4xl sm:text-5xl text-white mb-4">
            INICIA <span className="holo-text italic">SESIÓN</span>.
          </h1>
          <p className="text-zinc-400 text-sm sm:text-base">
            Entra con el número con el que usas Tresqu. ¿Aún no tienes cuenta?
            Créala en un minuto por WhatsApp o Telegram.
          </p>
        </div>

        {/* Principal — Iniciar sesión */}
        <div className="mx-auto">
          <Card className="holo-card holo-sheen hud-corners border-0 shadow-none">
            <CardHeader>
              <CardTitle className="text-sm sm:text-base font-semibold text-white">
                Inicia sesión con tu número
              </CardTitle>
              <p className="text-xs text-zinc-500 mt-1">
                Te enviamos un código de verificación a tu chat.
              </p>
            </CardHeader>
            <CardContent className="pt-2 pb-6 px-4 sm:px-6">
              {accountNotFound ? (
                <div className="flex flex-col items-center text-center gap-4 py-2">
                  <p className="text-sm text-zinc-300">
                    No encontramos una cuenta asociada a{" "}
                    <span className="font-semibold text-white">
                      {accountNotFound}
                    </span>
                    .
                  </p>
                  <p className="text-xs sm:text-sm text-zinc-500">
                    Para crear tu cuenta, escríbenos por WhatsApp y empezamos de
                    inmediato.
                  </p>
                  <Button
                    type="button"
                    className="w-full bg-[#00FF7F] hover:bg-white text-black font-semibold rounded-md h-10 text-sm transition-colors hover:cursor-pointer"
                    onClick={() => {
                      window.open(SIGNUP_WHATSAPP_URL, "_blank");
                    }}
                  >
                    Crear cuenta por WhatsApp
                  </Button>
                  <button
                    type="button"
                    onClick={() => setAccountNotFound(null)}
                    className="text-xs text-zinc-500 underline hover:text-white transition-colors"
                  >
                    Usar otro número
                  </button>
                </div>
              ) : verificationStep ? (
                <VerificationCodeForm
                  phoneNumber={fullPhoneNumber}
                  onVerificationSuccess={handleVerificationSuccess}
                  onCancel={handleCancelVerification}
                  authMethod={authMethod}
                />
              ) : (
                <Tabs
                  value={activeTab}
                  onValueChange={(value) => {
                    setActiveTab(value);
                    setAccountNotFound(null);
                  }}
                  className="w-full"
                >
                  <TabsList className="grid grid-cols-2 mb-5 bg-white/[0.03] border border-white/[0.06]">
                    <TabsTrigger
                      value="whatsapp"
                      className="flex gap-2 items-center text-zinc-400 data-[state=active]:bg-[#00FF7F]/15 data-[state=active]:text-white font-medium text-sm py-1.5"
                    >
                      <MessageSquare className="h-4 w-4" />
                      <span>WhatsApp</span>
                    </TabsTrigger>
                    <TabsTrigger
                      value="telegram"
                      className="flex gap-2 items-center text-zinc-400 data-[state=active]:bg-[#0088cc]/20 data-[state=active]:text-white font-medium text-sm py-1.5"
                    >
                      <MessageSquare className="h-4 w-4" />
                      <span>Telegram</span>
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="whatsapp">
                    <form onSubmit={handleSubmit} className="space-y-3">
                      <div className="space-y-1.5">
                        <Label
                          htmlFor="whatsapp-number"
                          className="text-zinc-300 font-medium text-sm"
                        >
                          Número de WhatsApp
                        </Label>
                        <div className="flex gap-2">
                          <div className="w-1/3">
                            <Select
                              value={countryCode}
                              onValueChange={setCountryCode}
                            >
                              <SelectTrigger className="bg-white/[0.03] border-white/10 h-9 text-sm">
                                <SelectValue placeholder="Código" />
                              </SelectTrigger>
                              <SelectContent className="bg-[#0f0f0f] border-white/10 text-sm">
                                {countryCodes.map((country) => (
                                  <SelectItem
                                    key={country.code}
                                    value={country.code}
                                  >
                                    <span className="flex items-center gap-2">
                                      <span className="text-lg">
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
                              inputMode="numeric"
                              pattern="[0-9]*"
                              autoComplete="tel-national"
                              list="whatsapp-number-history"
                              placeholder="Número sin código"
                              value={phoneNumber}
                              onChange={(e) => {
                                setPhoneNumber(onlyDigits(e.target.value));
                                if (accountNotFound) setAccountNotFound(null);
                              }}
                              required
                              className="bg-white/[0.03] border-white/10 text-white placeholder:text-zinc-600 h-9 text-sm"
                            />
                            {whatsappSuggestions.length > 0 && (
                              <datalist id="whatsapp-number-history">
                                {whatsappSuggestions.map((p) => (
                                  <option key={p} value={p} />
                                ))}
                              </datalist>
                            )}
                          </div>
                        </div>
                        <p className="text-xs text-zinc-500">
                          Ingresa tu número sin el código de país
                        </p>
                      </div>

                      <Button
                        type="submit"
                        className="cta-neon w-full bg-[#00FF7F] hover:bg-white text-black font-semibold rounded-md mt-4 h-10 text-sm"
                        disabled={isSubmitting || isWhatsappLoading}
                      >
                        {isSubmitting || isWhatsappLoading
                          ? "Procesando..."
                          : "Ver mi dashboard"}
                      </Button>

                      <p className="text-xs text-center text-zinc-600 mt-3">
                        Al continuar, aceptas nuestros términos de servicio
                      </p>
                    </form>
                  </TabsContent>

                  <TabsContent value="telegram">
                    <form onSubmit={handleSubmit} className="space-y-3">
                      <div className="space-y-1.5">
                        <Label
                          htmlFor="telegram-phone"
                          className="text-zinc-300 font-medium text-sm"
                        >
                          Número de teléfono
                        </Label>
                        <div className="flex gap-2">
                          <div className="w-1/3">
                            <Select
                              value={telegramCountryCode}
                              onValueChange={setTelegramCountryCode}
                            >
                              <SelectTrigger className="bg-white/[0.03] border-white/10 h-9 text-sm">
                                <SelectValue placeholder="Código" />
                              </SelectTrigger>
                              <SelectContent className="bg-[#0f0f0f] border-white/10 text-sm">
                                {countryCodes.map((country) => (
                                  <SelectItem
                                    key={country.code}
                                    value={country.code}
                                  >
                                    <span className="flex items-center gap-2">
                                      <span className="text-lg">
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
                              inputMode="numeric"
                              pattern="[0-9]*"
                              autoComplete="tel-national"
                              list="telegram-number-history"
                              placeholder="Número sin código"
                              value={telegramPhone}
                              onChange={(e) => {
                                setTelegramPhone(onlyDigits(e.target.value));
                                if (accountNotFound) setAccountNotFound(null);
                              }}
                              required
                              className="bg-white/[0.03] border-white/10 text-white placeholder:text-zinc-600 h-9 text-sm"
                            />
                            {telegramSuggestions.length > 0 && (
                              <datalist id="telegram-number-history">
                                {telegramSuggestions.map((p) => (
                                  <option key={p} value={p} />
                                ))}
                              </datalist>
                            )}
                          </div>
                        </div>
                        <p className="text-xs text-zinc-500">
                          Ingresa tu número sin el código de país
                        </p>
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-[#0088cc] hover:bg-[#0088cc]/90 text-white font-semibold rounded-md mt-4 h-10 text-sm transition-colors hover:cursor-pointer"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Procesando..." : "Ver mi dashboard"}
                      </Button>

                      <p className="text-xs text-center text-zinc-600 mt-3">
                        Al continuar, aceptas nuestros términos de servicio
                      </p>
                    </form>
                  </TabsContent>
                </Tabs>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Separador */}
        <div className="flex items-center gap-3 py-5" aria-hidden="true">
          <div className="h-px flex-1 bg-white/[0.06]" />
          <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-600">
            ¿Primera vez?
          </span>
          <div className="h-px flex-1 bg-white/[0.06]" />
        </div>

        {/* Secundario — Crear cuenta */}
        <div className="mx-auto">
          <Card className="holo-card border-0 shadow-none">
            <CardContent className="pt-4 pb-4 px-4 sm:px-6">
              <p className="text-sm text-zinc-400 mb-3.5">
                <span className="text-white font-medium">
                  ¿Aún no tienes cuenta?
                </span>{" "}
                Créala desde nuestro bot de WhatsApp o Telegram y luego vuelve
                aquí a iniciar sesión.
              </p>
              <div className="flex flex-col sm:flex-row gap-2.5">
                <Button
                  variant="outline"
                  className="flex-1 inline-flex items-center justify-center gap-2 h-9 px-4 bg-white/[0.03] border border-[#00FF7F]/30 text-[#00FF7F] font-semibold rounded-md hover:bg-[#00FF7F]/10 hover:border-[#00FF7F]/50 transition-colors hover:cursor-pointer text-sm"
                  onClick={() => {
                    window.open(SIGNUP_WHATSAPP_URL, "_blank");
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M14.05 4C18.37 4.07 21.93 7.63 22 11.95"></path>
                    <path d="M14.05 8C16.15 8.07 17.93 9.85 18 11.95"></path>
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                  Crear por WhatsApp
                </Button>

                <Button
                  variant="outline"
                  className="flex-1 inline-flex items-center justify-center gap-2 h-9 px-4 bg-white/[0.03] border border-white/10 text-white font-semibold rounded-md hover:border-[#0088cc]/50 hover:bg-white/[0.06] transition-colors hover:cursor-pointer text-sm"
                  onClick={() => {
                    window.open("https://t.me/tresqu_bot", "_blank");
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-[#0088cc]"
                  >
                    <path d="m22 2-7 20-4-9-9-4Z" />
                    <path d="M22 2 11 13" />
                  </svg>
                  Crear por Telegram
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </section>
  );
};
export default WaitlistForm;
