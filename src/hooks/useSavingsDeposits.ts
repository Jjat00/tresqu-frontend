import { useState, useEffect, useCallback } from "react";
import {
  SavingsDeposit,
  SavingsDepositFilters,
  CreateSavingsDepositRequest,
} from "@/types/savings";
import {
  getSavingsDeposits,
  getSavingsDepositById,
  createSavingsDeposit,
  updateSavingsDeposit,
  deleteSavingsDeposit,
} from "@/services/savings";

export const useSavingsDeposits = (filters?: SavingsDepositFilters) => {
  const [deposits, setDeposits] = useState<SavingsDeposit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDeposits = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getSavingsDeposits(filters);
      setDeposits(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Error al cargar transacciones de ahorro"
      );
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchDeposits();
  }, [fetchDeposits]);

  const createDeposit = useCallback(
    async (depositData: CreateSavingsDepositRequest) => {
      try {
        const newDeposit = await createSavingsDeposit(depositData);
        setDeposits((prev) => [newDeposit, ...prev]);
        return newDeposit;
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Error al crear transacción de ahorro"
        );
        throw err;
      }
    },
    []
  );

  const updateDeposit = useCallback(
    async (
      depositId: string,
      updateData: Partial<CreateSavingsDepositRequest>
    ) => {
      try {
        const updatedDeposit = await updateSavingsDeposit(
          depositId,
          updateData
        );
        setDeposits((prev) =>
          prev.map((deposit) =>
            deposit.id === depositId ? updatedDeposit : deposit
          )
        );
        return updatedDeposit;
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Error al actualizar transacción de ahorro"
        );
        throw err;
      }
    },
    []
  );

  const deleteDeposit = useCallback(async (depositId: string) => {
    try {
      await deleteSavingsDeposit(depositId);
      setDeposits((prev) => prev.filter((deposit) => deposit.id !== depositId));
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Error al eliminar transacción de ahorro"
      );
      throw err;
    }
  }, []);

  return {
    deposits,
    loading,
    error,
    refetch: fetchDeposits,
    createDeposit,
    updateDeposit,
    deleteDeposit,
  };
};

export const useSavingsDeposit = (depositId: string) => {
  const [deposit, setDeposit] = useState<SavingsDeposit | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDeposit = useCallback(async () => {
    if (!depositId) return;

    try {
      setLoading(true);
      setError(null);
      const data = await getSavingsDepositById(depositId);
      setDeposit(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Error al cargar transacción de ahorro"
      );
    } finally {
      setLoading(false);
    }
  }, [depositId]);

  useEffect(() => {
    fetchDeposit();
  }, [fetchDeposit]);

  return {
    deposit,
    loading,
    error,
    refetch: fetchDeposit,
  };
};
