export const ENDPOINTS = {
  auth: {
    login: "/auth/login",
    me: "/auth/me",
  },
  products: {
    list: "/products",
    single: (id: string) => `/products/${id}`,
    search: "/products/search",
    add: "/products/add",
  },
};
