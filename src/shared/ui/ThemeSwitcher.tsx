import { Switch } from "antd";
import { SunOutlined, MoonOutlined } from "@ant-design/icons";
import { useThemeStore } from "../store/ThemeStore.tsx";

const ThemeSwitcher = () => {
  const { toggleTheme } = useThemeStore();
  return (
    <Switch
      checkedChildren={<SunOutlined />}
      unCheckedChildren={<MoonOutlined />}
      onChange={toggleTheme}
    />
  );
};

export default ThemeSwitcher;
