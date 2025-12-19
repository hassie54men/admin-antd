import {
  Breadcrumb,
  Button,
  Card,
  Col,
  Flex,
  Form,
  Input,
  notification,
  Row,
  Typography,
} from "antd";
import { useAddProduct } from "../model/products.mutations.ts";
import type { Product } from "../model/product.types.ts";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { ADMIN_ROUTES } from "../../../shared/constants/routes.ts";
import BackArrowButton from "../../../shared/ui/BackArrowButton.tsx";

type FieldType = {
  id?: number;
  title: string;
  price: string;
  rating?: string;
  category?: string;
};

const AddProduct = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { mutate: addProductMutate, isPending } = useAddProduct();
  const onFinish = async (values: Product) => {
    addProductMutate(values, {
      onSuccess: () => {
        form.resetFields();
        navigate(ADMIN_ROUTES.PRODUCTS);
      },
      onError: () => {
        notification.error({
          message: "Ошибка",
          description: "Не удалось добавить товар",
        });
      },
    });
  };
  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>{t("products.products")}</Breadcrumb.Item>
        <Breadcrumb.Item>{t("products.product")}</Breadcrumb.Item>
        <Breadcrumb.Item>{t("products.create")}</Breadcrumb.Item>
      </Breadcrumb>
      <Flex gap={8} align={"center"} style={{ marginBottom: 16 }}>
        <BackArrowButton />
        <Typography style={{ fontSize: "24px", fontWeight: "bold" }}>
          {t("products.product")}
        </Typography>
      </Flex>

      <Card>
        <Form
          layout="vertical"
          onFinish={onFinish}
          style={{ maxWidth: "100%" }}
        >
          <Row gutter={16}>
            <Col xs={24} sm={12} md={6}>
              <Form.Item<FieldType>
                label={t("products.price")}
                name="price"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={6}>
              <Form.Item<FieldType>
                label={t("products.title")}
                name="title"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={6}>
              <Form.Item<FieldType>
                label={t("products.rating")}
                name="rating"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={6}>
              <Form.Item<FieldType>
                label={t("products.category")}
                name="category"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

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
