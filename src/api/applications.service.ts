import type * as z from "zod";
import type { ApplicationSchema } from "@/schemas/applicationSchema";
import { apiFetch } from "./client";

export const ApplicationService = {
  listApplications: async (token: string) =>
    apiFetch<z.infer<typeof ApplicationSchema>[]>("/Solicitudes", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  createApplication: async (data: z.infer<typeof ApplicationSchema>) =>
    apiFetch<z.infer<typeof ApplicationSchema>>("/RegistrarSolicitud", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }),
};
