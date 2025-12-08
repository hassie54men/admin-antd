import { Button, Input, Table, Typography } from "antd";
import { useGetSearchProduct } from "../model/product.queries.ts";
import type { Product } from "../model/product.types.ts";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { useState } from "react";
import { useDeleteProduct } from "../model/products.mutations.ts";

const ProductsTable = () => {
  const [value, setValue] = useState("");
  const { data, isLoading, isError } = useGetSearchProduct(value);
  const { mutate: deleteProductMutate, isPending: deletePending } =
    useDeleteProduct();
  const { t } = useTranslation();
  const navigate = useNavigate();

  if (isError) {
    return <div>{t("table.error")}</div>;
  }

  const colums = [
    {
      title: t("table.id"),
      dataIndex: "id",
      key: "id",
      render: (text: number, record: Product) => (
        <a onClick={() => navigate(`/products/${record.id}`)}>{text}</a>
      ),
    },
    {
      title: t("table.title"),
      dataIndex: "title",
      key: "title",
      render: (text: string) => (
        <Typography.Text copyable>{text}</Typography.Text>
      ),
    },
    {
      title: t("table.category"),
      dataIndex: "category",
      key: "category",
    },
    {
      title: t("table.price"),
      dataIndex: "price",
      key: "price",
      sorter: (a: Product, b: Product) => a.price - b.price,
    },
    {
      title: t("table.rating"),
      dataIndex: "rating",
      key: "rating",
      sorter: (a: Product, b: Product) => a.rating - b.rating,
    },
    {
      title: t("text.delete"),
      key: "delete",
      render: (_: unknown, record: Product) => (
        <Button
          loading={deletePending}
          onClick={() => deleteProductMutate(record.id)}
        >
          {t("text.delete")}
        </Button>
      ),
    },
  ];

  return (
    <>
      <Input.Search
        value={value}
        loading={isLoading}
        onChange={(e) => setValue(e.target.value)}
      />
      <Table<Product>
        dataSource={data?.products}
        columns={colums}
        loading={isLoading}
      />
    </>
  );
};

export default ProductsTable;
