import { useQuery } from "@tanstack/react-query";
import type { UsersListResponse } from "./user.types.ts";
import { searchUser } from "./user.api.ts";
import { QUERY_KEYS } from "../../../api/queryKeys.ts";

export const useSearchUser = (query: string) => {
  return useQuery<UsersListResponse>({
    queryKey: QUERY_KEYS.users.search(query),
    queryFn: () => searchUser(query),
  });
};
