
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { BrandWhatsapp, BrandTelegram } from "lucide-react";

const WaitlistForm = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [authType, setAuthType] = useState("whatsapp");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would connect to a backend API for authentication
    // Here we just navigate to the dashboard as a simulation
    navigate("/dashboard");
  };

  return (
    <section className="py-16 md:py-20" id="comienza">
      <div className="container">
        <Card className="mx-auto max-w-md bg-card rounded-xl shadow-xl border-border/50">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Comienza a usar CashBot</CardTitle>
            <CardDescription>
              Inicia sesión con tu app de mensajería preferida
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={authType} onValueChange={setAuthType} className="mb-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="whatsapp" className="flex items-center justify-center gap-2">
                  <BrandWhatsapp className="h-4 w-4" />
                  WhatsApp
                </TabsTrigger>
                <TabsTrigger value="telegram" className="flex items-center justify-center gap-2">
                  <BrandTelegram className="h-4 w-4" />
                  Telegram
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="phone">Número de teléfono</Label>
                <Input 
                  id="phone" 
                  type="tel" 
                  placeholder="+52 1234567890" 
                  value={phoneNumber} 
                  onChange={(e) => setPhoneNumber(e.target.value)} 
                  required 
                />
                <p className="text-xs text-muted-foreground">
                  Te enviaremos un código para verificar tu número
                </p>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-success hover:bg-success/90"
              >
                {authType === "whatsapp" ? "Continuar con WhatsApp" : "Continuar con Telegram"}
              </Button>
            </form>
          </CardContent>
          
          <CardFooter className="flex flex-col space-y-2 text-center border-t pt-4 text-sm text-muted-foreground">
            <div>
              Al iniciar sesión aceptas nuestros <a href="#" className="underline">Términos y condiciones</a> y <a href="#" className="underline">Política de privacidad</a>.
            </div>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
};

export default WaitlistForm;
