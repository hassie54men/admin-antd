import { Layout, Menu } from "antd";
import { Outlet, useNavigate } from "react-router";
import AdminHeader from "../../pages/admin-page/AdminHeader.tsx";
import { ROUTES } from "../../shared/constants/routes.ts";
import { useTranslation } from "react-i18next";

const { Sider, Content } = Layout;

const AdminLayout = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const styles = {
    layout: { height: "100vh" }, // весь layout на высоту окна
    innerLayout: { height: "100%" }, // правая часть заполняет высоту
    content: {
      padding: 24,
      overflow: "auto", // скролл только в контенте
      background: "#f5f5f5",
    },
  };

  return (
    <Layout style={styles.layout}>
      <Sider trigger={null}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["2"]}
          items={[
            {
              key: "1",
              label: t("menu.admin"),
              onClick: () => navigate(ROUTES.admin),
            },
            {
              key: "2",
              label: t("menu.products"),
              onClick: () => navigate(ROUTES.products),
            },
            {
              key: "3",
              label: t("menu.users"),
              onClick: () => navigate(ROUTES.notFound),
            },
            {
              key: "4",
              label: t("menu.posts"),
              onClick: () => navigate(ROUTES.notFound),
            },
          ]}
        />
      </Sider>

      <Layout style={styles.innerLayout}>
        <AdminHeader />
        <Content style={styles.content}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
