import { useState, useEffect } from "react";
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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Plus,
  BarChart3,
  Wallet,
  Download,
  Share2,
  Target,
  Play,
  Pause,
  CheckCircle,
  XCircle,
  AlertCircle,
  TrendingUp,
  Calendar,
  DollarSign,
  PiggyBank,
  Star,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Hooks personalizados
import {
  useSavingsGoals,
  useSavingsAnalytics,
  useSavingsCategoryDistribution,
  useSavingsProgressOverTime,
} from "@/hooks/useSavings";
import { useSavingsCategories } from "@/hooks/useSavingsCategories";
import { useSavingsTemplates } from "@/hooks/useSavingsTemplates";
import { useSavingsDeposits } from "@/hooks/useSavingsDeposits";

// Tipos
import {
  CreateSavingsGoalRequest,
  SavingsGoalStatus,
  SavingsGoalPriority,
  AutoSaveFrequency,
  SavingsGoalWithCategory,
  CreateSavingsDepositRequest,
} from "@/types/savings";

// Utilidades
import {
  formatCurrency,
  formatPercentage,
  formatDate,
  getPriorityText,
  getPriorityColor,
  getStatusText,
  getStatusColor,
  getProgressColor,
  getFrequencyText,
  getSavingRecommendation,
  isGoalAtRisk,
  getDaysUntilTarget,
  calculateCompletionTime,
} from "@/utils/savingsUtils";

const SavingsGoalsTab = () => {
  // Estados locales
  const [timeFilter, setTimeFilter] = useState<
    "week" | "month" | "quarter" | "year"
  >("month");
  const [statusFilter, setStatusFilter] = useState<SavingsGoalStatus | "all">(
    "all"
  );
  const [newGoalOpen, setNewGoalOpen] = useState(false);
  const [newDepositOpen, setNewDepositOpen] = useState(false);
  const [selectedGoalId, setSelectedGoalId] = useState<string>("");
  const [templatesOpen, setTemplatesOpen] = useState(false);

  // Formulario nueva meta
  const [newGoal, setNewGoal] = useState<
    Omit<CreateSavingsGoalRequest, "category"> & { category: string }
  >({
    category: "",
    name: "",
    description: "",
    target_amount: "",
    target_date: "",
    priority: "medium" as SavingsGoalPriority,
    auto_save_enabled: false,
    auto_save_amount: "",
    auto_save_frequency: "monthly" as AutoSaveFrequency,
  });

  // Formulario nuevo depósito
  const [newDeposit, setNewDeposit] = useState<CreateSavingsDepositRequest>({
    savings_goal: "",
    amount: "",
    transaction_type: "deposit",
    description: "",
    date: new Date().toISOString().split("T")[0],
  });

  // Hooks de datos
  const {
    goals,
    loading: goalsLoading,
    error: goalsError,
    createGoal,
    pauseGoal,
    resumeGoal,
    completeGoal,
    refetch: refetchGoals,
  } = useSavingsGoals({
    status: statusFilter === "all" ? undefined : statusFilter,
  });

  const { analytics, loading: analyticsLoading } = useSavingsAnalytics();

  // Comentadas temporalmente hasta implementar gráficos
  // const { distribution, loading: distributionLoading } =
  //   useSavingsCategoryDistribution();

  // const { progress, loading: progressLoading } = useSavingsProgressOverTime({
  //   period: timeFilter,
  // });

  const { categories, loading: categoriesLoading } = useSavingsCategories();

  const {
    templates,
    loading: templatesLoading,
    createGoalFromTemplate,
  } = useSavingsTemplates();

  const { createDeposit } = useSavingsDeposits();

  // Filtrar metas activas para mostrar en las cards principales
  const activeGoals = goals.filter((goal) => goal.status === "active");

  const handleCreateGoal = async () => {
    try {
      await createGoal(newGoal);
      setNewGoalOpen(false);
      resetNewGoalForm();
    } catch (error) {
      console.error("Error al crear meta:", error);
    }
  };

  const handleCreateDeposit = async () => {
    try {
      await createDeposit(newDeposit);
      setNewDepositOpen(false);
      resetNewDepositForm();
      refetchGoals(); // Actualizar metas para reflejar nuevos montos
    } catch (error) {
      console.error("Error al crear depósito:", error);
    }
  };

  const handleCreateFromTemplate = async (templateId: string) => {
    try {
      await createGoalFromTemplate(templateId);
      setTemplatesOpen(false);
      refetchGoals();
    } catch (error) {
      console.error("Error al crear meta desde plantilla:", error);
    }
  };

  const handleGoalAction = async (
    goalId: string,
    action: "pause" | "resume" | "complete"
  ) => {
    try {
      switch (action) {
        case "pause":
          await pauseGoal(goalId);
          break;
        case "resume":
          await resumeGoal(goalId);
          break;
        case "complete":
          await completeGoal(goalId);
          break;
      }
    } catch (error) {
      console.error(`Error al ${action} meta:`, error);
    }
  };

  const resetNewGoalForm = () => {
    setNewGoal({
      category: "",
      name: "",
      description: "",
      target_amount: "",
      target_date: "",
      priority: "medium",
      auto_save_enabled: false,
      auto_save_amount: "",
      auto_save_frequency: "monthly",
    });
  };

  const resetNewDepositForm = () => {
    setNewDeposit({
      savings_goal: "",
      amount: "",
      transaction_type: "deposit",
      description: "",
      date: new Date().toISOString().split("T")[0],
    });
  };

  if (goalsLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Cargando metas de ahorro...</p>
        </div>
      </div>
    );
  }

  if (goalsError) {
    return (
      <div className="space-y-6 py-0 my-[60px]">
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Error al cargar datos de ahorros: {goalsError}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="space-y-6 py-0 my-[60px]">
      {/* Header con filtros y acciones */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          <Select
            value={statusFilter}
            onValueChange={(value: SavingsGoalStatus | "all") =>
              setStatusFilter(value)
            }
          >
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas</SelectItem>
              <SelectItem value="active">Activas</SelectItem>
              <SelectItem value="completed">Completadas</SelectItem>
              <SelectItem value="paused">Pausadas</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={timeFilter}
            onValueChange={(value: typeof timeFilter) => setTimeFilter(value)}
          >
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Esta semana</SelectItem>
              <SelectItem value="month">Este mes</SelectItem>
              <SelectItem value="quarter">Trimestre</SelectItem>
              <SelectItem value="year">Este año</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2">
          {/* Botón Ver Plantillas */}
          <Dialog open={templatesOpen} onOpenChange={setTemplatesOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Star className="mr-2 h-4 w-4" />
                Plantillas
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>Plantillas de Ahorro Expertas</DialogTitle>
                <DialogDescription>
                  Elige una plantilla para crear rápidamente una meta de ahorro
                  basada en mejores prácticas financieras.
                </DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[400px] overflow-y-auto">
                {templatesLoading ? (
                  <div className="col-span-2 text-center py-8">
                    Cargando plantillas...
                  </div>
                ) : (
                  templates.map((template) => (
                    <Card
                      key={template.id}
                      className="cursor-pointer hover:shadow-md transition-shadow"
                    >
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">
                          {template.name}
                        </CardTitle>
                        <Badge
                          variant="outline"
                          style={{ color: getPriorityColor(template.priority) }}
                        >
                          {getPriorityText(template.priority)}
                        </Badge>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <p className="text-sm text-muted-foreground mb-2">
                          {template.description}
                        </p>
                        <div className="flex justify-between text-sm">
                          <span>
                            Monto sugerido:{" "}
                            {formatCurrency(template.suggested_amount)}
                          </span>
                          <span>
                            {template.suggested_timeframe_months} meses
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                          {template.financial_advice}
                        </p>
                      </CardContent>
                      <CardFooter>
                        <Button
                          onClick={() => handleCreateFromTemplate(template.id)}
                          className="w-full"
                          size="sm"
                        >
                          Crear Meta
                        </Button>
                      </CardFooter>
                    </Card>
                  ))
                )}
              </div>
            </DialogContent>
          </Dialog>

          {/* Botón Agregar Depósito */}
          <Dialog open={newDepositOpen} onOpenChange={setNewDepositOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <DollarSign className="mr-2 h-4 w-4" />
                Agregar Depósito
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Agregar Depósito</DialogTitle>
                <DialogDescription>
                  Registra un nuevo depósito a una de tus metas de ahorro.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="goal-select" className="text-right">
                    Meta
                  </Label>
                  <Select
                    value={newDeposit.savings_goal}
                    onValueChange={(value) =>
                      setNewDeposit({ ...newDeposit, savings_goal: value })
                    }
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Selecciona una meta" />
                    </SelectTrigger>
                    <SelectContent>
                      {activeGoals.map((goal) => (
                        <SelectItem key={goal.id} value={goal.id}>
                          {goal.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="deposit-amount" className="text-right">
                    Monto
                  </Label>
                  <Input
                    id="deposit-amount"
                    value={newDeposit.amount}
                    onChange={(e) =>
                      setNewDeposit({ ...newDeposit, amount: e.target.value })
                    }
                    className="col-span-3"
                    type="number"
                    placeholder="$0"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="deposit-description" className="text-right">
                    Descripción
                  </Label>
                  <Input
                    id="deposit-description"
                    value={newDeposit.description}
                    onChange={(e) =>
                      setNewDeposit({
                        ...newDeposit,
                        description: e.target.value,
                      })
                    }
                    className="col-span-3"
                    placeholder="Depósito mensual"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="deposit-date" className="text-right">
                    Fecha
                  </Label>
                  <Input
                    id="deposit-date"
                    value={newDeposit.date}
                    onChange={(e) =>
                      setNewDeposit({ ...newDeposit, date: e.target.value })
                    }
                    className="col-span-3"
                    type="date"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setNewDepositOpen(false)}
                >
                  Cancelar
                </Button>
                <Button
                  onClick={handleCreateDeposit}
                  disabled={!newDeposit.savings_goal || !newDeposit.amount}
                >
                  Agregar Depósito
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Botón Nueva Meta */}
          <Dialog open={newGoalOpen} onOpenChange={setNewGoalOpen}>
            <DialogTrigger asChild>
              <Button className="bg-success hover:bg-success/90">
                <Plus className="mr-2 h-4 w-4" />
                Nueva meta de ahorro
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Crear nueva meta de ahorro</DialogTitle>
                <DialogDescription>
                  Define tu meta de ahorro con todos los detalles necesarios.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="goal-category" className="text-right">
                    Categoría
                  </Label>
                  <Select
                    value={newGoal.category}
                    onValueChange={(value) =>
                      setNewGoal({ ...newGoal, category: value })
                    }
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Selecciona una categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          <div className="flex items-center gap-2">
                            <div
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: category.color }}
                            ></div>
                            {category.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="goal-name" className="text-right">
                    Nombre
                  </Label>
                  <Input
                    id="goal-name"
                    value={newGoal.name}
                    onChange={(e) =>
                      setNewGoal({ ...newGoal, name: e.target.value })
                    }
                    className="col-span-3"
                    placeholder="Ej: Viaje a Europa"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="goal-description" className="text-right">
                    Descripción
                  </Label>
                  <Textarea
                    id="goal-description"
                    value={newGoal.description}
                    onChange={(e) =>
                      setNewGoal({ ...newGoal, description: e.target.value })
                    }
                    className="col-span-3"
                    placeholder="Describe tu meta de ahorro..."
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="goal-amount" className="text-right">
                    Monto objetivo
                  </Label>
                  <Input
                    id="goal-amount"
                    value={newGoal.target_amount}
                    onChange={(e) =>
                      setNewGoal({ ...newGoal, target_amount: e.target.value })
                    }
                    className="col-span-3"
                    type="number"
                    placeholder="$0"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="goal-date" className="text-right">
                    Fecha objetivo
                  </Label>
                  <Input
                    id="goal-date"
                    value={newGoal.target_date}
                    onChange={(e) =>
                      setNewGoal({ ...newGoal, target_date: e.target.value })
                    }
                    className="col-span-3"
                    type="date"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="goal-priority" className="text-right">
                    Prioridad
                  </Label>
                  <Select
                    value={newGoal.priority}
                    onValueChange={(value: SavingsGoalPriority) =>
                      setNewGoal({ ...newGoal, priority: value })
                    }
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="urgent">Urgente</SelectItem>
                      <SelectItem value="high">Alta</SelectItem>
                      <SelectItem value="medium">Media</SelectItem>
                      <SelectItem value="low">Baja</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {/* Sección de ahorro automático */}
                <div className="border-t pt-4">
                  <h4 className="font-medium mb-2">
                    Ahorro Automático (Opcional)
                  </h4>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="auto-save"
                        checked={newGoal.auto_save_enabled}
                        onChange={(e) =>
                          setNewGoal({
                            ...newGoal,
                            auto_save_enabled: e.target.checked,
                          })
                        }
                      />
                      <Label htmlFor="auto-save">
                        Habilitar ahorro automático
                      </Label>
                    </div>
                    {newGoal.auto_save_enabled && (
                      <>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="auto-amount" className="text-right">
                            Monto
                          </Label>
                          <Input
                            id="auto-amount"
                            value={newGoal.auto_save_amount}
                            onChange={(e) =>
                              setNewGoal({
                                ...newGoal,
                                auto_save_amount: e.target.value,
                              })
                            }
                            className="col-span-3"
                            type="number"
                            placeholder="$0"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label
                            htmlFor="auto-frequency"
                            className="text-right"
                          >
                            Frecuencia
                          </Label>
                          <Select
                            value={newGoal.auto_save_frequency}
                            onValueChange={(value: AutoSaveFrequency) =>
                              setNewGoal({
                                ...newGoal,
                                auto_save_frequency: value,
                              })
                            }
                          >
                            <SelectTrigger className="col-span-3">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="daily">Diario</SelectItem>
                              <SelectItem value="weekly">Semanal</SelectItem>
                              <SelectItem value="monthly">Mensual</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setNewGoalOpen(false)}>
                  Cancelar
                </Button>
                <Button
                  onClick={handleCreateGoal}
                  disabled={
                    !newGoal.category ||
                    !newGoal.name ||
                    !newGoal.target_amount ||
                    !newGoal.target_date
                  }
                >
                  Crear meta
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Resumen de estadísticas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Resumen de ahorros
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-muted/30 p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">Total ahorrado</p>
              <p className="text-2xl font-bold text-success">
                {analytics ? formatCurrency(analytics.total_saved) : "..."}
              </p>
              <p className="text-sm text-muted-foreground">
                de {analytics ? formatCurrency(analytics.total_target) : "..."}{" "}
                objetivo
              </p>
            </div>
            <div className="bg-muted/30 p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">Progreso general</p>
              <p className="text-2xl font-bold text-highlight">
                {analytics
                  ? formatPercentage(analytics.overall_progress)
                  : "..."}
              </p>
              <p className="text-sm text-muted-foreground">completado</p>
            </div>
            <div className="bg-muted/30 p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">Metas activas</p>
              <p className="text-2xl font-bold">
                {analytics ? analytics.active_goals : "..."}
              </p>
              <p className="text-sm text-muted-foreground">
                de {analytics ? analytics.total_goals : "..."} totales
              </p>
            </div>
            <div className="bg-muted/30 p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">Ahorro mensual</p>
              <p className="text-2xl font-bold text-highlight">
                {analytics ? formatCurrency(analytics.monthly_deposits) : "..."}
              </p>
              <p className="text-sm text-muted-foreground">promedio</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Metas activas principales */}
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
              {activeGoals.slice(0, 3).map((goal) => {
                const goalWithCategory = goal as SavingsGoalWithCategory;
                const daysLeft = getDaysUntilTarget(goal.target_date);
                const isRisk = isGoalAtRisk(goal);

                return (
                  <div key={goal.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{
                              backgroundColor: goalWithCategory.category.color,
                            }}
                          ></div>
                          <h4 className="font-semibold">{goal.name}</h4>
                          {isRisk && (
                            <AlertCircle className="h-4 w-4 text-red-500" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Meta: {formatCurrency(goal.target_amount)} |{" "}
                          {formatDate(goal.target_date)}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {daysLeft > 0
                            ? `${daysLeft} días restantes`
                            : "Fecha vencida"}
                        </p>
                      </div>
                      <div className="flex gap-1">
                        <Badge
                          variant="outline"
                          style={{ color: getPriorityColor(goal.priority) }}
                        >
                          {getPriorityText(goal.priority)}
                        </Badge>
                        {goal.auto_save_enabled && (
                          <Badge variant="outline">
                            <PiggyBank className="h-3 w-3 mr-1" />
                            Auto
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="mb-2">
                      <div className="flex justify-between text-sm mb-1">
                        <span>
                          {formatCurrency(goal.current_amount)} ahorrado
                        </span>
                        <span>
                          {formatPercentage(goal.progress_percentage)}
                        </span>
                      </div>
                      <Progress
                        value={parseFloat(goal.progress_percentage)}
                        className="h-2"
                        style={{
                          backgroundColor: "#f0f0f0",
                        }}
                      />
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">
                        {formatCurrency(goal.daily_savings_needed)}/día
                        necesario
                      </span>
                      <div className="flex gap-1">
                        {goal.status === "active" && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleGoalAction(goal.id, "pause")}
                          >
                            <Pause className="h-3 w-3" />
                          </Button>
                        )}
                        {goal.status === "paused" && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleGoalAction(goal.id, "resume")}
                          >
                            <Play className="h-3 w-3" />
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleGoalAction(goal.id, "complete")}
                        >
                          <CheckCircle className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    {isRisk && (
                      <Alert className="mt-2">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription className="text-xs">
                          {getSavingRecommendation(goal)}
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>
                );
              })}
              {activeGoals.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <Target className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
                  <p>No tienes metas activas</p>
                  <p className="text-sm">Crea tu primera meta de ahorro</p>
                </div>
              )}
            </div>
          </CardContent>
          {activeGoals.length > 3 && (
            <CardFooter>
              <Button variant="outline" className="w-full">
                Ver todas las metas ({activeGoals.length})
              </Button>
            </CardFooter>
          )}
        </Card>

        {/* Panel de recomendaciones y analíticas */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Insights y Recomendaciones
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analytics && (
                <>
                  <div className="border rounded-lg p-4 bg-muted/30">
                    <h4 className="font-semibold mb-2">
                      Próximas completaciones
                    </h4>
                    <div className="text-sm space-y-1">
                      <p>
                        Este mes:{" "}
                        {analytics.goals_completion_prediction.this_month} metas
                      </p>
                      <p>
                        Próximos 3 meses:{" "}
                        {analytics.goals_completion_prediction.next_3_months}{" "}
                        metas
                      </p>
                      <p>
                        Próximos 6 meses:{" "}
                        {analytics.goals_completion_prediction.next_6_months}{" "}
                        metas
                      </p>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4 bg-success/10">
                    <h4 className="font-semibold mb-2">
                      Distribución por prioridad
                    </h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex justify-between">
                        <span>Urgente:</span>
                        <span className="font-medium">
                          {analytics.goals_by_priority.urgent}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Alta:</span>
                        <span className="font-medium">
                          {analytics.goals_by_priority.high}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Media:</span>
                        <span className="font-medium">
                          {analytics.goals_by_priority.medium}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Baja:</span>
                        <span className="font-medium">
                          {analytics.goals_by_priority.low}
                        </span>
                      </div>
                    </div>
                  </div>
                </>
              )}

              <div className="border rounded-lg p-4 bg-highlight/10">
                <h4 className="font-semibold mb-2">
                  Recomendaciones generales
                </h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-highlight">•</span>
                    Considera configurar ahorros automáticos para mantener
                    consistencia
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-highlight">•</span>
                    Revisa tus metas mensualmente para ajustar montos si es
                    necesario
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-highlight">•</span>
                    Prioriza las metas urgentes antes de crear nuevas metas
                  </li>
                </ul>
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

      {/* Tabla de todas las metas */}
      {goals.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Todas las metas de ahorro</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Meta</TableHead>
                    <TableHead>Categoría</TableHead>
                    <TableHead>Progreso</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Prioridad</TableHead>
                    <TableHead>Fecha objetivo</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {goals.map((goal) => {
                    const goalWithCategory = goal as SavingsGoalWithCategory;

                    return (
                      <TableRow key={goal.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{goal.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {formatCurrency(goal.current_amount)} /{" "}
                              {formatCurrency(goal.target_amount)}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div
                              className="w-3 h-3 rounded-full"
                              style={{
                                backgroundColor:
                                  goalWithCategory.category.color,
                              }}
                            ></div>
                            {goalWithCategory.category.name}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress
                              value={parseFloat(goal.progress_percentage)}
                              className="h-2 w-[80px]"
                            />
                            <span className="text-sm w-12">
                              {formatPercentage(goal.progress_percentage)}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            style={{ color: getStatusColor(goal.status) }}
                          >
                            {getStatusText(goal.status)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            style={{ color: getPriorityColor(goal.priority) }}
                          >
                            {getPriorityText(goal.priority)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="text-sm">
                              {formatDate(goal.target_date)}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {getDaysUntilTarget(goal.target_date) > 0
                                ? `${getDaysUntilTarget(goal.target_date)} días`
                                : "Vencida"}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            {goal.status === "active" && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() =>
                                  handleGoalAction(goal.id, "pause")
                                }
                              >
                                <Pause className="h-3 w-3" />
                              </Button>
                            )}
                            {goal.status === "paused" && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() =>
                                  handleGoalAction(goal.id, "resume")
                                }
                              >
                                <Play className="h-3 w-3" />
                              </Button>
                            )}
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() =>
                                handleGoalAction(goal.id, "complete")
                              }
                            >
                              <CheckCircle className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SavingsGoalsTab;
