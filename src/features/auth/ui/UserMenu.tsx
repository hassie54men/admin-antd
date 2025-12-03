import { Avatar, Dropdown, type MenuProps, Space } from "antd";
import { useGetUserQuery } from "../model/auth.queries.ts";
import { useTranslation } from "react-i18next";
import { logout } from "../model/auth.api.ts";

function DownOutlined() {
  return null;
}

const UserMenu = () => {
  const { data } = useGetUserQuery();
  const { t } = useTranslation();
  const label = data?.firstName ?? "User";
  const firstLetter = label[0].toUpperCase() ?? "U";
  const items: MenuProps["items"] = [
    {
      key: "label",
      type: "group",
      label: data?.firstName ?? "User",
    },
    {
      label: <a href="/">{t("text.personalInformation")}</a>,
      key: "0",
    },
    {
      label: <a href="/">{t("text.security")}</a>,
      key: "1",
    },
    {
      type: "divider",
    },
    {
      label: <span onClick={logout}>{t("text.logout")}</span>,
      key: "3",
    },
  ];
  return (
    <Dropdown menu={{ items }} trigger={["click"]}>
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          <Avatar size={48}>{firstLetter}</Avatar>
          <DownOutlined />
        </Space>
      </a>
    </Dropdown>
  );
};

export default UserMenu;
