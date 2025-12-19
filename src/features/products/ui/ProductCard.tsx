import { useGetSingleProduct } from "../model/product.queries.ts";
import { useParams } from "react-router";
import { Button, Card, Flex, Form, Input } from "antd";
import { useTranslation } from "react-i18next";
import { useDeleteProduct } from "../model/products.mutations.ts";
import AdminPageHeader from "../../../shared/ui/AdminPageHeader.tsx";
import EditButton from "../../../shared/ui/EditButton.tsx";

const ProductCard = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const productId = id ?? "";
  const { data, isLoading, isError } = useGetSingleProduct(productId);
  const { mutate: deleteProductMutate, isPending: deletePending } =
    useDeleteProduct();

  if (!data && isError) {
    return <div>PRODUCT LOADING ERROR</div>;
  }

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

      <Card loading={isLoading}>
        <Form layout="vertical">
          <Flex gap={16} wrap>
            <Form.Item
              label={t("products.id")}
              style={{ flex: 1, minWidth: 200 }}
            >
              <Input value={data?.id} disabled />
            </Form.Item>
            <Form.Item
              label={t("products.title")}
              style={{ flex: 1, minWidth: 200 }}
            >
              <Input value={data?.title} disabled />
            </Form.Item>
            <Form.Item
              label={t("products.category")}
              style={{ flex: 1, minWidth: 200 }}
            >
              <Input value={data?.category} disabled />
            </Form.Item>
            <Form.Item
              label={t("products.price")}
              style={{ flex: 1, minWidth: 200 }}
            >
              <Input value={data?.price} disabled />
            </Form.Item>
            <Form.Item
              label={t("products.rating")}
              style={{ flex: 1, minWidth: 200 }}
            >
              <Input value={data?.rating} disabled />
            </Form.Item>
          </Flex>
        </Form>
      </Card>
    </>
  );
};

export default ProductCard;
