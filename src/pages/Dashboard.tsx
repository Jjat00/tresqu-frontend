
import { useState } from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ExpensesTab from "@/components/dashboard/ExpensesTab";
import IncomeTab from "@/components/dashboard/IncomeTab";
import DebtTab from "@/components/dashboard/DebtTab";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("expenses");
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard Financiero</h1>
          <p className="text-muted-foreground">
            Administra tus finanzas y mantén todo bajo control.
          </p>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="bg-muted/50 w-full justify-start">
            <TabsTrigger value="expenses" className="flex-1 sm:flex-none">
              Gastos
            </TabsTrigger>
            <TabsTrigger value="income" className="flex-1 sm:flex-none">
              Ingresos
            </TabsTrigger>
            <TabsTrigger value="debt" className="flex-1 sm:flex-none">
              Deudas y Planes
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="expenses" className="p-0">
            <ExpensesTab />
          </TabsContent>
          
          <TabsContent value="income" className="p-0">
            <IncomeTab />
          </TabsContent>
          
          <TabsContent value="debt" className="p-0">
            <DebtTab />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
