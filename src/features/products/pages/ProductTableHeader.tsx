import { Breadcrumb, type BreadcrumbProps, Flex, Typography } from "antd";
import type { ReactNode } from "react";

interface PageTableProps {
  breadcrumbs: BreadcrumbProps["items"];
  title: string;
  actions?: ReactNode;
}

const ProductTableHeader = ({
  breadcrumbs,
  title,
  actions,
}: PageTableProps) => {
  return (
    <>
      <Breadcrumb items={breadcrumbs} />
      <Flex
        vertical
        style={{
          marginBottom: 16,
          gap: 8,
        }}
      >
        <Typography.Title style={{ fontSize: "24px", fontWeight: "bold" }}>
          {title}
        </Typography.Title>
        <Flex
          justify={"space-between"}
          align={"center"}
          style={{
            marginBottom: 16,
          }}
        >
          {actions}
        </Flex>
      </Flex>
    </>
  );
};

export default ProductTableHeader;
