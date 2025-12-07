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
    content: { margin: "24px 16px", padding: 24, minHeight: 280 },
    layout: { height: "100vh" },
  };

  return (
    <Layout style={styles.layout}>
      <Sider trigger={null}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
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
      <Layout>
        <AdminHeader />
        <Content style={styles.content}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
