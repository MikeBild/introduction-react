import { createContext, useContext, type ReactNode } from "react";
import { useAuth } from "./useAuth";

interface AuthContextProps {
  userToken?: string;
  isAuthenticated?: boolean;
  login?: (username: string) => void;
}

const AuthContext = createContext<AuthContextProps>({ login: () => null });

export function AuthProvider({ children }: { children: ReactNode }) {
  const auth = useAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  return useContext(AuthContext);
}
