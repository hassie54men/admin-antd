import LoginButton from "../ui/LoginButton.tsx";
import LocaleSwitcher from "../ui/LocaleSwitcher.tsx";
import { Flex, theme } from "antd";

const AdminHeader = () => {
  const { token } = theme.useToken();
  const style = {
    padding: token.paddingLG,
    background: token.colorBgLayout,
  };
  return (
    <Flex justify="space-between" align="center" style={style}>
      <LoginButton />
      <LocaleSwitcher />
    </Flex>
  );
};

export default AdminHeader;
