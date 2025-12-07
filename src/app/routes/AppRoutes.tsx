import { Route, Routes } from "react-router";
import App from "../App.tsx";
import AuthLayout from "../layout/AuthLayout.tsx";
import Login from "../../features/auth/pages/Login.tsx";
import Home from "../../pages/home/Home.tsx";
import AdminLayout from "../layout/AdminLayout.tsx";
import Admin from "../../pages/admin-page/Admin.tsx";
import ProtectedRoute from "./ProtectedRoute.tsx";
import { ROUTES } from "../../shared/constants/routes.ts";
import ProductsListPage from "../../features/products/pages/ProductsListPage.tsx";
import ProductSingleListPage from "../../features/products/pages/ProductSingleListPage.tsx";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={ROUTES.home} element={<App />}>
        <Route index element={<Home />} />
        <Route element={<AuthLayout />}>
          <Route path={ROUTES.login} element={<Login />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path={ROUTES.admin} element={<AdminLayout />}>
            <Route index element={<Admin />} />
          </Route>

          <Route element={<AdminLayout />}>
            <Route path={ROUTES.products} element={<ProductsListPage />} />
            <Route path={ROUTES.product} element={<ProductSingleListPage />} />
          </Route>
        </Route>
        <Route path={ROUTES.notFound} element={<div>NotFound</div>} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
