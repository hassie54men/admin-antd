import AdminPageHeader from "./AdminPageHeader.tsx";
import type { ReactNode } from "react";
import type { BreadcrumbProps } from "antd";

interface Props {
  children: ReactNode;
  title: string;
  breadcrumbs: BreadcrumbProps["items"];
}

const EditPageWrapper = ({ children, title, breadcrumbs }: Props) => {
  return (
    <>
      <AdminPageHeader breadcrumbs={breadcrumbs} title={title} />
      {children}
    </>
  );
};

export default EditPageWrapper;
