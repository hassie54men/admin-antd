import ShowPageWrapper from "../../../shared/ui/ShowPageWrapper.tsx";
import UserCard from "../ui/UserCard.tsx";
import { useTranslation } from "react-i18next";
import { useDeleteUser } from "../model/user.mutations.ts";
import { useParams } from "react-router";
import { Resources } from "../../../shared/types/api.ts";

const UserShowPage = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const productId = id ?? "";
  const { mutate: userDeleteMutate, isError, isPending } = useDeleteUser();

  if (isError) {
    return <div>{t("users.error")}</div>;
  }
  return (
    <>
      <ShowPageWrapper
        title={t("users.user")}
        id={productId}
        breadcrumbs={[{ title: t("users.users") }, { title: t("users.user") }]}
        deleteLabel={t("text.delete")}
        onDelete={userDeleteMutate}
        deletePending={isPending}
        resource={Resources.USERS}
      >
        <UserCard />
      </ShowPageWrapper>
    </>
  );
};

export default UserShowPage;
