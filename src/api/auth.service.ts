import type * as z from "zod";
import { apiFetch } from "@/api/client";
import type {
  CreateEntidadSchema,
  CreatePublicanteSchema,
  EntidadSchema,
  LoginSchema,
  ProfileSchema,
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
      body: form, // esto es por q el login pide "Content-Type": "application/x-www-form-urlencoded" y URLSearchParams le dice al fetch q ese sera el header
    });
  },

  registerPublicante: (data: z.infer<typeof CreatePublicanteSchema>) =>
    apiFetch<z.infer<typeof ResponsePublicanteSchema>>("/CreatePublicante", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }),

  registerEntidad: (data: z.infer<typeof CreateEntidadSchema>) =>
    apiFetch<z.infer<typeof ResponseEntidadSchema>>("/CreateEntidad", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
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
  update: (data: z.infer<typeof ProfileSchema>, token: string) =>
    apiFetch("/users/me", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }),
};
