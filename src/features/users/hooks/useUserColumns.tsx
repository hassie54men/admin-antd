import { useTranslation } from "react-i18next";
import type { User } from "../model/user.types.ts";
import IdCellLinkButton from "../../../shared/ui/IdCellLinkButton.tsx";
import { Resources } from "../../../shared/types/api.ts";

const UseUserColumns = () => {
  const { t } = useTranslation();
  const resource = Resources.USERS;
  const columns = [
    {
      title: t("users.id"),
      dataIndex: "id",
      key: "id",
      render: (text: number, record: User) => (
        <IdCellLinkButton text={text} record={record} recourse={resource} />
      ),
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
