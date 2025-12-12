import { useNavigate } from "react-router";
import { toast } from "sonner";
import type { z } from "zod";
import { AuthService } from "@/api/auth.service";
import ProfileEntidadForm from "@/components/ProfileEntidadForm";
import ProfilePublicanteForm from "@/components/ProfilePublicanteForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/context/useAuth";
import type { ProfileSchema } from "@/schemas/userSchema";

const Profile = () => {
  const { user, token, update } = useAuth();
  const navigate = useNavigate();

  const onSubmitEntidad = async (data: z.infer<typeof ProfileSchema>) => {
    try {
      await update(data, token || "");
      navigate("/", { replace: true });
      toast.success("Perfil actualizado correctamente");
    } catch (err) {
      toast.error("Error al actualizar perfil");
    }
  };

  const onSubmitPublicante = async (data: z.infer<typeof ProfileSchema>) => {
    try {
      await update(data, token || "");
      navigate("/", { replace: true });
      toast.success("Perfil actualizado correctamente");
    } catch (err) {
      toast.error("Error al actualizar perfil");
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <Card>
        <CardHeader>
          <CardTitle>Editar Perfil</CardTitle>
          <CardDescription>Actualiza tu información personal</CardDescription>
        </CardHeader>
        <CardContent>
          {user?.rol === "entidad" ? (
            <ProfileEntidadForm onSubmit={onSubmitEntidad} />
          ) : (
            <ProfilePublicanteForm onSubmit={onSubmitPublicante} />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
