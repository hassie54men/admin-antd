import apiClient from "../../../api/apiClient.ts";
import { ENDPOINTS } from "../../../api/endpoints.ts";
import type {
  Product,
  ProductRequest,
  ProductsListResponse,
} from "./product.types.ts";

export const getSingleProduct = async (id: string): Promise<Product> => {
  const res = await apiClient.get<Product>(ENDPOINTS.products.single(id));
  return res.data;
};

export const searchProduct = async (
  query: string,
  limit: number,
  skip: number,
): Promise<ProductsListResponse> => {
  const res = await apiClient.get<ProductsListResponse>(
    ENDPOINTS.products.search,
    {
      params: { q: query, limit, skip },
    },
  );
  return res.data;
};

export const deleteProduct = async (id: string): Promise<Product> => {
  const res = await apiClient.delete<Product>(ENDPOINTS.products.single(id));
  return res.data;
};

export const createProduct = async (data: ProductRequest) => {
  const res = await apiClient.post<Product>(ENDPOINTS.products.add, data);
  return res.data;
};

export const editProduct = async (id: string, data: ProductRequest) => {
  const res = await apiClient.put<Product>(ENDPOINTS.products.single(id), data);

  return res.data;
};
