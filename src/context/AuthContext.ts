import { createContext } from "react";
import type * as z from "zod";
import type {
  EntidadSchema,
  LoginSchema,
  PublicanteSchema,
} from "@/schemas/userSchema";

interface AuthContextType {
  user: z.infer<typeof EntidadSchema> | z.infer<typeof PublicanteSchema> | null;
  token: string | null;
  loading: boolean;
  login: (data: z.infer<typeof LoginSchema>) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);
