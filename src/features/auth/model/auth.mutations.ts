import { useMutation } from "@tanstack/react-query";
import { login } from "./auth.api.ts";
import { useNavigate } from "react-router";

export function useLoginMutation() {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: login,
    onSuccess: () => navigate("/"),
  });
}
