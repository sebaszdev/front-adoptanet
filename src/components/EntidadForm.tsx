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
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CreateEntidadSchema } from "@/schemas/userSchema";

interface Props {
  onSubmit: (data: z.infer<typeof CreateEntidadSchema>) => Promise<void>;
}

const EntidadForm = ({ onSubmit }: Props) => {
  const { handleSubmit, control } = useForm<
    z.infer<typeof CreateEntidadSchema>
  >({
    resolver: zodResolver(CreateEntidadSchema),
    defaultValues: {
      nombre: "",
      correo: "",
      telefono: "",
      direccion: "",
      nit: "",
      descripcion: "",
      contrasena: "",
      tipo_organizacion: "albergue",
      rol: "entidad",
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
                name="nit"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-signup-nit">NIT</FieldLabel>
                    <Input
                      {...field}
                      id="form-signup-nit"
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
                name="descripcion"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-signup-descripcion">
                      Descripcion
                    </FieldLabel>
                    <Textarea
                      {...field}
                      id="form-signup-descripcion"
                      aria-invalid={fieldState.invalid}
                      placeholder="Cuentanos sobre ti"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="tipo_organizacion"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-signup-select">Tipo</FieldLabel>
                    <FieldDescription>
                      Selecciona el tipo de tu organizacion
                    </FieldDescription>
                    <Select
                      name={field.name}
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger
                        id="form-signup-select"
                        aria-invalid={fieldState.invalid}
                      >
                        <SelectValue placeholder="Selecciona el tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="albergue">Albergue</SelectItem>
                        <SelectItem value="fundacion">Fundacion</SelectItem>
                      </SelectContent>
                    </Select>
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

export default EntidadForm;
