import { Navigate, Outlet } from "react-router";
import { useAuth } from "@/hook/useAuth";

function PrivateRoute() {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute;
