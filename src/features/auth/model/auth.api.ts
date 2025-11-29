import type { AuthResponse, LoginParams, User } from "./auth.types.ts";
import apiClient from "../../../api/apiClient.ts";

export async function login({ username, password }: LoginParams) {
  try {
    const res = await apiClient.post<AuthResponse>("/auth/login", {
      password,
      username,
    });

    if (res.data?.accessToken) {
      localStorage.setItem("accessToken", res.data.accessToken);
    }

    return res.data;
  } catch (error) {
    console.error(error);
  }
}

export function logout() {
  localStorage.removeItem("accessToken");
}

export async function getUser() {
  const res = await apiClient.get<User>("/auth/me");
  return res.data;
}
