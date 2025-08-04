import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createAccountSettingsSchema,
  type AccountSettingsFormSchema,
} from "@/features/userSettings/zodSchemas";
import { useAuthStore } from "@/stores";

export const useMainAccountSettingsForm = () => {
  const { user, profile } = useAuthStore();

  const { t } = useTranslation();

  const schema = createAccountSettingsSchema(t);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<AccountSettingsFormSchema>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: AccountSettingsFormSchema) => {
    console.log("Form data:", data);
  };

  useEffect(() => {
    if (user && profile) {
      reset({
        email: user.email ?? "",
        userName: profile.userName ?? "",
        fullName: profile.fullName ?? "",
        // phone: profile.phone ?? "", // TODO add phone to back and bio
      });
    }
  }, [user, profile, reset]);

  return {
    onSubmit,
    handleSubmit,
    control,
    register,
    errors,
  };
};
