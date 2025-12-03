import type { AuthResponse, LoginParams, User } from "./auth.types.ts";
import apiClient from "../../../api/apiClient.ts";
import { ENDPOINTS } from "../../../api/endpoints.ts";
import { ACCESS_TOKEN_STORAGE_NAME } from "../../../shared/constants/storage.ts";

export async function login({ username, password }: LoginParams) {
  try {
    const res = await apiClient.post<AuthResponse>(ENDPOINTS.auth.login, {
      password,
      username,
    });

    if (res.data?.accessToken) {
      localStorage.setItem(ACCESS_TOKEN_STORAGE_NAME, res.data.accessToken);
    }

    return res.data;
  } catch (error) {
    console.error(error);
  }
}

export function logout() {
  localStorage.removeItem(ACCESS_TOKEN_STORAGE_NAME);
}

export async function getUser() {
  const res = await apiClient.get<User>(ENDPOINTS.auth.me);
  return res.data;
}
