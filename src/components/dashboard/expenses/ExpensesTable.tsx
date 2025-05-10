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
import { Search, Download, Share2, AlertCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getAccessToken } from "@/services/authService";
import { toast } from "sonner";
import { DateRange } from "../DateRangePicker";
import { env } from "@/config";
import * as XLSX from "xlsx";

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

  const fetchExpenses = async (): Promise<ExpensesData> => {
    const token = getAccessToken();
    if (!token) {
      throw new Error("No auth token available");
    }

    // You could modify the URL to include date range filters
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
      // Convert to number and handle multiple currencies
      const amount = parseFloat(expense.amount);
      // Simple conversion - in a real app you'd use proper currency conversion
      const multiplier = expense.currency === "USD" ? 4000 : 1; // Rough conversion USD to COP
      return total + amount * multiplier;
    }, 0);
  }, [filteredExpenses]);

  const handleExportPDF = () => {
    toast.info("Exportando a PDF...");
    console.log("Exporting expenses to PDF");
    // Implementation would go here
  };

  const handleExportExcel = () => {
    if (!filteredExpenses.length) {
      toast.error("No hay datos para exportar");
      return;
    }

    try {
      // Preparar los datos para Excel
      const excelData = filteredExpenses.map((expense) => ({
        Descripción: expense.note || "Sin descripción",
        Categoría: expense.category_str || "Sin categoría",
        Monto: `${parseFloat(expense.amount).toLocaleString("es-CO")} ${
          expense.currency
        }`,
        Fecha: formatDate(expense.spent_at),
      }));

      // Crear un nuevo libro de Excel
      const worksheet = XLSX.utils.json_to_sheet(excelData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Gastos");

      // Generar el archivo Excel
      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });
      const blob = new Blob([excelBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      // Crear un enlace de descarga
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-CO");
  };

  return (
    <Card>
      <CardContent className="pt-3 xs:pt-4 sm:pt-6 px-1 xs:px-2 sm:px-6">
        <div className="flex flex-col xs:flex-row justify-between items-start xs:items-center mb-2 xs:mb-3 sm:mb-4 gap-2">
          <h3 className="text-sm xs:text-base font-semibold">Últimos gastos</h3>
          <div className="flex items-center gap-1 xs:gap-2 w-full xs:w-auto">
            <div className="relative flex-1 xs:flex-none">
              <Search className="absolute left-2 xs:left-2.5 top-2 xs:top-2.5 h-3 xs:h-3.5 w-3 xs:w-3.5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar gastos..."
                className="pl-6 xs:pl-8 h-7 xs:h-8 sm:h-9 w-full xs:w-[200px] sm:w-[250px] text-xs"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="hidden xs:flex items-center gap-1 xs:gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleExportPDF}
                className="h-7 xs:h-8 sm:h-9 text-[10px] xs:text-xs"
              >
                <Download className="mr-1 xs:mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                PDF
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleExportExcel}
                className="h-7 xs:h-8 sm:h-9 text-[10px] xs:text-xs"
              >
                <Download className="mr-1 xs:mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                Excel
              </Button>
            </div>
          </div>
        </div>

        <div className="rounded-md border overflow-x-auto max-h-[300px] sm:max-h-[400px]">
          <Table>
            <TableHeader className="sticky top-0 bg-card z-10">
              <TableRow>
                <TableHead className="text-[10px] xs:text-xs whitespace-nowrap py-1 px-1 xs:px-2 sm:px-4">
                  Descripción
                </TableHead>
                <TableHead className="text-[10px] xs:text-xs whitespace-nowrap py-1 px-1 xs:px-2 sm:px-4">
                  Categoría
                </TableHead>
                <TableHead className="text-[10px] xs:text-xs whitespace-nowrap py-1 px-1 xs:px-2 sm:px-4">
                  Monto
                </TableHead>
                <TableHead className="text-[10px] xs:text-xs whitespace-nowrap py-1 px-1 xs:px-2 sm:px-4">
                  Fecha
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center">
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
                  <TableCell colSpan={4} className="h-24 text-center">
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
                  <TableCell colSpan={4} className="h-24 text-center">
                    <p className="text-sm text-muted-foreground">
                      No hay gastos que mostrar
                    </p>
                  </TableCell>
                </TableRow>
              ) : (
                filteredExpenses.map((expense) => (
                  <TableRow
                    key={expense.id}
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => onCategoryClick(expense.category_str)}
                  >
                    <TableCell className="py-1 sm:py-2 px-1 xs:px-2 sm:px-4 text-[10px] xs:text-xs">
                      {expense.note || "Sin descripción"}
                    </TableCell>
                    <TableCell className="py-1 sm:py-2 px-1 xs:px-2 sm:px-4 text-[10px] xs:text-xs">
                      {expense.category_str || "Sin categoría"}
                    </TableCell>
                    <TableCell className="py-1 sm:py-2 px-1 xs:px-2 sm:px-4 text-[10px] xs:text-xs">
                      {parseFloat(expense.amount).toLocaleString("es-CO")}{" "}
                      {expense.currency}
                    </TableCell>
                    <TableCell className="py-1 sm:py-2 px-1 xs:px-2 sm:px-4 text-[10px] xs:text-xs whitespace-nowrap">
                      {formatDate(expense.spent_at)}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex flex-wrap justify-between items-center gap-1 xs:gap-2 mt-2 xs:mt-3 sm:mt-4">
          <div>
            <p className="text-[10px] xs:text-xs text-muted-foreground">
              Total:{" "}
              <span className="font-semibold">
                ${totalAmount.toLocaleString("es-CO")} COP
              </span>
            </p>
          </div>

          <div className="flex xs:hidden gap-1 xs:gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleExportPDF}
              className="h-6 xs:h-7 text-[10px] xs:text-xs px-1 xs:px-2"
            >
              <Download className="mr-1 h-2.5 w-2.5 xs:h-3 xs:w-3" />
              PDF
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleExportExcel}
              className="h-6 xs:h-7 text-[10px] xs:text-xs px-1 xs:px-2"
            >
              <Download className="mr-1 h-2.5 w-2.5 xs:h-3 xs:w-3" />
              Excel
            </Button>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={onShare}
            className="ml-auto h-6 xs:h-7 sm:h-8 text-[10px] xs:text-xs px-1 xs:px-2"
          >
            <Share2 className="mr-1 h-2.5 w-2.5 xs:h-3 xs:w-3" />
            <span className="hidden xs:inline">Compartir</span>
            <span className="xs:hidden">Compartir</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExpensesTable;
