import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router";
import { Breadcrumb, Button, Card, Flex, Form, Input, Typography } from "antd";
import type { Product } from "../model/product.types.ts";
import { useGetSingleProduct } from "../model/product.queries.ts";
import { useUpdateProduct } from "../model/products.mutations.ts";
import BackArrowButton from "../../../shared/ui/BackArrowButton.tsx";
import { ROUTES } from "../../../shared/constants/routes.ts";
import { useEffect } from "react";

const UpdateProduct = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [form] = Form.useForm<Product>();
  const navigate = useNavigate();
  const productId = Number(id);
  const { data, isLoading, isError } = useGetSingleProduct(productId);
  const { mutate: updateProduct, isPending } = useUpdateProduct();

  useEffect(() => {
    if (data) {
      form.setFieldsValue(data);
    }
  }, [data, form]);

  const handleFinish = async (values: Product) => {
    updateProduct(
      { ...values, id: productId },
      {
        onSuccess: () =>
          navigate(ROUTES.product.replace(":id", String(productId))),
      },
    );
  };

  if (!data && isError) {
    return <div>PRODUCT LOADING ERROR</div>;
  }

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>{t("products.products")}</Breadcrumb.Item>
        <Breadcrumb.Item>{t("products.product")}</Breadcrumb.Item>
        <Breadcrumb.Item>{t("products.edit")}</Breadcrumb.Item>
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
      </Flex>

      <Card loading={isLoading}>
        <Form layout="vertical" onFinish={handleFinish} form={form}>
          <Flex gap={16} wrap>
            <Form.Item
              label={t("products.id")}
              style={{ flex: 1, minWidth: 200 }}
            >
              <Input value={data?.id} disabled />
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
          <Form.Item>
            <Flex gap={10} justify={"flex-end"}>
              <Button type={"primary"} loading={isPending} htmlType={"submit"}>
                {t("products.save")}
              </Button>
              <Button
                danger
                type={"primary"}
                onClick={() =>
                  navigate(ROUTES.product.replace(":id", String(productId)))
                }
              >
                {t("products.cancelEdit")}
              </Button>
            </Flex>
          </Form.Item>
        </Form>
      </Card>
    </>
  );
};

export default UpdateProduct;
