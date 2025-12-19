import { Button } from "antd";
import { useNavigate } from "react-router";
import { Resources } from "../types/api.ts";
import { useTranslation } from "react-i18next";

interface Props {
  productId: string;
}

const EditButton = ({ productId }: Props) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <Button
      type="primary"
      onClick={() => navigate(`/${Resources.PRODUCTS}/edit/${productId}`)}
    >
      {t("products.edit")}
    </Button>
  );
};

export default EditButton;
