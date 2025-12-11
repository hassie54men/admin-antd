import { useQuery } from "@tanstack/react-query";
import { getProducts } from "./product.api.ts";
import type { ProductsListResponse } from "./product.types.ts";
import { QUERY_KEYS } from "../../../api/queryKeys.ts";

export function useGetProductsQuery() {
  return useQuery<ProductsListResponse>({
    queryKey: [QUERY_KEYS.products.list()],
    queryFn: getProducts,
  });
}
