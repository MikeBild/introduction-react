import { createContext, useContext, type ReactNode } from "react";
import { useAuth } from "./useAuth";

interface AuthContextProps {
  userToken?: string;
  isAuthenticated?: boolean;
  login: (username: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const defaultAuth = useAuth();

  return (
    <AuthContext.Provider value={defaultAuth}>{children}</AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
