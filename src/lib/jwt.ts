/**
 * Utilidades mínimas para leer la caducidad de un JWT en el cliente.
 *
 * Solo se decodifica el payload (nunca se verifica la firma: eso es cosa del
 * backend). Sirve para saber, sin llamar a la API, si el access token ya
 * caducó y hay que refrescarlo antes de disparar peticiones.
 */

interface JwtPayload {
  exp?: number;
  [claim: string]: unknown;
}

/** Decodifica el payload de un JWT. Devuelve null si el token está malformado. */
export const decodeJwt = (token: string | null): JwtPayload | null => {
  if (!token) return null;

  const payload = token.split(".")[1];
  if (!payload) return null;

  try {
    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64.padEnd(
      base64.length + ((4 - (base64.length % 4)) % 4),
      "="
    );
    // atob devuelve binario "latin1": lo pasamos a UTF-8 por si hay acentos.
    const json = decodeURIComponent(
      Array.from(atob(padded))
        .map((c) => `%${c.charCodeAt(0).toString(16).padStart(2, "0")}`)
        .join("")
    );
    return JSON.parse(json) as JwtPayload;
  } catch {
    return null;
  }
};

/** Instante de caducidad del token en ms epoch, o null si no lo declara. */
export const getTokenExpiry = (token: string | null): number | null => {
  const exp = decodeJwt(token)?.exp;
  return typeof exp === "number" ? exp * 1000 : null;
};

/**
 * ¿El token caduca dentro de `withinMs`? Un token sin `exp` legible se trata
 * como caducado: es preferible refrescar de más que quedarse fuera.
 */
export const tokenExpiresWithin = (
  token: string | null,
  withinMs: number
): boolean => {
  if (!token) return true;
  const expiry = getTokenExpiry(token);
  if (expiry === null) return true;
  return expiry - Date.now() <= withinMs;
};

/**
 * ¿El token caducó con certeza?
 *
 * Al contrario que `tokenExpiresWithin`, aquí se es conservador: un token cuyo
 * `exp` no se puede leer NO se da por caducado. Esta función decide si se mata
 * la sesión, y ante la duda es mejor dejar que responda el backend.
 */
export const isTokenExpired = (token: string | null): boolean => {
  if (!token) return true;
  const expiry = getTokenExpiry(token);
  if (expiry === null) return false;
  return expiry <= Date.now();
};
