import { Navigate, Outlet } from "react-router";
import { useGetUserQuery } from "../../features/auth/model/auth.queries.ts";
import { Spin } from "antd";

const ProtectedRoute = () => {
  const { data: user, isError, isLoading } = useGetUserQuery();

  if (isLoading) {
    return (
      <div style={{ width: "100vw", height: "100vh" }}>
        <Spin />
      </div>
    );
  }

  if (!user || isError) {
    return <Navigate to={"/login"} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
