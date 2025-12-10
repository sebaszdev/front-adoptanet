import * as z from "zod";

/**
 * Base schema of the users
  */
export const UserSchema = z.object({
  id_usuario: z.number(),
  nombre: z
    .string()
    .min(3, "Minimo 3 caracteres")
    .max(50, "Maximo 50 caracteres"),
  correo: z.email().max(30),
  telefono: z.string()
    .min(10, "Minimo 10 caracteres").max(10, "Maximo 10 caracteres"),
  direccion: z.string().min(8, "Minimo 8 caracteres").max(30, "Maximo 30 caracteres"),
  contrasena: z
    .string()
    .min(8, "Minimo 8 caracteres")
    .max(20, "Maximo 20 caracteres"),
});

/**
 * Schema for CreatePublicante
  */
export const PublicanteSchema = z.object({
  ...UserSchema.shape,
  cc: z.string().min(5, "Minimo 5 caracteres").max(20, "Maximo 20 caracteres"),
}).omit({ id_usuario: true });

/**
 * Schema for CreateEntidad
  */
export const EntidadSchema = z.object({
  ...UserSchema.shape,
  nit: z.string().min(5, "Minimo 5 caracteres").max(20, "Maximo 20 caracteres"),
  tipo_organizacion: z.enum(["albergue", "fundacion"]),
  descripcion: z.string().max(100, "Maximo 100 caracteres").optional(),
}).omit({ id_usuario: true });

export const LoginSchema = UserSchema.pick({ correo: true, contrasena: true });

export const ResponsePublicanteSchema = z
  .object({
    ...UserSchema.shape,
    cc: z.string().min(5, "Minimo 5 caracteres").max(20, "Maximo 20 caracteres"),
    rol: z.enum(["entidad", "publicante"]),
  })
  .omit({ contrasena: true });

export const ResponseEntidadSchema = z
  .object({
    ...UserSchema.shape,
    rol: z.enum(["entidad", "publicante"]),
    nit: z.string().min(5, "Minimo 5 caracteres").max(20, "Maximo 20 caracteres"),
    tipo_organizacion: z.enum(["albergue", "fundacion"]),
    descripcion: z.string().max(100, "Maximo 100 caracteres").optional(),
  })
  .omit({ contrasena: true });
