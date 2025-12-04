import { AspectRatio } from "@/components/ui/aspect-ratio";
import signupImg from "@/assets/signup-img.jpg";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Form from "@/components/Form";
import { Link, useNavigate, Navigate } from "react-router";
import * as z from "zod";
import type { PublicanteSchema } from "@/schemas/userSchema";
import type { EntidadSchema } from "@/schemas/userSchema";
import { useAuth } from "@/context/useAuth";
import { AuthService } from "@/api/auth.service";
import { toast } from "sonner";

const Signup = () => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const onSubmitPublicante = async (data: z.infer<typeof PublicanteSchema>) => {
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
      if (err instanceof TypeError && err.message === "Failed to fetch") toast.error("Error con la API"); 
      
    }
  }

  const onSubmitEntidad = async (data: z.infer<typeof EntidadSchema>) => {
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
      if (err instanceof TypeError && err.message === "Failed to fetch") toast.error("Error con la API"); 
    }
  }

  return isAuthenticated ? <Navigate to="/" replace /> : (
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
                <Form rol="publicante" onSubmit={onSubmitPublicante} />
              </TabsContent>
              <TabsContent value="entidad">
                <Form rol="entidad" onSubmit={onSubmitEntidad} />
              </TabsContent>
            </Tabs>
            <div className="text-center">
              <p className="text-muted-foreground text-sm">
                ¿Ya tienes cuenta? <Link to="/login" className="underline underline-offset-4 hover:text-primary">Inicia Sesión</Link>
              </p>
            </div>
          </div>
        </div>
        <AspectRatio ratio={16 / 9}>
          <img src={signupImg} className="absolute inset-0 h-full w-full object-cover" />
        </AspectRatio>
      </div>
  );
};

export default Signup;
