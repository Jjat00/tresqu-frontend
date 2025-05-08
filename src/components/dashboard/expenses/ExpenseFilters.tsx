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
interface ExpenseFiltersProps {
  categoryFilter: string;
  onCategoryFilterChange: (value: string) => void;
}
const ExpenseFilters: React.FC<ExpenseFiltersProps> = ({
  categoryFilter,
  onCategoryFilterChange,
}) => {
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      try {
        const token = getAccessToken();
        if (!token) {
          throw new Error("No auth token available");
        }
        const response = await fetch(
          `${env.apiUrl}/api/expenses/by_category/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error(`Error fetching categories: ${response.status}`);
        }
        const data = await response.json();
        if (data && data.categories && Array.isArray(data.categories)) {
          setCategories(data.categories);
        }
      } catch (error) {
        console.error("Error loading categories:", error);
        toast.error("No se pudieron cargar las categorías");
      } finally {
        setIsLoading(false);
      }
    };
    fetchCategories();
  }, []);
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
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
export default ExpenseFilters;
