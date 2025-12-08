import { useQuery } from "@tanstack/react-query";
import {
  getProducts,
  getSearchProduct,
  getSingleProduct,
} from "./product.api.ts";
import type { Product, ProductsListResponse } from "./product.types.ts";
import { QUERY_KEYS } from "../../../api/queryKeys.ts";

export function useGetProductsQuery() {
  return useQuery<ProductsListResponse>({
    queryKey: [QUERY_KEYS.products.list()],
    queryFn: getProducts,
  });
}

export function useGetSingleProduct(id: number) {
  return useQuery<Product>({
    queryKey: [QUERY_KEYS.products.single(id)],
    queryFn: () => getSingleProduct(id),
  });
}

export function useGetSearchProduct(query: string) {
  return useQuery({
    queryKey: [QUERY_KEYS.products.search(query)],
    queryFn: () => getSearchProduct(query),
  });
}
