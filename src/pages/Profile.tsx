
import { useState } from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("personal");
  const [notifications, setNotifications] = useState(true);
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Mi Perfil</h1>
          <p className="text-muted-foreground">
            Administra tu información personal y preferencias.
          </p>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="personal">Información Personal</TabsTrigger>
            <TabsTrigger value="preferences">Preferencias</TabsTrigger>
          </TabsList>
          
          <TabsContent value="personal">
            <Card>
              <CardHeader>
                <CardTitle>Información Personal</CardTitle>
                <CardDescription>
                  Actualiza tus datos personales y método de autenticación.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre completo</Label>
                  <Input id="name" defaultValue="Carlos Rodríguez" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Correo electrónico</Label>
                  <Input id="email" type="email" defaultValue="carlos@ejemplo.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="auth-method">Método de autenticación</Label>
                  <div className="flex items-center gap-4 rounded-md border p-4">
                    <div>
                      <p className="font-medium">WhatsApp</p>
                      <p className="text-sm text-muted-foreground">+52 55 1234 5678</p>
                    </div>
                    <Button variant="outline" size="sm" className="ml-auto">Cambiar</Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="bg-success hover:bg-success/90">Guardar cambios</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="preferences">
            <Card>
              <CardHeader>
                <CardTitle>Preferencias</CardTitle>
                <CardDescription>
                  Personaliza la app según tus preferencias.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="language">Idioma</Label>
                  <Select defaultValue="es">
                    <SelectTrigger id="language">
                      <SelectValue placeholder="Selecciona un idioma" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="es">Español</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Zona horaria</Label>
                  <Select defaultValue="america-mexico_city">
                    <SelectTrigger id="timezone">
                      <SelectValue placeholder="Selecciona una zona horaria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="america-mexico_city">América/Ciudad de México</SelectItem>
                      <SelectItem value="america-bogota">América/Bogotá</SelectItem>
                      <SelectItem value="america-buenos_aires">América/Buenos Aires</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="notifications">Notificaciones</Label>
                    <Switch 
                      id="notifications" 
                      checked={notifications} 
                      onCheckedChange={setNotifications} 
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Recibe recordatorios de pagos, alertas y consejos personalizados.
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="bg-success hover:bg-success/90">Guardar cambios</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
