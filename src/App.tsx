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

// Solo la landing viaja en el bundle de entrada: es lo primero que ve un
// visitante nuevo y lo que miden PageSpeed y los crawlers. El resto
// (dashboard con Recharts y xlsx, chat, legales) se pide al navegar.
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Profile = React.lazy(() => import("./pages/Profile"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const Login = React.lazy(() => import("./pages/Login"));
const PrivacyPolicy = React.lazy(() => import("./pages/PrivacyPolicy"));
const LegalNotice = React.lazy(() => import("./pages/LegalNotice"));
const FacebookPrivacyPolicy = React.lazy(
  () => import("./pages/FacebookPrivacyPolicy"),
);
const TresquCent = React.lazy(() => import("./pages/TresquCent"));
const Features = React.lazy(() => import("./pages/Features"));
const Agents = React.lazy(() => import("./pages/Agents"));

// Pantalla mientras llega el chunk de la ruta. Sin spinner: en conexiones
// normales dura milisegundos y un spinner que parpadea se ve peor que el fondo.
const RouteFallback = () => (
  <div className="min-h-screen bg-[#0a0a0a]" aria-busy="true" />
);

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
          <React.Suspense fallback={<RouteFallback />}>
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
          </React.Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

export default App;
