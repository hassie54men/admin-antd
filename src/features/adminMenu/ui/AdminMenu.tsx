import { Menu, type MenuProps } from "antd";
import { ADMIN_ROUTES } from "../../../shared/constants/routes";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router";

export const AdminMenu = (props: MenuProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const basePath = "/" + pathname.split("/")[1];

  const handleNavigate: MenuProps["onClick"] = (menuItem) => {
    navigate(menuItem.key);
  };

  const menuItems: MenuProps["items"] = [
    {
      key: ADMIN_ROUTES.PRODUCTS,
      label: t("menu.products"),
      onClick: handleNavigate,
    },
    {
      key: ADMIN_ROUTES.USERS,
      label: t("menu.users"),
      onClick: handleNavigate,
    },
    {
      key: ADMIN_ROUTES.POSTS,
      label: t("menu.posts"),
      onClick: handleNavigate,
    },
  ];

  return <Menu items={menuItems} selectedKeys={[basePath]} {...props} />;
};
