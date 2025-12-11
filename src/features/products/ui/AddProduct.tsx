import { Button, Form, Input } from "antd";
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
      <Form onFinish={onFinish}>
        <Form.Item<FieldType>
          label={t("products.id")}
          name="id"
          rules={[{ required: true, message: "Please input your username!" }]}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
        >
          <Input />
        </Form.Item>
        <Form.Item<FieldType>
          label={t("products.title")}
          name="title"
          rules={[{ required: true, message: "Please input your username!" }]}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
        >
          <Input />
        </Form.Item>
        <Form.Item<FieldType>
          label={t("products.price")}
          name="price"
          rules={[{ required: true, message: "Please input your username!" }]}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
        >
          <Input />
        </Form.Item>
        <Form.Item<FieldType>
          label={t("products.rating")}
          name="rating"
          rules={[{ required: true, message: "Please input your username!" }]}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
        >
          <Input />
        </Form.Item>
        <Form.Item<FieldType>
          label={t("products.category")}
          name="category"
          rules={[{ required: true, message: "Please input your username!" }]}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
        >
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ span: 24 }}>
          <Button htmlType="submit" loading={isPending}>
            {t("products.add")}
          </Button>
          <BackButton />
        </Form.Item>
      </Form>
    </>
  );
};

export default AddProduct;
