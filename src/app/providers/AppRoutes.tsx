import { Route, Routes } from "react-router";
import App from "../App";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<div>HOME</div>} />
        <Route element={<div>AUTH-LAYOUT</div>}>
          <Route path="login" element={<div>LOGIN</div>} />
          <Route path="register" element={<div>REGISTER</div>} />
        </Route>
        <Route path="*" element={<div>NotFound</div>} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
