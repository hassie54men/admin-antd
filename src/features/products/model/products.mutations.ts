import { useMutation } from "@tanstack/react-query";
import { addProduct, deleteProduct } from "./product.api.ts";
import type { Product } from "./product.types.ts";

export function useDeleteProduct() {
  return useMutation({
    mutationFn: (id: number) => deleteProduct(id),
  });
}
export function useAddProduct() {
  return useMutation({
    mutationFn: (product: Product) => addProduct(product),
  });
}
