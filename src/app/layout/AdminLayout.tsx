import { Layout } from "antd";
import { Outlet } from "react-router";
import AdminHeader from "../../pages/admin-page/AdminHeader.tsx";
import { AdminMenu } from "../../features/adminMenu/ui/AdminMenu";

const { Sider, Content } = Layout;

const AdminLayout = () => {
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
