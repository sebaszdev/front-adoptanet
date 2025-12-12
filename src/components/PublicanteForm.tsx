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
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { CreatePublicanteSchema } from "@/schemas/userSchema";

interface Props {
  onSubmit: (data: z.infer<typeof CreatePublicanteSchema>) => Promise<void>;
}

const PublicanteForm = ({ onSubmit }: Props) => {
  const { handleSubmit, control } = useForm<
    z.infer<typeof CreatePublicanteSchema>
  >({
    resolver: zodResolver(CreatePublicanteSchema),
    defaultValues: {
      nombre: "",
      correo: "",
      telefono: "",
      direccion: "",
      cc: "",
      contrasena: "",
      rol: "publicante",
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
        <form id="form-signup" onSubmit={handleSubmit(onSubmit)}>
          <FieldSet>
            <FieldGroup>
              <Controller
                name="nombre"
                control={control}
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
                control={control}
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
                control={control}
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
                control={control}
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
                name="cc"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={`form-signup-cc`}>CC</FieldLabel>
                    <Input
                      {...field}
                      id={`form-signup-cc`}
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
                control={control}
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
          </FieldSet>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button
            type="submit"
            form="form-signup"
            className="w-full cursor-pointer active:scale-95"
          >
            Registrarse
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
};

export default PublicanteForm;
