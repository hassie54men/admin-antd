import { Layout } from "antd";
import { Outlet } from "react-router";
import AdminHeader from "../../pages/admin-page/AdminHeader.tsx";
import { AdminMenu } from "../../features/adminMenu/ui/AdminMenu";
import { useThemeStore } from "../../store/ThemeStore.tsx";

const { Sider, Content } = Layout;

const AdminLayout = () => {
  const { theme } = useThemeStore();
  const styles = {
    theme: { theme },
    layout: { height: "100vh" }, // весь layout на высоту окна
    innerLayout: { height: "100%" }, // правая часть заполняет высоту
    content: {
      padding: 24,
      overflow: "auto", // скролл только в контенте
    },
  };

  return (
    <Layout style={styles.layout}>
      <AdminHeader />

      <Layout style={styles.innerLayout}>
        <Sider trigger={null}>
          <div className="demo-logo-vertical" />
          <AdminMenu />
        </Sider>
        <Content style={styles.content}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
