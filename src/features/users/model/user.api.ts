import type { UsersListResponse } from "./user.types.ts";
import apiClient from "../../../api/apiClient.ts";

export const searchUser = async (query: string): Promise<UsersListResponse> => {
  const res = await apiClient.get<UsersListResponse>("/users/search", {
    params: { q: query },
  });
  return res.data;
};
