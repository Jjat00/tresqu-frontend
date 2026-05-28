interface SparklineProps {
  /** Chronological price series. Needs ≥2 points to draw a line. */
  prices: number[];
  /** Drives the stroke color; defaults to the muted/lateral tone. */
  trend?: string;
  width?: number;
  height?: number;
  className?: string;
}

const TREND_COLORS: Record<string, string> = {
  alcista: "#4ade80",
  bajista: "#f87171",
  lateral: "hsl(0 0% 50%)",
};

/**
 * A tiny, dependency-free inline sparkline (no axes/grid/tooltip). Prices are
 * normalized to the viewbox so any value range fits. Renders nothing meaningful
 * when there's fewer than 2 points — the caller decides the empty fallback.
 */
const Sparkline = ({
  prices,
  trend,
  width = 80,
  height = 24,
  className,
}: SparklineProps) => {
  const color = TREND_COLORS[trend ?? "lateral"] ?? TREND_COLORS.lateral;

  if (!prices || prices.length < 2) return null;

  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const span = max - min || 1; // avoid divide-by-zero on a flat line
  // A little vertical padding so the stroke isn't clipped at the edges.
  const pad = 2;
  const usableH = height - pad * 2;
  const step = width / (prices.length - 1);

  const points = prices
    .map((price, i) => {
      const x = i * step;
      const y = pad + (1 - (price - min) / span) * usableH;
      return `${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(" ");

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      role="img"
      aria-hidden="true"
      className={className}
    >
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
};

export default Sparkline;
