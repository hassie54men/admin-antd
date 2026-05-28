import type { TablePaginationConfig } from "antd";
import { useSearchParams } from "react-router";
import { useCallback } from "react";

const PAGE_PARAM = "page";
const PAGE_SIZE_PARAM = "pageSize";
const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 10;

export interface PaginationParams {
  skip: number;
  limit: number;
}

export interface UsePaginationOptions {
  defaultPageSize?: number;
}

export interface UsePaginationResult {
  page: number;
  pageSize: number;
  skip: number;
  limit: number;
  getTablePaginationConfig: (total: number) => TablePaginationConfig;
  setPage: (page: number) => void;
  setPageSize: (size: number) => void;
  resetPage: () => void;
}

export const usePagination = (
  options?: UsePaginationOptions,
): UsePaginationResult => {
  const defaultPageSize = options?.defaultPageSize ?? DEFAULT_PAGE_SIZE;
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get(PAGE_PARAM)) || DEFAULT_PAGE;
  const pageSize =
    Number(searchParams.get(PAGE_SIZE_PARAM)) || DEFAULT_PAGE_SIZE;

  const skip = (page - 1) * pageSize;
  const limit = pageSize;

  const updateParams = useCallback(
    (newPage: number, newPageSize: number) => {
      setSearchParams((prev) => {
        const params = new URLSearchParams(prev);
        if (newPage === DEFAULT_PAGE) {
          params.delete(PAGE_PARAM);
        } else {
          params.set(PAGE_PARAM, String(newPage));
        }
        if (newPageSize === defaultPageSize) {
          params.delete(PAGE_SIZE_PARAM);
        } else {
          params.set(PAGE_SIZE_PARAM, String(newPageSize));
        }
        return params;
      });
    },
    [setSearchParams, defaultPageSize],
  );
  const setPage = useCallback(
    (newPage: number) => {
      updateParams(newPage, pageSize);
    },
    [updateParams, pageSize],
  );

  const setPageSize = useCallback(
    (newPageSize: number) => {
      updateParams(DEFAULT_PAGE_SIZE, newPageSize);
    },
    [updateParams],
  );

  const resetPage = useCallback(
    () => updateParams(DEFAULT_PAGE, pageSize),
    [updateParams, pageSize],
  );

  const getTablePaginationConfig = useCallback(
    (total: number): TablePaginationConfig => ({
      current: page,
      pageSize,
      total,
      showSizeChanger: true,
      showTotal: (total, range) => `${range[0]}-${range[1]} / ${total}`,
      onChange: (newPage, newPageSize) => {
        if (newPageSize !== pageSize) {
          updateParams(DEFAULT_PAGE, newPageSize);
        } else {
          updateParams(newPage, newPageSize);
        }
      },
    }),
    [page, pageSize, updateParams],
  );
  return {
    page,
    pageSize,
    getTablePaginationConfig,
    setPage,
    setPageSize,
    resetPage,
    skip,
    limit,
  };
};
