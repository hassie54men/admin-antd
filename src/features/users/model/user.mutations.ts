import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUser } from "./user.api.ts";
import { QUERY_KEYS } from "../../../api/queryKeys.ts";

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.products.all,
      });
    },
  });
};
