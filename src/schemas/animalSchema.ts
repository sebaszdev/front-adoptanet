import * as z from "zod";

export const AnimalSchema = z.object({
  nombre: z
    .string()
    .min(2, "Minimo 2 caracteres")
    .max(20, "Maximo 20 caracteres"),
  especie: z.enum(["perro", "gato"]),
  raza: z.string(),
  edad: z.int().positive().optional(),
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
