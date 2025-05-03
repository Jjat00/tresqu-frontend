import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Plus, Bell, Download, Share2, ArrowUp, ArrowDown, Calculator } from "lucide-react";

// Sample data for debts
const debtsData = [{
  id: 1,
  name: "Préstamo Personal",
  totalAmount: 50000,
  remainingAmount: 35000,
  interestRate: 12.5,
  monthlyPayment: 3500,
  nextPaymentDate: "2025-05-15",
  progress: 30
}, {
  id: 2,
  name: "Tarjeta de Crédito",
  totalAmount: 15000,
  remainingAmount: 6000,
  interestRate: 25,
  monthlyPayment: 1500,
  nextPaymentDate: "2025-05-10",
  progress: 60
}, {
  id: 3,
  name: "Crédito Auto",
  totalAmount: 120000,
  remainingAmount: 80000,
  interestRate: 9.5,
  monthlyPayment: 4800,
  nextPaymentDate: "2025-05-20",
  progress: 33
}];
const paymentPlans = [{
  id: 1,
  debtName: "Plan Agresivo - Tarjeta de Crédito",
  description: "Aumentar pagos mensuales para liquidar en 4 meses",
  monthlyPayment: 1800,
  totalSavings: 950,
  active: true
}, {
  id: 2,
  debtName: "Plan Optimizado - Préstamo Personal",
  description: "Balance entre plazo y tasas de interés",
  monthlyPayment: 3500,
  totalSavings: 2500,
  active: false
}];
const DebtTab = () => {
  const [timeFilter, setTimeFilter] = useState("all");
  const [filteredDebts, setFilteredDebts] = useState(debtsData);
  const [newDebtOpen, setNewDebtOpen] = useState(false);
  const [simulatorOpen, setSimulatorOpen] = useState(false);
  const [simulatorValues, setSimulatorValues] = useState({
    debtAmount: 30000,
    interestRate: 15,
    monthlyPayment: 3000,
    extraPayment: 0
  });
  const [newDebt, setNewDebt] = useState({
    name: "",
    totalAmount: "",
    remainingAmount: "",
    interestRate: "",
    monthlyPayment: "",
    nextPaymentDate: new Date().toISOString().split('T')[0]
  });
  const [simulationResults, setSimulationResults] = useState({
    monthsToPayoff: 12,
    totalInterest: 3500,
    totalPaid: 33500
  });

  // Apply filters in real-time
  useEffect(() => {
    if (timeFilter === "all") {
      setFilteredDebts(debtsData);
    } else if (timeFilter === "upcoming") {
      // Filter debts with payments due in the next 7 days
      const today = new Date();
      const sevenDaysLater = new Date();
      sevenDaysLater.setDate(today.getDate() + 7);
      setFilteredDebts(debtsData.filter(debt => {
        const paymentDate = new Date(debt.nextPaymentDate);
        return paymentDate >= today && paymentDate <= sevenDaysLater;
      }));
    } else if (timeFilter === "high-interest") {
      // Filter debts with high interest rates (> 15%)
      setFilteredDebts(debtsData.filter(debt => debt.interestRate > 15));
    }
  }, [timeFilter]);

  // Update simulation results when inputs change
  useEffect(() => {
    // Simple simulation calculation
    if (simulatorValues.debtAmount > 0 && simulatorValues.monthlyPayment > 0) {
      const totalPayment = simulatorValues.monthlyPayment + simulatorValues.extraPayment;
      const monthlyInterestRate = simulatorValues.interestRate / 100 / 12;

      // Simple calculation - not accounting for compounding interest complexity
      let balance = simulatorValues.debtAmount;
      let months = 0;
      let totalInterest = 0;
      while (balance > 0 && months < 360) {
        // Cap at 30 years
        months++;
        const interestThisMonth = balance * monthlyInterestRate;
        totalInterest += interestThisMonth;
        balance = balance + interestThisMonth - totalPayment;
        if (balance <= 0) break;
      }
      setSimulationResults({
        monthsToPayoff: months,
        totalInterest: Math.round(totalInterest),
        totalPaid: Math.round(simulatorValues.debtAmount + totalInterest)
      });
    }
  }, [simulatorValues]);
  const handleAddDebt = () => {
    console.log("Adding new debt:", newDebt);
    // Here you would add logic to add the debt
    setNewDebtOpen(false);
    setNewDebt({
      name: "",
      totalAmount: "",
      remainingAmount: "",
      interestRate: "",
      monthlyPayment: "",
      nextPaymentDate: new Date().toISOString().split('T')[0]
    });
  };
  const handleExportPDF = () => {
    console.log("Exporting debt data to PDF");
    // Implementation would go here
  };
  const handleExportExcel = () => {
    console.log("Exporting debt data to Excel");
    // Implementation would go here
  };
  const handleShare = () => {
    console.log("Sharing CashBot");
    // Implementation would go here
  };
  return <div className="space-y-6 py-0 my-[60px]">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex items-center gap-2">
          <Select value={timeFilter} onValueChange={setTimeFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Ver todas" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las deudas</SelectItem>
              <SelectItem value="upcoming">Pagos próximos</SelectItem>
              <SelectItem value="high-interest">Altas tasas de interés</SelectItem>
            </SelectContent>
          </Select>
          
          <div>
            <p className="text-sm text-muted-foreground ml-2">
              Total: $121,000 | Interés mensual promedio: 15.6% | Pago mensual total: $9,800
            </p>
          </div>
        </div>
        
        <Dialog open={newDebtOpen} onOpenChange={setNewDebtOpen}>
          <DialogTrigger asChild>
            <Button className="bg-success hover:bg-success/90">
              <Plus className="mr-2 h-4 w-4" />
              Nueva deuda
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[90vh] overflow-auto">
            <DialogHeader>
              <DialogTitle>Agregar nueva deuda</DialogTitle>
              <DialogDescription>
                Ingresa los detalles de tu deuda para empezar a hacer seguimiento
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="name" className="text-right text-sm">Nombre</label>
                <Input id="name" value={newDebt.name} onChange={e => setNewDebt({
                ...newDebt,
                name: e.target.value
              })} className="col-span-3" placeholder="Ej: Préstamo Personal" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="totalAmount" className="text-right text-sm">Monto total</label>
                <Input id="totalAmount" value={newDebt.totalAmount} onChange={e => setNewDebt({
                ...newDebt,
                totalAmount: e.target.value
              })} className="col-span-3" type="number" placeholder="$0.00" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="remainingAmount" className="text-right text-sm">Saldo actual</label>
                <Input id="remainingAmount" value={newDebt.remainingAmount} onChange={e => setNewDebt({
                ...newDebt,
                remainingAmount: e.target.value
              })} className="col-span-3" type="number" placeholder="$0.00" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="interestRate" className="text-right text-sm">Tasa de interés (%)</label>
                <Input id="interestRate" value={newDebt.interestRate} onChange={e => setNewDebt({
                ...newDebt,
                interestRate: e.target.value
              })} className="col-span-3" type="number" placeholder="0.0%" step="0.1" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="monthlyPayment" className="text-right text-sm">Pago mensual</label>
                <Input id="monthlyPayment" value={newDebt.monthlyPayment} onChange={e => setNewDebt({
                ...newDebt,
                monthlyPayment: e.target.value
              })} className="col-span-3" type="number" placeholder="$0.00" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="nextPaymentDate" className="text-right text-sm">Próximo pago</label>
                <Input id="nextPaymentDate" value={newDebt.nextPaymentDate} onChange={e => setNewDebt({
                ...newDebt,
                nextPaymentDate: e.target.value
              })} className="col-span-3" type="date" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setNewDebtOpen(false)}>Cancelar</Button>
              <Button onClick={handleAddDebt}>Guardar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredDebts.map(debt => <Card key={debt.id} className="flex flex-col">
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
          </Card>)}
      </div>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Planes de pago</h3>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleExportPDF}>
              <Download className="mr-2 h-4 w-4" />
              PDF
            </Button>
            <Button variant="outline" onClick={handleExportExcel}>
              <Download className="mr-2 h-4 w-4" />
              Excel
            </Button>
            <Button variant="outline">
              <Plus className="mr-2 h-4 w-4" />
              Crear plan
            </Button>
          </div>
        </div>
        
        <div className="rounded-md border overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre del plan</TableHead>
                <TableHead>Descripción</TableHead>
                <TableHead>Pago mensual</TableHead>
                <TableHead>Ahorro total</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paymentPlans.map(plan => <TableRow key={plan.id}>
                  <TableCell className="font-medium">{plan.debtName}</TableCell>
                  <TableCell>{plan.description}</TableCell>
                  <TableCell>${plan.monthlyPayment.toLocaleString()}</TableCell>
                  <TableCell className="text-success">${plan.totalSavings.toLocaleString()}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${plan.active ? "bg-success/20 text-success" : "bg-muted text-muted-foreground"}`}>
                      {plan.active ? "Activo" : "Inactivo"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <span className="sr-only">Activar</span>
                        {plan.active ? <ArrowDown className="h-4 w-4" /> : <ArrowUp className="h-4 w-4" />}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>)}
            </TableBody>
          </Table>
        </div>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Simulador de pagos
              </h3>
              
              <Dialog open={simulatorOpen} onOpenChange={setSimulatorOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline">Abrir simulador</Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Simulador de pago de deudas</DialogTitle>
                    <DialogDescription>
                      Calcula cuánto tiempo tardarás en pagar tu deuda y cuánto ahorrarás aumentando tus pagos
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <label>Monto total de la deuda</label>
                        <span className="font-semibold">${simulatorValues.debtAmount.toLocaleString()}</span>
                      </div>
                      <Slider value={[simulatorValues.debtAmount]} min={1000} max={200000} step={1000} onValueChange={values => setSimulatorValues({
                      ...simulatorValues,
                      debtAmount: values[0]
                    })} />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <label>Tasa de interés anual</label>
                        <span className="font-semibold">{simulatorValues.interestRate}%</span>
                      </div>
                      <Slider value={[simulatorValues.interestRate]} min={1} max={50} step={0.5} onValueChange={values => setSimulatorValues({
                      ...simulatorValues,
                      interestRate: values[0]
                    })} />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <label>Pago mensual actual</label>
                        <span className="font-semibold">${simulatorValues.monthlyPayment.toLocaleString()}</span>
                      </div>
                      <Slider value={[simulatorValues.monthlyPayment]} min={100} max={10000} step={100} onValueChange={values => setSimulatorValues({
                      ...simulatorValues,
                      monthlyPayment: values[0]
                    })} />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <label>Pago extra mensual</label>
                        <span className="font-semibold text-success">+${simulatorValues.extraPayment.toLocaleString()}</span>
                      </div>
                      <Slider value={[simulatorValues.extraPayment]} min={0} max={5000} step={100} onValueChange={values => setSimulatorValues({
                      ...simulatorValues,
                      extraPayment: values[0]
                    })} />
                    </div>
                    
                    <div className="rounded-lg bg-muted p-4 mt-4">
                      <h4 className="font-semibold mb-2">Resultados:</h4>
                      <div className="grid grid-cols-2 gap-y-4 mt-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Tiempo para liquidar</p>
                          <p className="font-semibold">
                            {simulationResults.monthsToPayoff} meses 
                            ({Math.floor(simulationResults.monthsToPayoff / 12)} años 
                            {simulationResults.monthsToPayoff % 12 > 0 ? ` ${simulationResults.monthsToPayoff % 12} meses` : ''})
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Total de intereses</p>
                          <p className="font-semibold">${simulationResults.totalInterest.toLocaleString()}</p>
                        </div>
                        <div className="col-span-2">
                          <p className="text-sm text-muted-foreground">Total a pagar</p>
                          <p className="font-semibold">${simulationResults.totalPaid.toLocaleString()}</p>
                        </div>
                      </div>
                      
                      {simulatorValues.extraPayment > 0 && <div className="mt-4 p-2 rounded bg-success/10 text-sm">
                          <p className="text-success font-semibold">
                            ¡Con pagos extra ahorrarás aproximadamente $
                            {Math.round(simulatorValues.debtAmount * (1 + simulatorValues.interestRate / 100) - simulationResults.totalPaid).toLocaleString()}
                            !
                          </p>
                        </div>}
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={() => setSimulatorOpen(false)}>Cerrar</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            
            <div className="bg-muted/50 p-4 rounded-lg">
              <p className="text-sm mb-4">
                ¿Qué pasaría si aumentas tu pago mensual? Prueba nuestro simulador para ver cómo afectaría tu deuda.
              </p>
              <Button variant="outline" onClick={() => setSimulatorOpen(true)}>Abrir simulador</Button>
            </div>
            
            <div className="mt-6 flex justify-end">
              <Button variant="outline" size="sm" onClick={handleShare} className="ml-auto">
                <Share2 className="mr-2 h-4 w-4" />
                Compartir CashBot
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>;
};
export default DebtTab;