import { useGetSingleProduct } from "../model/product.queries.ts";
import { useParams } from "react-router";
import { Breadcrumb, Button, Card, Flex, Form, Input, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { useDeleteProduct } from "../model/products.mutations.ts";
import BackArrowButton from "../../../shared/ui/BackArrowButton.tsx";

const ProductCard = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const productId = Number(id);
  const { data, isLoading, isError } = useGetSingleProduct(productId);
  const { mutate: deleteProductMutate, isPending: deletePending } =
    useDeleteProduct();

  if (!data && isError) {
    return <div>PRODUCT LOADING ERROR</div>;
  }

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>{t("products.products")}</Breadcrumb.Item>
        <Breadcrumb.Item>{t("products.product")}</Breadcrumb.Item>
      </Breadcrumb>
      <Flex
        align={"center"}
        justify={"space-between"}
        gap={8}
        style={{ marginBottom: 16 }}
      >
        <Flex align={"center"} gap={8}>
          <BackArrowButton />
          <Typography style={{ fontSize: "24px", fontWeight: "bold" }}>
            {t("products.product")}
          </Typography>
        </Flex>

        <Button
          danger
          type="primary"
          loading={deletePending}
          onClick={() => deleteProductMutate(productId)}
        >
          {t("text.delete")}
        </Button>
      </Flex>

      {/* поля продукта, как форма просмотра */}
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
