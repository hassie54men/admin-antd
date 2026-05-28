import CreatePageWrapper from "../../../shared/ui/CreatePageWrapper.tsx";
import UserForm from "../ui/UserForm.tsx";
import { useTranslation } from "react-i18next";

const UserCreatePage = () => {
  const { t } = useTranslation();
  return (
    <>
      <CreatePageWrapper
        title={t("users.create")}
        breadcrumbs={[
          { title: t("users.users") },
          { title: t("users.user") },
          { title: t("users.create") },
        ]}
      >
        <UserForm />
      </CreatePageWrapper>
    </>
  );
};

export default UserCreatePage;
