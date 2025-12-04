import { Layout, Menu } from "antd";
import { Outlet } from "react-router";
import AdminHeader from "../../pages/admin-page/AdminHeader.tsx";

const { Sider, Content } = Layout;

const AdminLayout = () => {
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
              label: "nav 1",
            },
            {
              key: "2",
              label: "nav 2",
            },
            {
              key: "3",
              label: "nav 3",
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
