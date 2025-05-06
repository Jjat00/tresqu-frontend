import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WaitlistForm from "@/components/WaitlistForm";
const Login = () => {
  return <main className="min-h-screen bg-background text-foreground">
      <Header />
      <div className="container mx-auto py-12 px-0">
        <WaitlistForm />
      </div>
      <Footer />
    </main>;
};
export default Login;