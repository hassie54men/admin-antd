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
  users: {
    list: "/users",
    search: "/users/search",
    single: (id: string) => `/users/${id}`,
    add: "/users/add",
  },
};
