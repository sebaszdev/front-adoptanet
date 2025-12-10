import * as z from "zod";

export const UserSchema = z.object({
  nombre: z
    .string()
    .min(3, "Minimo 3 caracteres")
    .max(50, "Maximo 50 caracteres"),
  correo: z.email(),
  telefono: z.string().min(10).max(10),
  direccion: z.string().min(8).max(30),
  contrasena: z
    .string()
    .min(8, "Minimo 8 caracteres")
    .max(20, "Maximo 20 caracteres"),
});

export const PublicanteSchema = z.object({
  ...UserSchema.shape,
  cc: z.string(),
});

export const EntidadSchema = z.object({
  ...UserSchema.shape,
  nit: z.string(),
  tipo_organizacion: z.string().optional(),
  descripcion: z.string().optional(),
});

export const LoginSchema = UserSchema.pick({ correo: true, contrasena: true });

export const ResponsePublicanteSchema = z
  .object({
    ...PublicanteSchema.shape,
    rol: z.string(),
  })
  .omit({ contrasena: true });

export const ResponseEntidadSchema = z
  .object({
    ...EntidadSchema.shape,
    rol: z.string(),
  })
  .omit({ contrasena: true });
