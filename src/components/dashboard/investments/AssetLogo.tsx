import { useState } from "react";

interface AssetLogoProps {
  symbol: string;
  size?: number;
  className?: string;
}

/**
 * Logo del activo por ticker (CDN pública de logos bursátiles) con fallback
 * a las iniciales del símbolo si el logo no existe o falla la carga.
 */
const AssetLogo = ({ symbol, size = 24, className = "" }: AssetLogoProps) => {
  const [failed, setFailed] = useState(false);
  const clean = symbol?.trim().toUpperCase();

  if (!clean || failed) {
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
      src={`https://assets.parqet.com/logos/symbol/${clean}?format=png&size=${size * 2}`}
      alt={clean}
      width={size}
      height={size}
      loading="lazy"
      onError={() => setFailed(true)}
      className={`rounded-full bg-white object-contain shrink-0 ${className}`}
      style={{ width: size, height: size }}
    />
  );
};

export default AssetLogo;
