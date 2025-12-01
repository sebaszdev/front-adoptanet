import { Navigate } from "react-router";
import { useAuth } from "@/context/useAuth"

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? children : <Navigate to="/login" replace />
}

export default ProtectedRoute;
