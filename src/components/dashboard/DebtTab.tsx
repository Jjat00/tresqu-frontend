
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Plus, Bell } from "lucide-react";

// Sample data for debts
const debtsData = [
  { 
    id: 1, 
    name: "Préstamo Personal", 
    totalAmount: 50000, 
    remainingAmount: 35000, 
    interestRate: 12.5, 
    monthlyPayment: 3500, 
    nextPaymentDate: "2025-05-15",
    progress: 30
  },
  { 
    id: 2, 
    name: "Tarjeta de Crédito", 
    totalAmount: 15000, 
    remainingAmount: 6000, 
    interestRate: 25, 
    monthlyPayment: 1500, 
    nextPaymentDate: "2025-05-10",
    progress: 60
  },
  { 
    id: 3, 
    name: "Crédito Auto", 
    totalAmount: 120000, 
    remainingAmount: 80000, 
    interestRate: 9.5, 
    monthlyPayment: 4800, 
    nextPaymentDate: "2025-05-20",
    progress: 33
  }
];

const paymentPlans = [
  {
    id: 1,
    debtName: "Plan Agresivo - Tarjeta de Crédito",
    description: "Aumentar pagos mensuales para liquidar en 4 meses",
    monthlyPayment: 1800,
    totalSavings: 950,
    active: true
  },
  {
    id: 2,
    debtName: "Plan Optimizado - Préstamo Personal",
    description: "Balance entre plazo y tasas de interés",
    monthlyPayment: 3500,
    totalSavings: 2500,
    active: false
  }
];

const DebtTab = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <div>
          <h3 className="text-lg font-semibold">Resumen de deudas</h3>
          <p className="text-sm text-muted-foreground">
            Total: $121,000 | Interés mensual promedio: 15.6% | Pago mensual total: $9,800
          </p>
        </div>
        <Button className="bg-success hover:bg-success/90">
          <Plus className="mr-2 h-4 w-4" />
          Nueva deuda
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {debtsData.map((debt) => (
          <Card key={debt.id} className="flex flex-col">
            <CardContent className="pt-6 flex-1">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold">{debt.name}</h4>
                <span className="text-xs bg-muted px-2 py-1 rounded-full">
                  {debt.interestRate}% interés
                </span>
              </div>
              <div className="space-y-4 mt-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Progreso</span>
                    <span>{debt.progress}%</span>
                  </div>
                  <Progress value={debt.progress} className="h-2" />
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-muted-foreground">Deuda total</p>
                    <p className="font-medium">${debt.totalAmount.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Deuda restante</p>
                    <p className="font-medium">${debt.remainingAmount.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Pago mensual</p>
                    <p className="font-medium">${debt.monthlyPayment.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Próximo pago</p>
                    <p className="font-medium">{new Date(debt.nextPaymentDate).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex gap-2 pt-0">
              <Button variant="outline" className="flex-1">Ver plan</Button>
              <Button variant="secondary" size="icon" className="bg-muted">
                <Bell className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Planes de pago</h3>
          <Button variant="outline">
            <Plus className="mr-2 h-4 w-4" />
            Crear plan
          </Button>
        </div>
        
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre del plan</TableHead>
                <TableHead>Descripción</TableHead>
                <TableHead>Pago mensual</TableHead>
                <TableHead>Ahorro total</TableHead>
                <TableHead>Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paymentPlans.map((plan) => (
                <TableRow key={plan.id}>
                  <TableCell className="font-medium">{plan.debtName}</TableCell>
                  <TableCell>{plan.description}</TableCell>
                  <TableCell>${plan.monthlyPayment.toLocaleString()}</TableCell>
                  <TableCell className="text-success">${plan.totalSavings.toLocaleString()}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      plan.active 
                        ? "bg-success/20 text-success" 
                        : "bg-muted text-muted-foreground"
                    }`}>
                      {plan.active ? "Activo" : "Inactivo"}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        <Card>
          <CardContent className="pt-6">
            <h3 className="font-semibold mb-4">Simulador de pagos</h3>
            <div className="bg-muted/50 p-4 rounded-lg">
              <p className="text-sm mb-4">
                ¿Qué pasaría si aumentas tu pago mensual? Prueba nuestro simulador para ver cómo afectaría tu deuda.
              </p>
              <Button variant="outline">Abrir simulador</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DebtTab;
