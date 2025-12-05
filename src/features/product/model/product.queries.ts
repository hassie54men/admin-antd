import { useQuery } from "@tanstack/react-query";
import { getProducts } from "./product.api.ts";
import type { Product } from "./product.types.ts";

export function useGetProductsQuery() {
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: getProducts,
    retry: 0,
  });
}
