import { useGetSingleProduct } from "../model/product.queries.ts";
import { useParams } from "react-router";
import { Breadcrumb, Button, Card, Flex, Form, Input, Typography } from "antd";
import { useTranslation } from "react-i18next";
import {
  useDeleteProduct,
  useUpdateProduct,
} from "../model/products.mutations.ts";
import BackArrowButton from "../../../shared/ui/BackArrowButton.tsx";
import type { Product } from "../model/product.types.ts";
import { useEffect, useState } from "react";

const ProductCard = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [form] = Form.useForm<Product>();
  const productId = Number(id);
  const { data, isLoading, isError } = useGetSingleProduct(productId);
  const { mutate: deleteProductMutate, isPending: deletePending } =
    useDeleteProduct();
  const { mutate: updateProduct, isPending: updatePending } =
    useUpdateProduct();
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (data) {
      form.setFieldsValue(data);
    }
  }, [data, form]);

  function handleFinish(values: Product) {
    updateProduct(
      {
        ...values,
        id: productId,
      },
      {
        onSuccess: () => setIsEdit(false),
      },
    );
  }

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

        <Flex gap={10}>
          <Button
            type={"primary"}
            loading={updatePending}
            onClick={() => setIsEdit((prev) => !prev)}
          >
            {isEdit ? t("products.cancelEdit") : t("products.edit")}
          </Button>
          <Button
            danger
            type="primary"
            loading={deletePending}
            onClick={() => deleteProductMutate(productId)}
          >
            {t("text.delete")}
          </Button>
        </Flex>
      </Flex>

      <Card loading={isLoading}>
        <Form
          layout="vertical"
          onFinish={handleFinish}
          disabled={!isEdit}
          form={form}
        >
          <Flex gap={16} wrap>
            <Form.Item
              name="id"
              label={t("products.id")}
              style={{ flex: 1, minWidth: 200 }}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="title"
              label={t("products.title")}
              style={{ flex: 1, minWidth: 200 }}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="category"
              label={t("products.category")}
              style={{ flex: 1, minWidth: 200 }}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="price"
              label={t("products.price")}
              style={{ flex: 1, minWidth: 200 }}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="rating"
              label={t("products.rating")}
              style={{ flex: 1, minWidth: 200 }}
            >
              <Input />
            </Form.Item>
          </Flex>

          {isEdit && (
            <Form.Item style={{ marginTop: 24, textAlign: "right" }}>
              <Button type="primary" htmlType="submit" loading={updatePending}>
                {t("products.save")}
              </Button>
            </Form.Item>
          )}
        </Form>
      </Card>
    </>
  );
};

export default ProductCard;
