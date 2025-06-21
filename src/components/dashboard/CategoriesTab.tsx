import { useState } from "react";
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
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import {
  PlusIcon,
  SearchIcon,
  EditIcon,
  TrashIcon,
  TagIcon,
  TrendingUpIcon,
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
  UserExpenseCategory,
  CreateExpenseCategoryRequest,
} from "@/types/categories";

const CategoriesTab = () => {
  const [activeTab, setActiveTab] = useState("expenses");
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] =
    useState<UserExpenseCategory | null>(null);
  const [newCategory, setNewCategory] = useState<CreateExpenseCategoryRequest>({
    name: "",
    description: "",
    color: "#3B82F6",
  });

  // Hooks para categorías de gastos
  const { data: allExpenseCategories, isLoading: isLoadingAll } =
    useExpenseCategories();
  const { data: customExpenseCategories } = useCustomExpenseCategories();

  // Mutations
  const createExpenseCategory = useCreateExpenseCategory();
  const updateExpenseCategory = useUpdateExpenseCategory();
  const deleteExpenseCategory = useDeleteExpenseCategory();

  const handleCreateCategory = async () => {
    if (!newCategory.name.trim()) {
      toast({
        title: "Error",
        description: "El nombre de la categoría es obligatorio",
        variant: "destructive",
      });
      return;
    }

    try {
      await createExpenseCategory.mutateAsync(newCategory);
      toast({
        title: "¡Éxito!",
        description: "Categoría creada correctamente",
      });
      setIsCreateDialogOpen(false);
      setNewCategory({
        name: "",
        description: "",
        color: "#3B82F6",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo crear la categoría",
        variant: "destructive",
      });
    }
  };

  const handleEditCategory = async () => {
    if (!editingCategory) return;

    try {
      await updateExpenseCategory.mutateAsync({
        id: editingCategory.id,
        data: {
          name: editingCategory.name,
          description: editingCategory.description,
          color: editingCategory.color,
        },
      });
      toast({
        title: "¡Éxito!",
        description: "Categoría actualizada correctamente",
      });
      setIsEditDialogOpen(false);
      setEditingCategory(null);
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo actualizar la categoría",
        variant: "destructive",
      });
    }
  };

  const handleDeleteCategory = async (categoryId: number) => {
    if (!confirm("¿Estás seguro de que quieres eliminar esta categoría?")) {
      return;
    }

    try {
      await deleteExpenseCategory.mutateAsync(categoryId);
      toast({
        title: "¡Éxito!",
        description: "Categoría eliminada correctamente",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo eliminar la categoría",
        variant: "destructive",
      });
    }
  };

  const openEditDialog = (category: UserExpenseCategory) => {
    setEditingCategory({ ...category });
    setIsEditDialogOpen(true);
  };

  // Filtrar categorías por búsqueda
  const displayCategories =
    allExpenseCategories?.filter((category) =>
      category.name.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

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

        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
              <PlusIcon className="h-4 w-4 mr-2" />
              Nueva Categoría
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Crear Nueva Categoría</DialogTitle>
              <DialogDescription>
                Crea una nueva categoría personalizada para organizar mejor tus
                gastos.
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
                  placeholder="Ej: Entretenimiento"
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
                  value={newCategory.description || ""}
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
            </div>
            <DialogFooter>
              <Button
                type="submit"
                onClick={handleCreateCategory}
                disabled={createExpenseCategory.isPending}
              >
                {createExpenseCategory.isPending
                  ? "Creando..."
                  : "Crear Categoría"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
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
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="expenses">Categorías de Gastos</TabsTrigger>
          <TabsTrigger value="income">Categorías de Ingresos</TabsTrigger>
        </TabsList>

        <TabsContent value="expenses" className="space-y-6">
          {/* Estadísticas rápidas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="glass-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Categorías
                </CardTitle>
                <TagIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {allExpenseCategories?.length || 0}
                </div>
                <p className="text-xs text-muted-foreground">
                  {customExpenseCategories?.length || 0} personalizadas
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Más Popular
                </CardTitle>
                <TrendingUpIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {allExpenseCategories?.[0]?.name || "N/A"}
                </div>
                <p className="text-xs text-muted-foreground">
                  Categoría más usada
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Personalizadas
                </CardTitle>
                <StarIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {customExpenseCategories?.length || 0}
                </div>
                <p className="text-xs text-muted-foreground">Creadas por ti</p>
              </CardContent>
            </Card>
          </div>

          {/* Lista de categorías */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Tus Categorías</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoadingAll ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                  <p className="mt-2 text-muted-foreground">
                    Cargando categorías...
                  </p>
                </div>
              ) : displayCategories.length === 0 ? (
                <div className="text-center py-8">
                  <TagIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">
                    No hay categorías
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {searchQuery
                      ? "No se encontraron categorías con ese nombre"
                      : "Comienza creando tu primera categoría personalizada"}
                  </p>
                  {!searchQuery && (
                    <Button onClick={() => setIsCreateDialogOpen(true)}>
                      <PlusIcon className="h-4 w-4 mr-2" />
                      Crear Primera Categoría
                    </Button>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {displayCategories.map((category) => (
                    <div
                      key={category.id}
                      className="p-4 border rounded-lg hover:shadow-md transition-shadow"
                      style={{ borderColor: category.color }}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-4 h-4 rounded-full"
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
                          {/* ✅ Permitir editar TODAS las categorías */}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openEditDialog(category)}
                            title={
                              category.is_default
                                ? "Editar categoría predefinida"
                                : "Editar categoría personalizada"
                            }
                          >
                            <EditIcon className="h-3 w-3" />
                          </Button>
                          {/* ❌ Solo permitir eliminar categorías personalizadas */}
                          {!category.is_default && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteCategory(category.id)}
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
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="income" className="space-y-6">
          <Card className="glass-card">
            <CardContent className="pt-6">
              <div className="text-center py-8">
                <TagIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">
                  Categorías de Ingresos
                </h3>
                <p className="text-muted-foreground">
                  La gestión de categorías de ingresos estará disponible
                  próximamente.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {editingCategory?.is_default
                ? "Editar Categoría Predefinida"
                : "Editar Categoría Personalizada"}
            </DialogTitle>
            <DialogDescription>
              {editingCategory?.is_default
                ? "Puedes personalizar el color y descripción de esta categoría predefinida."
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
                  disabled={editingCategory.is_default} // ❌ No permitir cambiar nombre de predefinidas
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
                  value={editingCategory.description || ""}
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

              {/* Nota informativa para categorías predefinidas */}
              {editingCategory.is_default && (
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-start gap-2">
                    <div className="text-blue-600 mt-0.5">ℹ️</div>
                    <div className="text-sm text-blue-800">
                      <p className="font-medium mb-1">Categoría Predefinida</p>
                      <p>
                        ✅ Puedes cambiar: <strong>Color</strong> y{" "}
                        <strong>Descripción</strong>
                        <br />❌ No puedes cambiar: <strong>Nombre</strong> (es
                        fijo del sistema)
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button
              type="submit"
              onClick={handleEditCategory}
              disabled={updateExpenseCategory.isPending}
            >
              {updateExpenseCategory.isPending
                ? "Guardando..."
                : "Guardar Cambios"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CategoriesTab;
