import { Button } from "antd";
import { useGetUserQuery } from "../model/auth.queries.ts";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { logout } from "../model/auth.api.ts";

const LoginButton = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data: user, refetch, isError } = useGetUserQuery();

  const handleLogout = async () => {
    logout();
    await refetch();
  };

  const navigateToLogin = () => {
    navigate("/login");
  };

  if (!user || isError) {
    return (
      <Button type="primary" color="primary" onClick={navigateToLogin}>
        {t("Login")}
      </Button>
    );
  }
  return <Button onClick={handleLogout}>Logout</Button>;
};

export default LoginButton;
