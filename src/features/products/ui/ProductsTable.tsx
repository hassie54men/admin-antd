import { Table, Typography } from "antd";
import { useGetProductsQuery } from "../model/product.queries.ts";
import type { Product } from "../model/product.types.ts";
import { useTranslation } from "react-i18next";

const ProductsTable = () => {
  const { t } = useTranslation();
  const { data, isLoading, isError } = useGetProductsQuery();

  if (isError) {
    return <div>{t("table.error")}</div>;
  }

  const colums = [
    {
      title: t("table.id"),
      dataIndex: "id",
      key: "id",
      render: (text: number) => <a>{text}</a>,
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
  ];

  return (
    <Table<Product>
      dataSource={data?.products}
      columns={colums}
      loading={isLoading}
    />
  );
};

export default ProductsTable;
