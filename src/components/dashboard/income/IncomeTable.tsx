import React, { useMemo, useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Download, AlertCircle, Trash2, Edit } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import EmptyState from "@/components/EmptyState";
import { useDeleteIncome, useIncomesMonthSummary } from "@/hooks/incomes";
import { IncomeRow } from "@/types/incomes";
import { toast } from "sonner";
import * as XLSX from "xlsx";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import EditIncomeDialog from "./EditIncomeDialog";
import {
  computeTotalsByCurrency,
  formatAmountWithCurrency,
  formatCurrencyTotals,
} from "@/utils/currency";
import {
  getIncomeCategoryColor as getCategoryColor,
  getIncomeCategoryName,
  getIncomeDescription as getDescription,
  isCustomIncomeCategory as isCustomCategory,
} from "@/utils/incomes";

interface IncomeTableProps {
  categoryFilter: string;
  searchQuery: string;
}

const MONTH_NAMES = [
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

// La fecha llega como YYYY-MM-DD: se construye local para que no reste un día
// al pasar por UTC.
const formatDate = (value: string | null) => {
  if (!value) return "-";
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    const [year, month, day] = value.split("-");
    return new Date(
      Number(year),
      Number(month) - 1,
      Number(day)
    ).toLocaleDateString("es-CO", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  }
  return new Date(value).toLocaleDateString("es-CO", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};

const IncomeTable: React.FC<IncomeTableProps> = ({
  categoryFilter,
  searchQuery,
}) => {
  const today = new Date();
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(today.getFullYear());
  const [incomeToDelete, setIncomeToDelete] = useState<IncomeRow | null>(null);
  const [incomeToEdit, setIncomeToEdit] = useState<IncomeRow | null>(null);

  const deleteIncome = useDeleteIncome();
  const { data, isLoading, error } = useIncomesMonthSummary(
    selectedMonth,
    selectedYear
  );

  const years = Array.from({ length: 5 }, (_, i) => today.getFullYear() - i);

  const filteredIncomes = useMemo(() => {
    const incomes = data?.incomes ?? [];
    let filtered = [...incomes];

    if (categoryFilter !== "all") {
      filtered = filtered.filter(
        (income) =>
          getIncomeCategoryName(income).toLowerCase() ===
          categoryFilter.toLowerCase()
      );
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (income) =>
          getDescription(income).toLowerCase().includes(query) ||
          getIncomeCategoryName(income).toLowerCase().includes(query) ||
          income.currency.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [data, categoryFilter, searchQuery]);

  // Nunca se suman monedas distintas: un total por moneda.
  const totalsByCurrency = useMemo(
    () => computeTotalsByCurrency(filteredIncomes),
    [filteredIncomes]
  );

  const handleExportExcel = () => {
    if (!filteredIncomes.length) {
      toast.error("No hay datos para exportar");
      return;
    }

    try {
      const excelData = filteredIncomes.map((income) => ({
        Descripción: getDescription(income),
        Categoría: getIncomeCategoryName(income) || "Sin categoría",
        Monto: Number(income.amount),
        Moneda: income.currency,
        Fecha: formatDate(income.received_at),
      }));

      const worksheet = XLSX.utils.json_to_sheet(excelData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Ingresos");

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
      link.download = `ingresos_${selectedYear}_${monthStr}.xlsx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast.success("Archivo Excel descargado exitosamente");
    } catch (exportError) {
      console.error("Error al exportar a Excel:", exportError);
      toast.error("Error al exportar a Excel");
    }
  };

  const handleConfirmDelete = async () => {
    if (!incomeToDelete) return;

    try {
      await deleteIncome.mutateAsync(incomeToDelete.id);
      toast.success("Ingreso eliminado exitosamente");
    } catch (deleteError) {
      toast.error("Error al eliminar el ingreso");
    } finally {
      setIncomeToDelete(null);
    }
  };

  const emptyState = (
    <EmptyState
      title="Sin ingresos registrados"
      description="Registra tu primer ingreso por WhatsApp, Telegram o desde el chat de Tresqu"
    />
  );

  return (
    <>
      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Select
              value={selectedMonth.toString()}
              onValueChange={(value) => setSelectedMonth(parseInt(value))}
            >
              <SelectTrigger className="w-[140px] h-8 text-xs">
                <SelectValue placeholder="Mes" />
              </SelectTrigger>
              <SelectContent>
                {MONTH_NAMES.map((month, index) => (
                  <SelectItem key={month} value={(index + 1).toString()}>
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
          <Button
            variant="outline"
            size="sm"
            onClick={handleExportExcel}
            className="h-8 text-xs glass"
          >
            <Download className="mr-1 h-3 w-3" />
            Excel
          </Button>
        </div>

        {/* Vista mobile: cards */}
        <div className="sm:hidden space-y-2 max-h-[400px] overflow-y-auto">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div
                key={`mobile-skeleton-${i}`}
                className="glass-card p-3 space-y-2"
              >
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-4 w-20" />
                </div>
                <div className="flex justify-between">
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="h-3 w-16" />
                </div>
              </div>
            ))
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-8">
              <AlertCircle className="h-8 w-8 text-destructive mb-2" />
              <p className="text-sm text-muted-foreground">
                Error al cargar los datos de ingresos
              </p>
            </div>
          ) : filteredIncomes.length === 0 ? (
            emptyState
          ) : (
            filteredIncomes.map((income) => (
              <div key={income.id} className="glass-card p-3 space-y-1.5">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {getDescription(income)}
                    </p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      {getCategoryColor(income) && (
                        <div
                          className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                          style={{ backgroundColor: getCategoryColor(income) }}
                        />
                      )}
                      <span className="text-xs text-muted-foreground">
                        {getIncomeCategoryName(income) || "Sin categoría"}
                      </span>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0 ml-3">
                    <p className="text-sm font-bold text-success">
                      {formatAmountWithCurrency(income.amount, income.currency)}
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      {formatDate(income.received_at)}
                    </p>
                  </div>
                </div>
                <div className="flex justify-end gap-1 pt-1 border-t border-border/50">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 w-7 p-0"
                    onClick={() => setIncomeToEdit(income)}
                    aria-label="Editar ingreso"
                  >
                    <Edit className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 w-7 p-0 hover:text-destructive"
                    onClick={() => setIncomeToDelete(income)}
                    aria-label="Eliminar ingreso"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Vista desktop: tabla */}
        <div className="hidden sm:block rounded-md border overflow-x-auto max-h-[300px] sm:max-h-[400px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs">Descripción</TableHead>
                <TableHead className="text-xs">Categoría</TableHead>
                <TableHead className="text-xs">Monto</TableHead>
                <TableHead className="text-xs">Moneda</TableHead>
                <TableHead className="text-xs">Fecha</TableHead>
                <TableHead className="text-xs w-[80px]">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <TableRow key={`skeleton-${i}`}>
                    {Array.from({ length: 6 }).map((__, cell) => (
                      <TableCell key={`skeleton-cell-${cell}`} className="py-2">
                        <Skeleton className="h-4 w-20" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : error ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <AlertCircle className="h-8 w-8 text-destructive mb-2" />
                      <p className="text-sm text-muted-foreground">
                        Error al cargar los datos de ingresos
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : filteredIncomes.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6}>{emptyState}</TableCell>
                </TableRow>
              ) : (
                filteredIncomes.map((income) => (
                  <TableRow key={income.id} className="hover:bg-muted/50">
                    <TableCell className="py-2 text-xs sm:text-sm">
                      {getDescription(income)}
                    </TableCell>
                    <TableCell className="py-2 text-xs sm:text-sm">
                      <div className="flex items-center gap-2">
                        {getCategoryColor(income) && (
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: getCategoryColor(income) }}
                          />
                        )}
                        <span>
                          {getIncomeCategoryName(income) || "Sin categoría"}
                          {isCustomCategory(income) && " ★"}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="py-2 text-xs sm:text-sm whitespace-nowrap">
                      {parseFloat(income.amount).toLocaleString("es-CO", {
                        maximumFractionDigits:
                          income.currency === "COP" ? 0 : 2,
                      })}
                    </TableCell>
                    <TableCell className="py-2 text-xs sm:text-sm">
                      {income.currency}
                    </TableCell>
                    <TableCell className="py-2 text-xs sm:text-sm whitespace-nowrap">
                      {formatDate(income.received_at)}
                    </TableCell>
                    <TableCell className="py-2 text-xs sm:text-sm">
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 hover:bg-blue-50 hover:text-blue-600"
                          onClick={() => setIncomeToEdit(income)}
                          aria-label="Editar ingreso"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
                          onClick={() => setIncomeToDelete(income)}
                          aria-label="Eliminar ingreso"
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
          <p className="text-xs sm:text-sm text-muted-foreground">
            Total:{" "}
            <span className="font-semibold">
              {formatCurrencyTotals(totalsByCurrency)}
            </span>
          </p>
          <p className="text-xs text-muted-foreground">
            {filteredIncomes.length} ingreso
            {filteredIncomes.length === 1 ? "" : "s"} en{" "}
            {MONTH_NAMES[selectedMonth - 1]} {selectedYear}
          </p>
        </div>
      </div>

      <Dialog
        open={!!incomeToDelete}
        onOpenChange={() => setIncomeToDelete(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>¿Eliminar ingreso?</DialogTitle>
            <DialogDescription>
              ¿Estás seguro de que deseas eliminar este ingreso? Esta acción no
              se puede deshacer.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIncomeToDelete(null)}
              disabled={deleteIncome.isPending}
            >
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={handleConfirmDelete}
              disabled={deleteIncome.isPending}
            >
              {deleteIncome.isPending ? "Eliminando..." : "Eliminar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <EditIncomeDialog
        income={incomeToEdit}
        onClose={() => setIncomeToEdit(null)}
      />
    </>
  );
};

export default IncomeTable;
