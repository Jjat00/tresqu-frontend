
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { MessageSquare } from "lucide-react";

const WaitlistForm = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("whatsapp");
  const [phoneNumber, setPhoneNumber] = useState("");
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
                      <Input 
                        id="whatsapp-number" 
                        type="tel" 
                        placeholder="+52 1234567890"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)} 
                        required 
                      />
                      <p className="text-xs text-muted-foreground">
                        Ingresa tu número con código de país (ej: +52 para México)
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
                        required 
                      />
                      <p className="text-xs text-muted-foreground">
                        Ingresa tu nombre de usuario de Telegram (ej: @usuario)
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
