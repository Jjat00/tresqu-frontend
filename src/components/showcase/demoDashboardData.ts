import type { QueryClient } from "@tanstack/react-query";
import { toLocalISODate } from "@/utils/dateUtils";
import type { DateRange } from "@/components/dashboard/DateRangePicker";

/**
 * Data de demostración para la vitrina de la landing.
 *
 * La vitrina monta los tabs REALES del dashboard dentro de un QueryClient
 * propio con `enabled: false`: nada llega a la red y cada hook lee de la
 * caché lo que se siembra aquí. Las query keys deben coincidir EXACTAMENTE
 * con las que derivan los componentes a partir de las props con que los
 * montamos (dateRange fijo de julio 2026).
 */

// Rango fijo — julio 2026. Fechas construidas una sola vez para que las keys
// que serializan Date (toISOString) sean estables entre renders.
export const DEMO_FROM = new Date(2026, 6, 1);
export const DEMO_TO = new Date(2026, 6, 31);
export const demoDateRange: DateRange = { from: DEMO_FROM, to: DEMO_TO };

const isoDay = (d: Date) => d.toISOString().split("T")[0];
const FROM_DAY = isoDay(DEMO_FROM); // "2026-07-01"
const TO_DAY = isoDay(DEMO_TO); // "2026-07-31"

const FILTER_SUMMARY = "Gastos del 01/07/2026 al 31/07/2026";

// ── Categorías de gastos (colores de "la galería" del usuario demo) ─────────
const EXPENSE_CATEGORIES = [
  { name: "Mercado", color: "#4ade80", total: 620000 },
  { name: "Restaurantes", color: "#f472b6", total: 480000 },
  { name: "Transporte", color: "#60a5fa", total: 360000 },
  { name: "Suscripciones", color: "#fbbf24", total: 310000 },
  { name: "Salidas", color: "#a78bfa", total: 190000 },
];

const EXPENSES_TOTAL = EXPENSE_CATEGORIES.reduce((s, c) => s + c.total, 0);

// Filas para la tabla de historial (shape Expense/ExpenseRow del backend)
const expenseRow = (
  id: number,
  amount: number,
  description: string,
  catIndex: number,
  day: number,
) => {
  const cat = EXPENSE_CATEGORIES[catIndex];
  const iso = `2026-07-${String(day).padStart(2, "0")}T14:30:00Z`;
  return {
    id,
    user: 1,
    amount: String(amount),
    currency: "COP",
    description,
    timestamp: iso,
    raw_message: description,
    created_at: iso,
    updated_at: iso,
    category: catIndex + 1,
    category_str: cat.name,
    spent_at: iso,
    note: "",
    category_name: cat.name,
    user_expense_category: {
      id: catIndex + 1,
      name: cat.name,
      color: cat.color,
      is_default: true,
    },
  };
};

const DEMO_EXPENSE_ROWS = [
  expenseRow(1, 86500, "Mercado semanal", 0, 28),
  expenseRow(2, 48000, "Cena con amigos", 1, 26),
  expenseRow(3, 23500, "Taxi al aeropuerto", 2, 25),
  expenseRow(4, 42900, "Suscripción streaming", 3, 22),
  expenseRow(5, 65000, "Concierto", 4, 19),
  expenseRow(6, 112300, "Mercado quincena", 0, 15),
  expenseRow(7, 38700, "Almuerzo de trabajo", 1, 12),
  expenseRow(8, 19800, "Buses del mes", 2, 8),
];

// ── Ingresos ─────────────────────────────────────────────────────────────────
const INCOME_SUMMARY = {
  period: "month" as const,
  start_date: FROM_DAY,
  end_date: TO_DAY,
  summary: [
    { id: 1, category__name: "Salario", currency: "COP", total: 4200000 },
    { id: 2, category__name: "Freelance", currency: "COP", total: 1400000 },
    { id: 3, category__name: "Inversiones", currency: "COP", total: 620000 },
    { id: 4, category__name: "Otros", currency: "COP", total: 280000 },
  ],
  total: 6500000,
};

const INCOME_PIE = {
  labels: INCOME_SUMMARY.summary.map((s) => s.category__name),
  datasets: [
    {
      data: INCOME_SUMMARY.summary.map((s) => s.total),
      backgroundColor: ["#34d399", "#22d3ee", "#818cf8", "#fbbf24"],
      hoverBackgroundColor: ["#34d399", "#22d3ee", "#818cf8", "#fbbf24"],
    },
  ],
  filter_summary: "Ingresos de julio 2026",
  total_amount: 6500000,
};

const incomeSeries = (values: number[]) => ({
  label: "Ingresos",
  data: values,
  backgroundColor: "#00FF7F",
  borderColor: "#00FF7F",
  borderWidth: 2,
  fill: true,
  tension: 0.4,
});

const INCOME_LINE = {
  labels: ["01/07", "05/07", "09/07", "13/07", "17/07", "21/07", "25/07", "29/07"],
  datasets: [
    incomeSeries([420000, 760000, 4480000, 4720000, 5150000, 5480000, 6120000, 6500000]),
  ],
  filter_summary: "Ingresos de julio 2026",
  total_amount: 6500000,
};

const INCOME_BARS = {
  labels: ["01/07", "05/07", "09/07", "13/07", "17/07", "21/07", "25/07", "29/07"],
  datasets: [
    {
      label: "Salario",
      data: [0, 0, 4200000, 0, 0, 0, 0, 0],
      backgroundColor: "#34d399",
      borderColor: "#34d399",
      borderWidth: 1,
    },
    {
      label: "Freelance",
      data: [280000, 0, 0, 240000, 350000, 0, 530000, 0],
      backgroundColor: "#22d3ee",
      borderColor: "#22d3ee",
      borderWidth: 1,
    },
    {
      label: "Inversiones",
      data: [0, 210000, 0, 0, 80000, 190000, 0, 140000],
      backgroundColor: "#818cf8",
      borderColor: "#818cf8",
      borderWidth: 1,
    },
    {
      label: "Otros",
      data: [140000, 130000, 0, 0, 0, 10000, 0, 0],
      backgroundColor: "#fbbf24",
      borderColor: "#fbbf24",
      borderWidth: 1,
    },
  ],
  filter_summary: "Ingresos de julio 2026",
  total_amount: 6500000,
  group_by: "day" as const,
};

// ── Wallbit / Inversiones ────────────────────────────────────────────────────
const NOW_ISO = "2026-07-09T18:40:00Z";

const DEMO_HOLDINGS = [
  {
    symbol: "META",
    name: "Meta Platforms Inc.",
    kind: "STOCK",
    shares: "1.2500",
    avg_cost: "486.00",
    current_price: "612.40",
    cost_basis: "607.50",
    market_value: "765.50",
    pnl_usd: "158.00",
    pnl_pct: 26.0,
  },
  {
    symbol: "NVDA",
    name: "NVIDIA Corporation",
    kind: "STOCK",
    shares: "6.4000",
    avg_cost: "118.75",
    current_price: "172.30",
    cost_basis: "760.00",
    market_value: "1102.72",
    pnl_usd: "342.72",
    pnl_pct: 45.1,
  },
  {
    symbol: "VOO",
    name: "Vanguard S&P 500 ETF",
    kind: "ETF",
    shares: "2.8000",
    avg_cost: "512.00",
    current_price: "575.60",
    cost_basis: "1433.60",
    market_value: "1611.68",
    pnl_usd: "178.08",
    pnl_pct: 12.4,
  },
];

const DEMO_PORTFOLIO_SUMMARY = {
  total_invested_usd: "3200.00",
  total_withdrawn_usd: "250.00",
  net_invested_usd: "2950.00",
  current_value_usd: "3479.90",
  pnl_usd: "529.90",
  pnl_pct: 17.9,
  holdings_count: 3,
  cash: [{ currency: "USD", amount: "1250.00" }],
  robo_net_contributed_usd: "400.00",
  investment_cash_usd: "180.00",
  last_sync_at: NOW_ISO,
  pending_trades: [
    {
      symbol: "VOO",
      action: "BUY" as const,
      amount_usd: "120.00",
      shares: null,
      executed_at: null,
      status: "pending",
    },
  ],
};

const pnlPoint = (date: string, pnl: number, value: number) => ({
  date,
  pnl_usd: pnl.toFixed(2),
  pnl_pct: Number(((pnl / 2950) * 100).toFixed(2)),
  market_value_usd: value.toFixed(2),
  invested_total_usd: "2950.00",
});

// Historia con drama: arranca en positivo, cae a terreno negativo a mitad
// de mes y remonta hasta cerrar bien por encima del arranque.
const DEMO_PNL_TIMELINE = {
  period: "1m" as const,
  stale: false,
  points: [
    pnlPoint("2026-06-09", 68, 3018),
    pnlPoint("2026-06-12", 142, 3092),
    pnlPoint("2026-06-15", 55, 3005),
    pnlPoint("2026-06-18", -48, 2902),
    pnlPoint("2026-06-21", -125, 2825),
    pnlPoint("2026-06-24", -60, 2890),
    pnlPoint("2026-06-27", 24, 2974),
    pnlPoint("2026-06-30", 168, 3118),
    pnlPoint("2026-07-03", 315, 3265),
    pnlPoint("2026-07-06", 442, 3392),
    pnlPoint("2026-07-09", 530, 3480),
  ],
};

const DEMO_TIMELINE = {
  period: "3m" as const,
  points: [
    { date: "2026-04-10", invested_total_usd: "1800.00" },
    { date: "2026-04-28", invested_total_usd: "2100.00" },
    { date: "2026-05-15", invested_total_usd: "2400.00" },
    { date: "2026-06-02", invested_total_usd: "2650.00" },
    { date: "2026-06-20", invested_total_usd: "2850.00" },
    { date: "2026-07-08", invested_total_usd: "2950.00" },
  ],
};

const investment = (
  id: number,
  action: "BUY" | "SELL" | "DEPOSIT" | "WITHDRAW",
  symbol: string,
  amount: string,
  shares: string | null,
  date: string,
) => ({
  id,
  kind: "STOCK" as const,
  action,
  symbol,
  chest_category: "",
  amount_usd: amount,
  shares,
  wallbit_tx_uuid: null,
  status: "executed" as const,
  executed_at: date,
  created_at: date,
});

const DEMO_INVESTMENTS = {
  count: 6,
  next: null,
  previous: null,
  results: [
    investment(6, "BUY", "NVDA", "200.00", "1.1600", "2026-07-06T15:20:00Z"),
    investment(5, "BUY", "VOO", "300.00", "0.5300", "2026-06-24T14:05:00Z"),
    investment(4, "DEPOSIT", "", "500.00", null, "2026-06-18T13:00:00Z"),
    investment(3, "BUY", "META", "250.00", "0.4300", "2026-06-05T16:45:00Z"),
    investment(2, "SELL", "NVDA", "150.00", "0.9100", "2026-05-22T15:30:00Z"),
    investment(1, "BUY", "NVDA", "400.00", "3.4000", "2026-05-08T14:10:00Z"),
  ],
};

// ── Seeding ──────────────────────────────────────────────────────────────────
export const seedDemoDashboard = (queryClient: QueryClient) => {
  const now = new Date();

  // ═══ GASTOS ═══
  // Dona + KPIs (useCategoryPieChartData) — key con toISOString del rango
  queryClient.setQueryData(
    ["donutChartData", DEMO_FROM.toISOString(), DEMO_TO.toISOString()],
    {
      labels: EXPENSE_CATEGORIES.map((c) => c.name),
      datasets: [
        {
          data: EXPENSE_CATEGORIES.map((c) => c.total),
          backgroundColor: EXPENSE_CATEGORIES.map((c) => c.color),
          hoverBackgroundColor: EXPENSE_CATEGORIES.map((c) => c.color),
        },
      ],
      filter_summary: FILTER_SUMMARY,
      total_amount: EXPENSES_TOTAL,
      totals_by_currency: { COP: EXPENSES_TOTAL },
      total_count: 38,
      recent_expenses: DEMO_EXPENSE_ROWS,
    },
  );

  // Mapa de colores de categorías del usuario
  queryClient.setQueryData(
    ["expenseCategories", "colorsMap"],
    Object.fromEntries(EXPENSE_CATEGORIES.map((c) => [c.name, c.color])),
  );

  // Barras apiladas (ChartJSBarChart): con dateRange de 30 días → group_by week
  queryClient.setQueryData(
    [
      "barStackedChart",
      {
        date_filter: "custom",
        start_date: toLocalISODate(DEMO_FROM),
        end_date: toLocalISODate(DEMO_TO),
        group_by: "week",
      },
    ],
    {
      labels: ["01/07", "08/07", "15/07", "22/07", "29/07"],
      datasets: EXPENSE_CATEGORIES.map((c, i) => ({
        label: c.name,
        data: [
          [180000, 96000, 74000, 52000, 38000][i],
          [110000, 120000, 86000, 64000, 41000][i],
          [152000, 98000, 92000, 70000, 46000][i],
          [98000, 102000, 68000, 78000, 35000][i],
          [80000, 64000, 40000, 46000, 30000][i],
        ],
        backgroundColor: c.color,
        borderColor: c.color,
        borderWidth: 1,
      })),
      filter_summary: FILTER_SUMMARY,
      total_amount: EXPENSES_TOTAL,
      group_by: "week",
      recent_expenses: [],
    },
  );

  // Historial (ExpensesTable) — usa mes/año actuales del navegador
  queryClient.setQueryData(
    ["expensesData", now.getMonth() + 1, now.getFullYear()],
    {
      by_category: Object.fromEntries(
        EXPENSE_CATEGORIES.map((c) => [c.name, c.total]),
      ),
      total: EXPENSES_TOTAL,
      recent_expenses: DEMO_EXPENSE_ROWS,
    },
  );

  // ═══ INGRESOS ═══
  // KPIs del tab (con dateRange) y tabla (sin dateRange)
  queryClient.setQueryData(
    ["incomeSummary", "month", FROM_DAY, TO_DAY],
    INCOME_SUMMARY,
  );
  queryClient.setQueryData(
    ["incomeSummary", "month", undefined, undefined],
    INCOME_SUMMARY,
  );

  // Línea (key comparte los objetos Date del rango)
  queryClient.setQueryData(
    ["incomeLineData", "week", DEMO_FROM, DEMO_TO],
    INCOME_LINE,
  );

  // Barras: key del padre (sin params) y del hijo (custom por dateRange)
  queryClient.setQueryData(["incomeBarData", {}], INCOME_BARS);
  queryClient.setQueryData(
    [
      "incomeBarData",
      {
        group_by: "day",
        date_filter: "custom",
        start_date: FROM_DAY,
        end_date: TO_DAY,
      },
    ],
    INCOME_BARS,
  );

  // Dona: key del padre (sin params) y del hijo (custom por dateRange)
  queryClient.setQueryData(["incomePieChart", {}], INCOME_PIE);
  queryClient.setQueryData(
    [
      "incomePieChart",
      { date_filter: "custom", start_date: FROM_DAY, end_date: TO_DAY },
    ],
    INCOME_PIE,
  );

  // Estadísticas
  queryClient.setQueryData(["incomeStats", 3], {
    average_monthly_income: 5900000,
    current_month_income: 6500000,
    previous_month_income: 5600000,
    difference: 900000,
    percentage_change: 16.1,
    next_month_projection: 6300000,
    months_analyzed: 3,
  });

  // ═══ INVERSIONES (Wallbit) ═══
  queryClient.setQueryData(["wallbit-status"], {
    connected: true,
    status: "connected",
    connected_at: "2026-05-02T12:00:00Z",
    last_sync_at: NOW_ISO,
    kill_switch_until: null,
  });
  queryClient.setQueryData(
    ["wallbit", "portfolio", "summary"],
    DEMO_PORTFOLIO_SUMMARY,
  );
  queryClient.setQueryData(["wallbit", "portfolio", "holdings"], DEMO_HOLDINGS);
  queryClient.setQueryData(
    ["wallbit", "portfolio", "pnl-timeline", "1m"],
    DEMO_PNL_TIMELINE,
  );
  queryClient.setQueryData(
    ["wallbit", "portfolio", "timeline", "3m"],
    DEMO_TIMELINE,
  );
  queryClient.setQueryData(
    ["wallbit", "investments", { action: undefined, page: 1, page_size: 20 }],
    DEMO_INVESTMENTS,
  );
  // AssetExplorer fetchea al montar (enabled propio) — sembrar evita la red
  const logo = (symbol: string) =>
    `https://assets.parqet.com/logos/symbol/${symbol}?format=png&size=64`;
  queryClient.setQueryData(
    ["wallbit", "assets", "search", "", "MOST_POPULAR", 6],
    {
      assets: [
        { symbol: "AAPL", name: "Apple Inc.", asset_type: "STOCK", sector: "Tecnología", price: 248.3, logo_url: logo("AAPL"), country: "US" },
        { symbol: "NVDA", name: "NVIDIA Corporation", asset_type: "STOCK", sector: "Tecnología", price: 172.3, logo_url: logo("NVDA"), country: "US" },
        { symbol: "MSFT", name: "Microsoft Corporation", asset_type: "STOCK", sector: "Tecnología", price: 512.8, logo_url: logo("MSFT"), country: "US" },
        { symbol: "TSLA", name: "Tesla Inc.", asset_type: "STOCK", sector: "Automotriz", price: 331.5, logo_url: logo("TSLA"), country: "US" },
        { symbol: "VOO", name: "Vanguard S&P 500 ETF", asset_type: "ETF", sector: "Índices", price: 575.6, logo_url: logo("VOO"), country: "US" },
        { symbol: "AMZN", name: "Amazon.com Inc.", asset_type: "STOCK", sector: "Consumo", price: 228.4, logo_url: logo("AMZN"), country: "US" },
      ],
    },
  );
};
