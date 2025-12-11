import { useMutation } from "@tanstack/react-query";
import { deleteProduct } from "./product.api.ts";

export function useDeleteProduct() {
  return useMutation({
    mutationFn: (id: number) => deleteProduct(id),
  });
}
