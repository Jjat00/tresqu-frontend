import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-success/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="text-center px-4 relative z-10">
        {/* Large 404 */}
        <h1 className="text-[8rem] sm:text-[12rem] font-display font-bold leading-none tracking-tighter text-foreground/5 select-none">
          404
        </h1>

        {/* Content */}
        <div className="-mt-10 sm:-mt-14">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
            Página no encontrada
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-md mx-auto mb-8">
            La página que buscas no existe o fue movida. Verifica la URL o regresa al inicio.
          </p>

          <div className="flex items-center justify-center gap-3">
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver
            </Button>
            <Button
              onClick={() => navigate("/")}
              className="bg-success hover:bg-success/90 gap-2"
            >
              <Home className="h-4 w-4" />
              Ir al inicio
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
