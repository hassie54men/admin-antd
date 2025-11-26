import { Navigate, Outlet } from "react-router";

const useAuth = () => {
  return Boolean(localStorage.getItem("accessToken"));
};

const ProtectedRoute = () => {
  const isAuth = useAuth();

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
