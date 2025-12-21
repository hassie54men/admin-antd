import { Button } from "antd";
import { useNavigate } from "react-router";
import { ADMIN_ROUTES } from "../../../shared/constants/routes.ts";
import { useTranslation } from "react-i18next";

const ProductCreateButton = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <>
      <Button type="primary" onClick={() => navigate(ADMIN_ROUTES.ADD_PRODUCT)}>
        {t("products.add")}
      </Button>
    </>
  );
};

export default ProductCreateButton;
