import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import type * as z from "zod";
import { AuthService } from "@/api/auth.service";
import { ApiError } from "@/api/client";
import { AuthContext } from "@/context/AuthContext";
import type {
  EntidadSchema,
  LoginSchema,
  ProfileSchema,
  PublicanteSchema,
} from "@/schemas/userSchema";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<
    z.infer<typeof EntidadSchema> | z.infer<typeof PublicanteSchema> | null
  >(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const login = async ({ correo, contrasena }: z.infer<typeof LoginSchema>) => {
    setLoading(true);
    const res = await AuthService.login({ correo, contrasena });

    const t = res.access_token;

    localStorage.setItem("token", t);
    setToken(t);

    const me = await AuthService.me(t);
    me.contrasena = contrasena; // guardar la contrasena normal no la hasheada
    setUser(me);
    setLoading(false);
  };

  const logout = () => {
    setLoading(true);
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
    navigate("/", { replace: true });
    setLoading(false);
  };

  const update = async (data: z.infer<typeof ProfileSchema>, token: string) => {
    setLoading(true);
    const res = await AuthService.update(data, token);

    const newUser = { contrasena: user?.contrasena, ...res! };
    setUser(newUser);
    setLoading(false);
  };

  useEffect(() => {
    const fetchUser = async () => {
      const stored = localStorage.getItem("token");
      if (!stored) return setLoading(false);
      try {
        const res = await AuthService.me(stored);
        setUser(res);
        setToken(stored);
      } catch (err) {
        if (err instanceof ApiError) {
          if (err.status === 401) localStorage.removeItem("token");
        }
        // TODO: manejar cuando sea otro error ?
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        update,
        loading,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
