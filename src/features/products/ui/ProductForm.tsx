import { App, Button, Card, Col, Form, Input, Row } from "antd";
import { useCreateProduct } from "../model/products.mutations.ts";
import type { ProductFormData } from "../model/product.types.ts";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { ADMIN_ROUTES } from "../../../shared/constants/routes.ts";

type FieldType = {
  id?: number;
  title: string;
  price: string;
  rating?: string;
  category?: string;
};

const ProductForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { notification } = App.useApp();
  const { mutate: createProduct, isPending } = useCreateProduct();

  const onFinish = async (values: ProductFormData) => {
    createProduct(values, {
      onSuccess: () => {
        form.resetFields();
        notification.success({
          message: "Успешно",
          description: "Сущность успешно создана",
        });
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

export default ProductForm;
