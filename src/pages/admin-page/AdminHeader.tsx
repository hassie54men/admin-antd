import LocaleSwitcher from "../../shared/ui/LocaleSwitcher.tsx";
import { Flex, Layout, theme } from "antd";
import UserMenu from "../../features/auth/ui/UserMenu.tsx";

const { Header } = Layout;

const AdminHeader = () => {
  const {
    token: { paddingLG },
  } = theme.useToken();

  return (
    <Header>
      <Flex justify="flex-end" align="center" gap={paddingLG}>
        <LocaleSwitcher />
        <UserMenu />
      </Flex>
    </Header>
  );
};

export default AdminHeader;
