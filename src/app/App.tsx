import { Route, Routes } from "react-router";

function App() {
  return (
    <Routes>
      <Route index element={<div>HOME</div>} />

      <Route element={<div>AUTH-LAYOUT</div>}>
        <Route path="login" element={<div>LOGIN</div>} />
        <Route path="register" element={<div>REGISTER</div>} />
      </Route>
    </Routes>
  );
}

export default App;
