import {
  SavingsGoal,
  SavingsGoalPriority,
  SavingsGoalStatus,
  AutoSaveFrequency,
  TransactionType,
} from "@/types/savings";

/**
 * Formatea un monto en moneda colombiana
 */
export const formatCurrency = (amount: string | number): string => {
  const numAmount = typeof amount === "string" ? parseFloat(amount) : amount;

  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(numAmount);
};

/**
 * Formatea un porcentaje
 */
export const formatPercentage = (percentage: string | number): string => {
  const numPercentage =
    typeof percentage === "string" ? parseFloat(percentage) : percentage;
  return `${numPercentage.toFixed(1)}%`;
};

/**
 * Calcula los días restantes hasta una fecha objetivo
 */
export const getDaysUntilTarget = (targetDate: string): number => {
  const target = new Date(targetDate);
  const today = new Date();
  const diffTime = target.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

/**
 * Obtiene el color de estado basado en el progreso
 */
export const getProgressColor = (percentage: string | number): string => {
  const numPercentage =
    typeof percentage === "string" ? parseFloat(percentage) : percentage;

  if (numPercentage >= 100) return "#4CAF50"; // Verde - Completado
  if (numPercentage >= 75) return "#8BC34A"; // Verde claro - Casi completado
  if (numPercentage >= 50) return "#FFC107"; // Amarillo - En progreso
  if (numPercentage >= 25) return "#FF9800"; // Naranja - Inicio
  return "#F44336"; // Rojo - Necesita atención
};

/**
 * Obtiene el color de prioridad
 */
export const getPriorityColor = (priority: SavingsGoalPriority): string => {
  switch (priority) {
    case "urgent":
      return "#F44336"; // Rojo
    case "high":
      return "#FF9800"; // Naranja
    case "medium":
      return "#FFC107"; // Amarillo
    case "low":
      return "#4CAF50"; // Verde
    default:
      return "#9E9E9E"; // Gris
  }
};

/**
 * Obtiene el texto de prioridad en español
 */
export const getPriorityText = (priority: SavingsGoalPriority): string => {
  switch (priority) {
    case "urgent":
      return "Urgente";
    case "high":
      return "Alta";
    case "medium":
      return "Media";
    case "low":
      return "Baja";
    default:
      return "Desconocida";
  }
};

/**
 * Obtiene el texto de estado en español
 */
export const getStatusText = (status: SavingsGoalStatus): string => {
  switch (status) {
    case "active":
      return "Activa";
    case "completed":
      return "Completada";
    case "paused":
      return "Pausada";
    case "cancelled":
      return "Cancelada";
    default:
      return "Desconocido";
  }
};

/**
 * Obtiene el color de estado
 */
export const getStatusColor = (status: SavingsGoalStatus): string => {
  switch (status) {
    case "active":
      return "#2196F3"; // Azul
    case "completed":
      return "#4CAF50"; // Verde
    case "paused":
      return "#FF9800"; // Naranja
    case "cancelled":
      return "#F44336"; // Rojo
    default:
      return "#9E9E9E"; // Gris
  }
};

/**
 * Obtiene el texto de frecuencia en español
 */
export const getFrequencyText = (frequency: AutoSaveFrequency): string => {
  switch (frequency) {
    case "daily":
      return "Diario";
    case "weekly":
      return "Semanal";
    case "monthly":
      return "Mensual";
    default:
      return "Desconocida";
  }
};

/**
 * Obtiene el texto de tipo de transacción en español
 */
export const getTransactionTypeText = (type: TransactionType): string => {
  switch (type) {
    case "deposit":
      return "Depósito";
    case "withdrawal":
      return "Retiro";
    case "adjustment":
      return "Ajuste";
    case "interest":
      return "Interés";
    default:
      return "Desconocido";
  }
};

/**
 * Obtiene el color de tipo de transacción
 */
export const getTransactionTypeColor = (type: TransactionType): string => {
  switch (type) {
    case "deposit":
      return "#4CAF50"; // Verde
    case "withdrawal":
      return "#F44336"; // Rojo
    case "adjustment":
      return "#FF9800"; // Naranja
    case "interest":
      return "#2196F3"; // Azul
    default:
      return "#9E9E9E"; // Gris
  }
};

/**
 * Calcula el tiempo estimado para completar una meta
 */
export const calculateCompletionTime = (goal: SavingsGoal): string => {
  const remaining = parseFloat(goal.remaining_amount);
  const dailyNeeded = parseFloat(goal.daily_savings_needed);

  if (dailyNeeded <= 0) return "No definido";

  const daysNeeded = Math.ceil(remaining / dailyNeeded);

  if (daysNeeded <= 30) {
    return `${daysNeeded} días`;
  } else if (daysNeeded <= 365) {
    const months = Math.ceil(daysNeeded / 30);
    return `${months} meses`;
  } else {
    const years = Math.floor(daysNeeded / 365);
    const remainingMonths = Math.ceil((daysNeeded % 365) / 30);
    return remainingMonths > 0
      ? `${years} años y ${remainingMonths} meses`
      : `${years} años`;
  }
};

/**
 * Valida si una meta está en riesgo de no cumplirse
 */
export const isGoalAtRisk = (goal: SavingsGoal): boolean => {
  const daysUntilTarget = getDaysUntilTarget(goal.target_date);
  const progress = parseFloat(goal.progress_percentage);

  // Si faltan menos de 30 días y el progreso es menor al 80%
  if (daysUntilTarget <= 30 && progress < 80) return true;

  // Si faltan menos de 7 días y el progreso es menor al 95%
  if (daysUntilTarget <= 7 && progress < 95) return true;

  // Si la fecha objetivo ya pasó y no está completada
  if (daysUntilTarget < 0 && goal.status !== "completed") return true;

  return false;
};

/**
 * Obtiene recomendación de ahorro basada en el progreso
 */
export const getSavingRecommendation = (goal: SavingsGoal): string => {
  const progress = parseFloat(goal.progress_percentage);
  const daysUntilTarget = getDaysUntilTarget(goal.target_date);

  if (progress >= 100) {
    return "¡Felicitaciones! Has alcanzado tu meta de ahorro.";
  }

  if (daysUntilTarget < 0) {
    return "Tu meta ha vencido. Considera extender la fecha o ajustar el monto.";
  }

  if (isGoalAtRisk(goal)) {
    return "Tu meta está en riesgo. Considera aumentar tus ahorros o extender la fecha.";
  }

  if (progress >= 75) {
    return "¡Excelente progreso! Estás muy cerca de alcanzar tu meta.";
  }

  if (progress >= 50) {
    return "Buen progreso. Mantén el ritmo para alcanzar tu meta a tiempo.";
  }

  if (progress >= 25) {
    return "Has comenzado bien. Considera aumentar un poco tus ahorros para estar más seguro.";
  }

  return "Es momento de comenzar a ahorrar más activamente para esta meta.";
};

/**
 * Formatea una fecha en español
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("es-CO", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

/**
 * Obtiene el icono para el tipo de transacción
 */
export const getTransactionIcon = (type: TransactionType): string => {
  switch (type) {
    case "deposit":
      return "⬆️";
    case "withdrawal":
      return "⬇️";
    case "adjustment":
      return "⚖️";
    case "interest":
      return "💰";
    default:
      return "💳";
  }
};

/**
 * Calcula el ahorro promedio mensual necesario
 */
export const calculateMonthlyAverageNeeded = (goal: SavingsGoal): number => {
  const remaining = parseFloat(goal.remaining_amount);
  const daysUntilTarget = getDaysUntilTarget(goal.target_date);

  if (daysUntilTarget <= 0) return 0;

  const monthsRemaining = daysUntilTarget / 30;
  return remaining / monthsRemaining;
};
