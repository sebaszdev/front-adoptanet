import { useState, useEffect } from "react";
import { AuthService } from "@/api/auth.service";
import * as z from "zod";
import type { LoginSchema } from "@/schemas/userSchema";
import { AuthContext } from "@/context/AuthContext";
import { useNavigate } from "react-router";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const login = async ({ correo, contrasena }: z.infer<typeof LoginSchema>) => {
    try {
      const res = await AuthService.login({ correo, contrasena });

      const t = res.access_token;

      localStorage.setItem("token", t);
      setToken(t);

      const me = await AuthService.me(t);
      setUser(me);

    } catch (err) {
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
    navigate("/", { replace: true });
  };

  useEffect(() => {
    const fetchUser = async () => {
      const stored = localStorage.getItem("token");
      if (!stored) return setLoading(false);

      const res = await AuthService.me(stored);
      if (res) { // el token no esta vencido        
        setUser(res);
        setToken(stored);
      } else { // token vencido, borrarlo
        localStorage.removeItem('token');
      }

      setLoading(false);
    }

    fetchUser();
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
