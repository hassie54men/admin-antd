import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct, deleteProduct, editProduct } from "./product.api.ts";
import type { ProductRequest } from "./product.types.ts";
import { QUERY_KEYS } from "../../../api/queryKeys";

export function useDeleteProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.products.all,
      });
    },
  });
}
export function useCreateProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (product: ProductRequest) => createProduct(product),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.products.all,
      });
    },
  });
}

export function useEditProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, product }: { id: string; product: ProductRequest }) =>
      editProduct(id, product),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.products.all,
      });
    },
  });
}
