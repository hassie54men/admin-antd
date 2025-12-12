import { Button } from "antd";
import { useNavigate } from "react-router";
import { ROUTES } from "../../../shared/constants/routes.ts";
import { useTranslation } from "react-i18next";

const AddProductButton = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <>
      <Button type="primary" onClick={() => navigate(ROUTES.addProduct)}>
        {t("products.add")}
      </Button>
    </>
  );
};

export default AddProductButton;
