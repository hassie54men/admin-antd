import { Route, Routes } from "react-router";
import App from "../App.tsx";
import AuthLayout from "../layout/AuthLayout.tsx";
import Login from "../../features/auth/pages/Login.tsx";
import Home from "../../pages/home/Home.tsx";
import AdminLayout from "../layout/AdminLayout.tsx";
import Admin from "../../pages/admin-page/Admin.tsx";
import ProtectedRoute from "./ProtectedRoute.tsx";
import { APP_ROUTES, ADMIN_ROUTES } from "../../shared/constants/routes.ts";
import ProductsListPage from "../../features/products/pages/ProductsListPage.tsx";
import ProductShowPage from "../../features/products/pages/ProductShowPage.tsx";
import ProductCreatePage from "../../features/products/pages/ProductCreatePage.tsx";
import ProductsEditPage from "../../features/products/pages/ProductsEditPage.tsx";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={APP_ROUTES.home} element={<App />}>
        <Route index element={<Home />} />
        <Route element={<AuthLayout />}>
          <Route path={APP_ROUTES.login} element={<Login />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route path={APP_ROUTES.admin} element={<Admin />} />

            <Route
              path={ADMIN_ROUTES.PRODUCTS}
              element={<ProductsListPage />}
            />
            <Route
              path={ADMIN_ROUTES.ADD_PRODUCT}
              element={<ProductCreatePage />}
            />
            <Route
              path={ADMIN_ROUTES.SHOW_PRODUCT}
              element={<ProductShowPage />}
            />
            <Route
              path={ADMIN_ROUTES.EDIT_PRODUCT}
              element={<ProductsEditPage />}
            />
          </Route>
        </Route>
        <Route path={APP_ROUTES.notFound} element={<div>NotFound</div>} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
