import { useEffect, useState } from "react";
import { toast } from "sonner";
import type * as z from "zod";
import { AnimalService } from "@/api/animal.service";
import AnimalCard from "@/components/AnimalCard";
import type { AnimalSchema } from "@/schemas/animalSchema";

const Catalog = () => {
  const [animals, setAnimals] = useState<z.infer<typeof AnimalSchema>[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const res = await AnimalService.listAnimals();
        setAnimals(res);
      } catch (err) {
        if (err instanceof TypeError && err.message === "Failed to fetch")
          toast.error("Error con la API");
      } finally {
        setLoading(false);
      }
    };

    fetchAnimals();
  }, []);

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <p className="leading-7 [&:not(:first-child)]:mt-6">
            Cargando animales...
          </p>
        </div>
      ) : animals.length === 0 ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <p className="leading-7 [&:not(:first-child)]:mt-6">
            No hay animales disponibles :(
          </p>
        </div>
      ) : (
        <div className="mx-auto max-w-6xl py-8">
          <div className="mb-8">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance">
              Catalogo de animales
            </h1>
            <p className="text-muted-foreground mt-2">
              Explora animales disponibles para adopcion
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
            {animals.map(animal => (
              <AnimalCard key={animal.id_animal} animal={animal} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Catalog;
