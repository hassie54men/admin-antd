import { Avatar, Dropdown, type MenuProps } from "antd";
import { useGetUserQuery } from "../model/auth.queries.ts";
import { useTranslation } from "react-i18next";
import { logout } from "../model/auth.api.ts";

const UserMenu = () => {
  const { data: user, isError, refetch } = useGetUserQuery();
  const { t } = useTranslation();

  if (!user || isError) {
    return null;
  }

  const handleLogout = async () => {
    logout();
    await refetch();
  };

  const firstLetter = user.firstName[0].toUpperCase();
  const items: MenuProps["items"] = [
    {
      key: "label",
      type: "group",
      label: user.firstName,
    },
    {
      type: "divider",
    },
    {
      label: <span onClick={handleLogout}>{t("text.logout")}</span>,
      key: "3",
    },
  ];

  return (
    <Dropdown menu={{ items }} trigger={["click"]}>
      <Avatar
        size={48}
        style={{ backgroundColor: "#87d068", cursor: "pointer" }}
      >
        {firstLetter}
      </Avatar>
    </Dropdown>
  );
};

export default UserMenu;
