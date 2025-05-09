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
import { Plus } from "lucide-react";

interface NewExpenseDialogProps {
  onAddExpense: (expense: ExpenseFormData) => void;
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

  const handleAddExpense = () => {
    onAddExpense(newExpense);
    setOpen(false);
    setNewExpense({
      description: "",
      category: "",
      subcategory: "",
      amount: "",
      date: new Date().toISOString().split("T")[0],
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-success hover:bg-success/90 h-8 xs:h-9 w-[200] xs:w-auto whitespace-nowrap text-[10px] xs:text-xs sm:text-sm">
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
            >
              <SelectTrigger className="col-span-2 xs:col-span-3 h-7 xs:h-8 sm:h-9 text-xs">
                <SelectValue placeholder="Seleccionar categoría" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="alimentacion">Alimentación</SelectItem>
                <SelectItem value="transporte">Transporte</SelectItem>
                <SelectItem value="entretenimiento">Entretenimiento</SelectItem>
                <SelectItem value="servicios">Servicios</SelectItem>
                <SelectItem value="otros">Otros</SelectItem>
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
          <Button onClick={handleAddExpense} className="h-7 xs:h-8 text-xs">
            Guardar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewExpenseDialog;
