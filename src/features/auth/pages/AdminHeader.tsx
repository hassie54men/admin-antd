import LoginButton from "../ui/LoginButton.tsx";
import LocaleSwitcher from "../ui/LocaleSwitcher.tsx";
import { Header } from "antd/es/layout/layout";
import UserMenu from "../ui/UserMenu.tsx";

const AdminHeader = () => {
  return (
    <Header
      style={{
        padding: "30px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <LoginButton />
      <LocaleSwitcher />
      <UserMenu />
    </Header>
  );
};

export default AdminHeader;
