import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import type * as z from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components//ui/card";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { EntidadSchema, PublicanteSchema } from "@/schemas/userSchema";

interface EntidadProps {
  rol: "entidad";
  onSubmit: (data: z.infer<typeof EntidadSchema>) => Promise<void>;
}

interface PublicanteProps {
  rol: "publicante";
  onSubmit: (data: z.infer<typeof PublicanteSchema>) => Promise<void>;
}

const Form = ({ rol, onSubmit }: PublicanteProps | EntidadProps) => {
  const schema = rol === "publicante" ? PublicanteSchema : EntidadSchema;
  const doc = rol === "publicante" ? "cc" : "nit";

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues:
      rol === "publicante"
        ? {
            nombre: "",
            correo: "",
            telefono: "",
            direccion: "",
            cc: "",
            contrasena: "",
          }
        : {
            nombre: "",
            correo: "",
            telefono: "",
            direccion: "",
            nit: "",
            contrasena: "",
          },
  });

  return (
    <Card className="w-md">
      <CardHeader>
        <CardTitle className="text-xl text-center">Registrate</CardTitle>
        <CardDescription className="text-center mb-2">
          Ingresa tu información para registrarte en AdoptaNet
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="form-signup" onSubmit={form.handleSubmit(onSubmit as any)}>
          <FieldGroup className="gap-4">
            <Controller
              name="nombre"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-signup-nombre">Nombre</FieldLabel>
                  <Input
                    {...field}
                    id="form-signup-nombre"
                    aria-invalid={fieldState.invalid}
                    className="rounded-lg"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="correo"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-signup-correo">
                    Correo electronico
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-signup-correo"
                    aria-invalid={fieldState.invalid}
                    placeholder="usuario@ejemplo.com"
                    className="rounded-lg"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="telefono"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-signup-telefono">
                    Telefono
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-signup-telefono"
                    aria-invalid={fieldState.invalid}
                    className="rounded-lg"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="direccion"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-signup-direccion">
                    Direccion
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-signup-direccion"
                    aria-invalid={fieldState.invalid}
                    className="rounded-lg"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name={doc}
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={`form-signup-${doc}`}>
                    {doc.toUpperCase()}
                  </FieldLabel>
                  <Input
                    {...field}
                    id={`form-signup-${doc}`}
                    aria-invalid={fieldState.invalid}
                    className="rounded-lg"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="contrasena"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-signup-contrasena">
                    Contraseña
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-signup-contrasena"
                    aria-invalid={fieldState.invalid}
                    className="rounded-lg"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button
            type="submit"
            form="form-signup"
            className="w-full cursor-pointer"
          >
            Registrarse
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
};

export default Form;
