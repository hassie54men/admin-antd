import { useQuery } from "@tanstack/react-query";
import { getUser } from "./auth.api.ts";

export function useGetUserQuery() {
  return useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    retry: 0,
  });
}
