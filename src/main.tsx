import "normalize.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./i18n";
import AppRoutes from "./app/providers/AppRoutes.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <StrictMode>
      <AppRoutes />
    </StrictMode>
  </BrowserRouter>,
);
