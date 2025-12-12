import { Inbox, PawPrint } from "lucide-react";
import AnimalTab from "@/components/AnimalTab";
import ApplicationsTab from "@/components/ApplicationsTab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Animals = () => {
  return (
    <div className="mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance">
          Panel de Control
        </h1>
        <p className="text-muted-foreground mt-2">
          Gestiona tus animales y solicitudes de adopción
        </p>
      </div>

      <Tabs defaultValue="animals" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="animals">
            <PawPrint />
            Animales
          </TabsTrigger>
          <TabsTrigger value="applications">
            <Inbox />
            Solicitudes
          </TabsTrigger>
        </TabsList>

        <TabsContent value="animals" className="mt-6">
          <AnimalTab />
        </TabsContent>

        <TabsContent value="applications" className="mt-6">
          <ApplicationsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Animals;
