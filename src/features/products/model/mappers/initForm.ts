import type { Product, ProductFormData } from "../product.types";

export const initFormMapper = (
  values: Product | undefined,
): ProductFormData | undefined => {
  if (!values) return;

  return {
    ...values,
    price: values.price.toString(),
    rating: values.rating.toString(),
    id: values.id.toString(),
  };
};
