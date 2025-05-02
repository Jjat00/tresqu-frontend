
import { useState, useEffect } from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ExpensesTab from "@/components/dashboard/ExpensesTab";
import IncomeTab from "@/components/dashboard/IncomeTab";
import DebtTab from "@/components/dashboard/DebtTab";
import SavingsGoalsTab from "@/components/dashboard/SavingsGoalsTab";
import ChatBot from "@/components/ChatBot";
import { Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("expenses");
  const [isMobile, setIsMobile] = useState(false);
  const { toast } = useToast();
  
  // Check if the device is mobile based on window size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  
  const handleShareApp = () => {
    if (navigator.share) {
      navigator.share({
        title: 'CashBot - Tu asistente financiero inteligente',
        text: '¡Controla tus finanzas de forma inteligente con CashBot! Registra gastos por voz o texto y obtén análisis personalizados.',
        url: window.location.origin,
      })
      .then(() => console.log('Shared successfully'))
      .catch((error) => console.log('Share failed:', error));
    } else {
      // Fallback for browsers that don't support navigator.share
      navigator.clipboard.writeText(window.location.origin)
        .then(() => {
          toast({
            title: "Enlace copiado",
            description: "La URL de CashBot ha sido copiada al portapapeles para compartir.",
          });
        })
        .catch(() => {
          toast({
            title: "Error",
            description: "No se pudo copiar el enlace. Intenta manualmente.",
            variant: "destructive",
          });
        });
    }
  };
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard Financiero</h1>
            <p className="text-muted-foreground">
              Administra tus finanzas y mantén todo bajo control.
            </p>
          </div>
          
          <Button 
            variant="outline" 
            className="flex items-center gap-2" 
            onClick={handleShareApp}
          >
            <Share2 className="h-4 w-4" />
            <span>Compartir CashBot</span>
          </Button>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="bg-muted/50 w-full grid grid-cols-2 sm:grid-cols-4 gap-2">
            <TabsTrigger value="expenses" className="flex-1">
              Gastos
            </TabsTrigger>
            <TabsTrigger value="income" className="flex-1">
              Ingresos
            </TabsTrigger>
            <TabsTrigger value="debt" className="flex-1">
              Deudas
            </TabsTrigger>
            <TabsTrigger value="savings" className="flex-1">
              Ahorros
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="expenses" className="p-0 min-h-[60vh]">
            <ExpensesTab />
          </TabsContent>
          
          <TabsContent value="income" className="p-0 min-h-[60vh]">
            <IncomeTab />
          </TabsContent>
          
          <TabsContent value="debt" className="p-0 min-h-[60vh]">
            <DebtTab />
          </TabsContent>
          
          <TabsContent value="savings" className="p-0 min-h-[60vh]">
            <SavingsGoalsTab />
          </TabsContent>
        </Tabs>
      </div>
      
      {/* ChatBot component - outside the DashboardLayout to be accessible from everywhere */}
      <ChatBot />
    </DashboardLayout>
  );
};

export default Dashboard;
