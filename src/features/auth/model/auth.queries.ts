import { useQuery } from "@tanstack/react-query";
import { getUser } from "./auth.api.ts";
import { QUERY_KEYS } from "../../../api/queryKeys.ts";

export function useGetUserQuery() {
  return useQuery({
    queryKey: [QUERY_KEYS.auth.me()],
    queryFn: getUser,
    retry: 0,
  });
}
