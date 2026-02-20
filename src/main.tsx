import "normalize.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./i18n";
import AppRoutes from "./app/routes/AppRoutes.tsx";
import { ThemeProvider } from "./store/ThemeProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <StrictMode>
      <ThemeProvider>
        <AppRoutes />
      </ThemeProvider>
    </StrictMode>
  </BrowserRouter>,
);
