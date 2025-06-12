import { useState, useEffect, useCallback } from "react";
import {
  SavingsTemplate,
  SavingsGoal,
  CreateGoalFromTemplateRequest,
} from "@/types/savings";
import {
  getSavingsTemplates,
  getSavingsTemplateById,
  createGoalFromTemplate,
} from "@/services/savings";

export const useSavingsTemplates = () => {
  const [templates, setTemplates] = useState<SavingsTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTemplates = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getSavingsTemplates();
      setTemplates(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Error al cargar plantillas de ahorro"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTemplates();
  }, [fetchTemplates]);

  const createGoalFromTemplateAction = useCallback(
    async (templateId: string, goalData?: CreateGoalFromTemplateRequest) => {
      try {
        const newGoal = await createGoalFromTemplate(templateId, goalData);
        return newGoal;
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Error al crear meta desde plantilla"
        );
        throw err;
      }
    },
    []
  );

  return {
    templates,
    loading,
    error,
    refetch: fetchTemplates,
    createGoalFromTemplate: createGoalFromTemplateAction,
  };
};

export const useSavingsTemplate = (templateId: string) => {
  const [template, setTemplate] = useState<SavingsTemplate | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTemplate = useCallback(async () => {
    if (!templateId) return;

    try {
      setLoading(true);
      setError(null);
      const data = await getSavingsTemplateById(templateId);
      setTemplate(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Error al cargar plantilla de ahorro"
      );
    } finally {
      setLoading(false);
    }
  }, [templateId]);

  useEffect(() => {
    fetchTemplate();
  }, [fetchTemplate]);

  return {
    template,
    loading,
    error,
    refetch: fetchTemplate,
  };
};
