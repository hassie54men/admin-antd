import { Route, Routes } from "react-router";
import App from "../App";
import AuthLayout from "../layout/AuthLayout.tsx";
import Login from "../../features/auth/pages/Login.tsx";
import Home from "../layout/Home.tsx";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
        </Route>
        <Route path="*" element={<div>NotFound</div>} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
