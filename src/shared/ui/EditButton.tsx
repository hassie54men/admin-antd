import { Button } from "antd";
import { useNavigate } from "react-router";
import { Resources } from "../types/api.ts";
import { useTranslation } from "react-i18next";

interface Props {
  id: string;
  resource: Resources;
}

const EditButton = ({ id, resource }: Props) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <Button type="primary" onClick={() => navigate(`/${resource}/edit/${id}`)}>
      {t("products.edit")}
    </Button>
  );
};

export default EditButton;
