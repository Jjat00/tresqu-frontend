import { ViteReactSSG } from "vite-react-ssg";
import { routes } from "./routes";
import "./index.css";

// Entry del SSG: en build prerenderiza las rutas públicas a HTML estático y en
// el cliente hidrata la misma app (SPA). El routing vive en ./routes.
export const createRoot = ViteReactSSG({
  routes,
  basename: import.meta.env.BASE_URL,
});
