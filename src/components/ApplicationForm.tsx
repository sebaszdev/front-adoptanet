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
import { ApplicationSchema } from "@/schemas/applicationSchema";

interface Props {
  onSubmit: (data: z.infer<typeof ApplicationSchema>) => Promise<void>;
}

const ApplicationForm = ({ onSubmit }: Props) => {
  const { handleSubmit, control } = useForm<z.infer<typeof ApplicationSchema>>({
    resolver: zodResolver(ApplicationSchema),
    defaultValues: {
      correo: "",
      nombre_completo: "",
      telefono: "",
    },
  });

  return (
    <form id="form-application" onSubmit={handleSubmit(onSubmit)}>
      <FieldSet>
        <FieldGroup>
          <Controller
            name="nombre_completo"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-application-nombre-completo">
                  Nombre completo
                </FieldLabel>

                <Input
                  {...field}
                  id="form-application-nombre-completo"
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
                <FieldLabel htmlFor="form-application-correo">
                  Correo electronico
                </FieldLabel>

                <Input
                  {...field}
                  id="form-application-correo"
                  aria-invalid={fieldState.invalid}
                  className="rounded-lg"
                  type="email"
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
                <FieldLabel htmlFor="form-application-telefono">
                  Telefono
                </FieldLabel>

                <Input
                  {...field}
                  id="form-application-telefono"
                  aria-invalid={fieldState.invalid}
                  className="rounded-lg"
                  type="tel"
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
              form="form-application"
            >
              Enviar solicitud
            </Button>
          </Field>
        </FieldGroup>
      </FieldSet>
    </form>
  );
};

export default ApplicationForm;
