import { ConfigProvider, theme as antdTheme } from "antd";
import { useThemeStore } from "./ThemeStore.tsx";
import React from "react";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme } = useThemeStore();

  return (
    <ConfigProvider
      theme={{
        // Самое главное — переключение алгоритма
        algorithm:
          theme === "dark"
            ? antdTheme.darkAlgorithm
            : antdTheme.defaultAlgorithm,
      }}
    >
      {children}
    </ConfigProvider>
  );
}
