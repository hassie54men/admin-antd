import { Breadcrumb, type BreadcrumbProps, Flex, Typography } from "antd";
import Search from "./Search.tsx";
import CreateButton from "./CreateButton.tsx";

interface PageTableProps {
  breadcrumbs: BreadcrumbProps["items"];
  title: string;
  createLabel: string;
  createPath: string;
}

const TableHeader = ({
  breadcrumbs,
  title,
  createPath,
  createLabel,
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
          <Search />
          <CreateButton label={createLabel} to={createPath} />
        </Flex>
      </Flex>
    </>
  );
};

export default TableHeader;
