import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WaitlistForm from "@/components/WaitlistForm";
import Seo from "@/components/Seo";
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
    <main className="min-h-screen bg-[#0a0a0a] text-foreground relative overflow-hidden">
      <Seo page="login" />
      <Header />
      <WaitlistForm />
      <Footer />
    </main>
  );
};

export default Login;
