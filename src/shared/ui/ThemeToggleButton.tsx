import React from "react";
import { useThemeStore } from "../../store/ThemeStore.tsx";

const ThemeToggleButton = ({ children }: { children: React.ReactNode }) => {
  const { toggleTheme } = useThemeStore();
  return <button onClick={toggleTheme}>{children}</button>;
};

export default ThemeToggleButton;
