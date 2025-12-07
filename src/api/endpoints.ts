export const ENDPOINTS = {
  auth: {
    login: "/auth/login",
    me: "/auth/me",
  },
  products: {
    list: "/products",
    single: (id: number) => `/products/${id}`,
  },
};
