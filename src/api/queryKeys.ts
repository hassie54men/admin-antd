export const QUERY_KEYS = {
  auth: {
    all: ["auth"] as const,
    me: () => [...QUERY_KEYS.auth.all, "me"],
  },
  admin: {
    all: ["admin"] as const,
    products: () => [...QUERY_KEYS.admin.all, "products"],
  },
} as const;
