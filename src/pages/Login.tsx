
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AuthenticationTabs from "@/components/AuthenticationTabs";
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
        <AuthenticationTabs />
      </div>
      <Footer />
    </main>
  );
};

export default Login;
