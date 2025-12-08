import { useMutation } from "@tanstack/react-query";
import { getDeleteProduct } from "./product.api.ts";

export function useDeleteProduct() {
  return useMutation({
    mutationFn: (id: number) => getDeleteProduct(id),
  });
}
