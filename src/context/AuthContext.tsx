import { createContext, useState, useEffect } from "react";
import { AuthService } from "@/api/auth.service";
import * as z from "zod";
import type { LoginSchema } from "@/schemas/loginSchema";

interface AuthContextType {
  user: any;
  token: string | null;
  loading: boolean;
  login: (data: z.infer<typeof LoginSchema>) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const login = async ({ correo, contrasena }: z.infer<typeof LoginSchema>) => {
    try {
      const res = await AuthService.login({ correo, contrasena });

      const t = res.access_token;

      localStorage.setItem("token", t);
      setToken(t);

      const me = await AuthService.me(t);
      setUser(me);

    } catch (err: any) {
      console.error("Login error:", err);
      throw err; // re-lanza para que el form pueda manejarlo
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
  };

  useEffect(() => {
    const stored = localStorage.getItem("token");
    if (!stored) return setLoading(false);

    setToken(stored);

    AuthService.me(stored)
      .then(setUser)
      .finally(() => setLoading(false));
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        loading,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
