
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { MessageSquare } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Array of common country codes
const countryCodes = [
  { code: "+1", country: "Estados Unidos/Canadá" },
  { code: "+52", country: "México" },
  { code: "+54", country: "Argentina" },
  { code: "+55", country: "Brasil" },
  { code: "+56", country: "Chile" },
  { code: "+57", country: "Colombia" },
  { code: "+58", country: "Venezuela" },
  { code: "+34", country: "España" },
  { code: "+502", country: "Guatemala" },
  { code: "+503", country: "El Salvador" },
  { code: "+504", country: "Honduras" },
  { code: "+505", country: "Nicaragua" },
  { code: "+506", country: "Costa Rica" },
  { code: "+507", country: "Panamá" },
  { code: "+51", country: "Perú" },
  { code: "+591", country: "Bolivia" },
  { code: "+593", country: "Ecuador" },
  { code: "+595", country: "Paraguay" },
  { code: "+598", country: "Uruguay" },
  { code: "+1787", country: "Puerto Rico" },
  { code: "+53", country: "Cuba" },
  { code: "+809", country: "República Dominicana" },
];

const WaitlistForm = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("whatsapp");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [telegramUsername, setTelegramUsername] = useState("");
  const [countryCode, setCountryCode] = useState("+57"); // Default to Colombia
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Here would be the actual login/signup code
    setTimeout(() => {
      navigate("/dashboard");
    }, 1500);
  };

  return (
    <section id="login" className="section-padding bg-card">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Inicia sesión o regístrate</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Conecta tu número de WhatsApp o Telegram para comenzar a usar CashBot. No necesitas crear contraseñas adicionales.
          </p>
        </div>
        
        <div className="max-w-md mx-auto">
          <Card>
            <CardContent className="pt-6">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-2 mb-8">
                  <TabsTrigger value="whatsapp" className="flex gap-2 items-center">
                    <MessageSquare className="h-4 w-4" />
                    WhatsApp
                  </TabsTrigger>
                  <TabsTrigger value="telegram" className="flex gap-2 items-center">
                    <MessageSquare className="h-4 w-4" />
                    Telegram
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="whatsapp">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="whatsapp-number">Número de WhatsApp</Label>
                      <div className="flex gap-2">
                        <div className="w-1/3">
                          <Select 
                            value={countryCode} 
                            onValueChange={setCountryCode}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Código" />
                            </SelectTrigger>
                            <SelectContent>
                              {countryCodes.map((country) => (
                                <SelectItem key={country.code} value={country.code}>
                                  {country.code} {country.country}
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
                          />
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Ingresa tu número sin el código de país (ej: 31234567890)
                      </p>
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-success hover:bg-success/90"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Procesando..." : "Continuar con WhatsApp"}
                    </Button>
                    
                    <p className="text-xs text-center text-muted-foreground mt-4">
                      Al continuar, aceptas nuestros términos de servicio y política de privacidad.
                    </p>
                  </form>
                </TabsContent>
                
                <TabsContent value="telegram">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="telegram-username">Usuario de Telegram</Label>
                      <Input 
                        id="telegram-username" 
                        type="text" 
                        placeholder="@usuario"
                        value={telegramUsername}
                        onChange={(e) => setTelegramUsername(e.target.value)}
                        required 
                      />
                      <p className="text-xs text-muted-foreground">
                        Ingresa tu nombre de usuario de Telegram (ej: @usuario)
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="telegram-phone">Número de teléfono (opcional)</Label>
                      <div className="flex gap-2">
                        <div className="w-1/3">
                          <Select 
                            value={countryCode} 
                            onValueChange={setCountryCode}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Código" />
                            </SelectTrigger>
                            <SelectContent>
                              {countryCodes.map((country) => (
                                <SelectItem key={country.code} value={country.code}>
                                  {country.code} {country.country}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="w-2/3">
                          <Input 
                            id="telegram-phone" 
                            type="tel" 
                            placeholder="Número sin código (opcional)"
                          />
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Opcionalmente, puedes ingresar tu número de teléfono
                      </p>
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-success hover:bg-success/90"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Procesando..." : "Continuar con Telegram"}
                    </Button>
                    
                    <p className="text-xs text-center text-muted-foreground mt-4">
                      Al continuar, aceptas nuestros términos de servicio y política de privacidad.
                    </p>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default WaitlistForm;
