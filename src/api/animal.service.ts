import type * as z from "zod";
import { apiFetch } from "@/api/client";
import type { AnimalSchema, CreateAnimalSchema } from "@/schemas/animalSchema";

export const AnimalService = {
  createAnimal: async (
    data: z.infer<typeof CreateAnimalSchema>,
    token: string,
  ) =>
    apiFetch<z.infer<typeof AnimalSchema>>("/RegistrarAnimal", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }),

  listAnimals: (params?: URLSearchParams) =>
    apiFetch<z.infer<typeof AnimalSchema>[]>(`/ListarAnimales?${params}`),
};
