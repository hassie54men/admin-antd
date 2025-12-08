export const QUERY_KEYS = {
  auth: {
    all: ["auth"] as const,
    me: () => [...QUERY_KEYS.auth.all, "me"],
  },
  products: {
    all: ["products"] as const,
    list: () => [...QUERY_KEYS.products.all, "list"],
    single: (id: number) => [...QUERY_KEYS.products.all, "single", id],
    search: (query: string) => [...QUERY_KEYS.products.all, "search", query],
  },
} as const;
