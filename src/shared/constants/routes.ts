export const APP_ROUTES = {
  home: "/",
  login: "/login",
  admin: "/admin",
  notFound: "*",
};

export const ADMIN_ROUTES = {
  ADMIN: "/admin",
  PRODUCTS: "/products",

  SHOW_PRODUCT: "/products/show/:id",
  ADD_PRODUCT: "/products/create",
  EDIT_PRODUCT: "/products/edit/:id",

  USERS: "/users",
  ADD_USER: "/users/create",
  SHOW_USER: "/users/show/:id",
  EDIT_USER: "/users/edit/:id",

  POSTS: "/posts",
};
