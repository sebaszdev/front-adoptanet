import { Navigate } from "react-router";
import { useAuth } from "@/context/useAuth";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading } = useAuth();

  return loading ? (
    <div className="p-6">Cargando...</div>
  ) : isAuthenticated ? (
    children
  ) : (
    <Navigate to="/login" replace state={{ fromProtected: true }} />
  );
};

export default ProtectedRoute;
