import { useNavigate } from "react-router";
import { toast } from "sonner";
import type * as z from "zod";
import { AnimalService } from "@/api/animal.service";
import { ApiError } from "@/api/client";
import { useAuth } from "@/context/useAuth";
import type { CreateAnimalSchema } from "@/schemas/animalSchema";
import AnimalForm from "./AnimalForm";

const AnimalTab = () => {
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data: z.infer<typeof CreateAnimalSchema>) => {
    try {
      data.id_user = user?.id_usuario; // agregar el id usuario
      const res = await AnimalService.createAnimal(data, token || "");
      if (res) {
        toast.success("Animal creado con exito");
        navigate("/catalog", { replace: true });
      }
    } catch (err) {
      if (err instanceof TypeError && err.message === "Failed to fetch")
        toast.error("Error con la API");
      if (err instanceof ApiError) {
        if (err.detail === "No entiendo que onda con tus credenciales") {
          // se vencio el token xD
          logout();
          navigate("/login", { replace: true });
        } else {
          toast.error(err.detail);
          navigate("/");
        }
      }
    }
  };

  return (
    <>
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Publicar nuevo animal en adopción
      </h2>
      <AnimalForm onSubmit={onSubmit} />
    </>
  );
};

export default AnimalTab;
