import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Loader2 } from "lucide-react";
import { useExpenseCategoriesHybrid } from "@/hooks/useExpenseCategories";
import { useCreateExpense } from "@/hooks/expenses";
import { toast } from "sonner";

interface NewExpenseDialogProps {
  onAddExpense?: (expense: ExpenseFormData) => void; // Hacer opcional
}

export interface ExpenseFormData {
  description: string;
  category: string;
  subcategory: string;
  amount: string;
  date: string;
}

const NewExpenseDialog: React.FC<NewExpenseDialogProps> = ({
  onAddExpense,
}) => {
  const [open, setOpen] = useState(false);
  const [newExpense, setNewExpense] = useState<ExpenseFormData>({
    description: "",
    category: "",
    subcategory: "",
    amount: "",
    date: new Date().toISOString().split("T")[0],
  });

  // Hooks para crear gasto y obtener categorías
  const createExpense = useCreateExpense();
  const { data: categoriesData = [], isLoading: categoriesLoading } =
    useExpenseCategoriesHybrid();

  // Ordenar categorías: personalizadas primero, luego predefinidas
  const sortedCategories = categoriesData.sort((a, b) => {
    // Personalizadas (is_default = false) primero
    if (!a.is_default && b.is_default) return -1;
    if (a.is_default && !b.is_default) return 1;
    // Luego ordenar alfabéticamente
    return a.name.localeCompare(b.name);
  });

  const handleAddExpense = async () => {
    // Validar campos requeridos
    if (!newExpense.amount || !newExpense.category || !newExpense.description) {
      toast.error("Por favor completa todos los campos requeridos");
      return;
    }

    try {
      // Crear el gasto usando el nuevo sistema
      await createExpense.mutateAsync({
        amount: newExpense.amount,
        currency: "COP", // Por defecto COP, se puede hacer configurable
        description: newExpense.description,
        note: newExpense.subcategory || newExpense.description,
        spent_at: newExpense.date,
        user_category_name: newExpense.category, // ✅ Usar user_category_name
      });

      toast.success("Gasto creado exitosamente");

      // Llamar callback si existe (para compatibilidad)
      if (onAddExpense) {
        onAddExpense(newExpense);
      }

      // Limpiar formulario y cerrar
      setOpen(false);
      setNewExpense({
        description: "",
        category: "",
        subcategory: "",
        amount: "",
        date: new Date().toISOString().split("T")[0],
      });
    } catch (error) {
      console.error("Error al crear gasto:", error);
      toast.error("Error al crear el gasto");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-success hover:bg-success/90 h-8 sm:h-9 w-full sm:w-auto whitespace-nowrap text-xs sm:text-sm">
          <Plus className="mr-1 xs:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
          Nuevo gasto
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[95vw] xs:max-w-[90vw] sm:max-w-md p-3 xs:p-4 sm:p-6">
        <DialogHeader className="mb-2 xs:mb-3">
          <DialogTitle className="text-base xs:text-lg">
            Agregar nuevo gasto
          </DialogTitle>
          <DialogDescription className="text-xs xs:text-sm">
            Ingresa los detalles del nuevo gasto
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-3 py-2 xs:py-3 sm:py-4">
          <div className="grid grid-cols-3 xs:grid-cols-4 items-center gap-2 xs:gap-4">
            <label
              htmlFor="description"
              className="text-right text-xs xs:text-sm"
            >
              Descripción
            </label>
            <Input
              id="description"
              value={newExpense.description}
              onChange={(e) =>
                setNewExpense({ ...newExpense, description: e.target.value })
              }
              className="col-span-2 xs:col-span-3 h-7 xs:h-8 sm:h-9 text-xs"
              placeholder="Ej: Compra en supermercado"
            />
          </div>
          <div className="grid grid-cols-3 xs:grid-cols-4 items-center gap-2 xs:gap-4">
            <label htmlFor="category" className="text-right text-xs xs:text-sm">
              Categoría
            </label>
            <Select
              value={newExpense.category}
              onValueChange={(value) =>
                setNewExpense({ ...newExpense, category: value })
              }
              disabled={categoriesLoading}
            >
              <SelectTrigger className="col-span-2 xs:col-span-3 h-7 xs:h-8 sm:h-9 text-xs">
                {categoriesLoading ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-3 w-3 animate-spin" />
                    <span>Cargando...</span>
                  </div>
                ) : (
                  <SelectValue placeholder="Seleccionar categoría" />
                )}
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
          {newExpense.category && (
            <div className="grid grid-cols-3 xs:grid-cols-4 items-center gap-2 xs:gap-4">
              <label
                htmlFor="subcategory"
                className="text-right text-xs xs:text-sm"
              >
                Subcategoría
              </label>
              <Input
                id="subcategory"
                value={newExpense.subcategory}
                onChange={(e) =>
                  setNewExpense({ ...newExpense, subcategory: e.target.value })
                }
                className="col-span-2 xs:col-span-3 h-7 xs:h-8 sm:h-9 text-xs"
                placeholder="Ej: Supermercado"
              />
            </div>
          )}
          <div className="grid grid-cols-3 xs:grid-cols-4 items-center gap-2 xs:gap-4">
            <label htmlFor="amount" className="text-right text-xs xs:text-sm">
              Monto
            </label>
            <Input
              id="amount"
              value={newExpense.amount}
              onChange={(e) =>
                setNewExpense({ ...newExpense, amount: e.target.value })
              }
              className="col-span-2 xs:col-span-3 h-7 xs:h-8 sm:h-9 text-xs"
              type="number"
              placeholder="$0.00"
            />
          </div>
          <div className="grid grid-cols-3 xs:grid-cols-4 items-center gap-2 xs:gap-4">
            <label htmlFor="date" className="text-right text-xs xs:text-sm">
              Fecha
            </label>
            <Input
              id="date"
              value={newExpense.date}
              onChange={(e) =>
                setNewExpense({ ...newExpense, date: e.target.value })
              }
              className="col-span-2 xs:col-span-3 h-7 xs:h-8 sm:h-9 text-xs"
              type="date"
            />
          </div>
        </div>
        <DialogFooter className="gap-2 mt-2 xs:mt-3">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            className="h-7 xs:h-8 text-xs"
          >
            Cancelar
          </Button>
          <Button
            onClick={handleAddExpense}
            className="h-7 xs:h-8 text-xs"
            disabled={createExpense.isPending}
          >
            {createExpense.isPending ? (
              <div className="flex items-center gap-2">
                <Loader2 className="h-3 w-3 animate-spin" />
                <span>Guardando...</span>
              </div>
            ) : (
              "Guardar"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewExpenseDialog;
