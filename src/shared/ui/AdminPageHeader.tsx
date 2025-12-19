import { Breadcrumb, Flex, Typography } from "antd";
import type { BreadcrumbProps } from "antd";
import BackArrowButton from "./BackArrowButton";
import type { ReactNode } from "react";

interface PageHeaderProps {
  breadcrumbs: BreadcrumbProps["items"];
  title: string;
  showBack?: boolean;
  actions?: ReactNode;
}

const AdminPageHeader = ({
  breadcrumbs,
  title,
  showBack = true,
  actions,
}: PageHeaderProps) => (
  <header>
    <Breadcrumb items={breadcrumbs} />
    <Flex
      align="center"
      justify="space-between"
      gap={8}
      style={{ marginBottom: 16 }}
    >
      <Flex align="center" gap={8}>
        {showBack && <BackArrowButton />}
        <Typography.Title level={4} style={{ margin: 0 }}>
          {title}
        </Typography.Title>
      </Flex>
      {actions}
    </Flex>
  </header>
);

export default AdminPageHeader;
