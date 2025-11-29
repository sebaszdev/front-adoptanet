import { AspectRatio } from "@/components/ui/aspect-ratio";
import signupImg from "@/assets/signup-img.jpg";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Form from "@/components/Form";
import { Link } from "react-router";

const Signup = () => {
  return (
    <>
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
                <Form rol="publicante" onSubmit={(_) => console.log("publicante")} />
              </TabsContent>
              <TabsContent value="entidad">
                <Form rol="entidad" onSubmit={(_) => console.log("entidad")} />
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
    </>
  );
};

export default Signup;
