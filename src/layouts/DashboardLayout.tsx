import { ReactNode, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { User, LogOut, BarChart3, DollarSign, CreditCard, Settings, Bell, Sun, Target, Upload, Wallet } from "lucide-react";
interface DashboardLayoutProps {
  children: ReactNode;
}
const DashboardLayout = ({
  children
}: DashboardLayoutProps) => {
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Sample user data
  const [userData, setUserData] = useState({
    name: "Ana García",
    email: "ana.garcia@example.com",
    phone: "+52 55 1234 5678",
    profilePhoto: "",
    // Empty means no photo uploaded yet
    notificationsEnabled: true,
    language: "es",
    timezone: "America/Mexico_City"
  });

  // Check if the device is mobile based on window size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 1024) {
        setShowSidebar(true);
      } else {
        setShowSidebar(false);
      }
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  const handleLogout = () => {
    // Implement logout functionality here
    navigate("/");
  };
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you'd upload to server
      const reader = new FileReader();
      reader.onload = e => {
        setUserData({
          ...userData,
          profilePhoto: e.target?.result as string
        });
      };
      reader.readAsDataURL(file);
    }
  };
  const getInitials = (name: string) => {
    return name.split(' ').map(part => part[0]).join('').toUpperCase();
  };
  return <div className="min-h-screen bg-background flex flex-col">
      {/* Top Navigation Bar */}
      <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <button className="lg:hidden p-2" onClick={() => setShowSidebar(!showSidebar)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
              <span className="sr-only">Toggle menu</span>
            </button>
            <Link to="/dashboard" className="flex items-center gap-2">
              <span className="text-xl font-bold font-display text-success">Cash<span className="text-foreground">Bot</span></span>
            </Link>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="hidden sm:flex items-center gap-1" onClick={() => setSettingsOpen(true)}>
              <Settings className="h-4 w-4" />
              <span>Configuración</span>
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="relative h-9 w-9 rounded-full">
                  <Avatar className="h-9 w-9">
                    {userData.profilePhoto ? <AvatarImage src={userData.profilePhoto} alt={userData.name} /> : <AvatarFallback className="bg-primary text-primary-foreground">
                        {getInitials(userData.name)}
                      </AvatarFallback>}
                  </Avatar>
                  <span className="sr-only">Perfil del usuario</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => setProfileOpen(true)}>
                  <User className="h-4 w-4 mr-2" />
                  Perfil
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSettingsOpen(true)}>
                  <Settings className="h-4 w-4 mr-2" />
                  Configuración
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Cerrar Sesión
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar - collapsible on mobile */}
        {showSidebar && <aside className="w-64 bg-card border-r border-border flex flex-col fixed lg:relative top-16 bottom-0 z-40 lg:top-0 shadow-lg lg:shadow-none">
            <div className="p-4 flex-1 overflow-auto">
              <div className="flex flex-col gap-1">
                <div className="mx-2 mb-2 font-medium text-xs text-muted-foreground">
                  PRINCIPAL
                </div>
                <Link to="/dashboard" className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-muted text-sm">
                  <BarChart3 className="h-5 w-5" />
                  <span>Dashboard</span>
                </Link>
                <Button variant="ghost" className="justify-start px-3 py-2 h-auto font-normal" onClick={() => navigate("/dashboard")}>
                  <DollarSign className="h-5 w-5 mr-2" />
                  <span>Gastos</span>
                </Button>
                <Button variant="ghost" className="justify-start px-3 py-2 h-auto font-normal" onClick={() => navigate("/dashboard?tab=income")}>
                  <Wallet className="h-5 w-5 mr-2" />
                  <span>Ingresos</span>
                </Button>
                <Button variant="ghost" className="justify-start px-3 py-2 h-auto font-normal" onClick={() => navigate("/dashboard?tab=debt")}>
                  <CreditCard className="h-5 w-5 mr-2" />
                  <span>Deudas</span>
                </Button>
                <Button variant="ghost" className="justify-start px-3 py-2 h-auto font-normal" onClick={() => navigate("/dashboard?tab=savings")}>
                  <Target className="h-5 w-5 mr-2" />
                  <span>Ahorros</span>
                </Button>
              </div>
              
              <Separator className="my-4" />
              
              <div className="flex flex-col gap-1">
                <div className="mx-2 mb-2 font-medium text-xs text-muted-foreground">
                  CONFIGURACIÓN
                </div>
                <Button variant="ghost" className="justify-start px-3 py-2 h-auto font-normal" onClick={() => setProfileOpen(true)}>
                  <User className="h-5 w-5 mr-2" />
                  <span>Mi Perfil</span>
                </Button>
                <Button variant="ghost" className="justify-start px-3 py-2 h-auto font-normal" onClick={() => setSettingsOpen(true)}>
                  <Settings className="h-5 w-5 mr-2" />
                  <span>Configuración</span>
                </Button>
              </div>
              
              <Separator className="my-4" />
              
              <Button variant="ghost" className="justify-start px-3 py-2 h-auto font-normal text-red-500 hover:text-red-600 hover:bg-red-100/10" onClick={handleLogout}>
                <LogOut className="h-5 w-5 mr-2" />
                <span>Cerrar Sesión</span>
              </Button>
            </div>
            
            {isMobile && <div className="p-4 border-t">
                <Button variant="outline" className="w-full" onClick={() => setShowSidebar(false)}>
                  Cerrar menú
                </Button>
              </div>}
          </aside>}
        
        {/* Main content */}
        <main className="flex-1 p-6 lg:p-8 overflow-auto pt-6 pb-16">
          <div className="container max-w-6xl py-0 mx-0 px-px">
            {children}
          </div>
        </main>
      </div>
      
      {/* Overlay to close sidebar on mobile */}
      {showSidebar && isMobile && <div className="fixed inset-0 bg-black/50 z-30" onClick={() => setShowSidebar(false)}></div>}
      
      {/* User Profile Dialog */}
      <Dialog open={profileOpen} onOpenChange={setProfileOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Mi Perfil</DialogTitle>
            <DialogDescription>
              Actualiza tu información personal y foto de perfil.
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex flex-col gap-6 py-4">
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <Avatar className="h-24 w-24">
                  {userData.profilePhoto ? <AvatarImage src={userData.profilePhoto} alt={userData.name} /> : <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                      {getInitials(userData.name)}
                    </AvatarFallback>}
                </Avatar>
                
                <label htmlFor="profile-photo" className="absolute bottom-0 right-0 bg-primary text-primary-foreground p-1 rounded-full cursor-pointer">
                  <Upload className="h-4 w-4" />
                  <span className="sr-only">Cambiar foto</span>
                  <input id="profile-photo" type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
                </label>
              </div>
              
              <p className="text-sm text-muted-foreground">
                Haz clic en la foto para cambiarla
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre</Label>
                <Input id="name" value={userData.name} onChange={e => setUserData({
                ...userData,
                name: e.target.value
              })} />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Correo electrónico</Label>
                <Input id="email" type="email" value={userData.email} onChange={e => setUserData({
                ...userData,
                email: e.target.value
              })} />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Teléfono (WhatsApp)</Label>
                <Input id="phone" type="tel" value={userData.phone} onChange={e => setUserData({
                ...userData,
                phone: e.target.value
              })} />
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setProfileOpen(false)}>Cancelar</Button>
            <Button onClick={() => setProfileOpen(false)}>Guardar cambios</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Settings Dialog */}
      <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Configuración</DialogTitle>
            <DialogDescription>
              Personaliza tus preferencias de idioma, zona horaria y notificaciones.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4 space-y-6">
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Preferencias generales</h3>
              
              <div className="space-y-2">
                <Label htmlFor="language">Idioma</Label>
                <Select value={userData.language} onValueChange={value => setUserData({
                ...userData,
                language: value
              })}>
                  <SelectTrigger id="language">
                    <SelectValue placeholder="Selecciona un idioma" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="es">Español</SelectItem>
                    <SelectItem value="en">Inglés</SelectItem>
                    <SelectItem value="pt">Portugués</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="timezone">Zona horaria</Label>
                <Select value={userData.timezone} onValueChange={value => setUserData({
                ...userData,
                timezone: value
              })}>
                  <SelectTrigger id="timezone">
                    <SelectValue placeholder="Selecciona una zona horaria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="America/Mexico_City">Ciudad de México (GMT-6)</SelectItem>
                    <SelectItem value="America/Bogota">Bogotá (GMT-5)</SelectItem>
                    <SelectItem value="America/Santiago">Santiago (GMT-4)</SelectItem>
                    <SelectItem value="America/Argentina/Buenos_Aires">Buenos Aires (GMT-3)</SelectItem>
                    <SelectItem value="Europe/Madrid">Madrid (GMT+1)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="theme">Tema</Label>
                <Select defaultValue="dark">
                  <SelectTrigger id="theme">
                    <SelectValue placeholder="Selecciona un tema" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Claro</SelectItem>
                    <SelectItem value="dark">Oscuro</SelectItem>
                    <SelectItem value="system">Sistema</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Notificaciones</h3>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="notifications">Notificaciones push</Label>
                  <p className="text-xs text-muted-foreground">
                    Recibir alertas sobre tus finanzas
                  </p>
                </div>
                <Switch id="notifications" checked={userData.notificationsEnabled} onCheckedChange={checked => setUserData({
                ...userData,
                notificationsEnabled: checked
              })} />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-notifications">Notificaciones por correo</Label>
                  <p className="text-xs text-muted-foreground">
                    Recibir resúmenes semanales por correo
                  </p>
                </div>
                <Switch id="email-notifications" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="whatsapp-notifications">Notificaciones WhatsApp</Label>
                  <p className="text-xs text-muted-foreground">
                    Recibir alertas importantes vía WhatsApp
                  </p>
                </div>
                <Switch id="whatsapp-notifications" defaultChecked />
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Privacidad</h3>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="data-collection">Recolección de datos</Label>
                  <p className="text-xs text-muted-foreground">
                    Permitir análisis para mejorar recomendaciones
                  </p>
                </div>
                <Switch id="data-collection" defaultChecked />
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setSettingsOpen(false)}>Cancelar</Button>
            <Button onClick={() => setSettingsOpen(false)}>Guardar cambios</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>;
};
export default DashboardLayout;