
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Download, Share2 } from "lucide-react";
import { allExpensesData } from "../data/expenseData";

interface ExpensesTableProps {
  categoryFilter: string;
  onCategoryClick: (category: string) => void;
  onShare: () => void;
}

const ExpensesTable: React.FC<ExpensesTableProps> = ({ 
  categoryFilter, 
  onCategoryClick,
  onShare
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredExpenses, setFilteredExpenses] = useState(allExpensesData);

  // Apply filters in real-time
  useEffect(() => {
    let filtered = [...allExpensesData];
    
    // Apply category filter
    if (categoryFilter !== "all") {
      filtered = filtered.filter(expense => 
        expense.category.toLowerCase() === categoryFilter.replace("food", "alimentación")
          .replace("transport", "transporte")
          .replace("entertainment", "entretenimiento")
          .replace("services", "servicios")
      );
    }
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(expense => 
        expense.description.toLowerCase().includes(query) || 
        expense.category.toLowerCase().includes(query)
      );
    }
    
    // Sort by date (most recent first)
    filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    setFilteredExpenses(filtered);
  }, [categoryFilter, searchQuery]);

  const handleExportPDF = () => {
    console.log("Exporting expenses to PDF");
    // Implementation would go here
  };

  const handleExportExcel = () => {
    console.log("Exporting expenses to Excel");
    // Implementation would go here
  };

  return (
    <Card>
      <CardContent className="pt-4 sm:pt-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
          <h3 className="text-base sm:text-lg font-semibold">Últimos gastos</h3>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-none">
              <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar gastos..."
                className="pl-8 h-9 w-full sm:w-[250px] text-xs sm:text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleExportPDF} className="h-9 text-xs">
                <Download className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                PDF
              </Button>
              <Button variant="outline" size="sm" onClick={handleExportExcel} className="h-9 text-xs">
                <Download className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                Excel
              </Button>
            </div>
          </div>
        </div>
        
        <div className="rounded-md border overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs">Descripción</TableHead>
                <TableHead className="text-xs">Categoría</TableHead>
                <TableHead className="text-xs">Monto</TableHead>
                <TableHead className="text-xs">Fecha</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredExpenses.map((expense) => (
                <TableRow 
                  key={expense.id} 
                  className="cursor-pointer hover:bg-muted/50 text-xs sm:text-sm"
                  onClick={() => onCategoryClick(expense.category)}
                >
                  <TableCell className="py-2">{expense.description}</TableCell>
                  <TableCell className="py-2">{expense.category}</TableCell>
                  <TableCell className="py-2">${expense.amount.toLocaleString()}</TableCell>
                  <TableCell className="py-2">{new Date(expense.date).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        <div className="flex flex-wrap justify-between items-center gap-2 mt-3 sm:mt-4">
          <div>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Total: <span className="font-semibold">${filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0).toLocaleString()}</span>
            </p>
          </div>
          
          <div className="flex sm:hidden gap-2">
            <Button variant="outline" size="sm" onClick={handleExportPDF} className="h-8 text-xs">
              <Download className="mr-1 h-3 w-3" />
              PDF
            </Button>
            <Button variant="outline" size="sm" onClick={handleExportExcel} className="h-8 text-xs">
              <Download className="mr-1 h-3 w-3" />
              Excel
            </Button>
          </div>
          
          <Button variant="outline" size="sm" onClick={onShare} className="ml-auto h-8 sm:h-9 text-xs">
            <Share2 className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
            Compartir CashBot
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExpensesTable;
