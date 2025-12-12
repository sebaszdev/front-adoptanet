import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const ApplicationsTab = () => {
  const requests: any = [];
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
        {requests.map((request: any) => (
          <Card key={request.id}>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-lg">
                      {request.requesterName}
                    </h3>
                    {request.status === "pending" ? (
                      <Badge variant="outline">Pendiente</Badge>
                    ) : (
                      <Badge>Aprobada</Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Solicitud para adoptar a{" "}
                    <strong>{request.animalName}</strong>
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Fecha: {new Date(request.date).toLocaleDateString("es-ES")}
                  </p>
                </div>

                {request.status === "pending" && (
                  <div className="flex gap-2">
                    <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
                      Aprobar
                    </button>
                    <button className="px-4 py-2 border rounded-md hover:bg-muted">
                      Rechazar
                    </button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}

        {requests.length === 0 && (
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
