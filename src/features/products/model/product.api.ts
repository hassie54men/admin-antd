import apiClient from "../../../api/apiClient.ts";
import { ENDPOINTS } from "../../../api/endpoints.ts";
import type { ProductsListResponse } from "./product.types.ts";

export const getProducts = async (): Promise<ProductsListResponse> => {
  const res = await apiClient.get<ProductsListResponse>(
    ENDPOINTS.products.list,
  );
  return res.data;
};
