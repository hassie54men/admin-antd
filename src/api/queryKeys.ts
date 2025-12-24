export const QUERY_KEYS = {
  auth: {
    all: ["auth"] as const,
    me: () => [...QUERY_KEYS.auth.all, "me"],
  },
  products: {
    all: ["products"] as const,
    list: () => [...QUERY_KEYS.products.all, "list"],
    single: (id: string) => [...QUERY_KEYS.products.all, "single", id],
    search: (query: string) => [...QUERY_KEYS.products.all, "search", query],
  },
  users: {
    all: ["users"] as const,
    list: () => [QUERY_KEYS.users.all, "list"],
    search: (query: string) => [...QUERY_KEYS.users.all, "search", query],
  },
} as const;
