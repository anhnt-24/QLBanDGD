import { createContext, useEffect, useState } from "react";
import { AuthContextType, AuthProviderProps } from "../types";

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [auth, setAuth] = useState<AuthContextType["auth"] | undefined>(() => {
    try {
      return JSON.parse(localStorage.getItem("auth") || "null");
    } catch {
      return undefined;
    }
  });

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
