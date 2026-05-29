import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Plus,
  BarChart3,
  Wallet,
  Download,
  Share2,
  Target,
} from "lucide-react";

// Sample data for savings history
const savingsHistory = [
  {
    month: "Enero 2025",
    saved: 1500,
    target: 2000,
    percentage: 75,
  },
  {
    month: "Febrero 2025",
    saved: 2200,
    target: 2000,
    percentage: 110,
  },
  {
    month: "Marzo 2025",
    saved: 1800,
    target: 2000,
    percentage: 90,
  },
  {
    month: "Abril 2025",
    saved: 2500,
    target: 2000,
    percentage: 125,
  },
];

// Sample data for savings goals
const savingsGoalsData = [
  {
    id: 1,
    name: "Viaje a Cancún",
    target: 15000,
    saved: 9000,
    deadline: "2025-08-01",
    monthlyGoal: 2000,
    progress: 60,
  },
  {
    id: 2,
    name: "MacBook Pro",
    target: 25000,
    saved: 5000,
    deadline: "2025-12-15",
    monthlyGoal: 3000,
    progress: 20,
  },
  {
    id: 3,
    name: "Fondo de emergencia",
    target: 50000,
    saved: 20000,
    deadline: "2026-01-30",
    monthlyGoal: 3500,
    progress: 40,
  },
];
const SavingsGoalsTab = () => {
  const [timeFilter, setTimeFilter] = useState("year");
  const [newGoalOpen, setNewGoalOpen] = useState(false);
  const [newGoal, setNewGoal] = useState({
    name: "",
    target: "",
    deadline: "",
  });
  const handleCreateGoal = () => {
    // Here you would add the logic to create a new goal
    console.log("Creating new goal:", newGoal);

    // Close the dialog and reset form
    setNewGoalOpen(false);
    setNewGoal({
      name: "",
      target: "",
      deadline: "",
    });
  };
  return (
    <div className="space-y-6 py-0 my-[60px]">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          <Select value={timeFilter} onValueChange={setTimeFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">Este mes</SelectItem>
              <SelectItem value="quarter">Trimestre</SelectItem>
              <SelectItem value="year">Este año</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Dialog open={newGoalOpen} onOpenChange={setNewGoalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-success hover:bg-success/90">
              <Plus className="mr-2 h-4 w-4" />
              Nueva meta de ahorro
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Crear nueva meta de ahorro</DialogTitle>
              <DialogDescription>
                Define tu meta de ahorro con un nombre, cantidad y fecha límite.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="name" className="text-right text-sm">
                  Nombre
                </label>
                <Input
                  id="name"
                  value={newGoal.name}
                  onChange={(e) =>
                    setNewGoal({
                      ...newGoal,
                      name: e.target.value,
                    })
                  }
                  className="col-span-3"
                  placeholder="Ej: Viaje a Europa"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="target" className="text-right text-sm">
                  Monto
                </label>
                <Input
                  id="target"
                  value={newGoal.target}
                  onChange={(e) =>
                    setNewGoal({
                      ...newGoal,
                      target: e.target.value,
                    })
                  }
                  className="col-span-3"
                  type="number"
                  placeholder="$0.00"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="deadline" className="text-right text-sm">
                  Fecha límite
                </label>
                <Input
                  id="deadline"
                  value={newGoal.deadline}
                  onChange={(e) =>
                    setNewGoal({
                      ...newGoal,
                      deadline: e.target.value,
                    })
                  }
                  className="col-span-3"
                  type="date"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setNewGoalOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleCreateGoal}>Crear meta</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Resumen de ahorros
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-muted/30 p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">Ahorrado este mes</p>
              <p className="text-2xl font-bold text-success">$2,500</p>
              <p className="text-sm text-success flex items-center mt-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4 mr-1"
                >
                  <path d="m18 8-6-6-6 6" />
                  <path d="M18 22H6a2 2 0 0 1-2-2V8" />
                </svg>
                12% vs. mes anterior
              </p>
            </div>
            <div className="bg-muted/30 p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">Total ahorrado</p>
              <p className="text-2xl font-bold">$34,000</p>
              <p className="text-sm flex items-center mt-1">Desde enero 2025</p>
            </div>
            <div className="bg-muted/30 p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">
                Meta mensual sugerida
              </p>
              <p className="text-2xl font-bold text-highlight">$3,200</p>
              <p className="text-xs text-muted-foreground mt-1">
                Basado en tus ingresos y gastos
              </p>
            </div>
          </div>

          <div className="rounded-md border mb-6 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mes</TableHead>
                  <TableHead>Ahorrado</TableHead>
                  <TableHead>Meta</TableHead>
                  <TableHead>Progreso</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {savingsHistory.map((month, index) => (
                  <TableRow key={index}>
                    <TableCell>{month.month}</TableCell>
                    <TableCell>${month.saved.toLocaleString()}</TableCell>
                    <TableCell>${month.target.toLocaleString()}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress
                          value={month.percentage}
                          className="h-2 flex-1"
                        />
                        <span className="text-xs w-12">
                          {month.percentage}%
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" size="sm" className="mx-0 my-0 py-0 px-0">
              <Download className="mr-2 h-4 w-4" />
              Exportar PDF
            </Button>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Exportar Excel
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Metas activas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {savingsGoalsData.map((goal) => (
                <div key={goal.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-semibold">{goal.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        Meta: ${goal.target.toLocaleString()} | Fecha:{" "}
                        {new Date(goal.deadline).toLocaleDateString()}
                      </p>
                    </div>
                    <span className="text-sm bg-muted px-2 py-1 rounded-full">
                      ${goal.monthlyGoal.toLocaleString()}/mes
                    </span>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>${goal.saved.toLocaleString()} ahorrado</span>
                      <span>{goal.progress}%</span>
                    </div>
                    <Progress value={goal.progress} className="h-2" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wallet className="h-5 w-5" />
              Sugerencias de ahorro
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border rounded-lg p-4 bg-muted/30">
                <h4 className="font-semibold mb-2">Oportunidades de ahorro</h4>
                <ul className="space-y-2 pl-5 list-disc">
                  <li className="text-sm">
                    Reducir gastos en{" "}
                    <span className="font-medium">Entretenimiento</span> podría
                    ahorrarte{" "}
                    <span className="text-success font-medium">$800/mes</span>
                  </li>
                  <li className="text-sm">
                    Has gastado un 30% más en{" "}
                    <span className="font-medium">Restaurantes</span> este mes
                  </li>
                  <li className="text-sm">
                    Ideal para ahorrar:{" "}
                    <span className="text-highlight font-medium">15-20%</span>{" "}
                    de tus ingresos mensuales
                  </li>
                </ul>
              </div>

              <div className="border rounded-lg p-4 bg-success/10">
                <h4 className="font-semibold mb-2">
                  Plan automático de ahorro
                </h4>
                <p className="text-sm mb-2">
                  Basado en tus ingresos y gastos, te sugerimos ahorrar:
                </p>
                <div className="bg-card p-3 rounded-lg mb-4">
                  <span className="text-xl font-bold text-success">
                    $3,200 mensuales
                  </span>
                </div>
                <Button size="sm">Activar plan automático</Button>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              <Share2 className="mr-2 h-4 w-4" />
              Compartir Tresqu con amigos
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};
export default SavingsGoalsTab;
