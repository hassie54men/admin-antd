import { useTranslation } from "react-i18next";

const Admin = () => {
  const { t } = useTranslation();
  return <div>{t("text.admin")}</div>;
};

export default Admin;
