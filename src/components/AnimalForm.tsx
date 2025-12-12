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
import { CreateAnimalSchema } from "@/schemas/animalSchema";
import { Card, CardContent, CardFooter } from "./ui/card";

interface Props {
  onSubmit: (data: z.infer<typeof CreateAnimalSchema>) => Promise<void>;
}

const AnimalForm = ({ onSubmit }: Props) => {
  const dogBreeds = [
    "labrador",
    "golden_retriever",
    "pastor_aleman",
    "bulldog",
    "beagle",
    "chihuahua",
    "poodle",
    "otro",
  ];
  const catBreeds = [
    "persa",
    "siames",
    "maine_coon",
    "bengali",
    "ragdoll",
    "british_shorthair",
    "esfinge",
    "otro",
  ];

  const { handleSubmit, control, watch } = useForm<
    z.infer<typeof CreateAnimalSchema>
  >({
    resolver: zodResolver(CreateAnimalSchema),
    defaultValues: {
      descripcion: "",
      edad: 0,
      nombre: "",
    },
  });

  const especie = watch("especie");

  return (
    <Card className="mt-6">
      <CardContent>
        <form id="form-animal" onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="nombre"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-animal-nombre">Nombre</FieldLabel>
                  <Input
                    {...field}
                    id="form-animal-nombre"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="especie"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-animal-especie">Especie</FieldLabel>
                  <Select
                    name={field.name}
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger
                      id="form-animal-especie"
                      aria-invalid={fieldState.invalid}
                    >
                      <SelectValue placeholder="Selecciona la especie" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="perro">Perro</SelectItem>
                      <SelectItem value="gato">Gato</SelectItem>
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="raza"
              control={control}
              rules={{ required: true }}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Raza</FieldLabel>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    disabled={!especie && true}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona una raza" />
                    </SelectTrigger>
                    <SelectContent>
                      {especie === "perro"
                        ? dogBreeds.map(breed => (
                            <SelectItem key={breed} value={breed}>
                              {breed}
                            </SelectItem>
                          ))
                        : catBreeds.map(breed => (
                            <SelectItem key={breed} value={breed}>
                              {breed}
                            </SelectItem>
                          ))}
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="edad"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-animal-edad">Edad</FieldLabel>
                  <Input
                    {...field}
                    id="form-animal-edad"
                    aria-invalid={fieldState.invalid}
                    type="number"
                    onChange={e =>
                      field.onChange(
                        e.target.value === "" ? "" : Number(e.target.value),
                      )
                    }
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="sexo"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-animal-sexo">Sexo</FieldLabel>
                  <Select
                    name={field.name}
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger
                      id="form-animal-sexo"
                      aria-invalid={fieldState.invalid}
                    >
                      <SelectValue placeholder="Selecciona el sexo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="macho">Macho</SelectItem>
                      <SelectItem value="hembra">Hembra</SelectItem>
                    </SelectContent>
                  </Select>
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
                  <FieldLabel htmlFor="form-animal-descripcion">
                    Descripcion
                  </FieldLabel>
                  <Textarea
                    {...field}
                    id="form-animal-descripcion"
                    aria-invalid={fieldState.invalid}
                    placeholder="Ingresa la descripcion del animal"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="imagen"
              control={control}
              rules={{ required: true }}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-animal-imagen">Imagen</FieldLabel>
                  <Input
                    {...field}
                    id="form-animal-imagen"
                    aria-invalid={fieldState.invalid}
                  />
                  <FieldDescription>
                    Por favor ingresa un link valido a una imagen de internet
                    (por ahora)
                  </FieldDescription>
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
            form="form-animal"
            className="w-full cursor-pointer active:scale-95"
          >
            Publicar
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
};

export default AnimalForm;
