import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WaitlistForm from "@/components/WaitlistForm";

const Login = () => {
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
