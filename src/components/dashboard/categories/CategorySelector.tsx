import React, { useState, useEffect, useMemo } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, Plus, Search, Star, Clock, Palette } from "lucide-react";
import { toast } from "sonner";
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

// Hooks mejorados
import {
  useExpenseCategoriesHybrid,
  useCreateExpenseCategory,
  useSearchExpenseCategories,
  usePopularExpenseCategories,
  useRecentExpenseCategories,
} from "@/hooks/useExpenseCategories";
import {
  UserExpenseCategory,
  CreateExpenseCategoryRequest,
} from "@/types/categories";

interface CategorySelectorProps {
  type: "expense" | "income";
  value?: string | number;
  onSelect: (category: UserExpenseCategory | string) => void;
  placeholder?: string;
  disabled?: boolean;
  allowCreate?: boolean;
  showPopular?: boolean;
  showRecent?: boolean;
  className?: string;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({
  type = "expense",
  value,
  onSelect,
  placeholder = "Buscar o seleccionar categoría...",
  disabled = false,
  allowCreate = true,
  showPopular = true,
  showRecent = true,
  className,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [newCategoryForm, setNewCategoryForm] =
    useState<CreateExpenseCategoryRequest>({
      name: "",
      description: "",
      examples: "",
      color: "#2196F3",
    });

  // Hooks para categorías (usando solo gastos por ahora)
  const { data: categories = [], isLoading } = useExpenseCategoriesHybrid();
  const createCategory = useCreateExpenseCategory();

  // Búsqueda con debounce
  const [debouncedQuery, setDebouncedQuery] = useState("");
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(searchQuery), 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const { data: searchResults } = useSearchExpenseCategories(
    { q: debouncedQuery },
    debouncedQuery.length > 0
  );

  // Categorías populares y recientes
  const { data: popularCategories = [] } = usePopularExpenseCategories({
    limit: 5,
  });
  const { data: recentCategories = [] } = useRecentExpenseCategories({
    limit: 3,
  });

  // Filtrar categorías basado en la búsqueda local
  const filteredCategories = useMemo(() => {
    if (!categories) return [];

    if (!searchQuery.trim()) return categories;

    return categories.filter(
      (cat) =>
        cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cat.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cat.examples?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [categories, searchQuery]);

  // Categorías organizadas
  const organizedCategories = useMemo(() => {
    const custom = filteredCategories.filter((cat) => !cat.is_default);
    const defaults = filteredCategories.filter((cat) => cat.is_default);

    return { custom, defaults };
  }, [filteredCategories]);

  // Handlers
  const handleCategorySelect = (category: UserExpenseCategory) => {
    setSearchQuery("");
    onSelect(category);
  };

  const handleCreateNew = () => {
    if (!searchQuery.trim()) {
      toast.error("Ingresa un nombre para la nueva categoría");
      return;
    }

    setNewCategoryForm({
      name: searchQuery.trim(),
      description: "",
      examples: "",
      color: "#2196F3",
    });
    setShowCreateDialog(true);
  };

  const handleCreateCategory = async () => {
    try {
      if (!newCategoryForm.name.trim()) {
        toast.error("El nombre de la categoría es requerido");
        return;
      }

      const newCategory = await createCategory.mutateAsync(newCategoryForm);
      setShowCreateDialog(false);
      setNewCategoryForm({
        name: "",
        description: "",
        examples: "",
        color: "#2196F3",
      });
      setSearchQuery("");
      onSelect(newCategory);
    } catch (error) {
      // El error ya se maneja en el hook
    }
  };

  const handleCloseDialog = () => {
    setShowCreateDialog(false);
    setNewCategoryForm({
      name: "",
      description: "",
      examples: "",
      color: "#2196F3",
    });
  };

  // Obtener nombre de categoría seleccionada
  const selectedCategoryName = useMemo(() => {
    if (!value) return "";

    if (typeof value === "string") return value;

    const category = categories.find((cat) => cat.id === value);
    return category?.name || "";
  }, [value, categories]);

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 p-2">
        <Loader2 className="h-4 w-4 animate-spin" />
        <span className="text-sm text-muted-foreground">
          Cargando categorías...
        </span>
      </div>
    );
  }

  return (
    <>
      <div className={`space-y-2 ${className}`}>
        {/* Selector principal */}
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={placeholder}
            disabled={disabled}
            className="pl-9"
          />
        </div>

        {/* Categorías populares */}
        {showPopular && popularCategories.length > 0 && !searchQuery && (
          <div className="space-y-1">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Star className="h-3 w-3" />
              <span>Populares</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {popularCategories.map((category) => (
                <Badge
                  key={category.id}
                  variant="secondary"
                  className="cursor-pointer hover:bg-secondary/80"
                  onClick={() => handleCategorySelect(category)}
                >
                  <div
                    className="w-2 h-2 rounded-full mr-1"
                    style={{ backgroundColor: category.color }}
                  />
                  {category.name}
                  {!category.is_default && " ★"}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Categorías recientes */}
        {showRecent && recentCategories.length > 0 && !searchQuery && (
          <div className="space-y-1">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              <span>Recientes</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {recentCategories.map((category) => (
                <Badge
                  key={category.id}
                  variant="outline"
                  className="cursor-pointer hover:bg-accent"
                  onClick={() => handleCategorySelect(category)}
                >
                  <div
                    className="w-2 h-2 rounded-full mr-1"
                    style={{ backgroundColor: category.color }}
                  />
                  {category.name}
                  {!category.is_default && " ★"}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Resultados de búsqueda */}
        {searchQuery && (
          <div className="max-h-60 overflow-y-auto space-y-1">
            {/* Categorías personalizadas */}
            {organizedCategories.custom.length > 0 && (
              <>
                <div className="text-xs font-medium text-muted-foreground px-2">
                  Mis categorías
                </div>
                {organizedCategories.custom.map((category) => (
                  <div
                    key={category.id}
                    className="flex items-center gap-2 p-2 rounded-md hover:bg-accent cursor-pointer"
                    onClick={() => handleCategorySelect(category)}
                  >
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: category.color }}
                    />
                    <div className="flex-1">
                      <div className="font-medium">{category.name} ★</div>
                      {category.description && (
                        <div className="text-xs text-muted-foreground">
                          {category.description}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </>
            )}

            {/* Categorías predefinidas */}
            {organizedCategories.defaults.length > 0 && (
              <>
                <div className="text-xs font-medium text-muted-foreground px-2">
                  Categorías predefinidas
                </div>
                {organizedCategories.defaults.map((category) => (
                  <div
                    key={category.id}
                    className="flex items-center gap-2 p-2 rounded-md hover:bg-accent cursor-pointer"
                    onClick={() => handleCategorySelect(category)}
                  >
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: category.color }}
                    />
                    <div className="flex-1">
                      <div className="font-medium">{category.name}</div>
                      {category.description && (
                        <div className="text-xs text-muted-foreground">
                          {category.description}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </>
            )}

            {/* Botón crear nueva */}
            {allowCreate &&
              searchQuery.trim() &&
              filteredCategories.length === 0 && (
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-2"
                  onClick={handleCreateNew}
                >
                  <Plus className="h-4 w-4" />
                  Crear "{searchQuery}"
                </Button>
              )}

            {/* Sin resultados */}
            {filteredCategories.length === 0 && !allowCreate && (
              <div className="p-4 text-center text-sm text-muted-foreground">
                No se encontraron categorías
              </div>
            )}
          </div>
        )}

        {/* Categoría seleccionada */}
        {selectedCategoryName && !searchQuery && (
          <div className="p-2 bg-accent rounded-md">
            <div className="text-sm font-medium">Categoría seleccionada:</div>
            <div className="text-sm text-muted-foreground">
              {selectedCategoryName}
            </div>
          </div>
        )}
      </div>

      {/* Diálogo crear categoría */}
      <Dialog open={showCreateDialog} onOpenChange={handleCloseDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Crear nueva categoría</DialogTitle>
            <DialogDescription>
              Crea una categoría personalizada para organizar mejor tus gastos
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nombre *
              </Label>
              <Input
                id="name"
                value={newCategoryForm.name}
                onChange={(e) =>
                  setNewCategoryForm((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
                className="col-span-3"
                placeholder="Ej: Mascotas, Tecnología..."
                maxLength={100}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Descripción
              </Label>
              <Textarea
                id="description"
                value={newCategoryForm.description}
                onChange={(e) =>
                  setNewCategoryForm((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                className="col-span-3"
                placeholder="Descripción opcional..."
                maxLength={500}
                rows={2}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="examples" className="text-right">
                Ejemplos
              </Label>
              <Textarea
                id="examples"
                value={newCategoryForm.examples}
                onChange={(e) =>
                  setNewCategoryForm((prev) => ({
                    ...prev,
                    examples: e.target.value,
                  }))
                }
                className="col-span-3"
                placeholder="Ej: Comida para perro, veterinario, juguetes..."
                maxLength={500}
                rows={2}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="color" className="text-right">
                Color
              </Label>
              <div className="col-span-3 flex items-center gap-2">
                <Input
                  id="color"
                  type="color"
                  value={newCategoryForm.color}
                  onChange={(e) =>
                    setNewCategoryForm((prev) => ({
                      ...prev,
                      color: e.target.value,
                    }))
                  }
                  className="w-12 h-8 p-1 border rounded"
                />
                <span className="text-sm text-muted-foreground">
                  {newCategoryForm.color}
                </span>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleCloseDialog}>
              Cancelar
            </Button>
            <Button
              onClick={handleCreateCategory}
              disabled={
                createCategory.isPending || !newCategoryForm.name.trim()
              }
            >
              {createCategory.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Creando...
                </>
              ) : (
                "Crear categoría"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CategorySelector;
