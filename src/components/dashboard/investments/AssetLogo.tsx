import { useState } from "react";

interface AssetLogoProps {
  symbol: string;
  /** Logo alternativo (p. ej. el `logo_url` del catálogo de Wallbit). */
  fallbackSrc?: string | null;
  size?: number;
  className?: string;
}

/**
 * Logo del activo por ticker (CDN pública de logos bursátiles). Si falla,
 * prueba `fallbackSrc` y, si tampoco carga, muestra las iniciales del símbolo.
 */
const AssetLogo = ({ symbol, fallbackSrc, size = 24, className = "" }: AssetLogoProps) => {
  const clean = symbol?.trim().toUpperCase();
  const sources = [
    clean ? `https://assets.parqet.com/logos/symbol/${clean}?format=png&size=${size * 2}` : null,
    fallbackSrc || null,
  ].filter((s): s is string => Boolean(s));
  const [failed, setFailed] = useState<Set<string>>(() => new Set());
  const src = sources.find((s) => !failed.has(s));

  if (!src) {
    return (
      <span
        className={`inline-flex items-center justify-center rounded-full bg-white/[0.06] border border-white/10 text-[9px] font-bold text-zinc-300 shrink-0 ${className}`}
        style={{ width: size, height: size }}
        aria-hidden="true"
      >
        {clean ? clean.slice(0, 2) : "—"}
      </span>
    );
  }

  return (
    <img
      key={src}
      src={src}
      alt={clean}
      width={size}
      height={size}
      loading="lazy"
      onError={() => setFailed((prev) => new Set(prev).add(src))}
      className={`rounded-full bg-white object-contain shrink-0 ${className}`}
      style={{ width: size, height: size }}
    />
  );
};

export default AssetLogo;
