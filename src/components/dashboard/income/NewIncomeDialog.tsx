
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface NewIncomeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddIncome: (incomeData: IncomeFormData) => void;
}

export interface IncomeFormData {
  description: string;
  category: string;
  subcategory: string;
  amount: string;
  date: string;
  recurring: boolean;
}

const NewIncomeDialog: React.FC<NewIncomeDialogProps> = ({ open, onOpenChange, onAddIncome }) => {
  const [newIncome, setNewIncome] = useState<IncomeFormData>({
    description: "",
    category: "",
    subcategory: "",
    amount: "",
    date: new Date().toISOString().split('T')[0],
    recurring: false
  });

  const handleSave = () => {
    onAddIncome(newIncome);
    onOpenChange(false);
    setNewIncome({
      description: "",
      category: "",
      subcategory: "",
      amount: "",
      date: new Date().toISOString().split('T')[0],
      recurring: false
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Agregar nuevo ingreso</DialogTitle>
          <DialogDescription>
            Ingresa los detalles del nuevo ingreso
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="description" className="text-right text-sm">Descripción</label>
            <Input 
              id="description" 
              value={newIncome.description} 
              onChange={e => setNewIncome({...newIncome, description: e.target.value})} 
              className="col-span-3" 
              placeholder="Ej: Salario mensual" 
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="category" className="text-right text-sm">Categoría</label>
            <Select 
              value={newIncome.category} 
              onValueChange={value => setNewIncome({...newIncome, category: value})}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Seleccionar categoría" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="empleo">Empleo</SelectItem>
                <SelectItem value="freelance">Freelance</SelectItem>
                <SelectItem value="inversiones">Inversiones</SelectItem>
                <SelectItem value="otros">Otros</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {newIncome.category && (
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="subcategory" className="text-right text-sm">Subcategoría</label>
              <Input 
                id="subcategory" 
                value={newIncome.subcategory} 
                onChange={e => setNewIncome({...newIncome, subcategory: e.target.value})} 
                className="col-span-3" 
                placeholder="Ej: Salario base" 
              />
            </div>
          )}
          
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="amount" className="text-right text-sm">Monto</label>
            <Input 
              id="amount" 
              value={newIncome.amount} 
              onChange={e => setNewIncome({...newIncome, amount: e.target.value})} 
              className="col-span-3" 
              type="number" 
              placeholder="$0.00" 
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="date" className="text-right text-sm">Fecha</label>
            <Input 
              id="date" 
              value={newIncome.date} 
              onChange={e => setNewIncome({...newIncome, date: e.target.value})} 
              className="col-span-3" 
              type="date" 
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <label className="text-right text-sm">Recurrente</label>
            <div className="flex items-center space-x-2 col-span-3">
              <input 
                type="checkbox" 
                id="recurring" 
                checked={newIncome.recurring} 
                onChange={e => setNewIncome({...newIncome, recurring: e.target.checked})} 
                className="rounded border-gray-300" 
              />
              <label htmlFor="recurring" className="text-sm">Es un ingreso recurrente mensual</label>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
          <Button onClick={handleSave}>Guardar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewIncomeDialog;
