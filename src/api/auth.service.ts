import type * as z from "zod";
import { apiFetch } from "@/api/client";
import type {
  EntidadSchema,
  LoginSchema,
  PublicanteSchema,
  ResponseEntidadSchema,
  ResponsePublicanteSchema,
} from "@/schemas/userSchema";

export const AuthService = {
  login: ({ correo, contrasena }: z.infer<typeof LoginSchema>) => {
    const form = new URLSearchParams();
    form.append("username", correo);
    form.append("password", contrasena);

    return apiFetch<{ access_token: string; token_type: string }>("/token", {
      method: "POST",
      body: form,
    });
  },

  registerPublicante: (data: z.infer<typeof PublicanteSchema>) =>
    apiFetch<z.infer<typeof ResponseEntidadSchema>>("/CreatePublicante", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }),

  registerEntidad: (data: z.infer<typeof EntidadSchema>) =>
    apiFetch<z.infer<typeof ResponsePublicanteSchema>>("/CreateEntidad", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }),

  me: (token: string) =>
    apiFetch<z.infer<typeof EntidadSchema> | z.infer<typeof PublicanteSchema>>(
      "/users/me",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    ),
};
