import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";

interface ProtectedRoute {
  component: React.FC;
}

export default function ProtectedRoute({
  component: Component,
  ...rest
}: ProtectedRoute) {
  const { loading, session } = useAuth();

  if (loading) {
    return <span>Loading...</span>;
  }

  if (!session) {
    return <Navigate to="/login" />;
  }

  return <Component {...rest} />;
}
