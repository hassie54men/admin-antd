import apiClient from "../../../api/apiClient.ts";
import type { Product } from "./product.types.ts";
import { ENDPOINTS } from "../../../api/endpoints.ts";
type ProductsResponse = { products: Product[] };

export const getProducts = async (): Promise<Product[]> => {
  const res = await apiClient.get<ProductsResponse>(ENDPOINTS.admin.products);
  return res.data.products;
};
