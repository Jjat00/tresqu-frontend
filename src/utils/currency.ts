// Helpers de moneda compartidos por gastos e ingresos.
//
// Regla del producto: NUNCA se convierte entre monedas (no inventamos una tasa
// de cambio). Cada moneda se suma y se muestra por separado, y todo importe
// visible lleva su moneda al lado: un "$6.000.000" sin más es ambiguo cuando el
// mismo usuario tiene movimientos en COP y en USD.

export type CurrencyTotals = Record<string, number>;

// Acepta cualquier fila con importe y moneda: gastos, ingresos, o los datos
// crudos de un endpoint (el importe puede venir como string decimal de DRF).
type AmountWithCurrency = { amount: string | number; currency?: string | null };

export const DEFAULT_CURRENCY = "COP";

export const computeTotalsByCurrency = (
  rows: AmountWithCurrency[]
): CurrencyTotals =>
  rows.reduce<CurrencyTotals>((totals, row) => {
    const amount =
      typeof row.amount === "number" ? row.amount : parseFloat(row.amount);
    if (Number.isNaN(amount)) return totals;
    const currency = row.currency || DEFAULT_CURRENCY;
    totals[currency] = (totals[currency] ?? 0) + amount;
    return totals;
  }, {});

// Entradas ordenadas con COP primero, luego el resto alfabéticamente.
export const sortedCurrencyTotals = (
  totals: CurrencyTotals
): [string, number][] =>
  Object.entries(totals)
    .filter(([, value]) => value !== 0)
    .sort(([a], [b]) =>
      a === DEFAULT_CURRENCY ? -1 : b === DEFAULT_CURRENCY ? 1 : a.localeCompare(b)
    );

// Un importe con su moneda explícita: "$6.000.000 COP".
export const formatAmountWithCurrency = (
  amount: number | string,
  currency?: string | null,
  locale = "es-CO"
): string => {
  const value = typeof amount === "number" ? amount : parseFloat(amount);
  const safeValue = Number.isNaN(value) ? 0 : value;
  // Las monedas de alta denominación (COP, CLP...) se leen mejor sin decimales;
  // en USD/EUR los centavos sí importan.
  const maximumFractionDigits =
    currency === DEFAULT_CURRENCY || !currency ? 0 : 2;
  return `$${safeValue.toLocaleString(locale, {
    maximumFractionDigits,
  })} ${currency || DEFAULT_CURRENCY}`;
};

// Texto compacto para totales: "$140.536 COP · $98 USD"
export const formatCurrencyTotals = (
  totals: CurrencyTotals,
  locale = "es-CO"
): string => {
  const entries = sortedCurrencyTotals(totals);
  if (entries.length === 0) return `$0 ${DEFAULT_CURRENCY}`;
  return entries
    .map(([currency, value]) => formatAmountWithCurrency(value, currency, locale))
    .join(" · ");
};
