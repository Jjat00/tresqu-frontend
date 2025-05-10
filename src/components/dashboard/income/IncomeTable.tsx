import React, { useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Download, Share2, Loader2, AlertCircle, Trash2 } from "lucide-react";
import { useIncomeSummary } from "@/hooks/useIncomeSummary";
import { IncomeSummaryItem, IncomeTableItem } from "@/types/incomes";
import { useDeleteIncome } from "@/hooks/incomes";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useQueryClient } from "@tanstack/react-query";

// Convertir los datos del resumen a un formato de tabla
const transformSummaryToTableData = (
  summary: IncomeSummaryItem[]
): IncomeTableItem[] => {
  return summary.map((item) => ({
    id: item.id,
    description: `Ingreso por ${item.category__name || "Sin categoría"}`,
    category: item.category__name || "Sin categoría",
    subcategory: "",
    amount: item.total,
    date: new Date().toISOString().split("T")[0], // Usamos la fecha actual como fallback
  }));
};

interface IncomeTableProps {
  categoryFilter: string;
  searchQuery: string;
  formatCurrency: (amount: number) => string;
  onExportPDF: () => void;
  onExportExcel: () => void;
  onShare: () => void;
  period?: "week" | "month" | "year" | "all";
}

const IncomeTable: React.FC<IncomeTableProps> = ({
  categoryFilter,
  searchQuery,
  formatCurrency,
  onExportPDF,
  onExportExcel,
  onShare,
  period = "month",
}) => {
  const [incomeToDelete, setIncomeToDelete] = useState<IncomeTableItem | null>(
    null
  );
  const deleteIncome = useDeleteIncome();
  const queryClient = useQueryClient();

  // Obtener datos del resumen de ingresos
  const { data: summaryData, isLoading, error } = useIncomeSummary({ period });

  // Estado para los datos de la tabla
  const [tableData, setTableData] = useState<IncomeTableItem[]>([]);
  const [filteredIncome, setFilteredIncome] = useState<IncomeTableItem[]>([]);

  // Transformar los datos del resumen cuando se reciben
  useEffect(() => {
    if (summaryData && summaryData.summary) {
      const transformedData = transformSummaryToTableData(summaryData.summary);
      setTableData(transformedData);
    }
  }, [summaryData]);

  // Aplicar filtros a los datos
  useEffect(() => {
    if (!tableData.length) {
      setFilteredIncome([]);
      return;
    }

    let filtered = [...tableData];

    // Aplicar filtro de categoría
    if (categoryFilter !== "all") {
      const normalizedCategoryFilter = categoryFilter
        .toLowerCase()
        .replace("salary", "empleo")
        .replace("freelance", "freelance")
        .replace("investments", "inversiones")
        .replace("other", "otros");

      filtered = filtered.filter(
        (income) => income.category.toLowerCase() === normalizedCategoryFilter
      );
    }

    // Aplicar filtro de búsqueda
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (income) =>
          income.description.toLowerCase().includes(query) ||
          income.category.toLowerCase().includes(query) ||
          (income.subcategory &&
            income.subcategory.toLowerCase().includes(query))
      );
    }

    // Ordenar por monto (mayor a menor)
    filtered.sort((a, b) => b.amount - a.amount);
    setFilteredIncome(filtered);
  }, [tableData, categoryFilter, searchQuery]);

  const handleDeleteClick = (e: React.MouseEvent, income: IncomeTableItem) => {
    e.stopPropagation();
    setIncomeToDelete(income);
  };

  const handleConfirmDelete = async () => {
    if (!incomeToDelete) return;

    try {
      await deleteIncome.mutateAsync(incomeToDelete.id);
      await queryClient.invalidateQueries({ queryKey: ["incomeSummary"] });
      toast.success("Ingreso eliminado exitosamente");
    } catch (error) {
      toast.error("Error al eliminar el ingreso");
    } finally {
      setIncomeToDelete(null);
    }
  };

  // Mostrar estado de carga
  if (isLoading) {
    return (
      <div className="space-y-3">
        <div className="rounded-md border p-8">
          <div className="flex flex-col items-center justify-center">
            <Loader2 className="h-8 w-8 text-primary animate-spin mb-2" />
            <p className="text-sm text-muted-foreground">
              Cargando datos de ingresos...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Mostrar error
  if (error) {
    return (
      <div className="space-y-3">
        <div className="rounded-md border p-8">
          <div className="flex flex-col items-center justify-center">
            <AlertCircle className="h-8 w-8 text-destructive mb-2" />
            <p className="text-sm text-muted-foreground">
              Error al cargar los datos de ingresos
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-3">
        <div className="rounded-md border overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs">Descripción</TableHead>
                <TableHead className="text-xs">Categoría</TableHead>
                <TableHead className="text-xs">Subcategoría</TableHead>
                <TableHead className="text-xs">Monto</TableHead>
                <TableHead className="text-xs">Período</TableHead>
                <TableHead className="text-xs w-[50px]">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredIncome.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center py-4 text-muted-foreground"
                  >
                    No se encontraron ingresos con los filtros actuales
                  </TableCell>
                </TableRow>
              ) : (
                filteredIncome.map((income) => (
                  <TableRow key={income.id} className="text-xs sm:text-sm">
                    <TableCell className="py-2">{income.description}</TableCell>
                    <TableCell className="py-2">{income.category}</TableCell>
                    <TableCell className="py-2">
                      {income.subcategory || "-"}
                    </TableCell>
                    <TableCell className="py-2">
                      {formatCurrency(income.amount)}
                    </TableCell>
                    <TableCell className="py-2">
                      {period === "week"
                        ? "Esta semana"
                        : period === "month"
                        ? "Este mes"
                        : period === "year"
                        ? "Este año"
                        : "Todo el período"}
                    </TableCell>
                    <TableCell className="py-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
                        onClick={(e) => handleDeleteClick(e, income)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
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
                {formatCurrency(
                  summaryData?.total ||
                    filteredIncome.reduce(
                      (sum, income) => sum + income.amount,
                      0
                    )
                )}
              </span>
            </p>
            {summaryData && summaryData.start_date && (
              <p className="text-xs text-muted-foreground">
                Desde: {new Date(summaryData.start_date).toLocaleDateString()}
              </p>
            )}
          </div>

          <div className="flex sm:hidden gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onExportExcel}
              className="h-8 text-xs"
            >
              <Download className="mr-1 h-3 w-3" />
              Excel
            </Button>
          </div>
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
    </>
  );
};

export default IncomeTable;
