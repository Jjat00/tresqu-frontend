import { useLocale } from "./LocaleContext";
import type { Dict } from "./types";

export const useCopy = <T,>(dict: Dict<T>): T => dict[useLocale()];
