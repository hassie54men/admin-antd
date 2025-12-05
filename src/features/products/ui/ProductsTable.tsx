import { Table, Typography } from "antd";
import { useGetProductsQuery } from "../model/product.queries.ts";
import type { Product } from "../model/product.types.ts";

const colums = [
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
    render: (text: string) => (
      <Typography.Text copyable>{text}</Typography.Text>
    ),
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
    sorter: (a: Product, b: Product) => a.price - b.price,
  },
  {
    title: "Rating",
    dataIndex: "rating",
    key: "rating",
    sorter: (a: Product, b: Product) => a.rating - b.rating,
  },
];

const ProductsTable = () => {
  const { data } = useGetProductsQuery();
  return <Table<Product> dataSource={data} columns={colums} />;
};

export default ProductsTable;
