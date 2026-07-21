import { useEffect } from "react";
import { canonicalUrlFor, useLocale, type RouteKey } from "@/i18n";
import { notFoundSeo, seoCopy } from "@/i18n/copy/seo";

// React 19 hoistea <title>/<meta>/<link> renderizados aquí al <head>, pero
// NO deduplica contra las etiquetas estáticas del shell HTML: esas van
// marcadas con data-seo-static y se eliminan una sola vez al primer mount.
// Si una página no monta <Seo> (legales, dashboard), el shell queda intacto.
let staticTagsCleaned = false;

const useCleanStaticTags = () => {
  useEffect(() => {
    if (staticTagsCleaned) return;
    document
      .querySelectorAll("[data-seo-static]")
      .forEach((el) => el.remove());
    staticTagsCleaned = true;
  }, []);
};

/** Meta del 404: solo title + noindex, sin canonical ni hreflang. */
export const SeoNotFound = () => {
  const locale = useLocale();
  useCleanStaticTags();
  return (
    <>
      <title>{notFoundSeo[locale].title}</title>
      <meta name="robots" content="noindex" />
    </>
  );
};

const Seo = ({ page }: { page: RouteKey }) => {
  const locale = useLocale();
  const meta = seoCopy[page][locale];
  const esUrl = canonicalUrlFor(page, "es");
  const enUrl = canonicalUrlFor(page, "en");
  const canonical = locale === "es" ? esUrl : enUrl;
  useCleanStaticTags();

  return (
    <>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <link rel="canonical" href={canonical} />
      <link rel="alternate" hrefLang="es" href={esUrl} />
      <link rel="alternate" hrefLang="en" href={enUrl} />
      {/* x-default → versión en español */}
      <link rel="alternate" hrefLang="x-default" href={esUrl} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:url" content={canonical} />
      <meta
        property="og:locale"
        content={locale === "es" ? "es_LA" : "en_US"}
      />
      <meta
        property="og:locale:alternate"
        content={locale === "es" ? "en_US" : "es_LA"}
      />
    </>
  );
};

export default Seo;
