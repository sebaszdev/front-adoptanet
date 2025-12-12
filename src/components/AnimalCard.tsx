import { toast } from "sonner";
import type * as z from "zod";
import { ApplicationService } from "@/api/applications.service";
import { ApiError } from "@/api/client";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { AnimalSchema } from "@/schemas/animalSchema";
import type { ApplicationSchema } from "@/schemas/applicationSchema";
import ApplicationForm from "./ApplicationForm";
import { AspectRatio } from "./ui/aspect-ratio";
import { Button } from "./ui/button";

interface AnimalProps {
  animal: z.infer<typeof AnimalSchema>;
}

const AnimalCard = ({ animal }: AnimalProps) => {
  const onSubmit = async (data: z.infer<typeof ApplicationSchema>) => {
    console.log("hola");
    try {
      const { id_animal, id_user } = animal;
      const res = await ApplicationService.createApplication({
        ...data,
        id_usuario: id_user!,
        id_animal: id_animal!,
      });
      if (res) {
        toast.success("Solicitud creada con exito");
      }
    } catch (err) {
      if (err instanceof TypeError && err.message === "Failed to fetch")
        toast.error("Error con la API");
      if (err instanceof ApiError) {
        toast.error(err.detail);
      }
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="relative">
        {animal.adoptado ? (
          <Badge className="absolute top-2 right-8 z-1">Adoptado</Badge>
        ) : (
          <Badge variant="secondary" className="absolute top-2 right-8 z-1">
            Disponible
          </Badge>
        )}
        <AspectRatio ratio={4 / 3} className="rounded-lg">
          <img
            src={animal.imagen}
            alt={animal.nombre}
            className="h-full w-full object-cover rounded-lg"
          />
        </AspectRatio>
        <div className="flex items-center gap-x-2">
          <CardTitle>{animal.nombre}</CardTitle>
          <Badge variant="outline">
            {animal.sexo.charAt(0).toUpperCase() + animal.sexo.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription>
          {animal.especie.charAt(0).toUpperCase() + animal.especie.slice(1)} -{" "}
          {animal.raza}
        </CardDescription>
      </CardContent>
      <CardFooter>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full cursor-pointer active:scale-95">
              Ver más
            </Button>
          </DialogTrigger>
          <DialogContent
            className="grid md:grid-cols-2 p-6"
            style={{ maxWidth: "calc(var(--spacing) * 300)" }}
          >
            <div className="p-6 overflow-y-auto">
              <DialogHeader className="mb-4">
                <DialogTitle className="text-2xl">{animal.nombre}</DialogTitle>
                <DialogDescription>Adopta este animal</DialogDescription>
                <AspectRatio ratio={4 / 3} className="rounded-lg">
                  <img
                    src={animal.imagen}
                    alt={animal.nombre}
                    className="h-full w-full rounded-lg object-cover"
                  />
                </AspectRatio>
              </DialogHeader>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-lg mb-2">
                    Información General
                  </h4>
                  <div className="space-y-2 text-gray-600">
                    <p>
                      <span className="font-medium">Especie:</span>{" "}
                      {animal.especie === "perro" ? "🐕 Perro" : "🐱 Gato"}
                    </p>
                    <p>
                      <span className="font-medium">Raza:</span>{" "}
                      {animal.raza.charAt(0).toUpperCase() +
                        animal.raza.slice(1)}
                    </p>
                    {animal.edad && (
                      <p>
                        <span className="font-medium">Edad:</span> {animal.edad}{" "}
                        {animal.edad === 1 ? "año" : "años"}
                      </p>
                    )}
                    <p>
                      <span className="font-medium">Sexo:</span>{" "}
                      {animal.sexo === "macho" ? "♂️ Macho" : "♀️ Hembra"}
                    </p>
                  </div>
                </div>

                {animal.descripcion && (
                  <div>
                    <h4 className="font-semibold text-lg mb-2">Descripción</h4>
                    <p className="text-gray-600">{animal.descripcion}</p>
                  </div>
                )}

                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-800">
                    💙 Este animalito está buscando un hogar lleno de amor.
                    {animal.adoptado
                      ? " Ya está en proceso de adopción."
                      : " ¡Podría ser el tuyo!"}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 overflow-y-auto">
              <h3 className="text-xl font-semibold mb-2">
                Solicitud de Adopción
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Completa el formulario para adoptar a {animal.nombre}
              </p>

              <ApplicationForm onSubmit={onSubmit} />
            </div>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
};

export default AnimalCard;
