import * as z from "zod";

export const PublicanteSchema = z.object({
  nombre: z.string()
    .min(3, "Minimo 3 caracteres")
    .max(50, "Maximo 50 caracteres"),
  correo: z.email(),
  telefono: z.string()
    .min(10)
    .max(10),
  direccion: z.string()
    .min(8)
    .max(30),
  cc: z.string()
    .min(5)
    .max(20),
  contrasena: z.string()
    .min(8, "Minimo 8 caracteres")
    .max(20, "Maximo 20 caracteres"),
});
