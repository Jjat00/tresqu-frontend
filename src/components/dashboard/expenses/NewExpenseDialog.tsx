
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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

const NewExpenseDialog: React.FC<NewExpenseDialogProps> = ({ onAddExpense }) => {
  const [open, setOpen] = useState(false);
  const [newExpense, setNewExpense] = useState<ExpenseFormData>({
    description: "",
    category: "",
    subcategory: "",
    amount: "",
    date: new Date().toISOString().split('T')[0]
  });

  const handleAddExpense = () => {
    onAddExpense(newExpense);
    setOpen(false);
    setNewExpense({
      description: "",
      category: "",
      subcategory: "",
      amount: "",
      date: new Date().toISOString().split('T')[0]
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-success hover:bg-success/90 h-9 whitespace-nowrap text-xs sm:text-sm">
          <Plus className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
          Nuevo gasto
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Agregar nuevo gasto</DialogTitle>
          <DialogDescription>
            Ingresa los detalles del nuevo gasto
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="description" className="text-right text-sm">Descripción</label>
            <Input
              id="description"
              value={newExpense.description}
              onChange={(e) => setNewExpense({...newExpense, description: e.target.value})}
              className="col-span-3"
              placeholder="Ej: Compra en supermercado"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="category" className="text-right text-sm">Categoría</label>
            <Select 
              value={newExpense.category} 
              onValueChange={(value) => setNewExpense({...newExpense, category: value})}
            >
              <SelectTrigger className="col-span-3">
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
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="subcategory" className="text-right text-sm">Subcategoría</label>
              <Input
                id="subcategory"
                value={newExpense.subcategory}
                onChange={(e) => setNewExpense({...newExpense, subcategory: e.target.value})}
                className="col-span-3"
                placeholder="Ej: Supermercado"
              />
            </div>
          )}
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="amount" className="text-right text-sm">Monto</label>
            <Input
              id="amount"
              value={newExpense.amount}
              onChange={(e) => setNewExpense({...newExpense, amount: e.target.value})}
              className="col-span-3"
              type="number"
              placeholder="$0.00"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="date" className="text-right text-sm">Fecha</label>
            <Input
              id="date"
              value={newExpense.date}
              onChange={(e) => setNewExpense({...newExpense, date: e.target.value})}
              className="col-span-3"
              type="date"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
          <Button onClick={handleAddExpense}>Guardar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewExpenseDialog;
