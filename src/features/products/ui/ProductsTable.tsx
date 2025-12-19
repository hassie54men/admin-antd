import { Table } from "antd";
import { useGetSearchProduct } from "../model/product.queries.ts";
import type { Product } from "../model/product.types.ts";
import { useTranslation } from "react-i18next";
import ProductCreateButton from "./ProductCreateButton.tsx";
import Search from "../../../shared/ui/Search.tsx";
import { useSearchQuery } from "../../../shared/hooks/useSearchQuery.ts";
import { useProductColumns } from "../hooks/useProductColumns";
import ProductTableHeader from "../pages/ProductTableHeader.tsx";

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
      <ProductTableHeader
        actions={
          <>
            <Search />
            <ProductCreateButton />
          </>
        }
        breadcrumbs={[{ title: t("products.products") }, { title: "" }]}
        title={t("products.product")}
      />

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
