import { ConfigProvider, App as AntdApp } from "antd";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../shared/constants/queryClient.ts";
import { Outlet } from "react-router";

function App() {
  return (
    <ConfigProvider>
      <AntdApp>
        <QueryClientProvider client={queryClient}>
          <Outlet />
        </QueryClientProvider>
      </AntdApp>
    </ConfigProvider>
  );
}

export default App;
