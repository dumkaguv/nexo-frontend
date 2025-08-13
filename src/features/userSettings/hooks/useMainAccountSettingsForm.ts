import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createAccountSettingsSchema,
  type AccountSettingsFormSchema,
} from "@/features/userSettings/zodSchemas";
import { useAuthStore } from "@/stores";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Api } from "@/services/apiClient";
import { handleMutationError } from "@/utils";
import type { ApiResponse, Profile, User } from "@/types";
import { QueryKeys } from "@/config";

export const useMainAccountSettingsForm = () => {
  const { user, setUser, profile, setProfile } = useAuthStore();
  const { t } = useTranslation();
  const schema = createAccountSettingsSchema(t);

  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<AccountSettingsFormSchema>({
    resolver: zodResolver(schema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (
      formData: AccountSettingsFormSchema
    ): Promise<{
      responseUser: ApiResponse<User>;
      responseProfile: ApiResponse<Profile>;
    }> => {
      const responseProfile = await Api.profile.updateProfile({
        userName: formData.userName,
        fullName: formData.fullName,
        phone: formData.phone,
        birthDay: formData.birthDay,
        biography: formData.bio,
      });

      const responseUser = await Api.users.updateUser({
        email: formData.email,
      });

      return { responseUser, responseProfile };
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.Profile.root, QueryKeys.Users.byId],
      });

      if (response.responseUser.data) {
        setUser(response.responseUser.data);
      }
      if (response.responseProfile.data) {
        setProfile(response.responseProfile.data);
      }

      toast.success(t("success"));
    },
    onError: (error) => handleMutationError(error),
  });

  const onSubmit = (data: AccountSettingsFormSchema) => mutate(data);

  useEffect(() => {
    if (user && profile) {
      reset({
        email: user.email,
        userName: profile.userName,
        fullName: profile.fullName,
        phone: profile.phone ?? "",
        bio: profile.biography ?? "",
        ...(profile.birthDay && { birthDay: new Date(profile.birthDay) }),
      });
    }
  }, [user, profile, reset]);

  return {
    onSubmit,
    handleSubmit,
    control,
    register,
    errors,
    isPending,
  };
};
