import { ConfigProvider, theme as antdTheme } from "antd";
import { useThemeStore } from "./ThemeStore.tsx";
import React, { useEffect } from "react";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme } = useThemeStore();

  useEffect(() => {
    // Ставим класс на <html>
    document.documentElement.className = theme;
    // или на <body>: document.body.className = theme;
  }, [theme]);

  return (
    <ConfigProvider
      theme={{
        algorithm:
          theme === "dark"
            ? antdTheme.darkAlgorithm
            : antdTheme.defaultAlgorithm,
        token: {
          colorPrimary: theme === "dark" ? "#1677ff" : "#1890ff",
          colorBgContainer: theme === "dark" ? "#1f1f1f" : "#ffffff", // ← важно для карточек/инпутов
          colorBgElevated: theme === "dark" ? "#2d2d2d" : "#ffffff",
          colorBgLayout: theme === "dark" ? "#141414" : "#f0f2f5", // ← фон Layout/Content
          colorTextSecondary: theme === "dark" ? "#a6a6a6" : "#595959",
        },
        components: {
          Menu: {
            // Убираем/меняем синий фон активного пункта меню
            itemSelectedBg: theme === "dark" ? "#2d2d2d" : "#e9ecef", // серый вместо синего
            // или полностью прозрачный / без фона:
            // itemSelectedBg: "transparent",

            itemSelectedColor: theme === "dark" ? "#ffffff" : "#212529", // цвет текста

            // Цвет при наведении (hover)
            itemHoverBg: theme === "dark" ? "#3a3a3a" : "#f0f0f0",

            // Цвет обычных пунктов
            itemColor: theme === "dark" ? "#a6a6a6" : "#495057",
          },
          Layout: {
            // ← Вот это меняет цвет шапки (Header)
            headerBg: theme === "dark" ? "#1f1f1f" : "#ffffff", // тёмный / светлый фон
            siderBg: theme === "dark" ? "#1f1f1f" : "#ffffff",
            // дополнительно можно настроить:
            headerHeight: 64, // высота шапки
            headerPadding: "0 24px", // внутренние отступы
            headerColor: theme === "dark" ? "#e6e6e6" : "#000000", // цвет текста/иконок
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}
