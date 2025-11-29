import { Layout, Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content } from "antd/es/layout/layout";
import { Outlet } from "react-router";
import AdminHeader from "../../features/auth/pages/AdminHeader.tsx";

const AdminLayout = () => {
  return (
    <Layout>
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
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
