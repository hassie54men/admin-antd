import { Table, type TableProps } from "antd";
import { useGetSearchProduct } from "../model/product.queries.ts";
import type { Product } from "../model/product.types.ts";
import { useTranslation } from "react-i18next";
import { useSearchQuery } from "../../../shared/hooks/useSearchQuery.ts";
import { useProductColumns } from "../hooks/useProductColumns";
import TableHeader from "../../../shared/ui/TableHeader.tsx";
import { ADMIN_ROUTES } from "../../../shared/constants/routes.ts";
import { useSearchParams } from "react-router";

const ProductsTable = () => {
  const { q, skip, limit, page, pageSize } = useSearchQuery();
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useTranslation();
  const { columns } = useProductColumns();
  const { data, isLoading, isError } = useGetSearchProduct(q, skip, limit);
  const total = data?.total ?? 0;

  if (isError) {
    return <div>{t("products.error")}</div>;
  }

  const handleChange: TableProps<Product>["onChange"] = (pagination) => {
    if (!pagination.current || !pagination.pageSize) return;

    const newLimit = pagination.pageSize;
    const newSkip = (pagination.current - 1) * pagination.pageSize;

    const params = new URLSearchParams(searchParams);
    params.set("q", q);
    params.set("limit", String(newLimit));
    params.set("skip", String(newSkip));
    setSearchParams(params, { replace: true });
  };
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
        onChange={handleChange}
      />
    </>
  );
};

export default ProductsTable;
