import React, { useEffect, useState } from "react";
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
import { useUpdateIncome } from "@/hooks/incomes";
import { useIncomeCategories } from "@/hooks/useIncomeCategories";
import { useCommonCurrencies } from "@/hooks/currencies";
import { IncomeRow, UpdateIncomeRequest } from "@/types/incomes";
import { getIncomeCategoryName } from "@/utils/incomes";

interface EditIncomeDialogProps {
  income: IncomeRow | null;
  onClose: () => void;
  onSuccess?: () => void;
}

const EditIncomeDialog: React.FC<EditIncomeDialogProps> = ({
  income,
  onClose,
  onSuccess,
}) => {
  const [formData, setFormData] = useState<UpdateIncomeRequest>({});
  const updateIncome = useUpdateIncome();
  const { data: categories = [], isLoading: categoriesLoading } =
    useIncomeCategories();
  const { data: commonCurrencies = [], isLoading: currenciesLoading } =
    useCommonCurrencies();

  /* eslint-disable react-hooks/set-state-in-effect -- reinicio del formulario al cambiar el ingreso seleccionado */
  useEffect(() => {
    if (!income) {
      setFormData({});
      return;
    }

    const currentCategory = getIncomeCategoryName(income);
    const categoryExists = categories.some(
      (category) => category.name === currentCategory
    );

    setFormData({
      amount: income.amount,
      currency: income.currency,
      note: income.note || income.description || "",
      // Si la categoría del ingreso ya no existe en la lista, no preseleccionamos
      // una ajena: el select queda vacío y el usuario elige.
      user_category_name: categoryExists ? currentCategory : "",
      received_at: income.received_at || "",
    });
  }, [income, categories]);
  /* eslint-enable react-hooks/set-state-in-effect */

  const handleSave = async () => {
    if (!income) return;

    try {
      // `received_at` vacío rompería el serializer de fecha: se omite.
      const { received_at, user_category_name, ...rest } = formData;
      await updateIncome.mutateAsync({
        id: income.id,
        data: {
          ...rest,
          ...(received_at ? { received_at } : {}),
          ...(user_category_name ? { user_category_name } : {}),
        },
      });
      toast.success("Ingreso actualizado exitosamente");
      onSuccess?.();
      onClose();
    } catch (error) {
      toast.error("Error al actualizar el ingreso");
    }
  };

  const handleClose = () => {
    setFormData({});
    onClose();
  };

  return (
    <Dialog open={!!income} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar ingreso</DialogTitle>
          <DialogDescription>
            Modifica los datos del ingreso seleccionado
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="income-amount" className="text-right">
              Monto
            </Label>
            <Input
              id="income-amount"
              value={formData.amount || ""}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, amount: e.target.value }))
              }
              className="col-span-3"
              placeholder="0.00"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="income-currency" className="text-right">
              Moneda
            </Label>
            <Select
              value={formData.currency || ""}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, currency: value }))
              }
              disabled={currenciesLoading}
            >
              <SelectTrigger id="income-currency" className="col-span-3">
                <SelectValue placeholder="Selecciona una moneda" />
              </SelectTrigger>
              <SelectContent>
                {[...commonCurrencies]
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
            <Label htmlFor="income-note" className="text-right">
              Descripción
            </Label>
            <Input
              id="income-note"
              value={formData.note || ""}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, note: e.target.value }))
              }
              className="col-span-3"
              placeholder="Descripción del ingreso"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="income-category" className="text-right">
              Categoría
            </Label>
            <Select
              value={formData.user_category_name || ""}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, user_category_name: value }))
              }
              disabled={categoriesLoading}
            >
              <SelectTrigger id="income-category" className="col-span-3">
                <SelectValue placeholder="Selecciona una categoría" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.name}>
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: category.color }}
                      />
                      <span>
                        {category.name}
                        {!category.is_default && " ★"}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="income-received-at" className="text-right">
              Fecha
            </Label>
            <Input
              id="income-received-at"
              type="date"
              value={formData.received_at || ""}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, received_at: e.target.value }))
              }
              className="col-span-3 [&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:brightness-0 [&::-webkit-calendar-picker-indicator]:contrast-100"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={handleClose}
            disabled={updateIncome.isPending}
          >
            Cancelar
          </Button>
          <Button onClick={handleSave} disabled={updateIncome.isPending}>
            {updateIncome.isPending ? "Guardando..." : "Guardar cambios"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditIncomeDialog;
