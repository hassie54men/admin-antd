import type { AuthResponse, LoginParams } from "./auth.types.ts";
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

export async function logout() {
  localStorage.removeItem("accessToken");
}

export async function getUser() {
  const token = localStorage.getItem("accessToken");
  const res = await apiClient.get<AuthResponse>("/auth/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
}
