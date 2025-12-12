import type * as z from "zod";
import { apiFetch } from "./client";
import type { ApplicationSchema } from "@/schemas/applicationSchema";

export const ApplicationService = {
  createApplication: async (data: z.infer<typeof ApplicationSchema>) =>
    apiFetch<z.infer<typeof ApplicationSchema>>("/RegistrarSolicitud", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }),
}
