import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { AnimalSchema } from "@/schemas/animalSchema";
import { Badge } from "@/components/ui/badge";
import * as z from "zod";
import { Separator } from "@/components/ui/separator";
import { AspectRatio } from "./ui/aspect-ratio";
import { Button } from "./ui/button";

interface AnimalProps {
  animal: z.infer<typeof AnimalSchema>;
};

const AnimalCard = ({ animal }: AnimalProps) => {
  return (
    <Card className="w-full max-w-lg">
      <CardHeader className="relative">
        {animal.adoptado ? (
          <Badge className="absolute top-2 right-8 z-1">
            Adoptado
          </Badge>
        ): (
          <Badge variant="secondary" className="absolute top-2 right-8 z-1">
            Disponible
          </Badge>
        )}
        <AspectRatio ratio={4 / 3} className="rounded-lg">
          <img src={animal.imagen} alt="Imagen de perro" className="h-full w-full object-cover rounded-lg" />
        </AspectRatio>
        <div className="flex items-center gap-x-2">
          <CardTitle>{animal.nombre}</CardTitle>
          <Badge variant="outline">{animal.sexo}</Badge>
        </div>
        <CardDescription>{animal.especie} - {animal.raza}</CardDescription>
      </CardHeader>
      <Separator orientation="horizontal" />
      <CardContent>
        <p>Edad: {animal.edad ? `${animal.edad} ${animal.edad > 1 ? "años" : "año"}` : "?"}</p> 
        {animal.descripcion && (
          <p>{animal.descripcion}</p>
        )}
      </CardContent>
      <CardFooter>
        <Button className="w-full">
          {animal.adoptado ? "Ver información" : "Adoptar"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AnimalCard;
