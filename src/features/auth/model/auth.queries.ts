import { useQuery } from "@tanstack/react-query";
import { getUser } from "./auth.api.ts";

export function useGetUserQuery() {
  useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    enabled: !!localStorage.getItem("accessToken"),
  });
}
