import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  PlusIcon,
  SearchIcon,
  EditIcon,
  TrashIcon,
  TagIcon,
  StarIcon,
} from "lucide-react";
import {
  useExpenseCategories,
  useCustomExpenseCategories,
  useCreateExpenseCategory,
  useUpdateExpenseCategory,
  useDeleteExpenseCategory,
} from "@/hooks/useExpenseCategories";
import {
  useIncomeCategories,
  useCustomIncomeCategories,
  useCreateIncomeCategory,
  useUpdateIncomeCategory,
  useDeleteIncomeCategory,
} from "@/hooks/useIncomeCategories";
import { UserCategory } from "@/types/categories";

type CategoryKind = "expenses" | "income";

/**
 * Categoría en edición/creación, con el campo de ejemplos ya unificado:
 * la API lo llama `examples` en gastos y `example` en ingresos.
 */
interface CategoryDraft {
  id?: number;
  name: string;
  description: string;
  examples: string;
  color: string;
  is_default?: boolean;
}

const EMPTY_DRAFT: CategoryDraft = {
  name: "",
  description: "",
  examples: "",
  color: "#3B82F6",
};

const KIND_COPY: Record<
  CategoryKind,
  { noun: string; examplesLabel: string; placeholder: string }
> = {
  expenses: {
    noun: "gastos",
    examplesLabel: "Ejemplos",
    placeholder: "Ej: Entretenimiento",
  },
  income: {
    noun: "ingresos",
    examplesLabel: "Ejemplo",
    placeholder: "Ej: Clases particulares",
  },
};

const toDraft = (
  category: UserCategory & { examples?: string; example?: string }
): CategoryDraft => ({
  id: category.id,
  name: category.name,
  description: category.description || "",
  examples: category.examples ?? category.example ?? "",
  color: category.color,
  is_default: category.is_default,
});

interface CategoryGridProps {
  categories: (UserCategory & { examples?: string; example?: string })[];
  isLoading: boolean;
  searchQuery: string;
  onEdit: (category: CategoryDraft) => void;
  onDelete: (id: number) => void;
  onCreate: () => void;
}

const CategoryGrid = ({
  categories,
  isLoading,
  searchQuery,
  onEdit,
  onDelete,
  onCreate,
}: CategoryGridProps) => {
  if (isLoading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
        <p className="mt-2 text-muted-foreground">Cargando categorías...</p>
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <div className="text-center py-8">
        <TagIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-medium mb-2">No hay categorías</h3>
        <p className="text-muted-foreground mb-4">
          {searchQuery
            ? "No se encontraron categorías con ese nombre"
            : "Comienza creando tu primera categoría personalizada"}
        </p>
        {!searchQuery && (
          <Button onClick={onCreate}>
            <PlusIcon className="h-4 w-4 mr-2" />
            Crear Primera Categoría
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {categories.map((category) => (
        <div
          key={category.id}
          className="p-4 border rounded-lg hover:shadow-md transition-shadow"
          style={{ borderColor: category.color }}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded-full shrink-0"
                style={{ backgroundColor: category.color }}
              ></div>
              <div>
                <h3 className="font-medium flex items-center gap-2">
                  {category.name}
                  {!category.is_default && (
                    <Badge variant="secondary" className="text-xs">
                      ★ Personalizada
                    </Badge>
                  )}
                </h3>
                {category.description && (
                  <p className="text-sm text-muted-foreground">
                    {category.description}
                  </p>
                )}
              </div>
            </div>

            <div className="flex gap-1">
              {/* Se puede editar cualquier categoría */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit(toDraft(category))}
                title={
                  category.is_default
                    ? "Editar categoría predefinida"
                    : "Editar categoría personalizada"
                }
              >
                <EditIcon className="h-3 w-3" />
              </Button>
              {/* Solo se pueden eliminar las personalizadas */}
              {!category.is_default && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDelete(category.id)}
                  title="Eliminar categoría personalizada"
                >
                  <TrashIcon className="h-3 w-3" />
                </Button>
              )}
            </div>
          </div>

          <div className="mt-2 flex items-center gap-2">
            <span className="text-xs text-muted-foreground">
              {category.is_default
                ? "Categoría predefinida"
                : "Categoría personalizada"}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

const CategoriesTab = () => {
  const [activeTab, setActiveTab] = useState<CategoryKind>("expenses");
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<CategoryDraft | null>(
    null
  );
  const [newCategory, setNewCategory] = useState<CategoryDraft>(EMPTY_DRAFT);

  // Gastos
  const { data: expenseCategories, isLoading: isLoadingExpenses } =
    useExpenseCategories();
  const { data: customExpenseCategories } = useCustomExpenseCategories();
  const createExpenseCategory = useCreateExpenseCategory();
  const updateExpenseCategory = useUpdateExpenseCategory();
  const deleteExpenseCategory = useDeleteExpenseCategory();

  // Ingresos
  const { data: incomeCategories, isLoading: isLoadingIncomes } =
    useIncomeCategories();
  const { data: customIncomeCategories } = useCustomIncomeCategories();
  const createIncomeCategory = useCreateIncomeCategory();
  const updateIncomeCategory = useUpdateIncomeCategory();
  const deleteIncomeCategory = useDeleteIncomeCategory();

  // Todas las acciones se resuelven contra la pestaña activa: el botón
  // "Nueva Categoría" antes creaba siempre un gasto, aunque estuvieras en
  // la pestaña de ingresos.
  const isIncome = activeTab === "income";
  const copy = KIND_COPY[activeTab];

  const allCategories = isIncome ? incomeCategories : expenseCategories;
  const customCategories = isIncome
    ? customIncomeCategories
    : customExpenseCategories;
  const isLoading = isIncome ? isLoadingIncomes : isLoadingExpenses;
  const createMutation = isIncome ? createIncomeCategory : createExpenseCategory;
  const updateMutation = isIncome ? updateIncomeCategory : updateExpenseCategory;
  const deleteMutation = isIncome ? deleteIncomeCategory : deleteExpenseCategory;

  const openCreateDialog = () => {
    setNewCategory(EMPTY_DRAFT);
    setIsCreateDialogOpen(true);
  };

  const handleCreateCategory = async () => {
    if (!newCategory.name.trim()) {
      toast.error("El nombre de la categoría es obligatorio");
      return;
    }

    // El backend nombra el campo `examples` en gastos y `example` en ingresos.
    const base = {
      name: newCategory.name.trim(),
      description: newCategory.description,
      color: newCategory.color,
    };

    try {
      if (isIncome) {
        await createIncomeCategory.mutateAsync({
          ...base,
          example: newCategory.examples,
        });
      } else {
        await createExpenseCategory.mutateAsync({
          ...base,
          examples: newCategory.examples,
        });
      }
      setIsCreateDialogOpen(false);
      setNewCategory(EMPTY_DRAFT);
    } catch {
      // El hook ya notifica el error; solo dejamos el diálogo abierto.
    }
  };

  const handleEditCategory = async () => {
    if (!editingCategory?.id) return;

    try {
      await updateMutation.mutateAsync({
        id: editingCategory.id,
        data: {
          name: editingCategory.name,
          description: editingCategory.description,
          color: editingCategory.color,
          ...(isIncome
            ? { example: editingCategory.examples }
            : { examples: editingCategory.examples }),
        },
      });
      setEditingCategory(null);
    } catch {
      // El hook ya notifica el error; solo dejamos el diálogo abierto.
    }
  };

  const handleDeleteCategory = async (categoryId: number) => {
    if (!confirm("¿Estás seguro de que quieres eliminar esta categoría?")) {
      return;
    }

    try {
      await deleteMutation.mutateAsync(categoryId);
    } catch {
      // El hook ya notifica el error.
    }
  };

  const displayCategories = useMemo(
    () =>
      (allCategories || []).filter((category) =>
        category.name.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [allCategories, searchQuery]
  );

  const stats = (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card className="glass-card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total Categorías
          </CardTitle>
          <TagIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{allCategories?.length || 0}</div>
          <p className="text-xs text-muted-foreground">
            Disponibles para tus {copy.noun}
          </p>
        </CardContent>
      </Card>

      <Card className="glass-card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Personalizadas</CardTitle>
          <StarIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {customCategories?.length || 0}
          </div>
          <p className="text-xs text-muted-foreground">Creadas por ti</p>
        </CardContent>
      </Card>
    </div>
  );

  const list = (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle>Tus Categorías</CardTitle>
      </CardHeader>
      <CardContent>
        <CategoryGrid
          categories={displayCategories}
          isLoading={isLoading}
          searchQuery={searchQuery}
          onEdit={setEditingCategory}
          onDelete={handleDeleteCategory}
          onCreate={openCreateDialog}
        />
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold gradient-text">
            Gestión de Categorías
          </h2>
          <p className="text-muted-foreground">
            Crea y gestiona tus categorías personalizadas
          </p>
        </div>

        <Button
          onClick={openCreateDialog}
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
        >
          <PlusIcon className="h-4 w-4 mr-2" />
          Nueva Categoría de {isIncome ? "Ingresos" : "Gastos"}
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Buscar categorías..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as CategoryKind)}
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="expenses">Categorías de Gastos</TabsTrigger>
          <TabsTrigger value="income">Categorías de Ingresos</TabsTrigger>
        </TabsList>

        <TabsContent value="expenses" className="space-y-6">
          {stats}
          {list}
        </TabsContent>

        <TabsContent value="income" className="space-y-6">
          {stats}
          {list}
        </TabsContent>
      </Tabs>

      {/* Create Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              Crear Categoría de {isIncome ? "Ingresos" : "Gastos"}
            </DialogTitle>
            <DialogDescription>
              Crea una nueva categoría personalizada para organizar mejor tus{" "}
              {copy.noun}. Tu asistente también podrá usarla por WhatsApp.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nombre
              </Label>
              <Input
                id="name"
                value={newCategory.name}
                onChange={(e) =>
                  setNewCategory({ ...newCategory, name: e.target.value })
                }
                className="col-span-3"
                placeholder={copy.placeholder}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="color" className="text-right">
                Color
              </Label>
              <Input
                id="color"
                type="color"
                value={newCategory.color}
                onChange={(e) =>
                  setNewCategory({ ...newCategory, color: e.target.value })
                }
                className="col-span-3 h-10"
              />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="description" className="text-right">
                Descripción
              </Label>
              <Textarea
                id="description"
                value={newCategory.description}
                onChange={(e) =>
                  setNewCategory({
                    ...newCategory,
                    description: e.target.value,
                  })
                }
                className="col-span-3"
                placeholder="Descripción opcional..."
              />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="examples" className="text-right">
                {copy.examplesLabel}
              </Label>
              <Textarea
                id="examples"
                value={newCategory.examples}
                onChange={(e) =>
                  setNewCategory({ ...newCategory, examples: e.target.value })
                }
                className="col-span-3"
                placeholder="Ayuda a tu asistente a clasificar mejor..."
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              onClick={handleCreateCategory}
              disabled={createMutation.isPending}
            >
              {createMutation.isPending ? "Creando..." : "Crear Categoría"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog
        open={!!editingCategory}
        onOpenChange={(open) => !open && setEditingCategory(null)}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {editingCategory?.is_default
                ? "Editar Categoría Predefinida"
                : "Editar Categoría Personalizada"}
            </DialogTitle>
            <DialogDescription>
              {editingCategory?.is_default
                ? "Puedes personalizar el color y la descripción de esta categoría predefinida."
                : "Modifica los detalles de tu categoría personalizada."}
            </DialogDescription>
          </DialogHeader>
          {editingCategory && (
            <div className="grid gap-4 py-4">
              {/* Indicador del tipo de categoría */}
              <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: editingCategory.color }}
                ></div>
                <span className="text-sm font-medium">
                  {editingCategory.name}
                </span>
                <Badge
                  variant={editingCategory.is_default ? "outline" : "secondary"}
                >
                  {editingCategory.is_default
                    ? "Predefinida"
                    : "★ Personalizada"}
                </Badge>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-name" className="text-right">
                  Nombre
                </Label>
                <Input
                  id="edit-name"
                  value={editingCategory.name}
                  onChange={(e) =>
                    setEditingCategory({
                      ...editingCategory,
                      name: e.target.value,
                    })
                  }
                  className="col-span-3"
                  // El nombre de las predefinidas es fijo del sistema
                  disabled={editingCategory.is_default}
                  placeholder={
                    editingCategory.is_default
                      ? "Nombre fijo"
                      : "Nombre de la categoría"
                  }
                />
                {editingCategory.is_default && (
                  <div className="col-span-4 text-xs text-muted-foreground text-center">
                    💡 El nombre de las categorías predefinidas no se puede
                    cambiar
                  </div>
                )}
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-color" className="text-right">
                  Color
                </Label>
                <Input
                  id="edit-color"
                  type="color"
                  value={editingCategory.color}
                  onChange={(e) =>
                    setEditingCategory({
                      ...editingCategory,
                      color: e.target.value,
                    })
                  }
                  className="col-span-3 h-10"
                />
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="edit-description" className="text-right">
                  Descripción
                </Label>
                <Textarea
                  id="edit-description"
                  value={editingCategory.description}
                  onChange={(e) =>
                    setEditingCategory({
                      ...editingCategory,
                      description: e.target.value,
                    })
                  }
                  className="col-span-3"
                  placeholder={
                    editingCategory.is_default
                      ? "Personaliza la descripción..."
                      : "Descripción de la categoría"
                  }
                />
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="edit-examples" className="text-right">
                  {copy.examplesLabel}
                </Label>
                <Textarea
                  id="edit-examples"
                  value={editingCategory.examples}
                  onChange={(e) =>
                    setEditingCategory({
                      ...editingCategory,
                      examples: e.target.value,
                    })
                  }
                  className="col-span-3"
                  placeholder="Ayuda a tu asistente a clasificar mejor..."
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              type="submit"
              onClick={handleEditCategory}
              disabled={updateMutation.isPending}
            >
              {updateMutation.isPending ? "Guardando..." : "Guardar Cambios"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CategoriesTab;
