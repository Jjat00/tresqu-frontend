import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { getAccessToken } from "@/services/authService";
import { toast } from "sonner";
import { env } from "@/config";
// Nuevos hooks migrados
import { useExpenseCategoriesHybrid } from "@/hooks/useExpenseCategories";
interface ExpenseFiltersProps {
  categoryFilter: string;
  onCategoryFilterChange: (value: string) => void;
}
const ExpenseFilters: React.FC<ExpenseFiltersProps> = ({
  categoryFilter,
  onCategoryFilterChange,
}) => {
  // Usar el nuevo hook híbrido que mantiene compatibilidad
  const { data: userCategories = [], isLoading } = useExpenseCategoriesHybrid();

  // Convertir las categorías del usuario a nombres para compatibilidad
  const categories = userCategories.map((cat) => cat.name);
  return (
    <div className="flex flex-wrap gap-2 w-full xs:w-auto">
      <Select value={categoryFilter} onValueChange={onCategoryFilterChange}>
        <SelectTrigger className="w-full xs:w-[120px] sm:w-[150px] text-xs sm:text-sm h-8 xs:h-9">
          {isLoading ? (
            <div className="flex items-center gap-2">
              <Loader2 className="h-3 w-3 animate-spin" />
              <span>Cargando...</span>
            </div>
          ) : (
            <SelectValue placeholder="Categoría" />
          )}
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todas</SelectItem>
          {categories.map((category) => (
            <SelectItem key={category} value={category.toLowerCase()}>
              {category}
              {/* Mostrar indicador si es categoría personalizada */}
              {userCategories.find((cat) => cat.name === category)
                ?.is_default === false && " ★"}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
export default ExpenseFilters;
