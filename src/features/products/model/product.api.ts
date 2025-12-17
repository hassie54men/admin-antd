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

export const searchProduct = async (
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

export const deleteProduct = async (id: number): Promise<Product> => {
  const res = await apiClient.delete<Product>(ENDPOINTS.products.single(id));
  return res.data;
};

export const addProduct = async ({
  title,
  price,
  rating,
  category,
  id,
}: Product) => {
  const res = await apiClient.post<Product>(ENDPOINTS.products.add, {
    title,
    price,
    rating,
    category,
    id,
  });
  return res.data;
};

export const updateProduct = async ({
  title,
  price,
  rating,
  category,
  id,
}: Product) => {
  const res = await apiClient.put<Product>(ENDPOINTS.products.single(id), {
    title,
    price,
    rating,
    category,
  });

  return res.data;
};
