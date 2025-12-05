import { useQuery } from "@tanstack/react-query";
import { getProducts } from "./product.api.ts";
import type { Product } from "./product.types.ts";
import { QUERY_KEYS } from "../../../api/queryKeys.ts";

export function useGetProductsQuery() {
  return useQuery<Product[]>({
    queryKey: [QUERY_KEYS.admin.products()],
    queryFn: getProducts,
    retry: 0,
  });
}
