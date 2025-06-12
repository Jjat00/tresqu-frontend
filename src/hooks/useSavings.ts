import { useState, useEffect, useCallback } from "react";
import {
  SavingsGoal,
  SavingsGoalFilters,
  CreateSavingsGoalRequest,
  SavingsAnalytics,
  CategoryDistribution,
  ProgressOverTime,
  CompletionForecast,
  SavingsRecommendations,
  ProgressOverTimeParams,
} from "@/types/savings";
import {
  getSavingsGoals,
  getSavingsGoalById,
  createSavingsGoal,
  updateSavingsGoal,
  deleteSavingsGoal,
  pauseSavingsGoal,
  resumeSavingsGoal,
  completeSavingsGoal,
  cancelSavingsGoal,
  getSavingsGoalRecommendations,
  getSavingsAnalytics,
  getCategoryDistribution,
  getProgressOverTime,
  getCompletionForecast,
} from "@/services/savings";

export const useSavingsGoals = (filters?: SavingsGoalFilters) => {
  const [goals, setGoals] = useState<SavingsGoal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchGoals = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getSavingsGoals(filters);
      setGoals(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Error al cargar metas de ahorro"
      );
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchGoals();
  }, [fetchGoals]);

  const createGoal = useCallback(async (goalData: CreateSavingsGoalRequest) => {
    try {
      const newGoal = await createSavingsGoal(goalData);
      setGoals((prev) => [...prev, newGoal]);
      return newGoal;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Error al crear meta de ahorro"
      );
      throw err;
    }
  }, []);

  const updateGoal = useCallback(
    async (goalId: string, updateData: Partial<CreateSavingsGoalRequest>) => {
      try {
        const updatedGoal = await updateSavingsGoal(goalId, updateData);
        setGoals((prev) =>
          prev.map((goal) => (goal.id === goalId ? updatedGoal : goal))
        );
        return updatedGoal;
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Error al actualizar meta de ahorro"
        );
        throw err;
      }
    },
    []
  );

  const deleteGoal = useCallback(async (goalId: string) => {
    try {
      await deleteSavingsGoal(goalId);
      setGoals((prev) => prev.filter((goal) => goal.id !== goalId));
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Error al eliminar meta de ahorro"
      );
      throw err;
    }
  }, []);

  const pauseGoal = useCallback(async (goalId: string) => {
    try {
      const updatedGoal = await pauseSavingsGoal(goalId);
      setGoals((prev) =>
        prev.map((goal) => (goal.id === goalId ? updatedGoal : goal))
      );
      return updatedGoal;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Error al pausar meta de ahorro"
      );
      throw err;
    }
  }, []);

  const resumeGoal = useCallback(async (goalId: string) => {
    try {
      const updatedGoal = await resumeSavingsGoal(goalId);
      setGoals((prev) =>
        prev.map((goal) => (goal.id === goalId ? updatedGoal : goal))
      );
      return updatedGoal;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Error al reanudar meta de ahorro"
      );
      throw err;
    }
  }, []);

  const completeGoal = useCallback(async (goalId: string) => {
    try {
      const updatedGoal = await completeSavingsGoal(goalId);
      setGoals((prev) =>
        prev.map((goal) => (goal.id === goalId ? updatedGoal : goal))
      );
      return updatedGoal;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Error al completar meta de ahorro"
      );
      throw err;
    }
  }, []);

  const cancelGoal = useCallback(async (goalId: string) => {
    try {
      const updatedGoal = await cancelSavingsGoal(goalId);
      setGoals((prev) =>
        prev.map((goal) => (goal.id === goalId ? updatedGoal : goal))
      );
      return updatedGoal;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Error al cancelar meta de ahorro"
      );
      throw err;
    }
  }, []);

  return {
    goals,
    loading,
    error,
    refetch: fetchGoals,
    createGoal,
    updateGoal,
    deleteGoal,
    pauseGoal,
    resumeGoal,
    completeGoal,
    cancelGoal,
  };
};

export const useSavingsGoal = (goalId: string) => {
  const [goal, setGoal] = useState<SavingsGoal | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchGoal = useCallback(async () => {
    if (!goalId) return;

    try {
      setLoading(true);
      setError(null);
      const data = await getSavingsGoalById(goalId);
      setGoal(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Error al cargar meta de ahorro"
      );
    } finally {
      setLoading(false);
    }
  }, [goalId]);

  useEffect(() => {
    fetchGoal();
  }, [fetchGoal]);

  return {
    goal,
    loading,
    error,
    refetch: fetchGoal,
  };
};

export const useSavingsRecommendations = (goalId: string) => {
  const [recommendations, setRecommendations] =
    useState<SavingsRecommendations | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRecommendations = useCallback(async () => {
    if (!goalId) return;

    try {
      setLoading(true);
      setError(null);
      const data = await getSavingsGoalRecommendations(goalId);
      setRecommendations(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Error al cargar recomendaciones"
      );
    } finally {
      setLoading(false);
    }
  }, [goalId]);

  useEffect(() => {
    fetchRecommendations();
  }, [fetchRecommendations]);

  return {
    recommendations,
    loading,
    error,
    refetch: fetchRecommendations,
  };
};

export const useSavingsAnalytics = () => {
  const [analytics, setAnalytics] = useState<SavingsAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAnalytics = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getSavingsAnalytics();
      setAnalytics(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Error al cargar análisis de ahorros"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  return {
    analytics,
    loading,
    error,
    refetch: fetchAnalytics,
  };
};

export const useSavingsCategoryDistribution = () => {
  const [distribution, setDistribution] = useState<CategoryDistribution | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDistribution = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getCategoryDistribution();
      setDistribution(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Error al cargar distribución por categoría"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDistribution();
  }, [fetchDistribution]);

  return {
    distribution,
    loading,
    error,
    refetch: fetchDistribution,
  };
};

export const useSavingsProgressOverTime = (params?: ProgressOverTimeParams) => {
  const [progress, setProgress] = useState<ProgressOverTime | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProgress = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getProgressOverTime(params);
      setProgress(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Error al cargar progreso histórico"
      );
    } finally {
      setLoading(false);
    }
  }, [params]);

  useEffect(() => {
    fetchProgress();
  }, [fetchProgress]);

  return {
    progress,
    loading,
    error,
    refetch: fetchProgress,
  };
};

export const useSavingsCompletionForecast = () => {
  const [forecast, setForecast] = useState<CompletionForecast | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchForecast = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getCompletionForecast();
      setForecast(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Error al cargar pronóstico de completación"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchForecast();
  }, [fetchForecast]);

  return {
    forecast,
    loading,
    error,
    refetch: fetchForecast,
  };
};
