import { createContext } from "react";
import type * as z from "zod";
import type {
  EntidadSchema,
  LoginSchema,
  ProfileSchema,
  PublicanteSchema,
} from "@/schemas/userSchema";

interface AuthContextType {
  user: z.infer<typeof EntidadSchema> | z.infer<typeof PublicanteSchema> | null;
  token: string | null;
  loading: boolean;
  login: (data: z.infer<typeof LoginSchema>) => Promise<void>;
  logout: () => void;
  update: (data: z.infer<typeof ProfileSchema>, token: string) => Promise<void>;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);
