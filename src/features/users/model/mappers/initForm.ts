import type { User, UserFormData } from "../user.types.ts";

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
