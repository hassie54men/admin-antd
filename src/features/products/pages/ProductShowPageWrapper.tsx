import { Button, Flex } from "antd";
import EditButton from "../../../shared/ui/EditButton.tsx";
import AdminPageHeader from "../../../shared/ui/AdminPageHeader.tsx";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import { useDeleteProduct } from "../model/products.mutations.ts";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const ProductShowPageWrapper = ({ children }: Props) => {
  const { t } = useTranslation();
  const { id } = useParams();
  const productId = id ?? "";
  const { mutate: deleteProductMutate, isPending: deletePending } =
    useDeleteProduct();

  return (
    <>
      <AdminPageHeader
        breadcrumbs={[
          { title: t("products.products") },
          { title: t("products.product") },
        ]}
        title={t("products.product")}
        actions={
          <Flex gap={10}>
            <EditButton productId={productId} />
            <Button
              danger
              type="primary"
              loading={deletePending}
              onClick={() => deleteProductMutate(productId)}
            >
              {t("text.delete")}
            </Button>
          </Flex>
        }
      />
      {children}
    </>
  );
};

export default ProductShowPageWrapper;
