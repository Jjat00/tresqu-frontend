import { useState, useEffect, useCallback } from "react";
import { SavingsCategory, CreateSavingsCategoryRequest } from "@/types/savings";
import {
  getSavingsCategories,
  getSavingsCategoryById,
  createSavingsCategory,
  updateSavingsCategory,
  deleteSavingsCategory,
} from "@/services/savings";

export const useSavingsCategories = () => {
  const [categories, setCategories] = useState<SavingsCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getSavingsCategories();
      setCategories(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Error al cargar categorías de ahorro"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const createCategory = useCallback(
    async (categoryData: CreateSavingsCategoryRequest) => {
      try {
        const newCategory = await createSavingsCategory(categoryData);
        setCategories((prev) => [...prev, newCategory]);
        return newCategory;
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Error al crear categoría de ahorro"
        );
        throw err;
      }
    },
    []
  );

  const updateCategory = useCallback(
    async (
      categoryId: string,
      updateData: Partial<CreateSavingsCategoryRequest>
    ) => {
      try {
        const updatedCategory = await updateSavingsCategory(
          categoryId,
          updateData
        );
        setCategories((prev) =>
          prev.map((category) =>
            category.id === categoryId ? updatedCategory : category
          )
        );
        return updatedCategory;
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Error al actualizar categoría de ahorro"
        );
        throw err;
      }
    },
    []
  );

  const deleteCategory = useCallback(async (categoryId: string) => {
    try {
      await deleteSavingsCategory(categoryId);
      setCategories((prev) =>
        prev.filter((category) => category.id !== categoryId)
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Error al eliminar categoría de ahorro"
      );
      throw err;
    }
  }, []);

  return {
    categories,
    loading,
    error,
    refetch: fetchCategories,
    createCategory,
    updateCategory,
    deleteCategory,
  };
};

export const useSavingsCategory = (categoryId: string) => {
  const [category, setCategory] = useState<SavingsCategory | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategory = useCallback(async () => {
    if (!categoryId) return;

    try {
      setLoading(true);
      setError(null);
      const data = await getSavingsCategoryById(categoryId);
      setCategory(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Error al cargar categoría de ahorro"
      );
    } finally {
      setLoading(false);
    }
  }, [categoryId]);

  useEffect(() => {
    fetchCategory();
  }, [fetchCategory]);

  return {
    category,
    loading,
    error,
    refetch: fetchCategory,
  };
};
