
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { MessageSquare } from "lucide-react";

const WaitlistForm = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "¡Código de verificación enviado!",
        description: "Revisa WhatsApp o Telegram para completar tu inicio de sesión.",
      });
      setPhoneNumber("");
    }, 1000);
  };

  return (
    <section className="py-24 bg-secondary">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Comienza a usar GastosBot</h2>
          <p className="text-muted-foreground mb-8">
            Ingresa tu número de WhatsApp o Telegram para iniciar sesión o crear una cuenta.
          </p>
          
          <form onSubmit={handleSubmit} className="glass p-6 md:p-8">
            <div className="grid gap-4">
              <div className="flex items-center gap-3 bg-background/50 border border-border/50 rounded-md px-3">
                <MessageSquare className="h-5 w-5 text-muted-foreground" />
                <Input
                  type="tel"
                  placeholder="Número de WhatsApp/Telegram (con código de país)"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                  className="border-0 bg-transparent focus-visible:ring-0"
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-success hover:bg-success/90" 
                disabled={isLoading}
              >
                {isLoading ? "Enviando código..." : "Iniciar sesión"}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              Recibirás un código de verificación en tu app de mensajería. No compartimos tu número con terceros.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default WaitlistForm;
