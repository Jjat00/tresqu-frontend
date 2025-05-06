
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { MessageSquare, LogIn, UserPlus } from "lucide-react";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";

const AuthenticationTabs = () => {
  const [activeTab, setActiveTab] = useState("register");

  return (
    <section id="authentication" className="section-padding bg-card">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Accede a CashBot</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Conecta tu cuenta o regístrate para comenzar a gestionar tus finanzas personales de forma sencilla
          </p>
        </div>
        
        <div className="max-w-md mx-auto">
          <Card>
            <CardContent className="pt-6">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-2 mb-8">
                  <TabsTrigger value="register" className="flex gap-2 items-center">
                    <UserPlus className="h-4 w-4" />
                    Regístrate
                  </TabsTrigger>
                  <TabsTrigger value="login" className="flex gap-2 items-center">
                    <LogIn className="h-4 w-4" />
                    Iniciar sesión
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="register">
                  <div className="bg-secondary/30 p-3 rounded-md mb-4">
                    <p className="text-sm text-center">
                      ¿Aún no tienes cuenta? Regístrate fácilmente usando el botón de Telegram.
                    </p>
                  </div>
                  <RegisterForm />
                </TabsContent>
                
                <TabsContent value="login">
                  <div className="bg-secondary/30 p-3 rounded-md mb-4">
                    <p className="text-sm text-center">
                      ¿Ya tienes una cuenta? Pulsa en 'Iniciar ahora' para acceder.
                    </p>
                  </div>
                  <LoginForm />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AuthenticationTabs;
