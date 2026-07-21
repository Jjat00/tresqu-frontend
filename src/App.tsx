import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import {
  LOCALES,
  localizedRoutes,
  routeKeys,
  LocaleProvider,
  type Locale,
  type RouteKey,
} from "@/i18n";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import LegalNotice from "./pages/LegalNotice";
import FacebookPrivacyPolicy from "./pages/FacebookPrivacyPolicy";
import TresquCent from "./pages/TresquCent";
import Features from "./pages/Features";
import Agents from "./pages/Agents";

// Páginas públicas con versión en ambos idiomas (ver src/i18n/routes.ts)
const publicPages: Record<RouteKey, React.ReactElement> = {
  home: <Index />,
  features: <Features />,
  login: <Login />,
};

const LocaleLayout = ({ locale }: { locale: Locale }) => (
  <LocaleProvider locale={locale}>
    <Outlet />
  </LocaleProvider>
);

// Create a new QueryClient instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

const App = () => (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Sitio público ES + EN, generado desde la tabla de rutas */}
            {LOCALES.map((locale) => (
              <Route key={locale} element={<LocaleLayout locale={locale} />}>
                {routeKeys.map((key) => (
                  <Route
                    key={key}
                    path={localizedRoutes[key][locale]}
                    element={publicPages[key]}
                  />
                ))}
                {/* Más específico que "*": 404 en inglés bajo /en */}
                {locale === "en" && (
                  <Route path="/en/*" element={<NotFound />} />
                )}
              </Route>
            ))}

            {/* Rutas solo en español (app privada y legales) */}
            <Route element={<LocaleLayout locale="es" />}>
              <Route path="/dashboard" element={<Navigate to="/dashboard/home" replace />} />
              <Route path="/dashboard/account" element={<Profile />} />
              {/* Ruta antigua: el perfil ahora vive bajo "Cuenta" */}
              <Route
                path="/dashboard/profile"
                element={<Navigate to="/dashboard/account" replace />}
              />
              {/* Equipo de agentes: roster y una ruta propia por agente */}
              <Route path="/dashboard/agents" element={<Agents />} />
              <Route path="/dashboard/agents/:agentId" element={<Agents />} />
              <Route path="/dashboard/:section" element={<Dashboard />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/legal-notice" element={<LegalNotice />} />
              <Route
                path="/facebook-privacy-policy"
                element={<FacebookPrivacyPolicy />}
              />
              <Route path="/tresqu-cent" element={<TresquCent />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

export default App;
