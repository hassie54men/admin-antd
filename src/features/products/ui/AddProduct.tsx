import { Breadcrumb, Button, Card, Flex, Form, Input, Typography } from "antd";
import { useAddProduct } from "../model/products.mutations.ts";
import type { Product } from "../model/product.types.ts";
import BackButton from "../../../shared/ui/BackButton.tsx";
import { useTranslation } from "react-i18next";
type FieldType = {
  id?: number;
  title: string;
  price: string;
  rating?: string;
  category?: string;
};

const AddProduct = () => {
  const { t } = useTranslation();
  const { mutate: addProductMutate, isPending } = useAddProduct();
  const onFinish = async (values: Product) => {
    addProductMutate(values);
  };
  return (
    <>
      <Flex vertical gap={8} style={{ marginBottom: 16 }}>
        <Breadcrumb>
          <Breadcrumb.Item>{t("products.products")}</Breadcrumb.Item>
          <Breadcrumb.Item>{t("products.product")}</Breadcrumb.Item>
          <Breadcrumb.Item>{t("products.create")}</Breadcrumb.Item>
        </Breadcrumb>
        <Typography style={{ fontSize: "24px", fontWeight: "bold" }}>
          {t("products.product")}
        </Typography>

        <Flex justify="space-between" align="center">
          <BackButton />
        </Flex>
      </Flex>

      <Card style={{ maxWidth: 1200 }}>
        <Form
          layout="vertical"
          onFinish={onFinish}
          style={{ maxWidth: "100%" }}
        >
          <Flex gap={16} wrap>
            <Form.Item<FieldType>
              label={t("products.id")}
              name="id"
              required
              style={{ flex: 1, minWidth: 220 }}
            >
              <Input />
            </Form.Item>

            <Form.Item<FieldType>
              label={t("products.price")}
              name="price"
              required
              style={{ flex: 1, minWidth: 220 }}
            >
              <Input />
            </Form.Item>

            <Form.Item<FieldType>
              label={t("products.title")}
              name="title"
              required
              style={{ flex: 1, minWidth: 220 }}
            >
              <Input />
            </Form.Item>

            <Form.Item<FieldType>
              label={t("products.rating")}
              name="rating"
              required
              style={{ flex: 1, minWidth: 220 }}
            >
              <Input />
            </Form.Item>

            <Form.Item<FieldType>
              label={t("products.category")}
              name="category"
              required
              style={{ flex: 1, minWidth: 220, maxWidth: 220 }}
            >
              <Input />
            </Form.Item>
          </Flex>

          {/* футер формы с кнопкой справа, как на скрине */}
          <Form.Item style={{ marginTop: 32, textAlign: "right" }}>
            <Button type="primary" htmlType="submit" loading={isPending}>
              {t("products.save")}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </>
  );
};

export default AddProduct;
