import * as z from "zod";

export const ApplicationSchema = z.object({
  id_animal: z.number().optional(),
  id_usuario: z.number().optional(),
  nombre_completo: z.string().min(3),
  correo: z.email(),
  telefono: z.string().min(5),
});
