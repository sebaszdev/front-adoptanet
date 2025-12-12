import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import type * as z from "zod";
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
import { useAuth } from "@/context/useAuth";
import { type EntidadSchema, ProfileSchema } from "@/schemas/userSchema";
import { Textarea } from "./ui/textarea";

interface Props {
  onSubmit: (data: z.infer<typeof ProfileSchema>) => Promise<void>;
}

const ProfileEntidadForm = ({ onSubmit }: Props) => {
  let { user } = useAuth();
  user = user as z.infer<typeof EntidadSchema>;

  const { handleSubmit, control } = useForm<z.infer<typeof ProfileSchema>>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      telefono: user?.telefono,
      descripcion: user?.descripcion,
      direccion: user?.direccion,
      nit: user?.nit,
      nombre: user?.nombre,
    },
  });

  return (
    <form id="form-profile" onSubmit={handleSubmit(onSubmit)}>
      <FieldSet>
        <FieldGroup>
          <Controller
            name="nombre"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-profile-nombre">Nombre</FieldLabel>
                <Input
                  {...field}
                  id="form-profile-nombre"
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
            name="telefono"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-profile-telefono">
                  Telefono
                </FieldLabel>
                <Input
                  {...field}
                  id="form-profile-telefono"
                  aria-invalid={fieldState.invalid}
                  type="tel"
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
                <FieldLabel htmlFor="form-profile-direccion">
                  Direccion
                </FieldLabel>
                <Input
                  {...field}
                  id="form-profile-direccion"
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
                <FieldLabel htmlFor="form-profile-nit">NIT</FieldLabel>
                <Input
                  {...field}
                  id="form-profile-nit"
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
                <FieldLabel htmlFor="form-profile-descripcion">
                  Descripcion
                </FieldLabel>
                <Textarea
                  {...field}
                  id="form-profile-descripcion"
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
                <FieldLabel htmlFor="form-profile-select">Tipo</FieldLabel>
                <FieldDescription>
                  Selecciona el tipo de tu organizacion
                </FieldDescription>
                <Select
                  name={field.name}
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger
                    id="form-profile-select"
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
          <Field orientation="horizontal">
            <Button
              className="w-full cursor-pointer active:scale-95"
              form="form-profile"
            >
              Enviar solicitud
            </Button>
          </Field>
        </FieldGroup>
      </FieldSet>
    </form>
  );
};

export default ProfileEntidadForm;
