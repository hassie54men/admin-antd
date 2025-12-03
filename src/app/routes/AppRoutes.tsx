import { Route, Routes } from "react-router";
import App from "../App.tsx";
import AuthLayout from "../layout/AuthLayout.tsx";
import Login from "../../features/auth/pages/Login.tsx";
import Home from "../../pages/home/Home.tsx";
import AdminLayout from "../layout/AdminLayout.tsx";
import Admin from "../../pages/admin-page/Admin.tsx";
import ProtectedRoute from "./ProtectedRoute.tsx";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="admin" element={<AdminLayout />}>
            <Route index element={<Admin />} />
          </Route>
        </Route>
        <Route path="*" element={<div>NotFound</div>} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
