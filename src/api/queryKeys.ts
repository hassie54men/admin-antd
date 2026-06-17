import type { UserRequest } from "../features/users/model/user.types.ts";

export const QUERY_KEYS = {
  auth: {
    all: ["auth"] as const,
    me: () => [...QUERY_KEYS.auth.all, "me"],
  },
  products: {
    all: ["products"] as const,
    list: () => [...QUERY_KEYS.products.all, "list"],
    single: (id: string) => [...QUERY_KEYS.products.all, "single", id],
    search: (query: string, limit: number, skip: number) => [
      ...QUERY_KEYS.products.all,
      "search",
      query,
      limit,
      skip,
    ],
  },
  users: {
    all: ["users"] as const,
    list: () => [QUERY_KEYS.users.all, "list"],
    search: (query: string) => [...QUERY_KEYS.users.all, "search", query],
    single: (id: string) => [...QUERY_KEYS.users.all, "single", id],
    create: (data: UserRequest) => [...QUERY_KEYS.users.all, "crate", data],
  },
} as const;
