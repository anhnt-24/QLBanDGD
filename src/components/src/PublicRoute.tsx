import { useAuth } from "@/hooks/useAuth";
import { Navigate, Outlet, useLocation } from "react-router";

function PublicRoute() {
  const { auth } = useAuth();
  const location = useLocation();
  return auth ? (
    <Navigate to={location.state?.from || "/"} replace />
  ) : (
    <Outlet></Outlet>
  );
}

export default PublicRoute;
