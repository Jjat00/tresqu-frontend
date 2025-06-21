import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useUpdateExpense } from "@/hooks/expenses";
import { useExpenseCategoriesHybrid } from "@/hooks/useExpenseCategories";
import { useCommonCurrencies } from "@/hooks/currencies";
import { UpdateExpenseRequest } from "@/types/expenses";

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

  // ✅ MIGRACIÓN: Nuevos campos para categorías por usuario
  user_expense_category?: {
    id: number;
    name: string;
    color: string;
    is_default: boolean;
    description?: string;
    examples?: string;
  };

  // 🎯 Campo híbrido que prioriza categoría del usuario
  category_name?: string;

  // 📊 Categoría actual (campo calculado del backend)
  current_category?: {
    id: number;
    name: string;
    color: string;
    description?: string;
    is_default: boolean;
    type: string;
  };
}

interface EditExpenseDialogProps {
  expense: Expense | null;
  onClose: () => void;
  onSuccess: () => void;
}

const EditExpenseDialog: React.FC<EditExpenseDialogProps> = ({
  expense,
  onClose,
  onSuccess,
}) => {
  const [formData, setFormData] = useState<UpdateExpenseRequest>({});
  const updateExpense = useUpdateExpense();
  const { data: categoriesData = [], isLoading: categoriesLoading } =
    useExpenseCategoriesHybrid();
  const { data: commonCurrencies = [], isLoading: currenciesLoading } =
    useCommonCurrencies();

  // Convertir categorías a formato legacy para compatibilidad
  const categories = categoriesData.map((cat) => cat.name);

  // Ordenar categorías: personalizadas primero, luego predefinidas
  const sortedCategories = categoriesData.sort((a, b) => {
    // Personalizadas (is_default = false) primero
    if (!a.is_default && b.is_default) return -1;
    if (a.is_default && !b.is_default) return 1;
    // Luego ordenar alfabéticamente
    return a.name.localeCompare(b.name);
  });

  // ✅ Helper para obtener el nombre correcto de la categoría del gasto
  const getCurrentCategoryName = (expense: Expense): string => {
    // Prioridad: current_category > user_expense_category > category_str
    if (expense.current_category?.name) {
      return expense.current_category.name;
    }
    if (expense.user_expense_category?.name) {
      return expense.user_expense_category.name;
    }
    return expense.category_str || "";
  };

  // Reset form data when expense changes
  useEffect(() => {
    if (expense && categoriesData.length > 0) {
      const currentCategoryName = getCurrentCategoryName(expense);

      // ✅ Verificar si la categoría existe en la lista disponible
      const categoryExists = categoriesData.some(
        (cat) => cat.name === currentCategoryName
      );
      const finalCategoryName = categoryExists
        ? currentCategoryName
        : expense.category_str;

      setFormData({
        amount: expense.amount,
        currency: expense.currency,
        note: expense.note,
        user_category_name: finalCategoryName, // ✅ Usar nombre válido de categoría
        spent_at: expense.spent_at,
      });
    } else if (expense) {
      // Si no hay categorías cargadas aún, usar category_str por defecto
      setFormData({
        amount: expense.amount,
        currency: expense.currency,
        note: expense.note,
        user_category_name: expense.category_str,
        spent_at: expense.spent_at,
      });
    } else {
      setFormData({});
    }
  }, [expense, categoriesData]);

  const handleSave = async () => {
    if (!expense) return;

    try {
      await updateExpense.mutateAsync({
        id: expense.id,
        data: formData,
      });
      toast.success("Gasto actualizado exitosamente");
      onSuccess();
      onClose();
    } catch (error) {
      toast.error("Error al actualizar el gasto");
    }
  };

  const handleClose = () => {
    setFormData({});
    onClose();
  };

  return (
    <Dialog open={!!expense} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar gasto</DialogTitle>
          <DialogDescription>
            Modifica los datos del gasto seleccionado
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="amount" className="text-right">
              Monto
            </Label>
            <Input
              id="amount"
              value={formData.amount || ""}
              onChange={(e) => {
                setFormData((prev) => ({
                  ...prev,
                  amount: e.target.value,
                }));
              }}
              className="col-span-3"
              placeholder="0.00"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="currency" className="text-right">
              Moneda
            </Label>
            <Select
              value={formData.currency || "USD"}
              onValueChange={(value) => {
                setFormData((prev) => ({
                  ...prev,
                  currency: value,
                }));
              }}
              disabled={currenciesLoading}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Selecciona una moneda" />
              </SelectTrigger>
              <SelectContent>
                {commonCurrencies
                  .sort((a, b) =>
                    a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
                  )
                  .map((currency) => (
                    <SelectItem key={currency.code} value={currency.code}>
                      {currency.code} - {currency.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Descripción
            </Label>
            <Input
              id="description"
              value={formData.note || ""}
              onChange={(e) => {
                setFormData((prev) => ({
                  ...prev,
                  note: e.target.value,
                }));
              }}
              className="col-span-3"
              placeholder="Descripción del gasto"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-right">
              Categoría
            </Label>
            <Select
              value={formData.user_category_name || ""}
              onValueChange={(value) => {
                setFormData((prev) => ({
                  ...prev,
                  user_category_name: value, // ✅ Usar user_category_name para actualizar
                }));
              }}
              disabled={categoriesLoading}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Selecciona una categoría" />
              </SelectTrigger>
              <SelectContent>
                {sortedCategories.map((categoryObj) => (
                  <SelectItem key={categoryObj.name} value={categoryObj.name}>
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: categoryObj.color }}
                      ></div>
                      <span>
                        {categoryObj.name}
                        {!categoryObj.is_default && " ★"}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="spent_at" className="text-right">
              Fecha
            </Label>
            <Input
              id="spent_at"
              type="date"
              value={formData.spent_at || ""}
              onChange={(e) => {
                setFormData((prev) => ({
                  ...prev,
                  spent_at: e.target.value,
                }));
              }}
              className="col-span-3 [&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:brightness-0 [&::-webkit-calendar-picker-indicator]:contrast-100"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={handleClose}
            disabled={updateExpense.isPending}
          >
            Cancelar
          </Button>
          <Button onClick={handleSave} disabled={updateExpense.isPending}>
            {updateExpense.isPending ? "Guardando..." : "Guardar cambios"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditExpenseDialog;
