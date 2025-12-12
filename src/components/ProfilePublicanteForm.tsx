import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import type * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/useAuth";
import { ProfileSchema, type PublicanteSchema } from "@/schemas/userSchema";

interface Props {
  onSubmit: (data: z.infer<typeof ProfileSchema>) => Promise<void>;
}

const ProfilePublicanteForm = ({ onSubmit }: Props) => {
  let { user } = useAuth();
  user = user as z.infer<typeof PublicanteSchema>;

  const { handleSubmit, control } = useForm<z.infer<typeof ProfileSchema>>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      telefono: user?.telefono,
      direccion: user?.direccion,
      cc: user?.cc,
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
            name="cc"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-profile-cc">CC</FieldLabel>
                <Input
                  {...field}
                  id="form-profile-cc"
                  aria-invalid={fieldState.invalid}
                  className="rounded-lg"
                />
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

export default ProfilePublicanteForm;
