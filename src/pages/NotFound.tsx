import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Home, ArrowLeft } from "lucide-react";
import { pathFor, useCopy, useLocale } from "@/i18n";
import { notFoundCopy } from "@/i18n/copy/notFound";
import { SeoNotFound } from "@/components/Seo";
import PageDots from "@/components/PageDots";
import "@/styles/noche.css";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const locale = useLocale();
  const copy = useCopy(notFoundCopy);

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="tq-page">
      <SeoNotFound />
      <main className="tq-404">
        {/* Retícula de puntos «Noche de puntos» */}
        <PageDots />

        <div className="tq-404-inner">
          <p className="tq-eyebrow">{copy.label}</p>

          {/* Large 404 */}
          <h1 className="tq-404-code tq-wordmark select-none">404</h1>

          <h2>{copy.title}</h2>
          <p className="tq-lead">{copy.body}</p>

          <div className="tq-ctas">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="tq-btn tq-btn-sm tq-btn-dash tq-grad-border"
            >
              <ArrowLeft aria-hidden="true" />
              {copy.back}
            </button>
            <button
              type="button"
              onClick={() => navigate(pathFor("home", locale))}
              className="tq-btn tq-btn-sm tq-btn-wa"
            >
              <Home aria-hidden="true" />
              {copy.home}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NotFound;
