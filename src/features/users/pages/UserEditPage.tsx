import EditPageWrapper from "../../../shared/ui/EditPageWrapper.tsx";
import UserEdit from "../ui/UserEdit.tsx";
import { useTranslation } from "react-i18next";

const UserEditPage = () => {
  const { t } = useTranslation();
  return (
    <>
      <EditPageWrapper
        title={t("users.users")}
        breadcrumbs={[
          { title: t("users.users") },
          { title: t("users.user") },
          { title: t("users.edit") },
        ]}
      >
        <UserEdit />
      </EditPageWrapper>
    </>
  );
};

export default UserEditPage;
