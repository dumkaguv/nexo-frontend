import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/stores";
import { getAccessToken } from "@/utils";
import { Api } from "@/services/apiClient";
import { QueryKeys } from "@/config";

export const useProtectedRoute = () => {
  const { setProfile, setUser, setIsPendingProfile, setIsPendingUser } =
    useAuthStore();

  const token = getAccessToken();
  const isAuth = Boolean(token);

  const { data: responseProfile, isPending: isPendingProfile } = useQuery({
    queryKey: [QueryKeys.Profile.root({ token })],
    queryFn: Api.profile.getProfile,
    enabled: isAuth,
  });

  const userId = responseProfile?.data?.userRef;
  const { data: responseUser, isPending: isPendingUser } = useQuery({
    queryKey: [QueryKeys.Users.byId(Number(userId))],
    queryFn: () => {
      if (userId == null) {
        throw new Error("userId is undefined");
      }

      return Api.users.getUserById(userId);
    },
    enabled: typeof userId === "number",
  });

  useEffect(() => {
    setIsPendingProfile(isPendingProfile);
  }, [isPendingProfile, setIsPendingProfile]);

  useEffect(() => {
    setIsPendingUser(isPendingUser);
  }, [isPendingUser, setIsPendingUser]);

  useEffect(() => {
    if (responseProfile?.data) {
      setProfile(responseProfile.data);
    }
  }, [responseProfile?.data, setProfile]);

  useEffect(() => {
    if (responseUser?.data) {
      setUser(responseUser.data);
    }
  }, [responseUser?.data, setUser]);

  return isAuth;
};
