import { Table, Typography } from "antd";
import { useGetSearchProduct } from "../model/product.queries.ts";
import type { Product } from "../model/product.types.ts";
import { useTranslation } from "react-i18next";
import { TableLink } from "../../../shared/ui/TableLink.tsx";
import { Search } from "../../../shared/ui/Search.tsx";
import { useSearchQuery } from "../../../shared/hooks/useSearchQuery.ts";

const ProductsTable = () => {
  const { q } = useSearchQuery();
  const { data, isLoading, isError } = useGetSearchProduct(q);
  const { t } = useTranslation();

  if (isError) {
    return <div>{t("products.error")}</div>;
  }

  const columns = [
    {
      title: t("products.id"),
      dataIndex: "id",
      key: "id",
      render: (_: unknown, record: Product) => <TableLink id={record.id} />,
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
      sorter: true,
    },
    {
      title: t("products.rating"),
      dataIndex: "rating",
      key: "rating",
      sorter: true,
    },
  ];

  return (
    <>
      <Search />
      <Table<Product>
        dataSource={data?.products}
        columns={columns}
        loading={isLoading}
      />
    </>
  );
};

export default ProductsTable;
