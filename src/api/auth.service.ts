import { apiFetch } from "@/api/client";
import * as z from "zod";
import { PublicanteSchema } from "@/schemas/publicanteSchema";
import { EntidadSchema } from "@/schemas/entidadSchema";
import { LoginSchema } from "@/schemas/loginSchema";

export const AuthService = {
  login: async ({ correo, contrasena }: z.infer<typeof LoginSchema>) => {
    try {
      const form = new URLSearchParams();
      form.append("username", correo);
      form.append("password", contrasena);

      return apiFetch("/token", {
        method: "POST",
        body: form,
        headers: {},
      });
    } catch (err) {
      console.error(err);
    }
  },

  registerPublicante: async (data: z.infer<typeof PublicanteSchema>) => {
    try {
      return apiFetch("/CreatePublicante", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch(err: any) {
      if (err.status === 400 && err.message !== "API error") return null; // si retorno null ya se que es porque el correo existe
      console.error(err);
    }
  },

  registerEntidad: async (data: z.infer<typeof EntidadSchema>) => {
    try {
      return apiFetch("/CreateEntidad", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        }
      });
    } catch (err: any) {
      if (err.status === 400 && err.message !== "API error") return null; // si retorno null ya se que es porque el correo existe
      console.error(err);
    }
  },

  me: async (data: string) => { // data es el token
    try {
      return apiFetch("/users/me", {
        headers: {
          "Authorization": `Bearer ${data}`,
        },
      });
    } catch (err) {
      console.error(err);
    }
  },
};
