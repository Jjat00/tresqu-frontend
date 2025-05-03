
import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";

interface ExpenseFiltersProps {
  categoryFilter: string;
  onCategoryFilterChange: (value: string) => void;
}

const ExpenseFilters: React.FC<ExpenseFiltersProps> = ({ 
  categoryFilter, 
  onCategoryFilterChange 
}) => {
  return (
    <div className="flex flex-wrap gap-2">
      <Select value={categoryFilter} onValueChange={onCategoryFilterChange}>
        <SelectTrigger className="w-[120px] sm:w-[150px] text-xs sm:text-sm h-9">
          <SelectValue placeholder="Categoría" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todas</SelectItem>
          <SelectItem value="food">Alimentación</SelectItem>
          <SelectItem value="transport">Transporte</SelectItem>
          <SelectItem value="entertainment">Entretenimiento</SelectItem>
          <SelectItem value="services">Servicios</SelectItem>
        </SelectContent>
      </Select>
      
      <Button variant="outline" size="icon" className="h-9 w-9">
        <Filter className="h-4 w-4" />
        <span className="sr-only">Filtrar</span>
      </Button>
    </div>
  );
};

export default ExpenseFilters;
