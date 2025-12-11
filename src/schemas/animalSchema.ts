import * as z from "zod";

export const AnimalSchema = z.object({
  nombre: z
    .string()
    .min(2, "Minimo 2 caracteres")
    .max(20, "Maximo 20 caracteres"),
  especie: z.string().min(4).max(20),
  raza: z.string().min(4).max(20),
  edad: z.number().optional(),
  sexo: z.enum(["macho", "hembra"]),
  descripcion: z.string().min(1).max(100).optional(),
  imagen: z.string(),
  adoptado: z.boolean().optional(),
  id_animal: z.number().optional(),
  id_user: z.number().optional(),
});

export const CreateAnimalSchema = AnimalSchema.omit({
  adoptado: true,
  id_animal: true,
});
