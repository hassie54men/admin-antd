import type { User, UserRequest, UsersListResponse } from "./user.types.ts";
import apiClient from "../../../api/apiClient.ts";
import { ENDPOINTS } from "../../../api/endpoints.ts";

export const searchUser = async (query: string): Promise<UsersListResponse> => {
  const res = await apiClient.get<UsersListResponse>(ENDPOINTS.users.search, {
    params: { q: query },
  });
  return res.data;
};

export const getUser = async (id: string) => {
  const res = await apiClient.get<User>(ENDPOINTS.users.single(id));
  return res.data;
};

export const deleteUser = async (id: string) => {
  const res = await apiClient.delete(ENDPOINTS.users.single(id));
  return res.data;
};

export const createUser = async (data: UserRequest) => {
  const res = await apiClient.post(ENDPOINTS.users.add, data);
  return res.data;
};
