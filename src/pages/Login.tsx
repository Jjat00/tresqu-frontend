
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WaitlistForm from "@/components/WaitlistForm";
import { isAuthenticated } from "@/services/authService";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirigir al dashboard si ya hay una sesión activa
    if (isAuthenticated()) {
      navigate("/dashboard");
    }
  }, [navigate]);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      <div className="container mx-auto px-4 py-12">
        <WaitlistForm />
      </div>
      <Footer />
    </main>
  );
};

export default Login;
