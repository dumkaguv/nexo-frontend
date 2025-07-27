import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/stores";
import { getAccessToken } from "@/utils";
import { Api } from "@/services/apiClient";

export const useProtectedRoute = () => {
  const { setUser, setIsPending } = useAuthStore();

  const isAuth = Boolean(getAccessToken());

  const { data: response, isPending } = useQuery({
    queryKey: ["getProfile"],
    queryFn: Api.profile.getProfile,
    enabled: isAuth,
  });

  useEffect(() => setIsPending(isPending), [isPending, setIsPending]);

  useEffect(() => {
    const profile = response?.data;
    if (profile) {
      setUser(profile);
    }
  }, [response?.data, setUser]);

  return isAuth;
};
