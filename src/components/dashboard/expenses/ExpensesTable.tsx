import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Search,
  Download,
  AlertCircle,
  Trash2,
  Edit,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getAccessToken } from "@/services/authService";
import { toast } from "sonner";
import { DateRange } from "../DateRangePicker";
import { env } from "@/config";
import * as XLSX from "xlsx";
import { useDeleteExpense } from "@/hooks/expenses";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import EditExpenseDialog from "./EditExpenseDialog";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ExpensesTableProps {
  categoryFilter: string;
  onCategoryClick: (category: string) => void;
  onShare: () => void;
  dateRange?: DateRange;
}

interface Expense {
  id: number;
  user: number;
  amount: string;
  currency: string;
  description: string;
  timestamp: string;
  raw_message: string;
  created_at: string;
  updated_at: string;
  category: number | null;
  category_str: string;
  spent_at: string;
  note: string;

  // ✅ MIGRACIÓN: Nuevos campos para categorías por usuario
  user_expense_category?: {
    id: number;
    name: string;
    color: string;
    is_default: boolean;
    description?: string;
    examples?: string;
  };

  // 🎯 Campo híbrido que prioriza categoría del usuario
  category_name?: string;

  // 📊 Categoría actual (campo calculado del backend)
  current_category?: {
    id: number;
    name: string;
    color: string;
    description?: string;
    is_default: boolean;
    type: string;
  };
}

interface ExpensesData {
  by_category: Record<string, number>;
  total: number;
  recent_expenses: Expense[];
}

type SortField = "date" | "amount" | "category" | "description";
type SortOrder = "asc" | "desc" | null;

const ExpensesTable: React.FC<ExpensesTableProps> = ({
  categoryFilter,
  onCategoryClick,
  onShare,
  dateRange,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [expenseToDelete, setExpenseToDelete] = useState<Expense | null>(null);
  const [expenseToEdit, setExpenseToEdit] = useState<Expense | null>(null);
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>(null);
  const [selectedExpenses, setSelectedExpenses] = useState<Set<number>>(
    new Set()
  );
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const deleteExpense = useDeleteExpense();

  // Estado para mes y año seleccionados
  const currentDate = new Date();
  const [selectedMonth, setSelectedMonth] = useState<number>(
    currentDate.getMonth() + 1
  );
  const [selectedYear, setSelectedYear] = useState<number>(
    currentDate.getFullYear()
  );

  // Generar lista de años (últimos 5 años hasta el año actual)
  const currentYear = currentDate.getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - i);

  // Nombres de meses en español
  const monthNames = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const fetchExpenses = async (): Promise<ExpensesData> => {
    const token = getAccessToken();
    if (!token) {
      throw new Error("No auth token available");
    }

    // Construir URL con month y year
    const url = `${env.apiUrl}/api/expenses/summary/?month=${selectedMonth}&year=${selectedYear}`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching expenses: ${response.status}`);
    }

    return await response.json();
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["expensesData", selectedMonth, selectedYear],
    queryFn: fetchExpenses,
    retry: 1,
  });

  // Show error toast if the fetch fails
  React.useEffect(() => {
    if (error) {
      toast.error("No se pudieron cargar los gastos recientes");
      console.error("Error loading expenses:", error);
    }
  }, [error]);

  // Helper para obtener el nombre correcto de la categoría
  const getCategoryName = (expense: Expense): string => {
    // Prioridad: current_category > user_expense_category > category_str
    if (expense.current_category?.name) {
      return expense.current_category.name;
    }
    if (expense.user_expense_category?.name) {
      return expense.user_expense_category.name;
    }
    return expense.category_str || "Sin categoría";
  };

  // Filter and sort expenses based on search query, category filter, and sorting
  const filteredExpenses = React.useMemo(() => {
    if (!data?.recent_expenses) return [];

    let filtered = [...data.recent_expenses];

    // Apply category filter
    if (categoryFilter !== "all") {
      filtered = filtered.filter((expense) => {
        const categoryName = getCategoryName(expense);
        return categoryName.toLowerCase() === categoryFilter.toLowerCase();
      });
    }

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((expense) => {
        const categoryName = getCategoryName(expense);
        return (
          expense.note.toLowerCase().includes(query) ||
          categoryName.toLowerCase().includes(query)
        );
      });
    }

    // Apply sorting
    if (sortField && sortOrder) {
      filtered.sort((a, b) => {
        let comparison = 0;

        switch (sortField) {
          case "date":
            comparison =
              new Date(a.spent_at).getTime() - new Date(b.spent_at).getTime();
            break;
          case "amount":
            comparison = parseFloat(a.amount) - parseFloat(b.amount);
            break;
          case "category":
            comparison = getCategoryName(a).localeCompare(getCategoryName(b));
            break;
          case "description":
            comparison = (a.note || "").localeCompare(b.note || "");
            break;
        }

        return sortOrder === "asc" ? comparison : -comparison;
      });
    }

    return filtered;
  }, [data, categoryFilter, searchQuery, sortField, sortOrder]);

  const totalAmount = React.useMemo(() => {
    if (!filteredExpenses?.length) return 0;

    return filteredExpenses.reduce((total, expense) => {
      const amount = parseFloat(expense.amount);
      const multiplier = expense.currency === "USD" ? 4000 : 1;
      return total + amount * multiplier;
    }, 0);
  }, [filteredExpenses]);

  const formatDate = (dateString: string) => {
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
      const [year, month, day] = dateString.split("-");
      const date = new Date(Number(year), Number(month) - 1, Number(day));
      return date.toLocaleDateString("es-CO", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
    }
    const date = new Date(dateString);
    return date.toLocaleDateString("es-CO", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  // Función para manejar el ordenamiento
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      // Si ya está ordenado por este campo, cambiar el orden
      if (sortOrder === "asc") {
        setSortOrder("desc");
      } else if (sortOrder === "desc") {
        setSortOrder(null);
        setSortField(null);
      }
    } else {
      // Nuevo campo, empezar con orden ascendente
      setSortField(field);
      setSortOrder("asc");
    }
  };

  // Función para renderizar el icono de ordenamiento
  const renderSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <ArrowUpDown className="ml-1 h-3 w-3 inline" />;
    }
    if (sortOrder === "asc") {
      return <ArrowUp className="ml-1 h-3 w-3 inline" />;
    }
    if (sortOrder === "desc") {
      return <ArrowDown className="ml-1 h-3 w-3 inline" />;
    }
    return <ArrowUpDown className="ml-1 h-3 w-3 inline" />;
  };

  // Función para seleccionar/deseleccionar todos
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allIds = new Set(filteredExpenses.map((expense) => expense.id));
      setSelectedExpenses(allIds);
    } else {
      setSelectedExpenses(new Set());
    }
  };

  // Función para seleccionar/deseleccionar individual
  const handleSelectExpense = (expenseId: number, checked: boolean) => {
    const newSelected = new Set(selectedExpenses);
    if (checked) {
      newSelected.add(expenseId);
    } else {
      newSelected.delete(expenseId);
    }
    setSelectedExpenses(newSelected);
  };

  // Función para eliminar múltiples gastos
  const handleDeleteSelected = async () => {
    if (selectedExpenses.size === 0) return;

    try {
      // Eliminar cada gasto seleccionado
      const deletePromises = Array.from(selectedExpenses).map((id) =>
        deleteExpense.mutateAsync(id)
      );

      await Promise.all(deletePromises);

      toast.success(
        `${selectedExpenses.size} gasto(s) eliminado(s) exitosamente`
      );
      setSelectedExpenses(new Set());
      setShowDeleteDialog(false);
    } catch (error) {
      toast.error("Error al eliminar algunos gastos");
    }
  };

  // ✅ Helper para obtener el color de la categoría
  const getCategoryColor = (expense: Expense): string | undefined => {
    if (expense.current_category?.color) {
      return expense.current_category.color;
    }
    if (expense.user_expense_category?.color) {
      return expense.user_expense_category.color;
    }
    return undefined;
  };

  // ✅ Helper para verificar si es categoría personalizada
  const isCustomCategory = (expense: Expense): boolean => {
    if (expense.current_category) {
      return !expense.current_category.is_default;
    }
    if (expense.user_expense_category) {
      return !expense.user_expense_category.is_default;
    }
    return false;
  };

  const handleExportExcel = () => {
    if (!filteredExpenses.length) {
      toast.error("No hay datos para exportar");
      return;
    }

    try {
      const excelData = filteredExpenses.map((expense) => ({
        Descripción: expense.note || "Sin descripción",
        Categoría: getCategoryName(expense), // ✅ Usar nombre correcto de categoría
        Monto: Number(expense.amount),
        Moneda: expense.currency,
        Fecha: formatDate(expense.spent_at),
      }));

      const worksheet = XLSX.utils.json_to_sheet(excelData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Gastos");

      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });
      const blob = new Blob([excelBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      const monthStr = String(selectedMonth).padStart(2, "0");
      link.download = `gastos_${selectedYear}_${monthStr}.xlsx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast.success("Archivo Excel descargado exitosamente");
    } catch (error) {
      console.error("Error al exportar a Excel:", error);
      toast.error("Error al exportar a Excel");
    }
  };

  const handleDeleteClick = (e: React.MouseEvent, expense: Expense) => {
    e.stopPropagation();
    setExpenseToDelete(expense);
  };

  const handleEditClick = (e: React.MouseEvent, expense: Expense) => {
    e.stopPropagation();
    setExpenseToEdit(expense);
  };

  const handleConfirmDelete = async () => {
    if (!expenseToDelete) return;

    try {
      await deleteExpense.mutateAsync(expenseToDelete.id);
      toast.success("Gasto eliminado exitosamente");
    } catch (error) {
      toast.error("Error al eliminar el gasto");
    } finally {
      setExpenseToDelete(null);
    }
  };

  const handleEditSuccess = () => {
    // El hook se encarga de refrescar los datos automáticamente
  };

  return (
    <>
      <Card>
        <CardContent className="pt-4 sm:pt-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
              <h3 className="text-base sm:text-lg font-semibold mb-2 gradient-text">
                Historial de Gastos del mes{" "}
                {monthNames[selectedMonth - 1]} {selectedYear}
              </h3>
              <div className="flex items-center gap-2">
                <Select
                  value={selectedMonth.toString()}
                  onValueChange={(value) => setSelectedMonth(parseInt(value))}
                >
                  <SelectTrigger className="w-[140px] h-8 text-xs">
                    <SelectValue placeholder="Mes" />
                  </SelectTrigger>
                  <SelectContent>
                    {monthNames.map((month, index) => (
                      <SelectItem key={index + 1} value={(index + 1).toString()}>
                        {month}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select
                  value={selectedYear.toString()}
                  onValueChange={(value) => setSelectedYear(parseInt(value))}
                >
                  <SelectTrigger className="w-[100px] h-8 text-xs">
                    <SelectValue placeholder="Año" />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:flex-none">
                <Input
                  type="search"
                  placeholder="Buscar gastos..."
                  className="pl-6 xs:pl-8 h-7 xs:h-8 sm:h-9 w-full sm:w-[250px] text-xs"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="hidden sm:flex items-center gap-2">
                {selectedExpenses.size > 0 && (
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => setShowDeleteDialog(true)}
                    className="h-9 text-xs"
                  >
                    <Trash2 className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                    Eliminar ({selectedExpenses.size})
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleExportExcel}
                  className="h-9 text-xs"
                >
                  <Download className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                  Excel
                </Button>
              </div>
            </div>
          </div>

          <div className="rounded-md border overflow-x-auto max-h-[300px] sm:max-h-[400px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs w-[40px]">
                    <Checkbox
                      checked={
                        selectedExpenses.size === filteredExpenses.length &&
                        filteredExpenses.length > 0
                      }
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead
                    className="text-xs cursor-pointer hover:bg-muted/50"
                    onClick={() => handleSort("description")}
                  >
                    Descripción {renderSortIcon("description")}
                  </TableHead>
                  <TableHead
                    className="text-xs cursor-pointer hover:bg-muted/50"
                    onClick={() => handleSort("category")}
                  >
                    Categoría {renderSortIcon("category")}
                  </TableHead>
                  <TableHead
                    className="text-xs cursor-pointer hover:bg-muted/50"
                    onClick={() => handleSort("amount")}
                  >
                    Monto {renderSortIcon("amount")}
                  </TableHead>
                  <TableHead
                    className="text-xs cursor-pointer hover:bg-muted/50"
                    onClick={() => handleSort("date")}
                  >
                    Fecha {renderSortIcon("date")}
                  </TableHead>
                  <TableHead className="text-xs w-[80px]">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-success mb-2"></div>
                        <p className="text-sm text-muted-foreground">
                          Cargando gastos...
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : error ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <AlertCircle className="h-8 w-8 text-destructive mb-2" />
                        <p className="text-sm text-muted-foreground">
                          Error al cargar los datos
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : filteredExpenses.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      <p className="text-sm text-muted-foreground">
                        No hay gastos que mostrar
                      </p>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredExpenses.map((expense) => (
                    <TableRow key={expense.id} className="hover:bg-muted/50">
                      <TableCell className="py-2 text-xs sm:text-sm">
                        <Checkbox
                          checked={selectedExpenses.has(expense.id)}
                          onCheckedChange={(checked) =>
                            handleSelectExpense(expense.id, checked as boolean)
                          }
                        />
                      </TableCell>
                      <TableCell className="py-2 text-xs sm:text-sm">
                        {expense.note || "Sin descripción"}
                      </TableCell>
                      <TableCell className="py-2 text-xs sm:text-sm">
                        <div className="flex items-center gap-2">
                          {getCategoryColor(expense) && (
                            <div
                              className="w-3 h-3 rounded-full"
                              style={{
                                backgroundColor: getCategoryColor(expense),
                              }}
                            ></div>
                          )}
                          <span>
                            {getCategoryName(expense)}
                            {isCustomCategory(expense) && " ★"}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="py-2 text-xs sm:text-sm">
                        {parseFloat(expense.amount).toLocaleString("es-CO")}{" "}
                        {expense.currency}
                      </TableCell>
                      <TableCell className="py-2 text-xs sm:text-sm whitespace-nowrap">
                        {formatDate(expense.spent_at)}
                      </TableCell>
                      <TableCell className="py-2 text-xs sm:text-sm">
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 hover:bg-blue-50 hover:text-blue-600"
                            onClick={(e) => handleEditClick(e, expense)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
                            onClick={(e) => handleDeleteClick(e, expense)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          <div className="flex flex-wrap justify-between items-center gap-2 mt-3 sm:mt-4">
            <div>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Total:{" "}
                <span className="font-semibold">
                  ${totalAmount.toLocaleString("es-CO")} COP
                </span>
              </p>
            </div>

            <div className="flex sm:hidden gap-2">
              {selectedExpenses.size > 0 && (
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => setShowDeleteDialog(true)}
                  className="h-8 text-xs"
                >
                  <Trash2 className="mr-1 h-3 w-3" />
                  Eliminar ({selectedExpenses.size})
                </Button>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={handleExportExcel}
                className="h-8 text-xs"
              >
                <Download className="mr-1 h-3 w-3" />
                Excel
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Dialog para confirmar eliminación */}
      <Dialog
        open={!!expenseToDelete}
        onOpenChange={() => setExpenseToDelete(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>¿Eliminar gasto?</DialogTitle>
            <DialogDescription>
              ¿Estás seguro de que deseas eliminar este gasto? Esta acción no se
              puede deshacer.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setExpenseToDelete(null)}
              disabled={deleteExpense.isPending}
            >
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={handleConfirmDelete}
              disabled={deleteExpense.isPending}
            >
              {deleteExpense.isPending ? "Eliminando..." : "Eliminar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog para editar gasto */}
      <EditExpenseDialog
        expense={expenseToEdit}
        onClose={() => setExpenseToEdit(null)}
        onSuccess={handleEditSuccess}
      />

      {/* Dialog para confirmar eliminación masiva */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>¿Eliminar gastos seleccionados?</DialogTitle>
            <DialogDescription>
              ¿Estás seguro de que deseas eliminar {selectedExpenses.size}{" "}
              gasto(s)? Esta acción no se puede deshacer.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDeleteDialog(false)}
              disabled={deleteExpense.isPending}
            >
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteSelected}
              disabled={deleteExpense.isPending}
            >
              {deleteExpense.isPending ? "Eliminando..." : "Eliminar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ExpensesTable;
