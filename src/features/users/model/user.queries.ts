import { useQuery } from "@tanstack/react-query";
import type { User, UsersListResponse } from "./user.types.ts";
import { getUser, searchUser } from "./user.api.ts";
import { QUERY_KEYS } from "../../../api/queryKeys.ts";

export const useSearchUser = (query: string) => {
  return useQuery<UsersListResponse>({
    queryKey: QUERY_KEYS.users.search(query),
    queryFn: () => searchUser(query),
  });
};

export const useGetUser = (id: string) => {
  return useQuery<User>({
    queryKey: QUERY_KEYS.users.single(id),
    queryFn: () => getUser(id),
  });
};
