import LocaleSwitcher from "../../shared/ui/LocaleSwitcher.tsx";
import { Flex, Layout, theme } from "antd";
import UserMenu from "../../features/auth/ui/UserMenu.tsx";
import ThemeToggleButton from "../../shared/ui/ThemeToggleButton.tsx";

const { Header } = Layout;

const AdminHeader = () => {
  const {
    token: { paddingLG },
  } = theme.useToken();

  return (
    <Header>
      <Flex
        justify="flex-end"
        align="center"
        gap={paddingLG}
        style={{ height: "100%" }}
      >
        <LocaleSwitcher />
        <ThemeToggleButton>сменить тему</ThemeToggleButton>
        <UserMenu />
      </Flex>
    </Header>
  );
};

export default AdminHeader;
