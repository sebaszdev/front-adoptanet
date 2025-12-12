import { useEffect, useState } from "react";
import { toast } from "sonner";
import type * as z from "zod";
import { AnimalService } from "@/api/animal.service";
import AnimalCard from "@/components/AnimalCard";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { AnimalSchema } from "@/schemas/animalSchema";

const Catalog = () => {
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
  const [animals, setAnimals] = useState<z.infer<typeof AnimalSchema>[]>([]);
  const [loading, setLoading] = useState(true);

  const [especie, setEspecie] = useState<string>("");
  const [raza, setRaza] = useState<string>("");
  const [sexo, setSexo] = useState<string>("");

  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPrevPage, setHasPrevPage] = useState(false);
  const limit = 20;

  const fetchAnimals = async (
    currentPage: number,
    filters: { especie?: string; raza?: string; sexo?: string },
  ) => {
    setLoading(true);
    try {
      const skip = (currentPage - 1) * limit;
      const params = new URLSearchParams({
        skip: skip.toString(),
        limit: limit.toString(),
      });

      if (filters.especie && filters.especie !== "all")
        params.append("especie", filters.especie);
      if (filters.raza && filters.raza !== "all")
        params.append("raza", filters.raza);
      if (filters.sexo && filters.sexo !== "all")
        params.append("sexo", filters.sexo);

      const res = await AnimalService.listAnimals(params);
      setAnimals(res);

      setHasNextPage(res.length === limit);
      setHasPrevPage(currentPage > 1);
    } catch (err) {
      if (err instanceof TypeError && err.message === "Failed to fetch") {
        toast.error("Error con la API");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnimals(page, { especie, raza, sexo });
  }, [page, especie, raza, sexo]);

  const handleFilterChange = () => {
    setPage(1);
  };

  const handleClearFilters = () => {
    setEspecie("");
    setRaza("");
    setSexo("");
    setPage(1);
  };

  return (
    <div className="mx-auto max-w-6xl py-8 px-4">
      <div className="mb-8">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance">
          Catálogo de animales
        </h1>
        <p className="text-muted-foreground mt-2">
          Explora animales disponibles para adopción
        </p>
      </div>

      {/* Filtros */}
      <div className="bg-slate-50 p-6 rounded-lg mb-6 border">
        <h2 className="text-lg font-semibold mb-4">Filtros</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <Label htmlFor="especie" className="mb-2">
              Especie
            </Label>
            <Select
              value={especie}
              onValueChange={value => {
                setEspecie(value);
                handleFilterChange();
              }}
            >
              <SelectTrigger id="especie">
                <SelectValue placeholder="Todas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                <SelectItem value="perro">Perro</SelectItem>
                <SelectItem value="gato">Gato</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="raza" className="mb-2">
              Raza
            </Label>
            <Select
              value={raza}
              onValueChange={value => {
                setRaza(value);
                handleFilterChange();
              }}
            >
              <SelectTrigger id="raza">
                <SelectValue placeholder="Todas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                {especie === "perro" ? (
                  dogBreeds.map(breed => (
                    <SelectItem key={breed} value={breed}>
                      {breed.charAt(0).toUpperCase() + breed.slice(1)}
                    </SelectItem>
                  ))
                ) : especie === "gato" ? (
                  catBreeds.map(breed => (
                    <SelectItem key={breed} value={breed}>
                      {breed.charAt(0).toUpperCase() + breed.slice(1)}
                    </SelectItem>
                  ))
                ) : (
                  <>
                    {dogBreeds.map(breed => (
                      <SelectItem key={breed} value={breed}>
                        {breed.charAt(0).toUpperCase() + breed.slice(1)}
                      </SelectItem>
                    ))}
                    {catBreeds.map(breed => (
                      <SelectItem key={breed} value={breed}>
                        {breed.charAt(0).toUpperCase() + breed.slice(1)}
                      </SelectItem>
                    ))}
                  </>
                )}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="sexo" className="mb-2">
              Sexo
            </Label>
            <Select
              value={sexo}
              onValueChange={value => {
                setSexo(value);
                handleFilterChange();
              }}
            >
              <SelectTrigger id="sexo">
                <SelectValue placeholder="Todos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="macho">Macho</SelectItem>
                <SelectItem value="hembra">Hembra</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-end">
            <Button
              variant="outline"
              onClick={handleClearFilters}
              className="w-full"
            >
              Limpiar filtros
            </Button>
          </div>
        </div>
      </div>

      {/* Contenido */}
      {loading ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <p className="leading-7">Cargando animales...</p>
        </div>
      ) : animals.length === 0 ? (
        <div className="flex flex-col justify-center items-center min-h-[400px] gap-4">
          <p className="leading-7 text-lg">
            No hay animales disponibles con estos filtros
          </p>
          <Button onClick={handleClearFilters} variant="outline">
            Limpiar filtros
          </Button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center mb-8">
            {animals.map(animal => (
              <AnimalCard key={animal.id_animal} animal={animal} />
            ))}
          </div>

          {/* Paginación simplificada sin total */}
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setPage(p => p - 1)}
                  className={
                    !hasPrevPage
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>

              <PaginationItem>
                <PaginationLink isActive>{page}</PaginationLink>
              </PaginationItem>

              {hasNextPage && (
                <PaginationItem>
                  <PaginationLink
                    onClick={() => setPage(p => p + 1)}
                    className="cursor-pointer"
                  >
                    {page + 1}
                  </PaginationLink>
                </PaginationItem>
              )}

              <PaginationItem>
                <PaginationNext
                  onClick={() => setPage(p => p + 1)}
                  className={
                    !hasNextPage
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </>
      )}
    </div>
  );
};

export default Catalog;
