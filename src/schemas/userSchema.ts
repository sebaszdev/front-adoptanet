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
  telefono: z
    .string()
    .min(10, "Minimo 10 caracteres")
    .max(10, "Maximo 10 caracteres"),
  direccion: z
    .string()
    .min(8, "Minimo 8 caracteres")
    .max(30, "Maximo 30 caracteres"),
  contrasena: z
    .string()
    .min(8, "Minimo 8 caracteres")
    .max(20, "Maximo 20 caracteres"),
  rol: z.enum(["publicante", "entidad"]),
});

/**
 * Schema of Publicante
 */
export const PublicanteSchema = z.object({
  ...UserSchema.shape,
  cc: z.string().min(5, "Minimo 5 caracteres").max(20, "Maximo 20 caracteres"),
});

/**
 * Schema for CreatePublicante
 */
export const CreatePublicanteSchema = PublicanteSchema.omit({
  id_usuario: true,
});

/**
 * Schema for Entidad
 */
export const EntidadSchema = z.object({
  ...UserSchema.shape,
  nit: z.string().min(5, "Minimo 5 caracteres").max(20, "Maximo 20 caracteres"),
  tipo_organizacion: z.enum(["albergue", "fundacion"]),
  descripcion: z.string().max(100, "Maximo 100 caracteres").optional(),
});

/**
 * Schema for CreateEntidad
 */
export const CreateEntidadSchema = EntidadSchema.omit({ id_usuario: true });

/**
 * Schema for Login
 */
export const LoginSchema = UserSchema.pick({ correo: true, contrasena: true });

export const ResponsePublicanteSchema = z
  .object({
    ...PublicanteSchema.shape,
    rol: z.literal("publicante"),
  })
  .omit({ contrasena: true });

export const ResponseEntidadSchema = z
  .object({
    ...EntidadSchema.shape,
    rol: z.literal("entidad"),
  })
  .omit({ contrasena: true });

export const ProfileSchema = z
  .object({
    ...UserSchema.shape,
    nit: z
      .string()
      .min(5, "Minimo 5 caracteres")
      .max(20, "Maximo 20 caracteres"),
    cc: z
      .string()
      .min(5, "Minimo 5 caracteres")
      .max(20, "Maximo 20 caracteres"),
    tipo_organizacion: z.enum(["albergue", "fundacion"]),
    descripcion: z.string().max(100, "Maximo 100 caracteres").optional(),
  })
  .omit({ id_usuario: true, contrasena: true, correo: true, rol: true })
  .partial();
