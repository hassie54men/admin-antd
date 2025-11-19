import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import { BrowserRouter, Route, Routes } from "react-router";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <StrictMode>
      <Routes>
        <Route path="/" element={<App />} />
      </Routes>
    </StrictMode>
  </BrowserRouter>,
);
