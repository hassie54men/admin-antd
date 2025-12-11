import { Button } from "antd";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";

const BackButton = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <Button type="primary" onClick={() => navigate(-1)}>
      {t("products.backButton")}
    </Button>
  );
};

export default BackButton;
