import { useLocation, Navigate, Outlet } from "react-router";
import { useAuth } from "@/hooks/useAuth";

const RequireAuth = ({ allowedRoles }: { allowedRoles: string[] }) => {
  const { auth } = useAuth();
  const location = useLocation();

  return allowedRoles.includes(auth?.role || "") ? (
    <Outlet />
  ) : auth?.name ? (
    <Navigate to="unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/auth/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
