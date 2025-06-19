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
import { Search, Download, AlertCircle, Trash2, Edit } from "lucide-react";
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
}

interface ExpensesData {
  by_category: Record<string, number>;
  total: number;
  recent_expenses: Expense[];
}

const ExpensesTable: React.FC<ExpensesTableProps> = ({
  categoryFilter,
  onCategoryClick,
  onShare,
  dateRange,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [expenseToDelete, setExpenseToDelete] = useState<Expense | null>(null);
  const [expenseToEdit, setExpenseToEdit] = useState<Expense | null>(null);
  const deleteExpense = useDeleteExpense();

  const fetchExpenses = async (): Promise<ExpensesData> => {
    const token = getAccessToken();
    if (!token) {
      throw new Error("No auth token available");
    }

    const response = await fetch(
      `${env.apiUrl}/api/expenses/summary/?months=1`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Error fetching expenses: ${response.status}`);
    }

    return await response.json();
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["expensesData"],
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

  // Filter expenses based on search query and category filter
  const filteredExpenses = React.useMemo(() => {
    if (!data?.recent_expenses) return [];

    let filtered = [...data.recent_expenses];

    // Apply category filter
    if (categoryFilter !== "all") {
      filtered = filtered.filter(
        (expense) =>
          expense.category_str.toLowerCase() === categoryFilter.toLowerCase()
      );
    }

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (expense) =>
          expense.note.toLowerCase().includes(query) ||
          expense.category_str.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [data, categoryFilter, searchQuery]);

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

  const handleExportExcel = () => {
    if (!filteredExpenses.length) {
      toast.error("No hay datos para exportar");
      return;
    }

    try {
      const excelData = filteredExpenses.map((expense) => ({
        Descripción: expense.note || "Sin descripción",
        Categoría: expense.category_str || "Sin categoría",
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
      link.download = `gastos_${new Date().toISOString().split("T")[0]}.xlsx`;
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
            <h3 className="text-base sm:text-lg font-semibold mb-2 gradient-text">
              Historial de Gastos del mes{" "}
              {new Date().toLocaleDateString("es-CO", {
                month: "long",
                year: "numeric",
              })}
            </h3>
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
                  <TableHead className="text-xs">Descripción</TableHead>
                  <TableHead className="text-xs">Categoría</TableHead>
                  <TableHead className="text-xs">Monto</TableHead>
                  <TableHead className="text-xs">Fecha</TableHead>
                  <TableHead className="text-xs w-[80px]">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
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
                    <TableCell colSpan={5} className="h-24 text-center">
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
                    <TableCell colSpan={5} className="h-24 text-center">
                      <p className="text-sm text-muted-foreground">
                        No hay gastos que mostrar
                      </p>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredExpenses.map((expense) => (
                    <TableRow key={expense.id} className="hover:bg-muted/50">
                      <TableCell className="py-2 text-xs sm:text-sm">
                        {expense.note || "Sin descripción"}
                      </TableCell>
                      <TableCell className="py-2 text-xs sm:text-sm">
                        {expense.category_str || "Sin categoría"}
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
    </>
  );
};

export default ExpensesTable;
