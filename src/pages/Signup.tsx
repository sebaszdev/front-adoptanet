import { Link, Navigate, useNavigate } from "react-router";
import { toast } from "sonner";
import type * as z from "zod";
import { AuthService } from "@/api/auth.service";
import { ApiError } from "@/api/client";
import signupImg from "@/assets/signup-img.jpg";
import EntidadForm from "@/components/EntidadForm";
import PublicanteForm from "@/components/PublicanteForm";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/context/useAuth";
import type {
  CreateEntidadSchema,
  CreatePublicanteSchema,
} from "@/schemas/userSchema";

const Signup = () => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const onSubmitPublicante = async (
    data: z.infer<typeof CreatePublicanteSchema>,
  ) => {
    try {
      const res = await AuthService.registerPublicante(data);
      // se hizo el registro
      if (res) {
        const { correo, contrasena } = data;
        await login({ correo, contrasena });
        // se hizo login
        navigate("/");
      }
    } catch (err) {
      if (err instanceof TypeError && err.message === "Failed to fetch")
        toast.error("Error con la API");
      if (
        err instanceof ApiError &&
        err.status === 400 &&
        err.detail === "El correo ya está registrado"
      )
        toast.error("Correo ya registrado");
    }
  };

  const onSubmitEntidad = async (data: z.infer<typeof CreateEntidadSchema>) => {
    try {
      const res = await AuthService.registerEntidad(data);
      // se hizo el registro
      if (res) {
        const { correo, contrasena } = data;
        await login({ correo, contrasena });
        // se hizo login
        navigate("/");
      }
    } catch (err) {
      if (err instanceof TypeError && err.message === "Failed to fetch")
        toast.error("Error con la API");
      if (
        err instanceof ApiError &&
        err.status === 400 &&
        err.detail === "El correo ya está registrado"
      )
        toast.error("Correo ya registrado");
    }
  };

  return isAuthenticated ? (
    <Navigate to="/" replace />
  ) : (
    <div className="grid grid-cols-2 h-full">
      <div className="flex flex-col">
        <div className="flex flex-col flex-1 items-center justify-center gap-y-2 py-4">
          <div className="flex flex-col">
            <p className="leading-7">
              Registrate como un publicante o como una entidad
            </p>
          </div>
          <Tabs defaultValue="publicante" className="w-full max-w-md">
            <TabsList className="w-md">
              <TabsTrigger value="publicante">Publicante</TabsTrigger>
              <TabsTrigger value="entidad">Entidad</TabsTrigger>
            </TabsList>
            <TabsContent value="publicante">
              <PublicanteForm onSubmit={onSubmitPublicante} />
            </TabsContent>
            <TabsContent value="entidad">
              <EntidadForm onSubmit={onSubmitEntidad} />
            </TabsContent>
          </Tabs>
          <div className="text-center">
            <p className="text-muted-foreground text-sm">
              ¿Ya tienes cuenta?{" "}
              <Link
                to="/login"
                className="underline underline-offset-4 hover:text-primary"
              >
                Inicia Sesión
              </Link>
            </p>
          </div>
        </div>
      </div>
      <AspectRatio ratio={16 / 9}>
        <img
          src={signupImg}
          className="absolute inset-0 h-full w-full object-cover"
          alt="Imagen de un cachorro con un disfraz de hamburguesa"
        />
      </AspectRatio>
    </div>
  );
};

export default Signup;
