import type { RouteRecord } from "vite-react-ssg";
import { Navigate } from "react-router-dom";
import Layout from "./Layout";
// Páginas públicas: import directo para que se rendericen en el SSG (prerender).
import Index from "./pages/Index";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import LegalNotice from "./pages/LegalNotice";
import FacebookPrivacyPolicy from "./pages/FacebookPrivacyPolicy";
import TresquCent from "./pages/TresquCent";

// Páginas detrás de auth / dinámicas: lazy para que NO se carguen durante el
// prerender de las públicas, y excluidas del prerender en vite.config
// (`ssgOptions.includedRoutes`). Adaptamos el `default` export al shape `{ Component }`
// que espera el data router de react-router.
const lazyDefault =
  (factory: () => Promise<{ default: React.ComponentType }>) => async () => ({
    Component: (await factory()).default,
  });

export const routes: RouteRecord[] = [
  {
    path: "/",
    element: <Layout />,
    entry: "src/Layout.tsx", // evita perder estilos en la prehidratación
    children: [
      // --- Públicas (se prerenderizan) ---
      { index: true, Component: Index },
      { path: "privacy-policy", Component: PrivacyPolicy },
      { path: "legal-notice", Component: LegalNotice },
      { path: "facebook-privacy-policy", Component: FacebookPrivacyPolicy },
      { path: "tresqu-cent", Component: TresquCent },

      // --- Cliente / auth (NO se prerenderizan) ---
      { path: "login", lazy: lazyDefault(() => import("./pages/Login")) },
      { path: "dashboard", element: <Navigate to="/dashboard/home" replace /> },
      {
        path: "dashboard/account",
        lazy: lazyDefault(() => import("./pages/Profile")),
      },
      {
        path: "dashboard/profile",
        element: <Navigate to="/dashboard/account" replace />,
      },
      {
        path: "dashboard/agents",
        lazy: lazyDefault(() => import("./pages/Agents")),
      },
      {
        path: "dashboard/agents/:agentId",
        lazy: lazyDefault(() => import("./pages/Agents")),
      },
      {
        path: "dashboard/:section",
        lazy: lazyDefault(() => import("./pages/Dashboard")),
      },

      // Catch-all
      { path: "*", lazy: lazyDefault(() => import("./pages/NotFound")) },
    ],
  },
];
