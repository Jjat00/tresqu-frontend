import { StateCreator, create } from "zustand";
import { PersistOptions, persist, createJSONStorage } from "zustand/middleware";
import { User } from "@/types/auth";

// Interfaces para los diferentes slices del estado
interface AuthState {
  // Usuario
  user: User | null;

  // Tokens
  accessToken: string | null;
  refreshToken: string | null;

  // Estado
  isLoading: boolean;
  error: string | null;

  // Acciones
  setUser: (user: User | null) => void;
  setTokens: (access: string, refresh: string) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  setAuthData: (
    userData: User,
    tokens: { access: string; refresh: string }
  ) => void;
  clearAuth: () => void;
  isAuthenticated: () => boolean;
}

type AuthPersist = (
  config: StateCreator<AuthState>,
  options: PersistOptions<AuthState>
) => StateCreator<AuthState>;

// Creamos la tienda
export const useAuthStore = create<AuthState>()(
  (persist as AuthPersist)(
    (set, get) => ({
      // Estado inicial
      user: null,
      accessToken: null,
      refreshToken: null,
      isLoading: false,
      error: null,

      // Setters
      setUser: (user: User | null) => set({ user }),

      setTokens: (access: string, refresh: string) =>
        set({
          accessToken: access,
          refreshToken: refresh,
        }),

      setLoading: (isLoading: boolean) => set({ isLoading }),

      setError: (error: string | null) => set({ error }),

      // Métodos combinados
      setAuthData: (
        userData: User,
        tokens: { access: string; refresh: string }
      ) =>
        set({
          user: userData,
          accessToken: tokens.access,
          refreshToken: tokens.refresh,
          error: null,
        }),

      clearAuth: () => {
        // Reiniciar el estado
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          error: null,
        });

        // Eliminar completamente del localStorage
        if (typeof window !== "undefined") {
          localStorage.removeItem("auth-storage");
        }
      },

      // Computed value para autenticación
      isAuthenticated: () => {
        const state = get();
        return !!state.user && !!state.accessToken;
      },
    }),
    {
      name: "auth-storage",
      partialize: (state: AuthState) =>
        ({
          user: state.user,
          accessToken: state.accessToken,
          refreshToken: state.refreshToken,
        } as unknown as AuthState),
      storage: createJSONStorage(() =>
        typeof window !== "undefined"
          ? localStorage
          : {
              getItem: () => null,
              setItem: () => null,
              removeItem: () => null,
            }
      ),
    }
  )
);

// Selectores para componentes
export const useUser = () => useAuthStore((state: AuthState) => state.user);
export const useIsLoading = () =>
  useAuthStore((state: AuthState) => state.isLoading);
export const useAuthError = () =>
  useAuthStore((state: AuthState) => state.error);
export const useIsAuthenticated = () =>
  useAuthStore((state: AuthState) => state.isAuthenticated());
