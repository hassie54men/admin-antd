import { type PaginatedResponse, Resources } from "../../../shared/types/api";

export interface Product {
  id: string;
  title: string;
  category: string;
  price: number;
  rating: number;
}

export type ProductsListResponse = PaginatedResponse<
  Resources.PRODUCTS,
  Product
>;

export interface ProductRequest {
  title: string;
  price: string;
  rating: string;
  category: string;
}

export interface ProductFormData {
  id?: string;
  title: string;
  category: string;
  price: string;
  rating: string;
}
