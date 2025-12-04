import * as z from "zod";
import { CreateAnimalSchema } from "@/schemas/animalSchema";
import { apiFetch } from "@/api/client";

export const AnimalService = {
  createAnimal: async (data: z.infer<typeof CreateAnimalSchema>, token: string) => {
    try {
      return await apiFetch("/RegistrarAnimal", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
    } catch (err) {
      throw err;
    }
  },

  listAnimals: async (token: string) => {
    try {
      return await apiFetch("/ListarAnimales", {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
    } catch (err) {
      throw err;
    }
  },
}
