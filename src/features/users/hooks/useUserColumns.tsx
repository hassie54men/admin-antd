import { useTranslation } from "react-i18next";

const UseUserColumns = () => {
  const { t } = useTranslation();
  const columns = [
    {
      title: t("users.id"),
      dataIndex: "id",
      key: "id",
    },
    {
      title: t("users.email"),
      dataIndex: "email",
      key: "email",
    },
    {
      title: t("users.firstName"),
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: t("users.lastName"),
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: t("users.age"),
      dataIndex: "age",
      key: "age",
    },
    {
      title: t("users.gender"),
      dataIndex: "gender",
      key: "gender",
    },
  ];
  return { columns };
};

export default UseUserColumns;
