export enum Resources {
  PRODUCTS = "products",
  USERS = "users",
  POSTS = "posts",
}

export type PaginatedResponse<K extends Resources, T> = {
  [P in K]: T[];
} & {
  total: number;
  skip: number;
  limit: number;
};
