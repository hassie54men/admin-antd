import AdminPageHeader from "../../../shared/ui/AdminPageHeader.tsx";
import { useTranslation } from "react-i18next";
import type { ReactNode } from "react";
interface Props {
  children: ReactNode;
}

const ProductEditPageWrapper = ({ children }: Props) => {
  const { t } = useTranslation();
  return (
    <>
      <AdminPageHeader
        breadcrumbs={[
          { title: t("products.products") },
          { title: t("products.product") },
          { title: t("products.edit") },
        ]}
        title={t("products.product")}
      />
      {children}
    </>
  );
};

export default ProductEditPageWrapper;
