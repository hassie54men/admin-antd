import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUser, deleteUser } from "./user.api.ts";
import { QUERY_KEYS } from "../../../api/queryKeys.ts";
import type { UserRequest } from "./user.types.ts";

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.users.all,
      });
    },
  });
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UserRequest) => createUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.users.all,
      });
    },
  });
};
