import * as z from "zod";

export const LoginSchema = z.object({
  correo: z.email(),
  contrasena: z.string()
    .min(8, "Minimo 8 caracteres")
    .max(20, "Maximo 20 caracteres"),
});
