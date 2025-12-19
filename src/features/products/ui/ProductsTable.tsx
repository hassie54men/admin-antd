import { Breadcrumb, Flex, Table, Typography } from "antd";
import { useGetSearchProduct } from "../model/product.queries.ts";
import type { Product } from "../model/product.types.ts";
import { useTranslation } from "react-i18next";
import AddProductButton from "./AddProductButton.tsx";
import Search from "../../../shared/ui/Search.tsx";
import { useSearchQuery } from "../../../shared/hooks/useSearchQuery.ts";
import { useProductColumns } from "../hooks/useProductColumns";

const ProductsTable = () => {
  const { q } = useSearchQuery();
  const { data, isLoading, isError } = useGetSearchProduct(q);
  const { t } = useTranslation();
  const { columns } = useProductColumns();

  if (isError) {
    return <div>{t("products.error")}</div>;
  }

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>{t("products.products")}</Breadcrumb.Item>
        <Breadcrumb.Item></Breadcrumb.Item>
      </Breadcrumb>
      <Flex
        vertical
        style={{
          marginBottom: 16,
          gap: 8,
        }}
      >
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
          <Search />

          <AddProductButton />
        </Flex>
      </Flex>

      <Table<Product>
        dataSource={data?.products}
        columns={columns}
        loading={isLoading}
        rowKey="id"
      />
    </>
  );
};

export default ProductsTable;
