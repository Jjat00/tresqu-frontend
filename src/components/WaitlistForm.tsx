
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

const WaitlistForm = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "¡Te has unido a la lista de espera!",
        description: "Te notificaremos cuando GastosBot esté disponible.",
      });
      setEmail("");
      setName("");
    }, 1000);
  };

  return (
    <section className="py-24 bg-secondary">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Únete a la lista de espera</h2>
          <p className="text-muted-foreground mb-8">
            Sé de los primeros en probar GastosBot cuando esté disponible.
          </p>
          
          <form onSubmit={handleSubmit} className="glass p-6 md:p-8">
            <div className="grid gap-4">
              <div>
                <Input
                  type="text"
                  placeholder="Nombre completo"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="bg-background/50 border-border/50"
                />
              </div>
              <div>
                <Input
                  type="email"
                  placeholder="Correo electrónico"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-background/50 border-border/50"
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-success hover:bg-success/90" 
                disabled={isLoading}
              >
                {isLoading ? "Enviando..." : "Reservar mi lugar"}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              Te enviaremos un correo cuando lancemos el producto. No spam.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default WaitlistForm;
