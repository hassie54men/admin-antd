import { type BreadcrumbProps, Button, Flex } from "antd";
import EditButton from "./EditButton.tsx";
import AdminPageHeader from "./AdminPageHeader.tsx";
import type { ReactNode } from "react";
import { Resources } from "../types/api.ts";

interface Props {
  children: ReactNode;
  title: string;
  breadcrumbs: BreadcrumbProps["items"];
  id: string;
  resource: Resources;
  deletePending: boolean;
  onDelete: (id: string) => void;
  deleteLabel: string;
}

const ShowPageWrapper = ({
  children,
  title,
  breadcrumbs,
  onDelete,
  resource,
  deletePending,
  id,
  deleteLabel,
}: Props) => {
  return (
    <>
      <AdminPageHeader
        breadcrumbs={breadcrumbs}
        title={title}
        actions={
          <Flex gap={10}>
            <EditButton id={id} resource={resource} />
            <Button
              danger
              type="primary"
              loading={deletePending}
              onClick={() => onDelete(id)}
            >
              {deleteLabel}
            </Button>
          </Flex>
        }
      />
      {children}
    </>
  );
};

export default ShowPageWrapper;
