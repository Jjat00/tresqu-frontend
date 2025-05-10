import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WaitlistForm from "@/components/WaitlistForm";
import { useIsAuthenticated } from "@/store/authStore";

const Login = () => {
  const navigate = useNavigate();
  const isAuthenticated = useIsAuthenticated();

  useEffect(() => {
    window.scrollTo(0, 0);

    // Redirigir al dashboard si el usuario está autenticado
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  return (
    <main className="min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* Efectos de fondo globales */}
      <div className="fixed inset-0 z-[-2] opacity-50 pointer-events-none">
        <div
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 25% 25%, rgba(74, 222, 128, 0.1), transparent 40%)",
          }}
        ></div>
        <div
          className="absolute bottom-0 right-0 w-full h-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 75% 75%, rgba(96, 165, 250, 0.1), transparent 40%)",
          }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at center, rgba(167, 139, 250, 0.05), transparent 50%)",
          }}
        ></div>
      </div>

      {/* Patrón sutil de puntos o rejilla */}
      <div
        className="fixed inset-0 z-[-2] opacity-5 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px)`,
          backgroundSize: "30px 30px",
        }}
      ></div>

      <Header />
      <WaitlistForm />
      <Footer />
    </main>
  );
};

export default Login;
