import LoginButton from "../../features/auth/ui/LoginButton.tsx";
import { Header } from "antd/es/layout/layout";
import { Avatar } from "antd";
import { useNavigate } from "react-router";
import { APP_ROUTES } from "../../shared/constants/routes.ts";

const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <Header
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <Avatar
          style={{
            backgroundColor: "#87d068",
            cursor: "pointer",
          }}
          size={48}
          onClick={() => navigate(APP_ROUTES.admin)}
        >
          A
        </Avatar>
      </Header>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <LoginButton />
      </div>
    </>
  );
};

export default Home;
