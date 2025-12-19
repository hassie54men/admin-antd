import { useQuery } from "@tanstack/react-query";
import { searchProduct, getSingleProduct } from "./product.api.ts";
import type { Product, ProductsListResponse } from "./product.types.ts";
import { QUERY_KEYS } from "../../../api/queryKeys.ts";

export function useGetSingleProduct(id: string) {
  return useQuery<Product>({
    queryKey: QUERY_KEYS.products.single(id),
    queryFn: () => getSingleProduct(id),
  });
}

export function useGetSearchProduct(query: string) {
  return useQuery<ProductsListResponse>({
    queryKey: QUERY_KEYS.products.search(query),
    queryFn: () => searchProduct(query),
  });
}
