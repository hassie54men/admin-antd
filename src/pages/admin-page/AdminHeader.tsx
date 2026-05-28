import LocaleSwitcher from "../../shared/ui/LocaleSwitcher.tsx";
import { Flex, Layout, theme } from "antd";
import UserMenu from "../../features/auth/ui/UserMenu.tsx";
import ThemeSwitcher from "../../shared/ui/ThemeSwitcher.tsx";

const { Header } = Layout;

const AdminHeader = () => {
  const {
    token: { paddingLG },
  } = theme.useToken();

  return (
    <Header>
      <Flex
        justify="space-between"
        align="center"
        gap={paddingLG}
        style={{ height: "100%" }}
      >
        <ThemeSwitcher />
        <Flex
          justify="space-between"
          align="center"
          gap={paddingLG}
          style={{ height: "100%" }}
        >
          <LocaleSwitcher />
          <UserMenu />
        </Flex>
      </Flex>
    </Header>
  );
};

export default AdminHeader;
