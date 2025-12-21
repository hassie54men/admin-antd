import type { TableProps } from "antd";
import type { Product } from "../../features/products/model/product.types.ts";
import { useState } from "react";

const UsePagination = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const handlePaginationChange: TableProps<Product>["onChange"] = (
    pagination,
  ) => {
    setPage(pagination.current ?? 1);
    setPageSize(pagination.pageSize ?? 10);
  };

  return { page, pageSize, handlePaginationChange };
};

export default UsePagination;
