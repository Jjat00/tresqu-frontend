import React from "react";
import { Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ClientOnly } from "vite-react-ssg";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

// Una sola instancia de QueryClient. Para las páginas públicas no se prefetchea
// nada en build, así que compartirla entre renders del SSG es seguro.
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutos
    },
  },
});

// Layout raíz: monta los providers y deja el resto a las rutas hijas (<Outlet/>).
// Los toasters son UI puramente de cliente (sin valor SEO) y next-themes/Sonner
// tocan el DOM, así que se montan client-only para no interferir con el SSG.
const Layout = () => (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ClientOnly>{() => (<><Toaster /><Sonner /></>)}</ClientOnly>
        <Outlet />
      </TooltipProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

export default Layout;
