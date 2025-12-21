import { Table } from "antd";
import { useGetSearchProduct } from "../model/product.queries.ts";
import type { Product } from "../model/product.types.ts";
import { useTranslation } from "react-i18next";
import { useSearchQuery } from "../../../shared/hooks/useSearchQuery.ts";
import { useProductColumns } from "../hooks/useProductColumns";
import TableHeader from "../../../shared/ui/TableHeader.tsx";
import { ADMIN_ROUTES } from "../../../shared/constants/routes.ts";
import usePagination from "../../../shared/hooks/usePagination.tsx";

const ProductsTable = () => {
  const { q } = useSearchQuery();
  const { t } = useTranslation();
  const { columns } = useProductColumns();
  const { handlePaginationChange, pageSize, page } = usePagination();
  const { data, isLoading, isError } = useGetSearchProduct(
    q,
    (page - 1) * pageSize,
    pageSize,
  );
  const total = data?.total ?? 0;

  if (isError) {
    return <div>{t("products.error")}</div>;
  }

  return (
    <>
      <TableHeader
        breadcrumbs={[{ title: t("products.products") }, { title: "" }]}
        title={t("products.product")}
        createLabel={t("products.add")}
        createPath={ADMIN_ROUTES.ADD_PRODUCT}
      />

      <Table<Product>
        dataSource={data?.products}
        columns={columns}
        loading={isLoading}
        rowKey="id"
        pagination={{
          current: page,
          pageSize,
          total,
        }}
        onChange={handlePaginationChange}
      />
    </>
  );
};

export default ProductsTable;
