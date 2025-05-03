import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";

interface ExpenseFiltersProps {
  categoryFilter: string;
  onCategoryFilterChange: (value: string) => void;
}

const ExpenseFilters: React.FC<ExpenseFiltersProps> = ({
  categoryFilter,
  onCategoryFilterChange,
}) => {
  return (
    <div className="flex flex-wrap gap-2 w-full xs:w-auto">
      <Select value={categoryFilter} onValueChange={onCategoryFilterChange}>
        <SelectTrigger className="w-full xs:w-[120px] sm:w-[150px] text-xs sm:text-sm h-8 xs:h-9">
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

      <Button
        variant="outline"
        size="icon"
        className="h-8 xs:h-9 w-8 xs:w-9 ml-auto xs:ml-0"
      >
        <Filter className="h-3 w-3 xs:h-4 xs:w-4" />
        <span className="sr-only">Filtrar</span>
      </Button>
    </div>
  );
};

export default ExpenseFilters;
