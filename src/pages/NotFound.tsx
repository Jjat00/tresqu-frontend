import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";
import { pathFor, useCopy, useLocale } from "@/i18n";
import { notFoundCopy } from "@/i18n/copy/notFound";
import { SeoNotFound } from "@/components/Seo";

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
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      <SeoNotFound />
      {/* Atmósfera estilo landing */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-blueprint" />
        <div className="absolute inset-0 section-aura-green" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-success/5 rounded-full blur-[150px]" />
      </div>

      <div className="text-center px-4 relative z-10">
        {/* Etiqueta terminal */}
        <span className="section-label mb-4">{copy.label}</span>

        {/* Large 404 */}
        <h1 className="text-[8rem] sm:text-[12rem] font-display font-bold leading-none tracking-tighter text-outline-ghost select-none">
          404
        </h1>

        {/* Content */}
        <div className="-mt-10 sm:-mt-14">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
            {copy.title}
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-md mx-auto mb-8">
            {copy.body}
          </p>

          <div className="flex items-center justify-center gap-3">
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              {copy.back}
            </Button>
            <Button
              onClick={() => navigate(pathFor("home", locale))}
              className="cta-neon bg-success hover:bg-success/90 gap-2"
            >
              <Home className="h-4 w-4" />
              {copy.home}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
