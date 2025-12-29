import type { Product, ProductFormData } from "../product.types";
import type { User, UserFormData } from "../../../users/model/user.types.ts";

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

export const initFormUserMapper = (
  values: User | undefined,
): UserFormData | undefined => {
  if (!values) return undefined;

  return {
    firstName: values.firstName,
    lastName: values.lastName,
    age: values.age,
    gender: values.gender,
    email: values.email,
  };
};
