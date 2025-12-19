import { useMutation } from "@tanstack/react-query";
import { createProduct, deleteProduct, editProduct } from "./product.api.ts";
import type { ProductRequest } from "./product.types.ts";

export function useDeleteProduct() {
  return useMutation({
    mutationFn: (id: string) => deleteProduct(id),
  });
}
export function useCreateProduct() {
  return useMutation({
    mutationFn: (product: ProductRequest) => createProduct(product),
  });
}

export function useEditProduct() {
  return useMutation({
    mutationFn: ({ id, product }: { id: string; product: ProductRequest }) =>
      editProduct(id, product),
  });
}
