import { useEffect, useState } from "react";
import { toast } from "sonner";
import type * as z from "zod";
import { ApplicationService } from "@/api/applications.service";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/context/useAuth";
import type { ApplicationSchema } from "@/schemas/applicationSchema";

const ApplicationsTab = () => {
  const { token } = useAuth();
  const [applications, setApplications] = useState<
    z.infer<typeof ApplicationSchema>[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await ApplicationService.listApplications(token || "");
        setApplications(res);
      } catch (err) {
        if (err instanceof TypeError && err.message === "Failed to fetch")
          toast.error("Error con la API");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [token]); // segun biome

  if (loading) return <div className="p-6">Cargando...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Solicitudes de Adopción
          </h2>
          <p className="text-muted-foreground">
            Revisa y gestiona las solicitudes de adopción
          </p>
        </div>
      </div>

      <div className="grid gap-4">
        {applications.map((application, indx) => (
          <Card key={indx}>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-lg">
                      {application.nombre_completo.charAt(0).toUpperCase() +
                        application.nombre_completo.slice(1)}
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Solicitud para adoptar a{" "}
                    <strong>{application.id_animal}</strong>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {applications.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              No tienes solicitudes de adopción
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ApplicationsTab;
