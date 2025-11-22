import { ConfigProvider } from "antd";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../shared/constants/queryClient.ts";
import { Outlet } from "react-router";

function App() {
  return (
    <ConfigProvider>
      <QueryClientProvider client={queryClient}>
        <Outlet />
      </QueryClientProvider>
    </ConfigProvider>
  );
}

export default App;
