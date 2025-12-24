import { useSearchUser } from "../model/user.queries.ts";
import TableHeader from "../../../shared/ui/TableHeader.tsx";
import { useTranslation } from "react-i18next";
import { Table } from "antd";
import { ADMIN_ROUTES } from "../../../shared/constants/routes.ts";
import { useSearchQuery } from "../../../shared/hooks/useSearchQuery.ts";
import type { User } from "../model/user.types.ts";
import useUserColumns from "../hooks/useUserColumns.tsx";

const UsersTable = () => {
  const { q } = useSearchQuery();
  const { data, isError, isLoading } = useSearchUser(q);
  const { t } = useTranslation();
  const { columns } = useUserColumns();

  if (isError) {
    return <div>{t("users.error")}</div>;
  }

  return (
    <>
      <TableHeader
        breadcrumbs={[{ title: t("users.users") }, { title: "" }]}
        title={t("users.users")}
        createLabel={t("users.add")}
        createPath={ADMIN_ROUTES.ADD_USER}
      />
      <Table<User>
        columns={columns}
        dataSource={data?.users}
        loading={isLoading}
        rowKey="id"
      />
    </>
  );
};

export default UsersTable;
