import { useThemeStore } from "../../store/ThemeStore.tsx";
import { Switch } from "antd";
import { SunOutlined, MoonOutlined } from "@ant-design/icons";

const ThemeToggleButton = () => {
  const { toggleTheme } = useThemeStore();
  return (
    <Switch
      checkedChildren={<SunOutlined />}
      unCheckedChildren={<MoonOutlined />}
      onChange={toggleTheme}
    />
  );
};

export default ThemeToggleButton;
