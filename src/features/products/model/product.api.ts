import apiClient from "../../../api/apiClient.ts";
import { ENDPOINTS } from "../../../api/endpoints.ts";
import type { Product, ProductsListResponse } from "./product.types.ts";

export const getProducts = async (): Promise<ProductsListResponse> => {
  const res = await apiClient.get<ProductsListResponse>(
    ENDPOINTS.products.list,
  );
  return res.data;
};

export const getSingleProduct = async (id: number): Promise<Product> => {
  const res = await apiClient.get<Product>(ENDPOINTS.products.single(id));
  return res.data;
};
