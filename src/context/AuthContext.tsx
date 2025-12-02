import { createContext } from "react";
import * as z from "zod";
import { LoginSchema } from "@/schemas/loginSchema";

interface AuthContextType {
  user: any;
  token: string | null;
  loading: boolean;
  login: (data: z.infer<typeof LoginSchema>) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}


export const AuthContext = createContext<AuthContextType | null>(null);
