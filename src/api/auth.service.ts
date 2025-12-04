import { apiFetch } from "@/api/client";
import { PublicanteSchema, EntidadSchema, LoginSchema } from "@/schemas/userSchema";
import * as z from "zod";

export const AuthService = {
  login: async ({ correo, contrasena }: z.infer<typeof LoginSchema>) => {
    try {
      const form = new URLSearchParams();
      form.append("username", correo);
      form.append("password", contrasena);

      return await apiFetch("/token", {
        method: "POST",
        body: form,
      });
    } catch (err) {
      throw err;
    }
  },

  registerPublicante: async (data: z.infer<typeof PublicanteSchema>) => {
    try {
      return await apiFetch("/CreatePublicante", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch(err) {
      throw err;
    }
  },

  registerEntidad: async (data: z.infer<typeof EntidadSchema>) => {
    try {
      return await apiFetch("/CreateEntidad", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        }
      });
    } catch (err) {
      throw err;
    }
  },

  me: async (token: string) => {
    try {
      return await apiFetch("/users/me", {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
    } catch (err) {
      throw err;
    }
  },
};
