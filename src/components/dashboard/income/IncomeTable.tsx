
import React, { useState, useEffect } from "react";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Download, Share2 } from "lucide-react";

// Sample data for the income table (mantener hasta que haya una API para esto)
const allIncomeData = [{
  id: 1,
  description: "Salario",
  category: "Empleo",
  subcategory: "Salario base",
  amount: 15000,
  date: "2025-05-01"
}, {
  id: 2,
  description: "Freelance - Diseño",
  category: "Freelance",
  subcategory: "Diseño gráfico",
  amount: 3500,
  date: "2025-04-25"
}, {
  id: 3,
  description: "Dividendos",
  category: "Inversiones",
  subcategory: "Acciones",
  amount: 850,
  date: "2025-04-20"
}, {
  id: 4,
  description: "Venta de artículos",
  category: "Otros",
  subcategory: "Ventas",
  amount: 1200,
  date: "2025-04-18"
}, {
  id: 5,
  description: "Bonificación",
  category: "Empleo",
  subcategory: "Bonos",
  amount: 2000,
  date: "2025-04-15"
}, {
  id: 6,
  description: "Freelance - Desarrollo",
  category: "Freelance",
  subcategory: "Programación",
  amount: 4200,
  date: "2025-04-10"
}, {
  id: 7,
  description: "Intereses",
  category: "Inversiones",
  subcategory: "Depósitos",
  amount: 320,
  date: "2025-04-05"
}];

interface IncomeTableProps {
  categoryFilter: string;
  searchQuery: string;
  formatCurrency: (amount: number) => string;
  onExportPDF: () => void;
  onExportExcel: () => void;
  onShare: () => void;
}

const IncomeTable: React.FC<IncomeTableProps> = ({
  categoryFilter,
  searchQuery,
  formatCurrency,
  onExportPDF,
  onExportExcel,
  onShare
}) => {
  const [filteredIncome, setFilteredIncome] = useState(allIncomeData);

  // Apply filters in real-time for the table data
  useEffect(() => {
    let filtered = [...allIncomeData];

    // Apply category filter
    if (categoryFilter !== "all") {
      filtered = filtered.filter(income => income.category.toLowerCase() === 
        categoryFilter.replace("salary", "empleo")
                     .replace("freelance", "freelance")
                     .replace("investments", "inversiones")
                     .replace("other", "otros"));
    }

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(income => 
        income.description.toLowerCase().includes(query) || 
        income.category.toLowerCase().includes(query) || 
        income.subcategory.toLowerCase().includes(query)
      );
    }

    // Sort by date (most recent first)
    filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    setFilteredIncome(filtered);
  }, [categoryFilter, searchQuery]);

  return (
    <div className="space-y-3">
      <div className="rounded-md border overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-xs">Descripción</TableHead>
              <TableHead className="text-xs">Categoría</TableHead>
              <TableHead className="text-xs">Subcategoría</TableHead>
              <TableHead className="text-xs">Monto</TableHead>
              <TableHead className="text-xs">Fecha</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredIncome.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-4 text-muted-foreground">
                  No se encontraron ingresos con los filtros actuales
                </TableCell>
              </TableRow>
            ) : (
              filteredIncome.map(income => (
                <TableRow key={income.id} className="text-xs sm:text-sm">
                  <TableCell className="py-2">{income.description}</TableCell>
                  <TableCell className="py-2">{income.category}</TableCell>
                  <TableCell className="py-2">{income.subcategory}</TableCell>
                  <TableCell className="py-2">{formatCurrency(income.amount)}</TableCell>
                  <TableCell className="py-2">{new Date(income.date).toLocaleDateString()}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      
      <div className="flex flex-wrap justify-between items-center gap-2 mt-3 sm:mt-4">
        <div>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Total: <span className="font-semibold">{formatCurrency(filteredIncome.reduce((sum, income) => sum + income.amount, 0))}</span>
          </p>
        </div>
        
        <div className="flex sm:hidden gap-2">
          <Button variant="outline" size="sm" onClick={onExportPDF} className="h-8 text-xs">
            <Download className="mr-1 h-3 w-3" />
            PDF
          </Button>
          <Button variant="outline" size="sm" onClick={onExportExcel} className="h-8 text-xs">
            <Download className="mr-1 h-3 w-3" />
            Excel
          </Button>
        </div>
        
        <Button variant="outline" size="sm" onClick={onShare} className="ml-auto h-8 sm:h-9 text-xs">
          <Share2 className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
          Compartir CashBot
        </Button>
      </div>
    </div>
  );
};

export default IncomeTable;
