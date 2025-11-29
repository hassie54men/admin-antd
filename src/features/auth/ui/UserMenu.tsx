import { Avatar, Dropdown, type MenuProps, Space } from "antd";
import { useGetUserQuery } from "../model/auth.queries.ts";

function DownOutlined() {
  return null;
}

function UserOutlined() {
  return null;
}

const UserMenu = () => {
  const { data } = useGetUserQuery();
  const items: MenuProps["items"] = [
    {
      key: "label",
      type: "group",
      label: data?.firstName ?? "User",
    },
    {
      label: <span>English</span>,
      key: "en",
    },
    {
      label: <span>Русский</span>,
      key: "ru",
    },
  ];
  return (
    <Dropdown menu={{ items }} trigger={["click"]}>
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          <Avatar
            size={48}
            icon={<UserOutlined />}
            style={{ backgroundColor: "grey" }}
          />
          <DownOutlined />
        </Space>
      </a>
    </Dropdown>
  );
};

export default UserMenu;
