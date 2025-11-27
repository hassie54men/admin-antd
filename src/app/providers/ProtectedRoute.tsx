import { Navigate, Outlet } from "react-router";
import { useGetUserQuery } from "../../features/auth/model/auth.queries.ts";

const ProtectedRoute = () => {
  const { isEnabled } = useGetUserQuery();

  if (!isEnabled) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
