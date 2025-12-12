import { Breadcrumb, Flex, Input, Table, Typography } from "antd";
import { useGetSearchProduct } from "../model/product.queries.ts";
import type { Product } from "../model/product.types.ts";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { useState } from "react";
import AddProductButton from "./AddProductButton.tsx";

const ProductsTable = () => {
  const [value, setValue] = useState("");
  const { data, isLoading, isError } = useGetSearchProduct(value);
  const { t } = useTranslation();
  const navigate = useNavigate();

  if (isError) {
    return <div>{t("products.error")}</div>;
  }

  const colums = [
    {
      title: t("products.id"),
      dataIndex: "id",
      key: "id",
      render: (text: number, record: Product) => (
        <a onClick={() => navigate(`/products/${record.id}`)}>{text}</a>
      ),
    },
    {
      title: t("products.title"),
      dataIndex: "title",
      key: "title",
      render: (text: string) => (
        <Typography.Text copyable>{text}</Typography.Text>
      ),
    },
    {
      title: t("products.category"),
      dataIndex: "category",
      key: "category",
    },
    {
      title: t("products.price"),
      dataIndex: "price",
      key: "price",
      sorter: (a: Product, b: Product) => a.price - b.price,
    },
    {
      title: t("products.rating"),
      dataIndex: "rating",
      key: "rating",
      sorter: (a: Product, b: Product) => a.rating - b.rating,
    },
  ];

  return (
    <>
      <Flex
        vertical
        style={{
          marginBottom: 16,
          gap: 8,
        }}
      >
        <Breadcrumb>
          <Breadcrumb.Item>{t("products.products")}</Breadcrumb.Item>
          <Breadcrumb.Item></Breadcrumb.Item>
        </Breadcrumb>
        <Typography style={{ fontSize: "24px", fontWeight: "bold" }}>
          {t("products.product")}
        </Typography>
        <Flex
          justify={"space-between"}
          align={"center"}
          style={{
            marginBottom: 16,
          }}
        >
          <Input.Search
            style={{ maxWidth: 320 }} // чтобы не растягивался
            value={value}
            loading={isLoading}
            onChange={(e) => setValue(e.target.value)}
            placeholder={t("products.search")}
          />

          <AddProductButton />
        </Flex>
      </Flex>

      <Table<Product>
        dataSource={data?.products}
        columns={colums}
        loading={isLoading}
        rowKey="id"
      />
    </>
  );
};

export default ProductsTable;
