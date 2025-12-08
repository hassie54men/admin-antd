import apiClient from "../../../api/apiClient.ts";
import { ENDPOINTS } from "../../../api/endpoints.ts";
import type {
  Product,
  ProductSearchResponse,
  ProductsListResponse,
} from "./product.types.ts";

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

export const getSearchProduct = async (
  query: string,
): Promise<ProductSearchResponse> => {
  const res = await apiClient.get<ProductSearchResponse>(
    ENDPOINTS.products.search,
    {
      params: { q: query },
    },
  );
  return res.data;
};

export const getDeleteProduct = async (id: number): Promise<Product> => {
  const res = await apiClient.delete<Product>(ENDPOINTS.products.single(id));
  return res.data;
};
